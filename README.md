# Android React Native Brownfield Integration

A native Android app with React Native embedded as a headless fragment for business logic.

## Project Structure

```
├── skydio-android-app/       # Native Android app (Kotlin + Jetpack Compose)
├── skydio-rn-business-logic/ # TypeScript/React Native business logic
└── proto/                    # Protocol Buffer definitions
```

## Architecture

- **Native UI**: Jetpack Compose for all user interface
- **Business Logic**: React Native runs headlessly in a fragment
- **Communication**: Protocol Buffers for type-safe native ↔ JS messaging
- **Lazy Initialization**: React Native only loads when needed

## Prerequisites

- Android Studio
- Node.js v20+ (`node -v`)
- Java JDK 17+ (`java -version`)

## Build

Gradle handles everything automatically, including JS dependency installation:

```bash
cd skydio-android-app
./gradlew assembleDebug
```

Or simply run from Android Studio.

## Development

For development with hot reload:

```bash
# Terminal 1: Start Metro bundler
cd skydio-rn-business-logic
npm start

# Terminal 2: Reverse port for device
adb reverse tcp:8081 tcp:8081

# Run app from Android Studio
```

## Tech Stack

- Kotlin 2.1.20
- Jetpack Compose (BOM 2025.01.01)
- React Native 0.81.5 (New Architecture)
- Hilt 2.56.2 (Dependency Injection)
- Protocol Buffers (Type-safe messaging)
