import { requireNativeModule, NativeModule } from 'expo-modules-core';
import { useAppStore } from '../stores/appStore';

/**
 * CommandBridge native module interface
 */
interface CommandBridgeModule extends NativeModule<{ onCommand: CommandEvent }> {
  sendResponse(callbackId: string, result: Record<string, any> | null): void;
  sendError(callbackId: string, errorMessage: string): void;
  notifyReady(): void;
  isReady(): boolean;
}

interface CommandEvent {
  command: string;
  params: Record<string, any>;
  callbackId: string;
}

// Get the native module
const CommandBridge = requireNativeModule<CommandBridgeModule>('CommandBridge');

/**
 * Command handler that processes commands from Kotlin using Zustand
 */
class CommandHandler {
  private isInitialized = false;

  /**
   * Initialize the command handler and start listening for commands
   */
  initialize(): void {
    if (this.isInitialized) {
      console.log('[CommandHandler] Already initialized');
      return;
    }

    console.log('[CommandHandler] Initializing...');

    // Listen for commands from Kotlin
    CommandBridge.addListener('onCommand', this.handleCommand.bind(this));

    // Notify Kotlin that TypeScript is ready
    CommandBridge.notifyReady();

    this.isInitialized = true;
    console.log('[CommandHandler] Initialized and ready');
  }

  /**
   * Handle incoming command from Kotlin
   */
  private async handleCommand(event: CommandEvent): Promise<void> {
    const { command, params, callbackId } = event;
    console.log(`[CommandHandler] Received command: ${command}`, params);

    try {
      const result = await this.processCommand(command, params);
      console.log(`[CommandHandler] Command ${command} succeeded:`, result);
      CommandBridge.sendResponse(callbackId, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[CommandHandler] Command ${command} failed:`, errorMessage);
      CommandBridge.sendError(callbackId, errorMessage);
    }
  }

  /**
   * Process a command using the Zustand store
   */
  private async processCommand(
    command: string,
    params: Record<string, any>
  ): Promise<Record<string, any>> {
    const store = useAppStore.getState();

    switch (command) {
      // Counter operations
      case 'increment':
        store.increment();
        return { counter: useAppStore.getState().counter };

      case 'decrement':
        store.decrement();
        return { counter: useAppStore.getState().counter };

      case 'setCounter':
        store.setCounter(params.value ?? 0);
        return { counter: useAppStore.getState().counter };

      case 'getCounter':
        return { counter: store.counter };

      // User operations
      case 'addUser':
        const newUser = store.addUser(params.name ?? '', params.email ?? '');
        return { user: newUser };

      case 'removeUser':
        store.removeUser(params.id ?? '');
        return { success: true };

      case 'getUsers':
        return { users: store.getUsers() };

      // Calculation
      case 'calculateSum':
        const sum = store.calculateSum(params.a ?? 0, params.b ?? 0);
        return { result: sum };

      // Validation
      case 'validateInput':
        const validation = store.validateInput(
          params.email ?? '',
          params.password ?? ''
        );
        return validation;

      // Async operations
      case 'fetchUserData':
        const userData = await store.fetchUserData(params.userId ?? '');
        return { user: userData };

      // Configuration
      case 'getConfiguration':
        return { config: store.getConfiguration() };

      case 'updateConfiguration':
        store.updateConfiguration(params.config ?? {});
        return { config: useAppStore.getState().config };

      // Get full state
      case 'getState':
        return store.getState();

      default:
        throw new Error(`Unknown command: ${command}`);
    }
  }

  /**
   * Cleanup
   */
  destroy(): void {
    // Remove listener if needed
    this.isInitialized = false;
    console.log('[CommandHandler] Destroyed');
  }
}

// Export singleton instance
export const commandHandler = new CommandHandler();

// Export the native module for direct access if needed
export { CommandBridge };
