package com.example.skydioandroidapp

import android.util.Log
import com.facebook.react.ReactHost
import com.facebook.react.bridge.ReactContext
import kotlinx.coroutines.suspendCancellableCoroutine
import java.util.UUID
import kotlin.coroutines.resume

/**
 * Helper class to communicate with headless JavaScript runtime via Protobuf
 */
class JavaScriptBridge(private val reactHost: ReactHost) {

    companion object {
        private const val TAG = "JavaScriptBridge"
    }

    private val protoHandler: ProtoHandlerModule?
        get() = reactHost.currentReactContext?.getNativeModule(ProtoHandlerModule::class.java)

    /**
     * Send a protobuf command to JavaScript and wait for response
     */
    suspend fun sendCommand(commandBytes: ByteArray): ByteArray = suspendCancellableCoroutine { continuation ->
        val requestId = UUID.randomUUID().toString()

        Log.d(TAG, "Sending command with ID: $requestId")

        protoHandler?.sendCommand(requestId, commandBytes) { responseBytes ->
            Log.d(TAG, "Received response for ID: $requestId, size: ${responseBytes.size}")
            continuation.resume(responseBytes)
        } ?: run {
            Log.e(TAG, "ProtoHandler not available")
            continuation.resume(ByteArray(0))
        }
    }

    /**
     * Check if JavaScript runtime is ready
     */
    fun isReady(): Boolean {
        return protoHandler != null
    }
}
