/**
 * React Native Entry Point (Headless Mode)
 *
 * This is the headless entry point for React Native.
 * It initializes the business logic runtime and sets up command handling
 * using the generated command handler.
 */

import { AppRegistry } from 'react-native';
import { initializeCommandHandler } from './src/generated/commandHandler';
import { handlers } from './src/handlers';

console.log('[Index] React Native entry point loaded');

// Initialize command handling with our handlers
initializeCommandHandler(handlers);

// Register a minimal headless component (required by React Native)
AppRegistry.registerComponent('main', () => () => null);

console.log('[Index] Headless runtime ready');
