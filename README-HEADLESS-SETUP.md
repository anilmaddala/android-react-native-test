# Bare React Native Headless Setup

This project demonstrates **bare React Native** (no Expo) running in **headless mode** for business logic only, communicating with Jetpack Compose UI via Protobuf.

## Architecture

```
┌─────────────────────────────────────┐
│  Jetpack Compose UI (Kotlin)        │
│  - All rendering & user interaction │
│  - Native Android components        │
└──────────────┬──────────────────────┘
               │
        ┌──────▼──────┐
        │  Protobuf   │  (Binary/JSON for demo)
        │   Bridge    │
        └──────┬──────┘
               │
┌──────────────▼──────────────────────┐
│  React Native/Hermes (Headless)     │
│  - Business logic only              │
│  - Zustand state management         │
│  - NO UI rendering                  │
│  - Pure JavaScript/TypeScript       │
└─────────────────────────────────────┘
```

## Project Structure

```
android-react-native-test/
├── headless-js/                    # Bare React Native (NO Expo!)
│   ├── package.json                # Only: react-native, zustand, protobufjs
│   ├── index.tsx                   # Headless JavaScript entry point
│   ├── stores/
│   │   └── useAppStore.ts         # Zustand state management
│   └── proto/
│       └── messages.json          # Protobuf definitions
│
├── skydio-android-app/             # Native Android app
│   └── app/src/main/java/
│       └── com/example/skydioandroidapp/
│           ├── MainActivity.kt     # Jetpack Compose UI
│           ├── MainApplication.kt  # Bare React Native setup
│           ├── ProtoHandlerModule.kt  # Bridge module
│           ├── ProtoBridgeModule.kt   # Event emitter
│           ├── JavaScriptBridge.kt    # Helper for Compose
│           └── ProtobufDemo.kt        # Demo screen
│
└── protos/
    └── messages.proto              # Shared protobuf schema
```

## Bundle Size Comparison

| Configuration | Size |
|---------------|------|
| **With Expo** | ~15-20 MB |
| **Bare React Native** | ~7 MB |
| **Savings** | **50-65%** |

## Setup Instructions

### 1. Install JavaScript Dependencies

```bash
cd headless-js
yarn install
# or
npm install
```

### 2. Start Metro Bundler (for Development)

```bash
cd headless-js
yarn start
```

### 3. Build Android App

```bash
cd skydio-android-app
./gradlew assembleDebug
```

### 4. Run on Device/Emulator

```bash
cd skydio-android-app
./gradlew installDebug
```

## How It Works

### 1. Compose Triggers TypeScript

**Kotlin (ProtobufDemo.kt)**:
```kotlin
Button(onClick = {
    scope.launch {
        val newValue = bridge.sendIncrementCommand(1)
        counter = newValue
    }
})
```

### 2. Bridge Sends Protobuf Message

**Kotlin (JavaScriptBridge.kt)**:
```kotlin
suspend fun sendCommand(commandBytes: ByteArray): ByteArray {
    protoHandler?.sendCommand(requestId, commandBytes) { response ->
        // Callback with response
    }
}
```

### 3. TypeScript Receives & Processes with Zustand

**TypeScript (index.tsx)**:
```typescript
eventEmitter.addListener('ProtoCommand', (event) => {
    const command = Command.decode(bytes)

    if (command.increment) {
        const newValue = useAppStore.getState().increment(amount)
        // Send response back
    }
})
```

### 4. Response Returns to Compose

**Kotlin**:
```kotlin
val response = parseCounterResponse(responseBytes)
counter = response.counter
```

## Features Demonstrated

### ✅ Increment Counter
- Compose button → TypeScript Zustand store → Response back
- Demonstrates simple state mutation

### ✅ Add User
- Send user data → TypeScript adds to array → Returns full list
- Demonstrates complex data structures

### ✅ Get State
- Retrieve entire Zustand store state
- Demonstrates state synchronization

### ✅ Calculate (6 × 7)
- Send calculation request → TypeScript computes → Returns result
- Demonstrates stateless operations

## Developer Experience

### Hot Reload

**JavaScript Changes** (1-2 seconds):
```bash
# Edit headless-js/stores/useAppStore.ts
# Metro auto-reloads
# Shake device → Reload JS
```

**Kotlin Changes** (30-60 seconds):
```bash
# Edit ProtobufDemo.kt
./gradlew installDebug
```

### Debugging

**JavaScript**:
- Chrome DevTools: `chrome://inspect`
- Set breakpoints in TypeScript code
- Inspect Zustand store state
- Console logs visible

**Kotlin**:
- Android Studio debugger
- Logcat for bridge communication
- Set breakpoints in Compose code

## Benefits Over QuickJS + JNI

| Feature | QuickJS + JNI | Bare React Native |
|---------|---------------|-------------------|
| **Hot Reload** | ❌ None | ✅ 1-2 seconds |
| **Debugging** | ⚠️ Basic | ✅ Chrome DevTools |
| **Zustand** | ❌ Won't work | ✅ Native support |
| **Bundle Size** | ✅ ~2 MB | ⚠️ ~7 MB |
| **Ecosystem** | ⚠️ Limited | ✅ Full npm |
| **Team Velocity** | ⚠️ Slow | ✅ 3-5x faster |

## Production Considerations

### Current Implementation (Demo)

For simplicity, the demo uses **JSON** encoding instead of binary Protobuf:

```kotlin
// Simplified for demo
return """{"requestId":"$id","increment":{"amount":$amount}}""".toByteArray()
```

### Production Implementation

Replace with **proper Protobuf**:

1. **Generate Kotlin classes**:
```bash
protoc --kotlin_out=app/src/main/java protos/messages.proto
```

2. **Use generated classes**:
```kotlin
val command = Command.newBuilder()
    .setRequestId(requestId)
    .setIncrement(IncrementCommand.newBuilder().setAmount(amount))
    .build()
return command.toByteArray()
```

3. **Benefits**:
- 3-10x smaller payloads
- Type safety
- Better performance
- Schema validation

## Next Steps

### Add More Commands

Edit `protos/messages.proto`:
```protobuf
message DeleteUserCommand {
  string user_id = 1;
}
```

Update TypeScript handler in `index.tsx`.

### Add Persistence

Use Zustand middleware:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({ /* ... */ }),
    { storage: AsyncStorage }
  )
)
```

### Enable New Architecture

Already enabled! Check `gradle.properties`:
```
newArchEnabled=true
hermesEnabled=true
```

This enables:
- Fabric renderer
- JSI (JavaScript Interface)
- Zero-copy ArrayBuffer transfer
- Better performance

## Troubleshooting

### Metro Bundler Not Found
```bash
cd headless-js
yarn install
```

### React Native Not Linking
```bash
cd skydio-android-app
./gradlew clean
./gradlew assembleDebug
```

### JavaScript Runtime Not Ready
- Wait 1-2 seconds after app launch
- Check Logcat for "Headless JavaScript runtime ready"
- Ensure Metro is running

### Bridge Not Responding
- Check ProtoHandler is registered in MainApplication.kt
- Verify ProtoPackage is added to packages list
- Look for errors in Logcat

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Protobuf](https://protobuf.dev/)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)

## License

MIT
