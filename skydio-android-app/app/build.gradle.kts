plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    id("com.facebook.react")
}

android {
    namespace = "com.example.skydioandroidapp"
    compileSdk {
        version = release(36)
    }

    defaultConfig {
        applicationId = "com.example.skydioandroidapp"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation("com.facebook.react:react-android")
    implementation("com.facebook.react:hermes-android")
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material3.adaptive.navigation.suite)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}

val projectRoot = File(rootDir.absoluteFile, "skydio-expo-app").absolutePath

react {
    entryFile.set(file(listOf("node", "-e", "require('expo/scripts/resolveAppEntry')", projectRoot, "android", "absolute").execute(null, rootDir).text.trim()))
    reactNativeDir.set(File(listOf("node", "--print", "require.resolve('react-native/package.json')").execute(null, rootDir).text.trim()).parentFile.absoluteFile)
    hermesCommand.set(File(listOf("node", "--print", "require.resolve('react-native/package.json')").execute(null, rootDir).text.trim()).parentFile.absolutePath + "/sdks/hermesc/%OS-BIN%/hermesc")
    codegenDir.set(File(listOf("node", "--print", "require.resolve('@react-native/codegen/package.json', { paths: [require.resolve('react-native/package.json')] })").execute(null, rootDir).text.trim()).parentFile.absoluteFile)
    enableBundleCompression.set(false)

    // Use Expo CLI to bundle the app, this ensures the Metro config works correctly with Expo projects.
    cliFile.set(File(listOf("node", "--print", "require.resolve('@expo/cli', { paths: [require.resolve('expo/package.json')] })").execute(null, rootDir).text.trim()))
    bundleCommand.set("export:embed")

    /* Autolinking */
    autolinkLibrariesWithApp()
}