# Android React Native Brownfield Integration

A native Android app with React Native embedded as a headless fragment for business logic.

## Project Structure

```
├── skydio-android-app/       # Native Android app (Kotlin + Jetpack Compose)
├── skydio-rn-business-logic/ # TypeScript/React Native business logic
├── proto/                    # Protocol Buffer definitions
├── scripts/                  # Code generation scripts
├── bridge.yaml               # Bridge generator configuration
└── node_modules/             # Shared dependencies (npm workspaces)
```

## Architecture

- **Native UI**: Jetpack Compose for all user interface
- **Business Logic**: React Native runs headlessly in a fragment
- **Communication**: Protocol Buffers for type-safe native ↔ JS messaging
- **Code Generation**: Bridge code auto-generated from proto definitions

## Prerequisites

- Android Studio
- Node.js v20+ (`node -v`)
- Java JDK 17+ (`java -version`)

## Build

Gradle handles everything automatically:

```bash
cd skydio-android-app
./gradlew assembleDebug
```

This will automatically:
1. Install npm dependencies
2. Generate protobuf files (JS and Kotlin)
3. Generate bridge code (Kotlin and TypeScript)
4. Bundle React Native JavaScript
5. Build the Android APK

### Clean Build

```bash
./gradlew clean assembleDebug
```

## Adding New Commands

1. **Edit `proto/commands.proto`** - Add service RPC and messages:
   ```protobuf
   service CounterService {
     rpc NewCommand(NewRequest) returns (NewResponse);
   }

   message NewRequest { ... }
   message NewResponse { ... }
   ```

2. **Edit `src/handlers.ts`** - Add business logic:
   ```typescript
   export const handlers: CommandHandlers = {
     newCommand: (args) => {
       // Your business logic here
       return { result };
     },
   };
   ```

3. **Build** - `./gradlew assembleDebug`

## Configuration

Bridge code generation is configured in `bridge.yaml`:

```yaml
proto:
  file: proto/commands.proto

kotlin:
  package: com.example.skydioandroidapp.generated
  out_dir: skydio-android-app/app/src/main/java
  class_name: CommandBridge
  proto_package: com.example.skydioandroidapp.proto

typescript:
  out_dir: skydio-rn-business-logic/src/generated
  module_name: commandHandler
  proto_import: ./commands
```

## Development

For development with hot reload:

```bash
# Terminal 1: Start Metro bundler
cd skydio-rn-business-logic
npm start

# Terminal 2: Reverse port for device
adb reverse tcp:8081 tcp:8081

# Run app from Android Studio (or ./gradlew installDebug)
```

## Gradle Tasks

| Task | Description |
|------|-------------|
| `generateJsProtobufs` | Generate JS protobuf files |
| `generateBridgeCode` | Generate Kotlin + TypeScript bridge |
| `cleanGenerated` | Clean all generated files |

## Tech Stack

- Kotlin 2.1.20
- Jetpack Compose (BOM 2025.01.01)
- React Native 0.81.5 (New Architecture)
- Hilt 2.56.2 (Dependency Injection)
- Protocol Buffers (Type-safe messaging)
