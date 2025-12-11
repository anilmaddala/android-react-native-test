import { requireNativeModule, NativeModule } from 'expo-modules-core';
import { Buffer } from 'buffer';
import { useAppStore } from '../stores/appStore';
import { commands } from '../generated/commands';

// Import types from generated protobuf
const { Command, Response } = commands;
type ICommand = commands.ICommand;
type IResponse = commands.IResponse;

/**
 * CommandBridge native module interface
 */
interface CommandBridgeModule extends NativeModule<{ onCommand: { data: string } }> {
  sendResponse(base64Data: string): void;
  notifyReady(): void;
  isReady(): boolean;
}

// Get the native module
const CommandBridge = requireNativeModule<CommandBridgeModule>('CommandBridge');

/**
 * Command handler that processes protobuf commands from Kotlin using Zustand
 *
 * This handler provides compile-time type safety:
 * - Commands are defined in proto/commands.proto
 * - TypeScript types are generated from the proto file
 * - If a command is added/removed, both Kotlin and TypeScript must be updated
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

    console.log('[CommandHandler] Initializing with protobuf support...');

    // Listen for commands from Kotlin
    CommandBridge.addListener('onCommand', this.handleCommand.bind(this));

    // Notify Kotlin that TypeScript is ready
    CommandBridge.notifyReady();

    this.isInitialized = true;
    console.log('[CommandHandler] Initialized and ready');
  }

  /**
   * Handle incoming protobuf command from Kotlin
   */
  private async handleCommand(event: { data: string }): Promise<void> {
    try {
      // Decode base64 to bytes
      const bytes = Buffer.from(event.data, 'base64');

      // Decode protobuf Command message
      const command = Command.decode(bytes);

      console.log(`[CommandHandler] Received command type: ${command.command}, callbackId: ${command.callbackId}`);

      // Process command and get response
      const response = await this.processCommand(command);

      // Encode response to protobuf bytes
      const responseBytes = Response.encode(response).finish();

      // Encode to base64 and send back
      const base64Response = Buffer.from(responseBytes).toString('base64');
      CommandBridge.sendResponse(base64Response);

      console.log(`[CommandHandler] Sent response for ${command.command}`);
    } catch (error) {
      console.error('[CommandHandler] Error processing command:', error);

      // Send error response
      const errorResponse: IResponse = {
        callbackId: 'unknown',
        error: {
          message: error instanceof Error ? error.message : String(error),
        },
      };

      const responseBytes = Response.encode(Response.create(errorResponse)).finish();
      const base64Response = Buffer.from(responseBytes).toString('base64');
      CommandBridge.sendResponse(base64Response);
    }
  }

  /**
   * Process a typed protobuf command using the Zustand store
   */
  private async processCommand(command: commands.Command): Promise<IResponse> {
    const store = useAppStore.getState();
    const callbackId = command.callbackId;

    // Handle each command type with full type safety
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

      case 'setCounter': {
        const value = command.setCounter?.value ?? 0;
        store.setCounter(value);
        return {
          callbackId,
          counter: { value: useAppStore.getState().counter },
        };
      }

      case 'getCounter': {
        return {
          callbackId,
          counter: { value: store.counter },
        };
      }

      case 'addUser': {
        const name = command.addUser?.name ?? '';
        const email = command.addUser?.email ?? '';
        const newUser = store.addUser(name, email);
        return {
          callbackId,
          user: {
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              createdAt: newUser.createdAt,
            },
          },
        };
      }

      case 'removeUser': {
        const id = command.removeUser?.id ?? '';
        store.removeUser(id);
        return {
          callbackId,
          success: { success: true },
        };
      }

      case 'getUsers': {
        const users = store.getUsers();
        return {
          callbackId,
          users: {
            users: users.map((u) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              createdAt: u.createdAt,
            })),
          },
        };
      }

      case 'calculateSum': {
        const a = command.calculateSum?.a ?? 0;
        const b = command.calculateSum?.b ?? 0;
        const result = store.calculateSum(a, b);
        return {
          callbackId,
          sum: { result },
        };
      }

      case 'validateInput': {
        const email = command.validateInput?.email ?? '';
        const password = command.validateInput?.password ?? '';
        const validation = store.validateInput(email, password);
        return {
          callbackId,
          validation: {
            isValid: validation.isValid,
            errors: validation.errors,
          },
        };
      }

      case 'fetchUserData': {
        const userId = command.fetchUserData?.userId ?? '';
        const userData = await store.fetchUserData(userId);
        return {
          callbackId,
          user: {
            user: {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              createdAt: userData.createdAt,
            },
          },
        };
      }

      case 'getConfiguration': {
        const config = store.getConfiguration();
        return {
          callbackId,
          configuration: {
            config: {
              version: config.version,
              features: {
                analytics: config.features.analytics,
                notifications: config.features.notifications,
                darkMode: config.features.darkMode,
              },
              apiEndpoint: config.apiEndpoint,
              maxRetries: config.maxRetries,
            },
          },
        };
      }

      case 'updateConfiguration': {
        const protoConfig = command.updateConfiguration?.config;
        if (protoConfig) {
          store.updateConfiguration({
            version: protoConfig.version ?? undefined,
            features: protoConfig.features
              ? {
                  analytics: protoConfig.features.analytics ?? false,
                  notifications: protoConfig.features.notifications ?? false,
                  darkMode: protoConfig.features.darkMode ?? false,
                }
              : undefined,
            apiEndpoint: protoConfig.apiEndpoint ?? undefined,
            maxRetries: protoConfig.maxRetries ?? undefined,
          });
        }
        const updatedConfig = useAppStore.getState().config;
        return {
          callbackId,
          configuration: {
            config: {
              version: updatedConfig.version,
              features: {
                analytics: updatedConfig.features.analytics,
                notifications: updatedConfig.features.notifications,
                darkMode: updatedConfig.features.darkMode,
              },
              apiEndpoint: updatedConfig.apiEndpoint,
              maxRetries: updatedConfig.maxRetries,
            },
          },
        };
      }

      case 'getState': {
        const state = store.getState();
        return {
          callbackId,
          state: {
            counter: state.counter,
            users: state.users.map((u) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              createdAt: u.createdAt,
            })),
            config: {
              version: state.config.version,
              features: {
                analytics: state.config.features.analytics,
                notifications: state.config.features.notifications,
                darkMode: state.config.features.darkMode,
              },
              apiEndpoint: state.config.apiEndpoint,
              maxRetries: state.config.maxRetries,
            },
          },
        };
      }

      default: {
        // This should never happen if proto is in sync
        return {
          callbackId,
          error: { message: `Unknown command: ${command.command}` },
        };
      }
    }
  }

  /**
   * Cleanup
   */
  destroy(): void {
    this.isInitialized = false;
    console.log('[CommandHandler] Destroyed');
  }
}

// Export singleton instance
export const commandHandler = new CommandHandler();

// Export the native module for direct access if needed
export { CommandBridge };
