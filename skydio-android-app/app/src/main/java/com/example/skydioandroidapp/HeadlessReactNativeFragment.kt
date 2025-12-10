package com.example.skydioandroidapp

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import com.facebook.react.ReactHost
import com.facebook.react.bridge.ReactContext

/**
 * A headless Fragment that manages React Native lifecycle without rendering any UI.
 *
 * With Expo Modules API, the business logic is defined in BusinessLogicModule
 * and automatically exposed to both TypeScript and Kotlin - no manual bridge needed!
 *
 * Usage:
 * 1. Add this fragment to your activity
 * 2. Wait for isReady() to return true
 * 3. Call BusinessLogicModule methods directly (they're Expo modules)
 *
 * From TypeScript:
 *   import BusinessLogic from './modules/business-logic';
 *   const result = await BusinessLogic.calculateSum(5, 3);
 */
class HeadlessReactNativeFragment : Fragment() {

    companion object {
        private const val TAG = "HeadlessRNFragment"

        fun newInstance(): HeadlessReactNativeFragment {
            return HeadlessReactNativeFragment()
        }
    }

    private var reactHost: ReactHost? = null
    private var isReactNativeReady = false
    private var readyListener: (() -> Unit)? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate: Initializing headless React Native")
        initializeReactNative()
    }

    private fun initializeReactNative() {
        val application = requireActivity().application as? MainApplication
        if (application == null) {
            Log.e(TAG, "Application is not MainApplication, cannot initialize React Native")
            return
        }

        reactHost = application.reactHost

        // Start React Native instance if not already started
        reactHost?.let { host ->
            Log.d(TAG, "React Native host obtained, starting runtime")

            // Listen for React Native ready state
            host.addReactInstanceEventListener(object : ReactHost.ReactInstanceEventListener {
                override fun onReactContextInitialized(context: ReactContext) {
                    Log.d(TAG, "React context initialized - Expo modules are now available")
                    isReactNativeReady = true

                    // Notify ready listener
                    activity?.runOnUiThread {
                        readyListener?.invoke()
                    }
                }
            })

            // Start the React Native runtime in headless mode
            host.start()
        }
    }

    override fun onResume() {
        super.onResume()
        Log.d(TAG, "onResume")
        reactHost?.onHostResume(requireActivity())
    }

    override fun onPause() {
        super.onPause()
        Log.d(TAG, "onPause")
        reactHost?.onHostPause(requireActivity())
    }

    override fun onDestroy() {
        Log.d(TAG, "onDestroy: Cleaning up React Native")
        reactHost?.onHostDestroy(requireActivity())
        reactHost = null
        isReactNativeReady = false
        super.onDestroy()
    }

    /**
     * Set a listener to be notified when React Native is ready
     */
    fun setOnReadyListener(listener: () -> Unit) {
        readyListener = listener
        if (isReactNativeReady) {
            listener()
        }
    }

    /**
     * Check if React Native runtime is ready
     */
    fun isReady(): Boolean = isReactNativeReady
}
