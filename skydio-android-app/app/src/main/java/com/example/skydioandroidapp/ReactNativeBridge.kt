package com.example.skydioandroidapp

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ViewManager
import java.lang.ref.WeakReference

/**
 * Native module that bridges communication between Kotlin and TypeScript.
 *
 * This module allows:
 * - TypeScript to send results/callbacks back to Kotlin
 * - TypeScript to notify Kotlin of events
 * - Bidirectional data exchange
 */
@ReactModule(name = ReactNativeBridge.NAME)
class ReactNativeBridge(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "ReactNativeBridge"
        private const val TAG = "ReactNativeBridge"

        // Static reference to the fragment for callbacks
        private var fragmentRef: WeakReference<HeadlessReactNativeFragment>? = null

        // Pending callbacks waiting for results from TypeScript
        private val pendingCallbacks = mutableMapOf<String, HeadlessReactNativeFragment.ResultCallback>()

        // Event listeners for TypeScript-initiated events
        private val eventListeners = mutableMapOf<String, MutableList<(Map<String, Any?>) -> Unit>>()

        fun setFragment(fragment: HeadlessReactNativeFragment?) {
            fragmentRef = fragment?.let { WeakReference(it) }
            Log.d(TAG, "Fragment reference ${if (fragment != null) "set" else "cleared"}")
        }

        fun registerCallback(callbackId: String, callback: HeadlessReactNativeFragment.ResultCallback) {
            pendingCallbacks[callbackId] = callback
            Log.d(TAG, "Callback registered: $callbackId")
        }

        /**
         * Register a listener for events from TypeScript
         */
        fun addEventListener(eventName: String, listener: (Map<String, Any?>) -> Unit) {
            eventListeners.getOrPut(eventName) { mutableListOf() }.add(listener)
            Log.d(TAG, "Event listener added for: $eventName")
        }

        /**
         * Remove an event listener
         */
        fun removeEventListener(eventName: String, listener: (Map<String, Any?>) -> Unit) {
            eventListeners[eventName]?.remove(listener)
        }

        /**
         * Clear all event listeners for an event
         */
        fun clearEventListeners(eventName: String) {
            eventListeners.remove(eventName)
        }
    }

    override fun getName(): String = NAME

    /**
     * Called from TypeScript to send a successful result back to Kotlin
     */
    @ReactMethod
    fun sendResult(callbackId: String, result: ReadableMap?) {
        Log.d(TAG, "sendResult called for callbackId: $callbackId")

        val callback = pendingCallbacks.remove(callbackId)
        if (callback != null) {
            val resultMap = result?.let { convertReadableMapToMap(it) }
            callback.onSuccess(resultMap)
        } else {
            Log.w(TAG, "No callback found for id: $callbackId")
        }
    }

    /**
     * Called from TypeScript to send an error back to Kotlin
     */
    @ReactMethod
    fun sendError(callbackId: String, errorMessage: String) {
        Log.d(TAG, "sendError called for callbackId: $callbackId, error: $errorMessage")

        val callback = pendingCallbacks.remove(callbackId)
        if (callback != null) {
            callback.onError(errorMessage)
        } else {
            Log.w(TAG, "No callback found for id: $callbackId")
        }
    }

    /**
     * Called from TypeScript to emit an event to Kotlin listeners
     */
    @ReactMethod
    fun emitEvent(eventName: String, data: ReadableMap?) {
        Log.d(TAG, "emitEvent called: $eventName")

        val listeners = eventListeners[eventName]
        if (listeners != null && listeners.isNotEmpty()) {
            val dataMap = data?.let { convertReadableMapToMap(it) } ?: emptyMap()
            listeners.forEach { listener ->
                try {
                    listener(dataMap)
                } catch (e: Exception) {
                    Log.e(TAG, "Error in event listener for $eventName", e)
                }
            }
        } else {
            Log.d(TAG, "No listeners registered for event: $eventName")
        }
    }

    /**
     * Called from TypeScript to log messages (useful for debugging)
     */
    @ReactMethod
    fun log(level: String, message: String) {
        when (level.lowercase()) {
            "debug" -> Log.d(TAG, "[JS] $message")
            "info" -> Log.i(TAG, "[JS] $message")
            "warn" -> Log.w(TAG, "[JS] $message")
            "error" -> Log.e(TAG, "[JS] $message")
            else -> Log.d(TAG, "[JS] $message")
        }
    }

    /**
     * Called from TypeScript to check if the bridge is ready
     */
    @ReactMethod
    fun isReady(promise: Promise) {
        promise.resolve(fragmentRef?.get() != null)
    }

    /**
     * Called from TypeScript to notify that it's ready to receive commands
     */
    @ReactMethod
    fun notifyReady() {
        Log.d(TAG, "TypeScript runtime notified ready")
        // This can be used to trigger any pending initialization
    }

    private fun convertReadableMapToMap(readableMap: ReadableMap): Map<String, Any?> {
        val map = mutableMapOf<String, Any?>()
        val iterator = readableMap.keySetIterator()

        while (iterator.hasNextKey()) {
            val key = iterator.nextKey()
            when (readableMap.getType(key)) {
                com.facebook.react.bridge.ReadableType.Null -> map[key] = null
                com.facebook.react.bridge.ReadableType.Boolean -> map[key] = readableMap.getBoolean(key)
                com.facebook.react.bridge.ReadableType.Number -> map[key] = readableMap.getDouble(key)
                com.facebook.react.bridge.ReadableType.String -> map[key] = readableMap.getString(key)
                com.facebook.react.bridge.ReadableType.Map -> {
                    readableMap.getMap(key)?.let {
                        map[key] = convertReadableMapToMap(it)
                    }
                }
                com.facebook.react.bridge.ReadableType.Array -> {
                    readableMap.getArray(key)?.let { array ->
                        val list = mutableListOf<Any?>()
                        for (i in 0 until array.size()) {
                            when (array.getType(i)) {
                                com.facebook.react.bridge.ReadableType.Null -> list.add(null)
                                com.facebook.react.bridge.ReadableType.Boolean -> list.add(array.getBoolean(i))
                                com.facebook.react.bridge.ReadableType.Number -> list.add(array.getDouble(i))
                                com.facebook.react.bridge.ReadableType.String -> list.add(array.getString(i))
                                com.facebook.react.bridge.ReadableType.Map -> {
                                    array.getMap(i)?.let { list.add(convertReadableMapToMap(it)) }
                                }
                                com.facebook.react.bridge.ReadableType.Array -> {
                                    // Nested arrays - simplified handling
                                    list.add(null)
                                }
                            }
                        }
                        map[key] = list
                    }
                }
            }
        }
        return map
    }
}

/**
 * Package to register the ReactNativeBridge module
 */
class ReactNativeBridgePackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(ReactNativeBridge(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
