package com.example.skydioandroidapp

import expo.modules.core.interfaces.Package
import expo.modules.kotlin.modules.Module

/**
 * Package that registers the app's Expo modules.
 *
 * This allows modules defined in the main app (not in separate npm packages)
 * to be discovered by Expo's module loader.
 */
class AppExpoModulesPackage : Package {
    override fun createModules(): List<Class<out Module>> {
        return listOf(
            CommandBridge::class.java
        )
    }
}
