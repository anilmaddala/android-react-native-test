/**
 * Headless React Native Entry Point
 *
 * This module initializes React Native in headless mode, meaning it only
 * executes business logic without rendering any UI.
 *
 * The entry point:
 * 1. Initializes the native bridge for Kotlin communication
 * 2. Registers all business logic command handlers
 * 3. Notifies Kotlin that the runtime is ready
 */

import { AppRegistry } from 'react-native';
import { NativeBridge } from './bridge/NativeBridge';
import { registerBusinessLogicCommands } from './business/BusinessLogic';

console.log('[Headless] Starting headless React Native runtime...');

// Initialize the native bridge
NativeBridge.initialize();

// Register all business logic commands
registerBusinessLogicCommands();

// Register a minimal headless "app" component
// This is required by React Native but won't render any UI
const HeadlessApp = () => {
  // Return null - no UI rendering
  return null;
};

// Register the headless component
AppRegistry.registerComponent('main', () => HeadlessApp);

console.log('[Headless] Headless React Native runtime initialized');

// Export for potential direct imports
export { NativeBridge } from './bridge/NativeBridge';
export { registerBusinessLogicCommands } from './business/BusinessLogic';
