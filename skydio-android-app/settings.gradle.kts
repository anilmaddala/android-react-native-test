// Configures the React Native Gradle Settings plugin used for autolinking
pluginManagement {
    val reactNativeGradlePlugin = File(
        providers.exec {
            workingDir(rootDir)
            commandLine("node", "--print", "require.resolve('@react-native/gradle-plugin/package.json', { paths: [require.resolve('react-native/package.json')] })")
        }.standardOutput.asText.get().trim()
    ).parentFile.absolutePath
    includeBuild(reactNativeGradlePlugin)

    val expoPluginsPath = File(
        providers.exec {
            workingDir(rootDir)
            commandLine("node", "--print", "require.resolve('expo-modules-autolinking/package.json', { paths: [require.resolve('expo/package.json')] })")
        }.standardOutput.asText.get().trim(),
        "../android/expo-gradle-plugin"
    ).absolutePath
    includeBuild(expoPluginsPath)

    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("com.facebook.react.settings")
    id("expo-autolinking-settings")
}

expoAutolinking {
    projectRoot = File(rootDir, "skydio-expo-app")
}

extensions.configure(com.facebook.react.ReactSettingsExtension::class.java) { ex ->
    ex.autolinkLibrariesFromCommand(expoAutolinking.rnConfigCommand, file(rootDir), files("yarn.lock"))
}
expoAutolinking.useExpoModules()

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

// rootProject.name = "Skydio Android(App"

expoAutolinking.useExpoVersionCatalog()

includeBuild(expoAutolinking.reactNativeGradlePlugin)
// Include your existing Gradle modules here.
include(":app")
