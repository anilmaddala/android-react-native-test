package com.example.skydioandroidapp

import android.util.Log
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.example.skydioandroidapp.generated.CommandBridge

/**
 * React Native Package that registers the CommandBridge native module.
 * Uses the generated CommandBridge from com.example.skydioandroidapp.generated
 */
class CommandBridgePackage : ReactPackage {

    companion object {
        private const val TAG = "CommandBridgePackage"
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        Log.d(TAG, "createNativeModules() called, creating generated CommandBridge")
        val module = CommandBridge(reactContext)
        Log.d(TAG, "CommandBridge created: ${module.name}")
        return listOf(module)
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
