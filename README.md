# Android React Native Command Bridge

A React Native New Architecture (Bridgeless) integration with **bidirectional communication** between Kotlin and TypeScript, running headlessly in a native Android app.

This demonstrates how to integrate React Native business logic into an existing Android app without any UI components, enabling you to use TypeScript for complex business logic while keeping native UI in Kotlin/Compose.

## Table of Contents

- [What This Demonstrates](#what-this-demonstrates)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Implementation Guide](#implementation-guide)
- [JavaScript Bundling](#javascript-bundling)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Key Learnings](#key-learnings)

---

## What This Demonstrates

This project showcases **bidirectional communication** between Kotlin and TypeScript:

- ✅ **Command Bridge**: Native module enabling Kotlin ↔ TypeScript communication
- ✅ **State Management**: Zustand store for business logic state in TypeScript
- ✅ **Event-Driven Architecture**: Commands sent via events, responses via callbacks
- ✅ **Lazy Initialization**: React Native loads on-demand (not in Application.onCreate)
- ✅ **Headless Mode**: RN runs without any UI/views - just JavaScript runtime
- ✅ **New Architecture**: Uses Bridgeless mode and TurboModules
- ✅ **Singleton Pattern**: Native module access works in New Architecture
- ✅ **Pre-bundled JavaScript**: No Metro server required for production

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Android Application                       │
│                                                               │
│  ┌──────────────────┐         ┌─────────────────────────┐   │
│  │  MainActivity    │         │  HeadlessReactNative    │   │
│  │  (Compose UI)    │────────▶│  Fragment               │   │
│  │                  │         │                         │   │
│  │  • Increment btn │         │  • Lazy initialization  │   │
│  │  • Decrement btn │         │  • ReactHost lifecycle  │   │
│  │  • Get Value btn │         │  • No UI components     │   │
│  └────────┬─────────┘         └────────────┬────────────┘   │
│           │                                 │                │
│           │ sendCommand()                   │                │
│           ▼                                 │                │
│  ┌─────────────────────────────────────────▼────────────┐   │
│  │         CommandBridge (Native Module)                 │   │
│  │                                                        │   │
│  │  • Singleton instance (New Architecture compatible)   │   │
│  │  • Sends events to JavaScript via DeviceEventEmitter │   │
│  │  • Registered in CommandBridgePackage                │   │
│  └────────────────────────┬──────────────────────────────┘   │
│                           │                                   │
└───────────────────────────┼───────────────────────────────────┘
                            │ Event: "CommandBridge_Command"
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              React Native JavaScript Runtime                 │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  index.js (Entry Point)                             │    │
│  │                                                       │    │
│  │  • Registers NativeEventEmitter                      │    │
│  │  • Listens for "CommandBridge_Command" events        │    │
│  │  • Routes to appropriate handler                     │    │
│  └────────────────────┬──────────────────────────────────┘    │
│                       │                                        │
│                       ▼                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  handlers.ts                                         │    │
│  │                                                       │    │
│  │  routeCommand(cmd) ─────┬─── increment()            │    │
│  │                          ├─── decrement()            │    │
│  │                          └─── getCounter()           │    │
│  └────────────────────┬──────────────────────────────────┘    │
│                       │                                        │
│                       ▼                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  appStore.ts (Zustand)                               │    │
│  │                                                       │    │
│  │  • counter: number                                   │    │
│  │  • increment() → counter++                           │    │
│  │  • decrement() → counter--                           │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Communication Flow

1. **Kotlin → TypeScript**:
   - User taps button in MainActivity
   - Calls `CommandBridge.getInstance().sendCommand("increment")`
   - Bridge emits event via `DeviceEventEmitter`
   - JavaScript receives event and routes to handler
   - Handler updates Zustand store and returns response

2. **TypeScript → Kotlin** (future):
   - TypeScript calls native module method with callback
   - Kotlin processes and invokes callback

---

## Project Structure

```
android-react-native-test/
├── skydio-android-app/                    # Native Android app
│   └── app/
│       ├── build.gradle                   # React Native config, dependencies
│       └── src/main/
│           ├── assets/
│           │   └── index.android.bundle   # Pre-bundled JavaScript (IMPORTANT!)
│           └── java/com/example/skydioandroidapp/
│               ├── MainActivity.kt         # Compose UI with command buttons
│               ├── HeadlessReactNativeFragment.kt  # Headless RN lifecycle
│               ├── MainApplication.kt      # Lazy RN initialization
│               ├── CommandBridge.kt        # Native module (singleton pattern)
│               └── CommandBridgePackage.kt # Registers native module
│
├── skydio-rn-business-logic/              # React Native JavaScript
│   ├── package.json                       # Dependencies (zustand, react-native)
│   ├── index.js                           # Entry point, event listener setup
│   └── src/
│       ├── handlers.ts                    # Command routing logic
│       └── stores/
│           └── appStore.ts                # Zustand state management
│
├── package.json                           # Workspace root dependencies
└── node_modules/                          # Shared dependencies (hoisted)
```

---

## Prerequisites

- **Android Studio**: Ladybug or newer
- **Node.js**: v20+ (`node -v`)
- **Java JDK**: 17+ (`java -version`)
- **Understanding of**: React Native basics, Kotlin, Jetpack Compose

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Bundle JavaScript (REQUIRED before building APK)
cd skydio-rn-business-logic
npx react-native bundle \
  --entry-file index.js \
  --platform android \
  --dev false \
  --bundle-output ../skydio-android-app/app/src/main/assets/index.android.bundle \
  --assets-dest ../skydio-android-app/app/src/main/res/

# 3. Build and install APK
cd ../skydio-android-app
./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk

# 4. Launch app
adb shell am start -n com.example.skydioandroidapp/.MainActivity

# 5. Monitor logs
adb logcat | grep -E "(CommandBridge|Handlers|Store)"
```

---

## Implementation Guide

Follow these steps to implement this pattern in your own Android app:

### Step 1: Set Up React Native Dependencies

**File**: `skydio-android-app/app/build.gradle`

```gradle
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.react.native)  // Add React Native plugin
}

def reactNativeVersion = "0.81.5"
def jsProjectRoot = file("$rootDir/../skydio-rn-business-logic")
def workspaceRoot = file("$rootDir/..")
def nodeModulesRoot = file("$workspaceRoot/node_modules")

android {
    defaultConfig {
        // Enable React Native New Architecture
        buildConfigField "boolean", "IS_NEW_ARCHITECTURE_ENABLED", "true"
        buildConfigField "boolean", "IS_HERMES_ENABLED", "true"
    }
}

// React Native configuration
react {
    root = jsProjectRoot
    reactNativeDir = file("$nodeModulesRoot/react-native")
    codegenDir = file("$nodeModulesRoot/@react-native/codegen")
    cliFile = file("$nodeModulesRoot/react-native/cli.js")
    entryFile = file("$jsProjectRoot/index.js")
    hermesCommand = "$nodeModulesRoot/react-native/sdks/hermesc/%OS-BIN%/hermesc"
}

dependencies {
    implementation("com.facebook.react:react-android:$reactNativeVersion")
    implementation("com.facebook.react:hermes-android:$reactNativeVersion")
}
```

### Step 2: Create Native Module (CommandBridge)

**File**: `CommandBridge.kt`

```kotlin
package com.example.skydioandroidapp

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CommandBridge(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val TAG = "CommandBridge"
        private const val MODULE_NAME = "CommandBridge"

        // Singleton instance (REQUIRED for New Architecture)
        @Volatile
        private var instance: CommandBridge? = null

        fun getInstance(): CommandBridge? = instance
    }

    init {
        Log.d(TAG, "CommandBridge native module created")
        instance = this  // Store singleton reference
    }

    override fun getName(): String = MODULE_NAME

    /**
     * Send a command from Kotlin to TypeScript.
     */
    fun sendCommand(command: String, callback: (result: Map<String, Any>?, error: String?) -> Unit) {
        val reactContext = reactApplicationContext

        if (reactContext == null || !reactContext.hasActiveReactInstance()) {
            Log.e(TAG, "React Native context not ready")
            callback(null, "React Native not initialized")
            return
        }

        try {
            Log.d(TAG, "Sending command to TypeScript: $command")

            // Emit event to TypeScript
            reactContext
                .getJSModule(com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("CommandBridge_Command", command)

            val result = mapOf("command" to command, "status" to "sent")
            callback(result, null)

        } catch (e: Exception) {
            Log.e(TAG, "Error sending command: $command", e)
            callback(null, e.message)
        }
    }
}
```

### Step 3: Register Native Module

**File**: `CommandBridgePackage.kt`

```kotlin
package com.example.skydioandroidapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class CommandBridgePackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(CommandBridge(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
```

**File**: `MainApplication.kt` (add package to getPackages())

```kotlin
override fun getPackages(): List<ReactPackage> {
    return listOf(
        MainReactPackage(),
        CommandBridgePackage()  // Register your package
    )
}
```

### Step 4: Create Headless React Native Fragment

**File**: `HeadlessReactNativeFragment.kt`

```kotlin
package com.example.skydioandroidapp

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import com.facebook.react.ReactHost
import com.facebook.react.bridge.ReactContext

class HeadlessReactNativeFragment : Fragment() {

    companion object {
        private const val TAG = "HeadlessRN"
        fun newInstance() = HeadlessReactNativeFragment()
    }

    private var reactContext: ReactContext? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate - initializing React Native")

        val app = requireActivity().application as MainApplication
        app.initializeReactNative()

        val reactHost: ReactHost = app.reactHost
        reactHost.start { context ->
            reactContext = context
            Log.d(TAG, "React Native started successfully")
        }
    }

    fun isReady(): Boolean = reactContext != null

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "onDestroy")
    }
}
```

### Step 5: Use in MainActivity

**File**: `MainActivity.kt`

```kotlin
class MainActivity : FragmentActivity() {

    private var headlessFragment: HeadlessReactNativeFragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize headless fragment
        headlessFragment = HeadlessReactNativeFragment.newInstance()
        supportFragmentManager.beginTransaction()
            .add(headlessFragment!!, "headless_rn")
            .commit()

        setContent {
            // Your Compose UI with buttons
            Button(onClick = { sendCommand("increment") }) {
                Text("Increment")
            }
        }
    }

    private fun sendCommand(command: String) {
        val bridge = CommandBridge.getInstance()
        if (bridge == null) {
            Log.e("MainActivity", "CommandBridge not available")
            return
        }

        bridge.sendCommand(command) { result, error ->
            if (error != null) {
                Log.e("MainActivity", "Command error: $error")
            } else {
                Log.d("MainActivity", "Command result: $result")
            }
        }
    }
}
```

### Step 6: TypeScript - Install Dependencies

**File**: `skydio-rn-business-logic/package.json`

```json
{
  "dependencies": {
    "react": "19.1.0",
    "react-native": "0.81.5",
    "zustand": "^5.0.2"
  }
}
```

```bash
npm install
```

### Step 7: TypeScript - Create State Store

**File**: `skydio-rn-business-logic/src/stores/appStore.ts`

```typescript
import { create } from 'zustand';

interface AppState {
  counter: number;
}

interface AppActions {
  increment: () => void;
  decrement: () => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set, get) => ({
  counter: 0,

  increment: () => {
    set((state) => ({ counter: state.counter + 1 }));
    console.log('[Store] Counter incremented:', get().counter);
  },

  decrement: () => {
    set((state) => ({ counter: Math.max(0, state.counter - 1) }));
    console.log('[Store] Counter decremented:', get().counter);
  },
}));
```

### Step 8: TypeScript - Create Command Handlers

**File**: `skydio-rn-business-logic/src/handlers.ts`

```typescript
import { useAppStore } from './stores/appStore';

export interface CommandResponse {
  status: 'success' | 'error';
  value?: number;
  error?: string;
}

export function handleIncrement(): CommandResponse {
  try {
    useAppStore.getState().increment();
    const newValue = useAppStore.getState().counter;
    console.log('[Handlers] Increment -> counter:', newValue);
    return { status: 'success', value: newValue };
  } catch (error) {
    console.error('[Handlers] Increment error:', error);
    return { status: 'error', error: String(error) };
  }
}

export function handleDecrement(): CommandResponse {
  try {
    useAppStore.getState().decrement();
    const newValue = useAppStore.getState().counter;
    console.log('[Handlers] Decrement -> counter:', newValue);
    return { status: 'success', value: newValue };
  } catch (error) {
    console.error('[Handlers] Decrement error:', error);
    return { status: 'error', error: String(error) };
  }
}

export function routeCommand(command: string): CommandResponse {
  console.log('[Handlers] Routing command:', command);

  switch (command) {
    case 'increment':
      return handleIncrement();
    case 'decrement':
      return handleDecrement();
    default:
      console.error('[Handlers] Unknown command:', command);
      return { status: 'error', error: `Unknown command: ${command}` };
  }
}
```

### Step 9: TypeScript - Wire Up Event Listener

**File**: `skydio-rn-business-logic/index.js`

```javascript
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
  });

  console.log('[Index] Command listener registered');
}

// Register a minimal headless component (required by React Native)
AppRegistry.registerComponent('main', () => () => null);

console.log('[Index] Headless runtime ready');
```

---

## JavaScript Bundling

**CRITICAL**: You must pre-bundle JavaScript before building the APK, as React Native in production mode doesn't use Metro.

### Bundle Command

```bash
cd skydio-rn-business-logic

npx react-native bundle \
  --entry-file index.js \
  --platform android \
  --dev false \
  --bundle-output ../skydio-android-app/app/src/main/assets/index.android.bundle \
  --assets-dest ../skydio-android-app/app/src/main/res/
```

### When to Re-bundle

Re-run the bundle command whenever you:
- Change any TypeScript/JavaScript code
- Modify `index.js`
- Update handlers or state stores
- Add new dependencies

### Verify Bundle Exists

```bash
ls -lh skydio-android-app/app/src/main/assets/index.android.bundle
```

You should see a file (typically 200-500KB).

---

## Testing

### Launch and Monitor

```bash
# Install and launch
cd skydio-android-app
./gradlew installDebug
adb shell am start -n com.example.skydioandroidapp/.MainActivity

# Monitor all relevant logs
adb logcat | grep -E "(CommandBridge|Handlers|Store|MainActivity)"

# Or monitor just React Native JavaScript
adb logcat -s ReactNativeJS:I
```

### What Success Looks Like

When you tap the "Increment" button, you should see:

```
MainActivity: Attempting to get CommandBridge...
MainActivity: CommandBridge acquired from singleton successfully
MainActivity: Sending command: increment
CommandBridge: Sending command to TypeScript: increment
MainActivity: Command result: {command=increment, status=sent}
ReactNativeJS: [Handlers] Routing command: 'increment'
ReactNativeJS: [Store] Counter incremented: 1
ReactNativeJS: [Handlers] Increment -> counter: 1
```

### Verify State Persistence

1. Tap "Increment" 3 times → Counter should be at 3
2. Tap "Decrement" 1 time → Counter should be at 2
3. All state lives in Zustand store and persists across commands

---

## Troubleshooting & Common Pitfalls

### Debugging Techniques

#### 1. Enable Comprehensive Logging

```bash
# Monitor all relevant logs in real-time
adb logcat | grep -E "(CommandBridge|Handlers|Store|MainActivity|ReactNative|ReactHost)"

# Monitor only JavaScript logs
adb logcat -s ReactNativeJS:I

# Monitor with timestamps
adb logcat -v time | grep -E "(CommandBridge|Handlers)"

# Save logs to file for analysis
adb logcat > app_logs.txt
```

#### 2. Verify Each Layer

**Step 1: Check React Native initialized**
```bash
adb logcat | grep "React Native"
```
Look for: `React Native started successfully`

**Step 2: Check JavaScript bundle loaded**
```bash
adb logcat | grep "ReactNativeJS"
```
Look for: `[Index] React Native entry point loaded`

**Step 3: Check CommandBridge created**
```bash
adb logcat | grep "CommandBridge"
```
Look for: `CommandBridge native module created`

**Step 4: Check event listener registered**
```bash
adb logcat | grep "Command listener"
```
Look for: `[Index] Command listener registered`

#### 3. Verify Bundle Contents

```bash
# Check bundle exists and has content
ls -lh skydio-android-app/app/src/main/assets/index.android.bundle

# Should be 200KB-500KB, not 0 bytes
```

#### 4. Check APK Contents

```bash
# Extract APK and verify bundle is included
unzip -l app/build/outputs/apk/debug/app-debug.apk | grep index.android.bundle

# Should show: assets/index.android.bundle
```

### Common Issues

#### Issue 1: "CommandBridge not available"

**Symptoms**:
```
MainActivity: CommandBridge not available
```

**Root Causes**:
1. React Native still initializing (timing issue)
2. Singleton not set (forgot `instance = this` in init block)
3. React Native failed to start entirely

**Debug Steps**:
```bash
# Check if React Native started
adb logcat -d | grep "React Native started"

# Check if CommandBridge was created
adb logcat -d | grep "CommandBridge native module created"

# Check singleton assignment
adb logcat -d | grep "CommandBridge" | head -20
```

**Solutions**:

**Solution A**: Wait for initialization
```kotlin
private fun sendCommand(command: String) {
    // Check if ready before sending
    if (headlessFragment?.isReady() != true) {
        Log.w(TAG, "Waiting for React Native to initialize...")
        return
    }

    val bridge = CommandBridge.getInstance()
    // ...
}
```

**Solution B**: Verify singleton pattern in CommandBridge.kt
```kotlin
init {
    Log.d(TAG, "CommandBridge native module created")
    instance = this  // CRITICAL - don't forget this!
}
```

**Solution C**: Add retry logic
```kotlin
private fun sendCommandWithRetry(command: String, maxRetries: Int = 3) {
    var bridge = CommandBridge.getInstance()
    var retries = 0

    while (bridge == null && retries < maxRetries) {
        Thread.sleep(100)
        bridge = CommandBridge.getInstance()
        retries++
    }

    if (bridge == null) {
        Log.e(TAG, "CommandBridge unavailable after $maxRetries retries")
        return
    }

    bridge.sendCommand(command) { result, error -> /* ... */ }
}
```

#### Issue 2: "CommandBridge native module not found!"

**Symptoms**:
```
ReactNativeJS: [Index] CommandBridge native module not found!
```

**Root Cause**: Package not registered in MainApplication

**Debug Steps**:
```bash
# Check if package is being created
adb logcat -d | grep "CommandBridgePackage"

# Should see: "createNativeModules() called, creating CommandBridge"
```

**Solution**: Verify MainApplication.kt
```kotlin
override fun getPackages(): List<ReactPackage> {
    return listOf(
        MainReactPackage(),
        CommandBridgePackage()  // MUST be here!
    )
}
```

#### Issue 3: "Unable to load script" / Bundle Not Found

**Symptoms**:
```
ReactHost: Unable to load script.
Make sure you're running Metro or that your bundle 'index.android.bundle' is packaged correctly
```

**Root Cause**: JavaScript not bundled or bundle is stale

**Debug Steps**:
```bash
# Check if bundle exists
ls -lh skydio-android-app/app/src/main/assets/index.android.bundle

# If file doesn't exist or is 0 bytes - REBUILD IT

# Check when bundle was last modified
stat skydio-android-app/app/src/main/assets/index.android.bundle

# Check if bundle is in APK
cd skydio-android-app
./gradlew assembleDebug
unzip -l app/build/outputs/apk/debug/app-debug.apk | grep index.android.bundle
```

**Solution**:
```bash
# 1. Clean old bundle
rm -f skydio-android-app/app/src/main/assets/index.android.bundle

# 2. Create assets directory if missing
mkdir -p skydio-android-app/app/src/main/assets

# 3. Re-bundle JavaScript
cd skydio-rn-business-logic
npx react-native bundle \
  --entry-file index.js \
  --platform android \
  --dev false \
  --bundle-output ../skydio-android-app/app/src/main/assets/index.android.bundle \
  --assets-dest ../skydio-android-app/app/src/main/res/

# 4. Verify bundle was created
ls -lh ../skydio-android-app/app/src/main/assets/index.android.bundle

# 5. Clean rebuild
cd ../skydio-android-app
./gradlew clean assembleDebug
```

#### Issue 4: JavaScript Changes Not Reflected

**Symptoms**: Changed TypeScript code but app still runs old version

**Root Cause**: **Forgot to re-bundle!** This is the #1 most common mistake.

**The Pitfall**:
```bash
# ❌ WRONG - changed handlers.ts but didn't rebundle
vim skydio-rn-business-logic/src/handlers.ts
cd skydio-android-app
./gradlew assembleDebug  # Uses OLD bundle!

# ✅ CORRECT - always rebundle first
vim skydio-rn-business-logic/src/handlers.ts
cd skydio-rn-business-logic
npx react-native bundle ...  # Create NEW bundle
cd ../skydio-android-app
./gradlew assembleDebug  # Uses NEW bundle
```

**Solution**: Create a helper script

**File**: `rebuild.sh`
```bash
#!/bin/bash
set -e

echo "📦 Bundling JavaScript..."
cd skydio-rn-business-logic
npx react-native bundle \
  --entry-file index.js \
  --platform android \
  --dev false \
  --bundle-output ../skydio-android-app/app/src/main/assets/index.android.bundle \
  --assets-dest ../skydio-android-app/app/src/main/res/

echo "🔨 Building APK..."
cd ../skydio-android-app
./gradlew assembleDebug

echo "📱 Installing..."
adb install -r app/build/outputs/apk/debug/app-debug.apk

echo "✅ Done! Launching app..."
adb shell am start -n com.example.skydioandroidapp/.MainActivity
```

```bash
chmod +x rebuild.sh
./rebuild.sh  # One command to rebundle + rebuild + install
```

#### Issue 5: Commands Not Reaching TypeScript

**Symptoms**: Kotlin logs show command sent, but no JavaScript logs

**Debug Steps**:
```bash
# Check if event listener is registered
adb logcat -d | grep "Command listener registered"

# Check if JavaScript is receiving ANY events
adb logcat -d | grep "Received command from native"

# Check event emitter warnings
adb logcat -d | grep "NativeEventEmitter"
```

**Root Causes**:

**Cause A**: Wrong event name
```kotlin
// ❌ WRONG
.emit("CommandBridge", command)

// ✅ CORRECT
.emit("CommandBridge_Command", command)
```

**Cause B**: Event listener not registered
```javascript
// Check index.js has this:
const eventEmitter = new NativeEventEmitter(CommandBridge);
eventEmitter.addListener('CommandBridge_Command', (command) => {
  console.log('[Index] Received command from native:', command);
  // ...
});
```

**Cause C**: JavaScript bundle is old (didn't rebundle after adding listener)

**Solution**: Verify event names match exactly:

**CommandBridge.kt**:
```kotlin
.emit("CommandBridge_Command", command)
```

**index.js**:
```javascript
eventEmitter.addListener('CommandBridge_Command', (command) => {
  // Must match exactly!
});
```

#### Issue 6: State Not Updating

**Symptoms**: Commands execute but Zustand state doesn't change

**Debug Steps**:
```bash
# Check if handlers are being called
adb logcat -d | grep "Handlers"

# Check if store methods are being called
adb logcat -d | grep "Store"

# Look for JavaScript errors
adb logcat -d | grep -E "(Error|Exception)" | grep ReactNativeJS
```

**Root Causes**:

**Cause A**: Forgot to call setState
```typescript
// ❌ WRONG
export function handleIncrement(): CommandResponse {
  const counter = useAppStore.getState().counter;
  counter++;  // This doesn't work!
  return { status: 'success', value: counter };
}

// ✅ CORRECT
export function handleIncrement(): CommandResponse {
  useAppStore.getState().increment();  // Calls set() internally
  const newValue = useAppStore.getState().counter;
  return { status: 'success', value: newValue };
}
```

**Cause B**: Direct state mutation
```typescript
// ❌ WRONG
set({ counter: state.counter++ });  // Mutates state!

// ✅ CORRECT
set((state) => ({ counter: state.counter + 1 }));  // New object
```

#### Issue 7: App Crashes on Command

**Symptoms**: App crashes when button is tapped

**Debug Steps**:
```bash
# Get crash stack trace
adb logcat -d | grep -A 50 "FATAL EXCEPTION"

# Check for null pointer exceptions
adb logcat -d | grep "NullPointerException"

# Check for JavaScript errors
adb logcat -d | grep "ReactNativeJS" | grep -i error
```

**Common Causes**:

**Cause A**: Accessing null reactContext
```kotlin
// ❌ WRONG
fun sendCommand(command: String, callback: (...) -> Unit) {
    reactContext.getJSModule(...)  // Might be null!
}

// ✅ CORRECT
fun sendCommand(command: String, callback: (...) -> Unit) {
    val reactContext = reactApplicationContext

    if (reactContext == null || !reactContext.hasActiveReactInstance()) {
        callback(null, "React Native not initialized")
        return
    }

    reactContext.getJSModule(...)
}
```

**Cause B**: UI thread blocking
```kotlin
// ❌ WRONG - blocks UI thread
bridge.sendCommand("longRunningTask") { result, error ->
    Thread.sleep(5000)  // NEVER do this!
}

// ✅ CORRECT - use coroutine or background thread
lifecycleScope.launch {
    withContext(Dispatchers.IO) {
        // Long running work
    }
}
```

#### Issue 8: Build Failures

**Symptoms**: Gradle build fails

**Common Causes & Solutions**:

**Cause A**: Gradle cache corruption
```bash
cd skydio-android-app
./gradlew clean
./gradlew --stop
rm -rf .gradle
./gradlew assembleDebug
```

**Cause B**: Node modules corruption
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

**Cause C**: Missing assets directory
```bash
mkdir -p skydio-android-app/app/src/main/assets
```

**Cause D**: Hermes compilation error
```bash
# Check if bundle has syntax errors
cd skydio-rn-business-logic
npx react-native bundle \
  --entry-file index.js \
  --platform android \
  --dev false \
  --bundle-output test.bundle

# If this fails, you have JavaScript syntax errors
```

#### Issue 9: Memory Leaks

**Symptoms**: App gets slower over time, memory usage increases

**Root Cause**: Event listeners not cleaned up

**Solution**: Clean up in fragment/activity lifecycle
```kotlin
class HeadlessReactNativeFragment : Fragment() {

    override fun onDestroy() {
        super.onDestroy()

        // Clear singleton reference
        CommandBridge.clearInstance()

        // Destroy React Native
        val app = requireActivity().application as MainApplication
        // Clean up ReactHost if needed
    }
}
```

**In CommandBridge.kt**:
```kotlin
companion object {
    @Volatile
    private var instance: CommandBridge? = null

    fun getInstance(): CommandBridge? = instance

    fun clearInstance() {
        instance = null
    }
}
```

### Debugging Checklist

When commands aren't working, verify in this order:

- [ ] **1. React Native started**: `adb logcat -d | grep "React Native started successfully"`
- [ ] **2. JavaScript loaded**: `adb logcat -d | grep "\[Index\] React Native entry point loaded"`
- [ ] **3. CommandBridge created**: `adb logcat -d | grep "CommandBridge native module created"`
- [ ] **4. Event listener registered**: `adb logcat -d | grep "Command listener registered"`
- [ ] **5. Bundle is recent**: `ls -lh skydio-android-app/app/src/main/assets/index.android.bundle`
- [ ] **6. Singleton working**: `adb logcat -d | grep "CommandBridge acquired from singleton"`
- [ ] **7. Events emitting**: `adb logcat -d | grep "Sending command to TypeScript"`
- [ ] **8. Events received**: `adb logcat -d | grep "Received command from native"`
- [ ] **9. Handlers called**: `adb logcat -d | grep "Routing command"`
- [ ] **10. State updated**: `adb logcat -d | grep "Counter incremented"`

### Performance Tips

#### 1. Minimize Command Overhead

```kotlin
// ❌ SLOW - creates new callback every time
Button(onClick = {
    bridge.sendCommand("increment") { result, error ->
        Log.d(TAG, "Result: $result")
    }
}) { Text("Increment") }

// ✅ FASTER - reuse callback
private val commandCallback: (Map<String, Any>?, String?) -> Unit = { result, error ->
    if (error != null) Log.e(TAG, "Error: $error")
    else Log.d(TAG, "Result: $result")
}

Button(onClick = {
    bridge.sendCommand("increment", commandCallback)
}) { Text("Increment") }
```

#### 2. Batch Commands

```kotlin
// ❌ INEFFICIENT - 3 separate events
bridge.sendCommand("increment", callback)
bridge.sendCommand("increment", callback)
bridge.sendCommand("increment", callback)

// ✅ EFFICIENT - single command
bridge.sendCommand("incrementBy:3", callback)
```

Then in TypeScript:
```typescript
case 'incrementBy':
  const parts = command.split(':');
  const amount = parseInt(parts[1]);
  for (let i = 0; i < amount; i++) {
    useAppStore.getState().increment();
  }
  break;
```

#### 3. Avoid Logging in Production

```typescript
// ❌ SLOW - logs every command
console.log('[Handlers] Routing command:', command);

// ✅ FAST - only in development
if (__DEV__) {
  console.log('[Handlers] Routing command:', command);
}
```

---

## Key Learnings

### 1. New Architecture Requires Singleton Pattern

In React Native's **New Architecture (Bridgeless mode)**, `reactContext.getNativeModule()` doesn't work reliably. The solution is to use a **singleton pattern**:

```kotlin
companion object {
    @Volatile
    private var instance: CommandBridge? = null
    fun getInstance(): CommandBridge? = instance
}

init {
    instance = this  // Store reference when created
}
```

Then access via:
```kotlin
val bridge = CommandBridge.getInstance()
```

### 2. Pre-bundle JavaScript for Production

React Native in production mode **doesn't use Metro**. You must pre-bundle JavaScript:

```bash
npx react-native bundle --entry-file index.js --platform android ...
```

The bundle goes to `app/src/main/assets/index.android.bundle`.

### 3. Lazy Initialization Saves Startup Time

Don't initialize React Native in `Application.onCreate()`. Instead:
- Create it lazily when `HeadlessReactNativeFragment` is first added
- Reduces app startup time by 100-300ms
- React Native only loads if/when needed

### 4. Event-Driven Communication

Use `DeviceEventEmitter` for Kotlin → TypeScript:

**Kotlin**:
```kotlin
reactContext.getJSModule(RCTDeviceEventEmitter::class.java)
    .emit("CommandBridge_Command", command)
```

**TypeScript**:
```javascript
const eventEmitter = new NativeEventEmitter(CommandBridge);
eventEmitter.addListener('CommandBridge_Command', (command) => {
  // Handle command
});
```

### 5. Zustand for State Management

Zustand is perfect for headless React Native:
- No React components needed
- Lightweight (1KB)
- Direct state access via `useAppStore.getState()`
- Built-in TypeScript support

### 6. Headless Mode = No UI

In headless mode:
- ❌ No React components
- ❌ No views or layout
- ✅ JavaScript runtime only
- ✅ State management
- ✅ Business logic
- ✅ Native module calls

---

## Advanced: Adding New Commands

### 1. Add handler in TypeScript

**File**: `handlers.ts`

```typescript
export function handleResetCounter(): CommandResponse {
  useAppStore.setState({ counter: 0 });
  return { status: 'success', value: 0 };
}

// Update router
export function routeCommand(command: string): CommandResponse {
  switch (command) {
    case 'increment': return handleIncrement();
    case 'decrement': return handleDecrement();
    case 'reset': return handleResetCounter();  // NEW
    default: return { status: 'error', error: `Unknown: ${command}` };
  }
}
```

### 2. Call from Kotlin

```kotlin
Button(onClick = { sendCommand("reset") }) {
    Text("Reset")
}
```

### 3. Re-bundle and rebuild

```bash
cd skydio-rn-business-logic
npx react-native bundle ...
cd ../skydio-android-app
./gradlew assembleDebug
```

---

## Tech Stack

- **Android**: Kotlin 2.1.20, Jetpack Compose, Hilt
- **React Native**: 0.81.5 with New Architecture (Bridgeless)
- **JavaScript Engine**: Hermes (optimized bytecode)
- **State Management**: Zustand 5.0.2
- **Build**: Gradle 8.13 with React Native Gradle Plugin

---

## Next Steps

To implement in your secondary app:

1. ✅ Copy `CommandBridge.kt`, `CommandBridgePackage.kt`, `HeadlessReactNativeFragment.kt`
2. ✅ Update `build.gradle` with React Native config
3. ✅ Create your TypeScript business logic in `src/`
4. ✅ Set up Zustand stores for your state
5. ✅ Create handlers for your specific commands
6. ✅ Wire up `index.js` with event listeners
7. ✅ Bundle JavaScript before every build
8. ✅ Test end-to-end with `adb logcat`

**Remember**: Every time you change TypeScript code, re-run the bundle command!

---

## License

MIT
