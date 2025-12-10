/**
 * Headless React Native Entry Point
 *
 * This module initializes React Native in headless mode, meaning it only
 * executes business logic without rendering any UI.
 *
 * With Expo Modules API, the business logic is defined in Kotlin and
 * automatically exposed to TypeScript - no manual bridge code needed!
 */

import { AppRegistry } from 'react-native';

console.log('[Headless] Starting headless React Native runtime...');

// Register a minimal headless "app" component
// This is required by React Native but won't render any UI
const HeadlessApp = () => {
  // Return null - no UI rendering
  return null;
};

// Register the headless component
AppRegistry.registerComponent('main', () => HeadlessApp);

console.log('[Headless] Headless React Native runtime initialized');

// Re-export the BusinessLogic module for convenience
export { default as BusinessLogic } from '../modules/business-logic';
