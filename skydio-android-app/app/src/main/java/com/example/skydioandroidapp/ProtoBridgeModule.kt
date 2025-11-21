package com.example.skydioandroidapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

/**
 * Native module that provides the event emitter for TypeScript to listen to
 */
class ProtoBridgeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "ProtoBridge"

    // This module just needs to exist for the NativeEventEmitter in JS
    // The actual events are sent via DeviceEventManagerModule
}
