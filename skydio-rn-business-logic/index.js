/**
 * BARE MINIMUM React Native Test
 *
 * This is the absolute minimal setup to test if React Native
 * New Architecture (Bridgeless) is working correctly.
 *
 * If this works, PlatformConstants and all core TurboModules are loading.
 */

import { AppRegistry } from 'react-native';

console.log('[BARE MINIMUM TEST] React Native loaded successfully!');
console.log('[BARE MINIMUM TEST] If you see this, JS runtime is working');

// Minimal headless component (required by React Native)
AppRegistry.registerComponent('main', () => () => null);

console.log('[BARE MINIMUM TEST] Runtime ready - no errors means success!');
