module.exports = {
  // This is a headless React Native project - no Android/iOS native folders
  // The native code lives in the skydio-android-app folder
  project: {
    android: {
      sourceDir: '../skydio-android-app',
      appName: 'app',
      packageName: 'com.example.skydioandroidapp',
    },
  },
};
