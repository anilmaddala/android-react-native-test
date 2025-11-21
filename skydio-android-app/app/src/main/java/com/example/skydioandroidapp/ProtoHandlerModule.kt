package com.example.skydioandroidapp

import android.util.Base64
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * Native module that handles Protobuf communication between Kotlin and JavaScript
 */
class ProtoHandlerModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val TAG = "ProtoHandler"
        private val responseCallbacks = mutableMapOf<String, (ByteArray) -> Unit>()
    }

    override fun getName() = "ProtoHandler"

    /**
     * Called by JavaScript to send response back to Kotlin
     */
    @ReactMethod
    fun sendResponse(requestId: String, base64Data: String) {
        try {
            Log.d(TAG, "📩 Received response for request: $requestId")

            // Decode base64 to bytes
            val protoBytes = Base64.decode(base64Data, Base64.DEFAULT)
            Log.d(TAG, "📦 Decoded ${protoBytes.size} bytes")

            // Call the callback registered for this request
            responseCallbacks[requestId]?.let { callback ->
                callback(protoBytes)
                responseCallbacks.remove(requestId)
                Log.d(TAG, "✅ Response delivered to callback")
            } ?: run {
                Log.w(TAG, "⚠️ No callback found for request: $requestId")
            }
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error processing response", e)
        }
    }

    /**
     * Send a protobuf command to JavaScript and receive response via callback
     */
    fun sendCommand(requestId: String, protoBytes: ByteArray, callback: (ByteArray) -> Unit) {
        try {
            Log.d(TAG, "📤 Sending command to JS, request: $requestId, size: ${protoBytes.size} bytes")

            // Store callback for this request
            responseCallbacks[requestId] = callback

            // Encode to base64 for bridge transfer
            val base64Data = Base64.encodeToString(protoBytes, Base64.NO_WRAP)

            // Send event to JavaScript
            val params = Arguments.createMap().apply {
                putString("data", base64Data)
            }

            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("ProtoCommand", params)

            Log.d(TAG, "✅ Command sent to JavaScript")
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error sending command", e)
            responseCallbacks.remove(requestId)
            // Call callback with error (empty bytes)
            callback(ByteArray(0))
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        responseCallbacks.clear()
    }
}
