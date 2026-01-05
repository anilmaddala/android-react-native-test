/**
 * React Native Entry Point (Headless Mode)
 *
 * This is the headless entry point for React Native.
 * It initializes the business logic runtime without rendering any UI.
 */

import { AppRegistry } from 'react-native';
import { commandHandler } from './src/generated/commandHandler';
import { handlers } from './src/handlers';

console.log('[Index] React Native entry point loaded');

// Initialize the command handler with business logic handlers
commandHandler.initialize(handlers);

// Register a minimal headless component (required by React Native)
AppRegistry.registerComponent('main', () => () => null);

console.log('[Index] Headless runtime ready');
