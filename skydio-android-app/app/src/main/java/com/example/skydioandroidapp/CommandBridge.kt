package com.example.skydioandroidapp

import android.util.Base64
import android.util.Log
import com.example.skydioandroidapp.proto.*
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.concurrent.ConcurrentHashMap

/**
 * CommandBridge - React Native Native Module for type-safe Kotlin ↔ TypeScript communication
 *
 * Uses Protocol Buffers for compile-time type safety.
 */
class CommandBridge(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    companion object {
        private const val TAG = "CommandBridge"
        const val NAME = "CommandBridge"

        @Volatile
        private var instance: CommandBridge? = null
        private val pendingCallbacks = ConcurrentHashMap<String, (Response) -> Unit>()
        private var callbackCounter = 0L

        private fun generateCallbackId(): String {
            return "cb_${++callbackCounter}_${System.currentTimeMillis()}"
        }

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

            if (callback != null) {
                pendingCallbacks[command.callbackId] = callback
            }

            val bytes = command.toByteArray()
            val base64 = Base64.encodeToString(bytes, Base64.NO_WRAP)

            Log.d(TAG, "Sending command: ${command.commandCase}, callbackId: ${command.callbackId}")
            bridge.sendEvent("onCommand", base64)
        }

        fun increment(callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setIncrement(IncrementCommand.getDefaultInstance())
                .build()
            sendCommand(command, callback)
        }

        fun decrement(callback: ((Response) -> Unit)? = null) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .setDecrement(DecrementCommand.getDefaultInstance())
                .build()
            sendCommand(command, callback)
        }

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

    private fun sendEvent(eventName: String, data: String) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, data)
    }

    @ReactMethod
    fun sendResponse(base64Data: String) {
        Log.d(TAG, "sendResponse called")
        handleResponse(base64Data)
    }

    @ReactMethod
    fun notifyReady() {
        Log.d(TAG, "TypeScript runtime is ready")
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun isReady(): Boolean {
        return instance != null
    }

    @ReactMethod
    fun addListener(eventName: String) {
        Log.d(TAG, "addListener called for: $eventName")
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        Log.d(TAG, "removeListeners called: $count")
    }

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
