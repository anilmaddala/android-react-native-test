/**
 * Headless React Native Entry Point
 *
 * This module initializes React Native in headless mode for business logic only.
 *
 * Architecture:
 * - Business logic lives in TypeScript using Zustand stores
 * - Kotlin sends commands via CommandBridge events
 * - TypeScript processes commands and sends responses back
 * - All UI is rendered by Jetpack Compose
 */

import { AppRegistry } from 'react-native';
import { commandHandler } from './bridge/commandHandler';

console.log('[Headless] Starting headless React Native runtime...');

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

console.log('[Headless] Headless React Native runtime initialized');
console.log('[Headless] Business logic ready (Zustand stores active)');

// Re-export for convenience
export { useAppStore } from './stores/appStore';
export { commandHandler, CommandBridge } from './bridge/commandHandler';
