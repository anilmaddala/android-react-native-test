import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native';
import { Buffer } from 'buffer';
import { useAppStore } from '../stores/appStore';
import { commands } from '../generated/commands';

const { Command, Response } = commands;
type IResponse = commands.IResponse;

interface CommandBridgeModule {
  sendResponse(base64Data: string): void;
  notifyReady(): void;
  isReady(): boolean;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

const { CommandBridge } = NativeModules as { CommandBridge: CommandBridgeModule };
const commandBridgeEmitter = new NativeEventEmitter(NativeModules.CommandBridge);

/**
 * Command handler that processes protobuf commands from Kotlin
 */
class CommandHandler {
  private isInitialized = false;
  private subscription: EmitterSubscription | null = null;

  initialize(): void {
    if (this.isInitialized) {
      console.log('[CommandHandler] Already initialized');
      return;
    }

    console.log('[CommandHandler] Initializing...');

    this.subscription = commandBridgeEmitter.addListener(
      'onCommand',
      this.handleCommand.bind(this)
    );

    CommandBridge.notifyReady();

    this.isInitialized = true;
    console.log('[CommandHandler] Ready');
  }

  private async handleCommand(data: string): Promise<void> {
    try {
      const bytes = Buffer.from(data, 'base64');
      const command = Command.decode(bytes);

      console.log(`[CommandHandler] Received: ${command.command}`);

      const response = this.processCommand(command);

      const responseBytes = Response.encode(response).finish();
      const base64Response = Buffer.from(responseBytes).toString('base64');
      CommandBridge.sendResponse(base64Response);
    } catch (error) {
      console.error('[CommandHandler] Error:', error);

      const errorResponse: IResponse = {
        callbackId: 'unknown',
        error: { message: error instanceof Error ? error.message : String(error) },
      };

      const responseBytes = Response.encode(Response.create(errorResponse)).finish();
      CommandBridge.sendResponse(Buffer.from(responseBytes).toString('base64'));
    }
  }

  private processCommand(command: commands.Command): IResponse {
    const store = useAppStore.getState();
    const callbackId = command.callbackId;

    switch (command.command) {
      case 'increment': {
        store.increment();
        return {
          callbackId,
          counter: { value: useAppStore.getState().counter },
        };
      }

      case 'decrement': {
        store.decrement();
        return {
          callbackId,
          counter: { value: useAppStore.getState().counter },
        };
      }

      default: {
        return {
          callbackId,
          error: { message: `Unknown command: ${command.command}` },
        };
      }
    }
  }

  destroy(): void {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
    this.isInitialized = false;
    console.log('[CommandHandler] Destroyed');
  }
}

export const commandHandler = new CommandHandler();
export { CommandBridge };
