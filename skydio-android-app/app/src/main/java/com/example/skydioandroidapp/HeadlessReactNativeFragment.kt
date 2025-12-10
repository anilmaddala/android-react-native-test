package com.example.skydioandroidapp

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import com.facebook.react.ReactHost
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * A headless Fragment that manages React Native lifecycle without rendering any UI.
 *
 * This fragment initializes the React Native runtime and provides methods to execute
 * TypeScript/JavaScript code from Kotlin. The React Native instance is scoped to
 * the lifecycle of this fragment.
 *
 * Usage:
 * 1. Add this fragment to your activity/fragment
 * 2. Call executeCommand() to run TypeScript functions
 * 3. Register callbacks to receive results from TypeScript
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
    private val pendingCommands = mutableListOf<PendingCommand>()
    private var readyListener: (() -> Unit)? = null

    /**
     * Listener for results coming back from TypeScript
     */
    interface ResultCallback {
        fun onSuccess(result: Any?)
        fun onError(error: String)
    }

    private data class PendingCommand(
        val commandName: String,
        val params: Map<String, Any?>,
        val callback: ResultCallback?
    )

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
                    Log.d(TAG, "React context initialized")
                    isReactNativeReady = true

                    // Register this fragment with the bridge module
                    ReactNativeBridge.setFragment(this@HeadlessReactNativeFragment)

                    // Execute any pending commands
                    processPendingCommands()

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
        ReactNativeBridge.setFragment(null)
        reactHost?.onHostDestroy(requireActivity())
        reactHost = null
        isReactNativeReady = false
        pendingCommands.clear()
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
     * Check if React Native runtime is ready to execute commands
     */
    fun isReady(): Boolean = isReactNativeReady

    /**
     * Execute a command in TypeScript/JavaScript
     *
     * @param commandName The name of the command to execute (registered in TypeScript)
     * @param params Parameters to pass to the command
     * @param callback Callback to receive the result
     */
    fun executeCommand(
        commandName: String,
        params: Map<String, Any?> = emptyMap(),
        callback: ResultCallback? = null
    ) {
        Log.d(TAG, "executeCommand: $commandName with params: $params")

        if (!isReactNativeReady) {
            Log.d(TAG, "React Native not ready, queueing command: $commandName")
            pendingCommands.add(PendingCommand(commandName, params, callback))
            return
        }

        sendCommandToReactNative(commandName, params, callback)
    }

    private fun processPendingCommands() {
        Log.d(TAG, "Processing ${pendingCommands.size} pending commands")
        val commands = pendingCommands.toList()
        pendingCommands.clear()

        commands.forEach { command ->
            sendCommandToReactNative(command.commandName, command.params, command.callback)
        }
    }

    private fun sendCommandToReactNative(
        commandName: String,
        params: Map<String, Any?>,
        callback: ResultCallback?
    ) {
        val reactContext = reactHost?.currentReactContext
        if (reactContext == null) {
            Log.e(TAG, "React context is null, cannot send command")
            callback?.onError("React context not available")
            return
        }

        try {
            // Generate a unique callback ID
            val callbackId = System.currentTimeMillis().toString() + "_" + commandName

            // Register callback if provided
            callback?.let {
                ReactNativeBridge.registerCallback(callbackId, it)
            }

            // Create the event payload
            val eventParams = Arguments.createMap().apply {
                putString("command", commandName)
                putString("callbackId", callbackId)
                putMap("params", convertMapToWritableMap(params))
            }

            // Send event to JavaScript
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("NativeCommand", eventParams)

            Log.d(TAG, "Command sent to React Native: $commandName")
        } catch (e: Exception) {
            Log.e(TAG, "Error sending command to React Native", e)
            callback?.onError(e.message ?: "Unknown error")
        }
    }

    private fun convertMapToWritableMap(map: Map<String, Any?>): WritableMap {
        val writableMap = Arguments.createMap()
        map.forEach { (key, value) ->
            when (value) {
                null -> writableMap.putNull(key)
                is String -> writableMap.putString(key, value)
                is Int -> writableMap.putInt(key, value)
                is Double -> writableMap.putDouble(key, value)
                is Boolean -> writableMap.putBoolean(key, value)
                is Map<*, *> -> {
                    @Suppress("UNCHECKED_CAST")
                    writableMap.putMap(key, convertMapToWritableMap(value as Map<String, Any?>))
                }
                is List<*> -> {
                    val array = Arguments.createArray()
                    value.forEach { item ->
                        when (item) {
                            null -> array.pushNull()
                            is String -> array.pushString(item)
                            is Int -> array.pushInt(item)
                            is Double -> array.pushDouble(item)
                            is Boolean -> array.pushBoolean(item)
                            is Map<*, *> -> {
                                @Suppress("UNCHECKED_CAST")
                                array.pushMap(convertMapToWritableMap(item as Map<String, Any?>))
                            }
                            else -> array.pushString(item.toString())
                        }
                    }
                    writableMap.putArray(key, array)
                }
                else -> writableMap.putString(key, value.toString())
            }
        }
        return writableMap
    }

    /**
     * Convenience method to execute a command with a simple callback
     */
    fun executeCommand(
        commandName: String,
        params: Map<String, Any?> = emptyMap(),
        onSuccess: ((Any?) -> Unit)? = null,
        onError: ((String) -> Unit)? = null
    ) {
        executeCommand(commandName, params, object : ResultCallback {
            override fun onSuccess(result: Any?) {
                onSuccess?.invoke(result)
            }

            override fun onError(error: String) {
                onError?.invoke(error)
            }
        })
    }
}
