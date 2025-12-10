/**
 * React Native Entry Point
 *
 * This is the headless entry point for React Native.
 * It initializes the business logic runtime without rendering any UI.
 *
 * All UI is handled by Jetpack Compose in the Android native layer.
 * React Native is used purely for executing TypeScript business logic.
 */

// Import and initialize the headless runtime
import './src/headless';

console.log('[Index] React Native entry point loaded (headless mode)');
