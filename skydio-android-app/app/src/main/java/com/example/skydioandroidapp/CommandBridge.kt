package com.example.skydioandroidapp

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeMap

/**
 * Simple CommandBridge Native Module
 *
 * Provides bidirectional communication between Kotlin and TypeScript:
 * - Kotlin can send commands to TypeScript via sendCommand()
 * - TypeScript processes commands and sends responses back
 *
 * This is a manual implementation without code generation.
 */
class CommandBridge(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val TAG = "CommandBridge"
        private const val MODULE_NAME = "CommandBridge"

        // Singleton instance accessible from Kotlin
        @Volatile
        private var instance: CommandBridge? = null

        fun getInstance(): CommandBridge? = instance
    }

    init {
        Log.d(TAG, "CommandBridge native module created")
        instance = this
    }

    override fun getName(): String {
        Log.d(TAG, "getName() called, returning: $MODULE_NAME")
        return MODULE_NAME
    }

    /**
     * Called from TypeScript to execute a command.
     *
     * @param commandName The command to execute (e.g., "increment", "decrement")
     * @param params Optional parameters for the command
     * @param promise Resolves with the command result or rejects with error
     */
    @ReactMethod
    fun executeCommand(commandName: String, params: ReadableMap?, promise: Promise) {
        try {
            Log.d(TAG, "Executing command: $commandName")

            // For now, this is a placeholder. TypeScript will call this method
            // to register itself as ready to receive commands
            val result = WritableNativeMap()
            result.putString("status", "received")
            result.putString("command", commandName)
            promise.resolve(result)

        } catch (e: Exception) {
            Log.e(TAG, "Error executing command: $commandName", e)
            promise.reject("COMMAND_ERROR", e.message, e)
        }
    }

    /**
     * Send a command from Kotlin to TypeScript.
     * TypeScript handlers will process this and return a response.
     *
     * @param command The command name (e.g., "increment", "decrement")
     * @param callback Called with the response from TypeScript
     */
    fun sendCommand(command: String, callback: (result: Map<String, Any>?, error: String?) -> Unit) {
        val reactContext = reactApplicationContext

        if (reactContext == null || !reactContext.hasActiveReactInstance()) {
            Log.e(TAG, "React Native context not ready")
            callback(null, "React Native not initialized")
            return
        }

        try {
            Log.d(TAG, "Sending command to TypeScript: $command")

            // Emit event to TypeScript
            reactContext
                .getJSModule(com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("CommandBridge_Command", command)

            // For now, simulate immediate success response
            // In a real implementation, we'd wait for TypeScript to respond via a callback
            val result = mapOf("command" to command, "status" to "sent")
            callback(result, null)

        } catch (e: Exception) {
            Log.e(TAG, "Error sending command: $command", e)
            callback(null, e.message)
        }
    }
}
