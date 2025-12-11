package com.example.skydioandroidapp

import android.app.Application
import android.util.Log
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.shell.MainReactPackage
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader

/**
 * Main Application class for the Android app.
 *
 * Implements ReactApplication for compatibility with React Native modules,
 * but uses LAZY INITIALIZATION - no RN code runs until explicitly requested.
 *
 * Benefits:
 * - Zero RN overhead if HeadlessReactNativeFragment is never added
 * - Application.onCreate() has no RN initialization code
 * - Full compatibility with all RN native modules
 *
 * Usage:
 * - Call initializeReactNative() before accessing reactHost
 * - HeadlessReactNativeFragment handles this automatically
 */
class MainApplication : Application(), ReactApplication {

    companion object {
        private const val TAG = "MainApplication"
    }

    @Volatile
    private var _initialized = false

    @Volatile
    private var _reactNativeHost: ReactNativeHost? = null

    @Volatile
    private var _reactHost: ReactHost? = null

    /**
     * ReactNativeHost - configuration for React Native.
     * Throws if accessed before initializeReactNative() is called.
     */
    override val reactNativeHost: ReactNativeHost
        get() = _reactNativeHost
            ?: throw IllegalStateException("React Native not initialized. Call initializeReactNative() first.")

    /**
     * ReactHost - the actual React Native runtime.
     * Throws if accessed before initializeReactNative() is called.
     */
    override val reactHost: ReactHost
        get() = _reactHost
            ?: throw IllegalStateException("React Native not initialized. Call initializeReactNative() first.")

    /**
     * Check if React Native has been initialized.
     */
    fun isReactNativeInitialized(): Boolean = _initialized

    /**
     * Initialize React Native on-demand.
     *
     * This is called by HeadlessReactNativeFragment when it's added to an Activity.
     * Safe to call multiple times - only initializes once.
     *
     * This method performs:
     * 1. SoLoader initialization (loads native libraries)
     * 2. New Architecture entry point loading (if enabled)
     * 3. ReactNativeHost creation (configuration)
     * 4. ReactHost creation (runtime)
     */
    @Synchronized
    fun initializeReactNative() {
        if (_initialized) {
            Log.d(TAG, "React Native already initialized, skipping")
            return
        }

        Log.d(TAG, "Initializing React Native (lazy)")

        // Step 1: Initialize SoLoader with merged SO mapping
        // This loads the native libraries (libreactnative.so, etc.)
        try {
            // Note: From Kotlin, access object directly (no .INSTANCE needed)
            SoLoader.init(this, OpenSourceMergedSoMapping)
            Log.d(TAG, "SoLoader initialized with merged SO mapping")
        } catch (e: Exception) {
            throw RuntimeException("Failed to initialize SoLoader", e)
        }

        // Step 2: Load New Architecture if enabled
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            DefaultNewArchitectureEntryPoint.load()
            Log.d(TAG, "New Architecture loaded")
        }

        // Step 3: Create ReactNativeHost (configuration object)
        _reactNativeHost = object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> {
                return listOf(
                    MainReactPackage(),
                    CommandBridgePackage()
                )
            }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED

            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }
        Log.d(TAG, "ReactNativeHost created")

        // Step 4: Create ReactHost (runtime)
        _reactHost = getDefaultReactHost(applicationContext, _reactNativeHost!!)
        Log.d(TAG, "ReactHost created")

        _initialized = true
        Log.d(TAG, "React Native initialization complete")
    }

    /**
     * Application onCreate - NO React Native code here!
     *
     * This keeps the Application startup fast and RN-free.
     * React Native is only initialized when HeadlessReactNativeFragment is added.
     */
    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "Application onCreate - React Native NOT initialized (lazy)")
        // Intentionally empty - RN initialization happens on-demand
    }
}
