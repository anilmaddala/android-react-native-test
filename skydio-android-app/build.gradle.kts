// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    dependencies {
        classpath("com.android.tools.build:gradle")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
        classpath("com.facebook.react:react-native-gradle-plugin")
    }
    repositories {
        mavenCentral()
    }
}

plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    id("expo-root-project")
    id("com.facebook.react.rootproject")
}