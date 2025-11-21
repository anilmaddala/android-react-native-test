/**
 * Headless React Native JavaScript Runtime
 * This runs business logic only - NO UI rendering
 */

import { AppRegistry, NativeModules, NativeEventEmitter } from 'react-native';
import protobuf from 'protobufjs';
import { useAppStore } from './stores/useAppStore';
import protoJson from './proto/messages.json';

// Load protobuf types
const root = protobuf.Root.fromJSON(protoJson);
const Command = root.lookupType('app.Command');
const Response = root.lookupType('app.Response');

console.log('🚀 Initializing headless JavaScript runtime...');

// Create event emitter for native communication
const eventEmitter = new NativeEventEmitter(NativeModules.ProtoBridge);

// Listen for commands from Kotlin/Compose
eventEmitter.addListener('ProtoCommand', (event: { data: string }) => {
  try {
    console.log('📩 Received command from Kotlin');

    // Decode base64 to Uint8Array
    const binaryString = atob(event.data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Decode protobuf command
    const command = Command.decode(bytes) as any;
    console.log('📦 Decoded command:', JSON.stringify(command, null, 2));

    // Process command with Zustand store
    let responseData: any = {};
    let success = true;
    let error = '';

    try {
      if (command.increment) {
        const amount = command.increment.amount || 1;
        const newValue = useAppStore.getState().increment(amount);
        responseData = {
          counter: {
            newValue: newValue,
          },
        };
      } else if (command.addUser) {
        const { name, email, age } = command.addUser;
        const users = useAppStore.getState().addUser(name, email, age || 0);
        responseData = {
          userList: {
            users: users.map((u) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              age: u.age,
              createdAt: u.createdAt,
            })),
            totalCount: users.length,
          },
        };
      } else if (command.getState) {
        const state = useAppStore.getState().getState();
        responseData = {
          state: {
            counter: state.counter,
            users: state.users.map((u) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              age: u.age,
              createdAt: u.createdAt,
            })),
            lastUpdated: state.lastUpdated,
          },
        };
      } else if (command.multiply) {
        const { a, b } = command.multiply;
        const result = useAppStore.getState().multiply(a || 0, b || 0);
        responseData = {
          calculation: {
            result: result,
          },
        };
      } else {
        success = false;
        error = 'Unknown command type';
      }
    } catch (err) {
      success = false;
      error = err instanceof Error ? err.message : 'Unknown error';
      console.error('❌ Error processing command:', err);
    }

    // Create response
    const response = Response.create({
      requestId: command.requestId,
      success: success,
      error: error,
      ...responseData,
    });

    // Encode to protobuf
    const responseBytes = Response.encode(response).finish();

    // Convert to base64 for bridge transfer
    const responseBase64 = btoa(
      String.fromCharCode(...Array.from(responseBytes))
    );

    console.log('📤 Sending response back to Kotlin');

    // Send response back to Kotlin
    NativeModules.ProtoHandler?.sendResponse(
      command.requestId,
      responseBase64
    );
  } catch (err) {
    console.error('❌ Error handling command:', err);
  }
});

// Register headless component (required by React Native, but renders nothing)
AppRegistry.registerComponent('HeadlessJS', () => {
  return () => null; // No UI
});

console.log('✅ Headless JavaScript runtime ready with Zustand + Protobuf');
console.log('📊 Initial state:', useAppStore.getState());
