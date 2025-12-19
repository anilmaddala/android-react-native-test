/**
 * React Native Entry Point (Headless Mode)
 *
 * This is the headless entry point for React Native.
 * It initializes the business logic runtime and sets up command handling.
 */

import { AppRegistry, NativeModules, NativeEventEmitter } from 'react-native';
import { routeCommand } from './src/handlers';

console.log('[Index] React Native entry point loaded');

// Get the CommandBridge native module
const { CommandBridge } = NativeModules;

if (!CommandBridge) {
  console.error('[Index] CommandBridge native module not found!');
} else {
  console.log('[Index] CommandBridge native module loaded');

  // Set up event listener for commands from native side
  const eventEmitter = new NativeEventEmitter(CommandBridge);
  eventEmitter.addListener('CommandBridge_Command', (command) => {
    console.log('[Index] Received command from native:', command);

    // Route the command to the appropriate handler
    const response = routeCommand(command);
    console.log('[Index] Command response:', response);

    // For now, just log the response
    // In a more complete implementation, we'd send this back to native
  });

  console.log('[Index] Command listener registered');
}

// Register a minimal headless component (required by React Native)
AppRegistry.registerComponent('main', () => () => null);

console.log('[Index] Headless runtime ready');
