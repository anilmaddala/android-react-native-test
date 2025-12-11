package com.example.skydioandroidapp

import expo.modules.kotlin.ModulesProvider
import expo.modules.kotlin.modules.Module

/**
 * Provider that registers the app's Expo modules.
 *
 * This allows modules defined in the main app (not in separate npm packages)
 * to be discovered by Expo's module loader.
 *
 * Note: This class needs to be registered with Expo's module system.
 * For native Android apps hosting Expo, this is typically done via configuration.
 */
class AppExpoModulesPackage : ModulesProvider {
    override fun getModulesList(): List<Class<out Module>> {
        return listOf(
            CommandBridge::class.java
        )
    }
}
