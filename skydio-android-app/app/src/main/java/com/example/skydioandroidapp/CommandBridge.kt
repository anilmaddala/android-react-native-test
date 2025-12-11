package com.example.skydioandroidapp

import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.concurrent.ConcurrentHashMap

/**
 * CommandBridge - Expo Module for bidirectional Kotlin ↔ TypeScript communication
 *
 * Architecture:
 * - Kotlin sends commands to TypeScript via the "onCommand" event
 * - TypeScript processes commands using Zustand stores
 * - TypeScript sends responses back via sendResponse() function
 * - Kotlin receives responses via registered callbacks
 *
 * Usage from Kotlin:
 *   CommandBridge.sendCommand("increment", emptyMap()) { result, error ->
 *       if (error != null) { /* handle error */ }
 *       else { /* use result */ }
 *   }
 *
 * Usage from TypeScript:
 *   CommandBridge.addListener('onCommand', (event) => {
 *       const result = processCommand(event.command, event.params);
 *       CommandBridge.sendResponse(event.callbackId, result);
 *   });
 */
class CommandBridge : Module() {

    companion object {
        private const val TAG = "CommandBridge"

        // Singleton instance for Kotlin access
        @Volatile
        private var instance: CommandBridge? = null

        // Pending callbacks waiting for responses
        private val pendingCallbacks = ConcurrentHashMap<String, (Any?, String?) -> Unit>()

        // Callback ID counter
        private var callbackCounter = 0L

        /**
         * Send a command to TypeScript and receive the response via callback
         */
        fun sendCommand(
            command: String,
            params: Map<String, Any?> = emptyMap(),
            callback: ((result: Any?, error: String?) -> Unit)? = null
        ) {
            val bridge = instance
            if (bridge == null) {
                Log.e(TAG, "CommandBridge not initialized")
                callback?.invoke(null, "CommandBridge not initialized")
                return
            }

            val callbackId = "cb_${++callbackCounter}_${System.currentTimeMillis()}"

            // Register callback if provided
            if (callback != null) {
                pendingCallbacks[callbackId] = callback
            }

            Log.d(TAG, "Sending command: $command, callbackId: $callbackId")

            // Send event to TypeScript
            bridge.sendEvent("onCommand", mapOf(
                "command" to command,
                "params" to params,
                "callbackId" to callbackId
            ))
        }

        /**
         * Handle response from TypeScript (called internally)
         */
        internal fun handleResponse(callbackId: String, result: Any?, error: String?) {
            Log.d(TAG, "Received response for callbackId: $callbackId")

            val callback = pendingCallbacks.remove(callbackId)
            if (callback != null) {
                callback(result, error)
            } else {
                Log.w(TAG, "No callback found for callbackId: $callbackId")
            }
        }
    }

    override fun definition() = ModuleDefinition {
        Name("CommandBridge")

        // Event sent to TypeScript when Kotlin wants to execute a command
        Events("onCommand")

        // Called when the module is created
        OnCreate {
            instance = this@CommandBridge
            Log.d(TAG, "CommandBridge initialized")
        }

        // Called when the module is destroyed
        OnDestroy {
            instance = null
            pendingCallbacks.clear()
            Log.d(TAG, "CommandBridge destroyed")
        }

        /**
         * Called by TypeScript to send a response back to Kotlin
         */
        Function("sendResponse") { callbackId: String, result: Map<String, Any?>? ->
            Log.d(TAG, "sendResponse called: callbackId=$callbackId")
            handleResponse(callbackId, result, null)
        }

        /**
         * Called by TypeScript to send an error response back to Kotlin
         */
        Function("sendError") { callbackId: String, errorMessage: String ->
            Log.d(TAG, "sendError called: callbackId=$callbackId, error=$errorMessage")
            handleResponse(callbackId, null, errorMessage)
        }

        /**
         * Called by TypeScript to notify that it's ready to receive commands
         */
        Function("notifyReady") {
            Log.d(TAG, "TypeScript runtime is ready")
        }

        /**
         * Utility function to check if the bridge is ready
         */
        Function("isReady") {
            instance != null
        }
    }
}
