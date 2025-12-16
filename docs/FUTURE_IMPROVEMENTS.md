# Future Improvements

## Isolate React Native from MainApplication

**Status:** Planned
**Priority:** Low (current lazy init has zero startup overhead)

### Problem

Currently, `MainApplication` must implement `ReactApplication` interface:

```kotlin
@HiltAndroidApp
class MainApplication : Application(), ReactApplication {
    override val reactNativeHost: ReactNativeHost
    override val reactHost: ReactHost
}
```

While we use lazy initialization (no RN code in `onCreate()`), the interface coupling is undesirable for a brownfield integration where RN should be fully isolated.

### Why ReactApplication is Currently Required

React Native native modules expect to find `ReactApplication` by casting:

```kotlin
val reactApp = context.applicationContext as ReactApplication
val host = reactApp.reactHost
```

Used by:
- `DeviceEventManagerModule` (Kotlin ↔ JS events)
- Custom native modules like `CommandBridge`
- Third-party RN libraries
- Dev menu / debugging tools

### Possible Approaches

#### 1. Separate Process (High Isolation)

Run React Native in a separate Android process:

```xml
<service android:name=".ReactNativeService" android:process=":rn" />
```

| Pros | Cons |
|------|------|
| Complete memory isolation | IPC overhead (Binder/AIDL) |
| MainApplication untouched | More complex lifecycle |
| RN crashes don't affect main app | Need to serialize communication |

#### 2. Dynamic Feature Module

Use Play Feature Delivery for on-demand RN module:

```kotlin
SplitInstallManager.startInstall(request)
```

| Pros | Cons |
|------|------|
| Smaller initial APK | Play Store dependency |
| RN code in separate module | Download latency on first use |
| Can use separate Application class | Complex module boundaries |

#### 3. Custom ReactApplication Wrapper

Create a non-Application class that provides ReactApplication-like functionality:

```kotlin
class ReactNativeContainer(context: Context) {
    val reactHost: ReactHost
}
```

| Pros | Cons |
|------|------|
| Clean separation | Requires modifying native modules |
| No Application modification | Third-party libraries won't work |

#### 4. Fork/Patch React Native

Modify React Native to not require `ReactApplication`.

| Pros | Cons |
|------|------|
| Clean solution at source | Maintenance burden |
| | Upstream conflicts |

### Recommendation

**Short-term:** Keep current lazy initialization - zero startup overhead.

**Long-term:** Approach #1 (Separate Process) provides cleanest isolation while keeping protobuf serialization (already in place).

### Tasks

- [ ] Prototype separate process approach
- [ ] Benchmark IPC latency vs current in-process bridge
- [ ] Evaluate if third-party RN libraries are needed

### References

- `MainApplication.kt` - Current implementation
- `HeadlessReactNativeFragment.kt` - Fragment-based lifecycle
- [React Native Brownfield Docs](https://reactnative.dev/docs/integration-with-existing-apps)
