/**
 * React Native Entry Point (Headless Mode)
 *
 * This is the headless entry point for React Native.
 * It initializes the business logic runtime without rendering any UI.
 *
 * All UI is handled by Jetpack Compose in the Android native layer.
 * React Native is used purely as a JavaScript runtime for executing
 * TypeScript business logic with Zustand state management.
 */

import { AppRegistry } from 'react-native';
import { commandHandler } from './src/bridge/commandHandler';

console.log('[Index] React Native entry point loaded (headless mode)');

// Initialize the command handler to listen for Kotlin commands
commandHandler.initialize();

// Register a minimal headless "app" component
// This is required by React Native but won't render any UI
const HeadlessApp = () => {
  // Return null - no UI rendering
  return null;
};

// Register the headless component
AppRegistry.registerComponent('main', () => HeadlessApp);

console.log('[Index] Headless React Native runtime initialized');
console.log('[Index] Business logic ready (Zustand stores active)');
