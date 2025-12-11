package com.example.skydioandroidapp

import android.util.Base64
import android.util.Log
import com.example.skydioandroidapp.proto.*
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.concurrent.ConcurrentHashMap

/**
 * CommandBridge - React Native Native Module for type-safe bidirectional Kotlin ↔ TypeScript communication
 *
 * Uses Protocol Buffers for compile-time type safety between Kotlin and TypeScript.
 *
 * Architecture:
 * - Kotlin creates protobuf Command message and serializes to base64
 * - Sends base64 to TypeScript via the "onCommand" event
 * - TypeScript deserializes, processes using Zustand stores
 * - TypeScript creates protobuf Response message and serializes to base64
 * - Sends base64 back to Kotlin via sendResponse()
 * - Kotlin deserializes to typed Response
 *
 * Usage from Kotlin:
 *   CommandBridge.increment { response ->
 *       when (val result = response.result) {
 *           is Response.Result.Counter -> println("Counter: ${result.counter.value}")
 *           is Response.Result.Error -> println("Error: ${result.error.message}")
 *       }
 *   }
 */
class CommandBridge(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    companion object {
        private const val TAG = "CommandBridge"
        const val NAME = "CommandBridge"

        // Singleton instance for Kotlin access
        @Volatile
        private var instance: CommandBridge? = null

        // Pending callbacks waiting for responses
        private val pendingCallbacks = ConcurrentHashMap<String, (Response) -> Unit>()

        // Callback ID counter
        private var callbackCounter = 0L

        /**
         * Generate a unique callback ID
         */
        private fun generateCallbackId(): String {
            return "cb_${++callbackCounter}_${System.currentTimeMillis()}"
        }

        /**
         * Send a raw Command message to TypeScript
         */
        private fun sendCommand(command: Command, callback: ((Response) -> Unit)? = null) {
            val bridge = instance
            if (bridge == null) {
                Log.e(TAG, "CommandBridge not initialized")
                callback?.invoke(
                    Response.newBuilder()
                        .setCallbackId(command.callbackId)
                        .setError(ErrorResponse.newBuilder().setMessage("CommandBridge not initialized"))
                        .build()
                )
                return
            }

            // Register callback if provided
            if (callback != null) {
                pendingCallbacks[command.callbackId] = callback
            }

            // Serialize to base64
            val bytes = command.toByteArray()
            val base64 = Base64.encodeToString(bytes, Base64.NO_WRAP)

            Log.d(TAG, "Sending command: ${command.commandCase}, callbackId: ${command.callbackId}")

            // Send event to TypeScript
            bridge.sendEvent("onCommand", base64)
        }

        // ==========================================
        // Type-safe command methods
        // ==========================================

        /**
         * Increment counter
         */
        fun increment(callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setIncrement(IncrementCommand.getDefaultInstance())
                .build()
            sendCommand(command, callback)
        }

        /**
         * Decrement counter
         */
        fun decrement(callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setDecrement(DecrementCommand.getDefaultInstance())
                .build()
            sendCommand(command, callback)
        }

        /**
         * Set counter to specific value
         */
        fun setCounter(value: Int, callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setSetCounter(SetCounterCommand.newBuilder().setValue(value))
                .build()
            sendCommand(command, callback)
        }

        /**
         * Get current counter value
         */
        fun getCounter(callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setGetCounter(GetCounterCommand.getDefaultInstance())
                .build()
            sendCommand(command, callback)
        }

        /**
         * Add a new user
         */
        fun addUser(name: String, email: String, callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setAddUser(AddUserCommand.newBuilder().setName(name).setEmail(email))
                .build()
            sendCommand(command, callback)
        }

        /**
         * Remove a user by ID
         */
        fun removeUser(id: String, callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setRemoveUser(RemoveUserCommand.newBuilder().setId(id))
                .build()
            sendCommand(command, callback)
        }

        /**
         * Get all users
         */
        fun getUsers(callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setGetUsers(GetUsersCommand.getDefaultInstance())
                .build()
            sendCommand(command, callback)
        }

        /**
         * Calculate sum of two numbers
         */
        fun calculateSum(a: Int, b: Int, callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setCalculateSum(CalculateSumCommand.newBuilder().setA(a).setB(b))
                .build()
            sendCommand(command, callback)
        }

        /**
         * Validate user input
         */
        fun validateInput(email: String, password: String, callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setValidateInput(ValidateInputCommand.newBuilder().setEmail(email).setPassword(password))
                .build()
            sendCommand(command, callback)
        }

        /**
         * Fetch user data by ID (async operation)
         */
        fun fetchUserData(userId: String, callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setFetchUserData(FetchUserDataCommand.newBuilder().setUserId(userId))
                .build()
            sendCommand(command, callback)
        }

        /**
         * Get application configuration
         */
        fun getConfiguration(callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setGetConfiguration(GetConfigurationCommand.getDefaultInstance())
                .build()
            sendCommand(command, callback)
        }

        /**
         * Update application configuration
         */
        fun updateConfiguration(config: Configuration, callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setUpdateConfiguration(UpdateConfigurationCommand.newBuilder().setConfig(config))
                .build()
            sendCommand(command, callback)
        }

        /**
         * Get full application state
         */
        fun getState(callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setGetState(GetStateCommand.getDefaultInstance())
                .build()
            sendCommand(command, callback)
        }

        /**
         * Handle response from TypeScript (called internally)
         */
        internal fun handleResponse(base64Data: String) {
            try {
                val bytes = Base64.decode(base64Data, Base64.NO_WRAP)
                val response = Response.parseFrom(bytes)

                Log.d(TAG, "Received response for callbackId: ${response.callbackId}, type: ${response.resultCase}")

                val callback = pendingCallbacks.remove(response.callbackId)
                if (callback != null) {
                    callback(response)
                } else {
                    Log.w(TAG, "No callback found for callbackId: ${response.callbackId}")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Failed to parse response: ${e.message}")
            }
        }

        /**
         * Check if bridge is initialized
         */
        fun isInitialized(): Boolean = instance != null
    }

    override fun getName(): String = NAME

    override fun initialize() {
        super.initialize()
        instance = this
        reactContext.addLifecycleEventListener(this)
        Log.d(TAG, "CommandBridge initialized")
    }

    override fun invalidate() {
        super.invalidate()
        instance = null
        pendingCallbacks.clear()
        reactContext.removeLifecycleEventListener(this)
        Log.d(TAG, "CommandBridge invalidated")
    }

    /**
     * Send event to JavaScript
     */
    private fun sendEvent(eventName: String, data: String) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, data)
    }

    /**
     * Called by TypeScript to send a response back to Kotlin (protobuf base64)
     */
    @ReactMethod
    fun sendResponse(base64Data: String) {
        Log.d(TAG, "sendResponse called")
        handleResponse(base64Data)
    }

    /**
     * Called by TypeScript to notify that it's ready to receive commands
     */
    @ReactMethod
    fun notifyReady() {
        Log.d(TAG, "TypeScript runtime is ready")
    }

    /**
     * Utility function to check if the bridge is ready
     */
    @ReactMethod(isBlockingSynchronousMethod = true)
    fun isReady(): Boolean {
        return instance != null
    }

    /**
     * Required for NativeEventEmitter support
     */
    @ReactMethod
    fun addListener(eventName: String) {
        // Keep: Required for RN built-in Event Emitter support
        Log.d(TAG, "addListener called for: $eventName")
    }

    /**
     * Required for NativeEventEmitter support
     */
    @ReactMethod
    fun removeListeners(count: Int) {
        // Keep: Required for RN built-in Event Emitter support
        Log.d(TAG, "removeListeners called: $count")
    }

    // Lifecycle events
    override fun onHostResume() {
        Log.d(TAG, "onHostResume")
    }

    override fun onHostPause() {
        Log.d(TAG, "onHostPause")
    }

    override fun onHostDestroy() {
        Log.d(TAG, "onHostDestroy")
    }
}
