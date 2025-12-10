import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native';

const { ReactNativeBridge } = NativeModules;

export interface CommandParams {
  [key: string]: any;
}

export interface CommandEvent {
  command: string;
  callbackId: string;
  params: CommandParams;
}

export type CommandHandler = (params: CommandParams) => Promise<any> | any;

/**
 * NativeBridge provides communication between TypeScript and Kotlin.
 *
 * This bridge allows:
 * - Kotlin to send commands that TypeScript handles
 * - TypeScript to send results/errors back to Kotlin
 * - TypeScript to emit events that Kotlin can listen to
 */
class NativeBridgeClass {
  private eventEmitter: NativeEventEmitter;
  private commandHandlers: Map<string, CommandHandler> = new Map();
  private commandSubscription: EmitterSubscription | null = null;
  private isInitialized = false;

  constructor() {
    this.eventEmitter = new NativeEventEmitter(ReactNativeBridge);
  }

  /**
   * Initialize the bridge and start listening for commands from Kotlin
   */
  initialize(): void {
    if (this.isInitialized) {
      console.log('[NativeBridge] Already initialized');
      return;
    }

    console.log('[NativeBridge] Initializing...');

    // Listen for commands from Kotlin
    this.commandSubscription = this.eventEmitter.addListener(
      'NativeCommand',
      this.handleCommand.bind(this)
    );

    // Notify Kotlin that TypeScript is ready
    ReactNativeBridge.notifyReady();

    this.isInitialized = true;
    console.log('[NativeBridge] Initialized successfully');
  }

  /**
   * Cleanup the bridge when no longer needed
   */
  cleanup(): void {
    if (this.commandSubscription) {
      this.commandSubscription.remove();
      this.commandSubscription = null;
    }
    this.commandHandlers.clear();
    this.isInitialized = false;
    console.log('[NativeBridge] Cleaned up');
  }

  /**
   * Register a command handler that can be called from Kotlin
   */
  registerCommand(commandName: string, handler: CommandHandler): void {
    this.commandHandlers.set(commandName, handler);
    console.log(`[NativeBridge] Registered command: ${commandName}`);
  }

  /**
   * Unregister a command handler
   */
  unregisterCommand(commandName: string): void {
    this.commandHandlers.delete(commandName);
    console.log(`[NativeBridge] Unregistered command: ${commandName}`);
  }

  /**
   * Handle incoming command from Kotlin
   */
  private async handleCommand(event: CommandEvent): Promise<void> {
    const { command, callbackId, params } = event;
    console.log(`[NativeBridge] Received command: ${command}, callbackId: ${callbackId}`);

    const handler = this.commandHandlers.get(command);
    if (!handler) {
      console.warn(`[NativeBridge] No handler registered for command: ${command}`);
      this.sendError(callbackId, `Unknown command: ${command}`);
      return;
    }

    try {
      const result = await handler(params);
      this.sendResult(callbackId, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[NativeBridge] Command ${command} failed:`, errorMessage);
      this.sendError(callbackId, errorMessage);
    }
  }

  /**
   * Send a successful result back to Kotlin
   */
  sendResult(callbackId: string, result: any): void {
    const wrappedResult = result !== undefined ? { value: result } : null;
    ReactNativeBridge.sendResult(callbackId, wrappedResult);
    console.log(`[NativeBridge] Sent result for callbackId: ${callbackId}`);
  }

  /**
   * Send an error back to Kotlin
   */
  sendError(callbackId: string, errorMessage: string): void {
    ReactNativeBridge.sendError(callbackId, errorMessage);
    console.log(`[NativeBridge] Sent error for callbackId: ${callbackId}`);
  }

  /**
   * Emit an event to Kotlin listeners
   */
  emitEvent(eventName: string, data?: Record<string, any>): void {
    ReactNativeBridge.emitEvent(eventName, data || null);
    console.log(`[NativeBridge] Emitted event: ${eventName}`);
  }

  /**
   * Log a message that will appear in Android logcat
   */
  log(level: 'debug' | 'info' | 'warn' | 'error', message: string): void {
    ReactNativeBridge.log(level, message);
  }
}

// Export singleton instance
export const NativeBridge = new NativeBridgeClass();
