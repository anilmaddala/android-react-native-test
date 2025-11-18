# Android brownfield Expo app

Steps to get to current state:

- Prerequisites
  - Android Studio
  - NodeJS v25 (Installed with `brew install node`)
    - `node -v # v25.2.1`
  - Java JDK 21 (Installed with `brew install openjdk@21`)
    - `java -version # openjdk version "21.0.9" 2025-10-21`
- Create a new Android Studio project
  - Launch Android Studio with env var from shell
    - `open -a "Android Studio" --env PATH="$PATH"`
  - Create a new Android Studio project using the Navigation Ul Activity template
- Create a brownfield Expo app: https://docs.expo.dev/brownfield/get-started/
  - `npx create-expo-app skydio-expo-app`
  - Take the [Can't move your native projects to android and ios directories?](https://docs.expo.dev/brownfield/get-started/#cant-move-your-native-projects-to-android) section
    - `printf '{\n  "version": "1.0.0",\n  "private": true,\n  "workspaces": ["skydio-expo-app"]\n}\n' > package.json`
  - Edit `settings.gradle`, `build.gradle`, `app/build.gradle`, `gradle.properties`
  - Launch
