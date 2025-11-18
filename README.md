# Android brownfield Expo app

Steps to get to current state:

- Android Studio: Create a new Android project using the Navigation Ul Activity template
- Create a brownfield Expo app: https://docs.expo.dev/brownfield/get-started/
  - `npx create-expo-app skydio-expo-app`
  - Take the [Can't move your native projects to android and ios directories?](https://docs.expo.dev/brownfield/get-started/#cant-move-your-native-projects-to-android) section
    - `printf '{\n  "version": "1.0.0",\n  "private": true,\n  "workspaces": ["skydio-expo-app"]\n}\n' > package.json`
  - Edit `settings.gradle.kts`, using a LLM to translate expo instructions to kotlin
