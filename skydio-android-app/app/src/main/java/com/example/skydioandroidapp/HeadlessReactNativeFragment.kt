package com.example.skydioandroidapp

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import com.facebook.react.ReactHost
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.bridge.ReactContext

/**
 * A headless Fragment that manages React Native lifecycle without rendering any UI.
 *
 * Architecture:
 * - Business logic lives in TypeScript using Zustand state management
 * - Kotlin sends commands via CommandBridge native module
 * - TypeScript processes commands and responds back
 *
 * Lazy Initialization:
 * - This fragment triggers React Native initialization on-demand
 * - Application.onCreate() has NO React Native code
 * - RN is only loaded when this fragment is added to an Activity
 *
 * Usage:
 * 1. Add this fragment to your activity
 * 2. Wait for isReady() to return true
 * 3. Use CommandBridge.sendCommand() to invoke TypeScript business logic
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

        // Trigger lazy initialization of React Native
        // This is where SoLoader, New Architecture, and ReactHost are created
        if (!application.isReactNativeInitialized()) {
            Log.d(TAG, "Triggering lazy React Native initialization")
            application.initializeReactNative()
        } else {
            Log.d(TAG, "React Native already initialized")
        }

        reactHost = application.reactHost

        reactHost?.let { host ->
            Log.d(TAG, "React Native host obtained, starting runtime")

            // Listen for React Native ready state
            host.addReactInstanceEventListener(object : ReactInstanceEventListener {
                override fun onReactContextInitialized(context: ReactContext) {
                    Log.d(TAG, "React context initialized - Native modules are now available")
                    isReactNativeReady = true

                    // Notify ready listener
                    activity?.runOnUiThread {
                        readyListener?.invoke()
                    }
                }
            })

            // Start the React Native runtime
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
