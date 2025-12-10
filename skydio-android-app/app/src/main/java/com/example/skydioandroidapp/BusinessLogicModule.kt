package com.example.skydioandroidapp

import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * Expo Module that exposes business logic to TypeScript.
 *
 * This module uses Expo Modules API to automatically generate
 * the bridge code - no manual bridge implementation needed!
 *
 * Usage from TypeScript:
 *   import BusinessLogic from './BusinessLogicModule';
 *   const result = await BusinessLogic.calculateSum(5, 3);
 */
class BusinessLogicModule : Module() {

    companion object {
        private const val TAG = "BusinessLogicModule"
    }

    // Coroutine scope for background tasks
    private val moduleScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

    override fun definition() = ModuleDefinition {
        // Module name - used in TypeScript: requireNativeModule('BusinessLogic')
        Name("BusinessLogic")

        // Define events that can be sent to TypeScript
        Events("onProcessingComplete", "onPeriodicUpdate", "onPeriodicComplete")

        // Simple synchronous function
        Function("getConfiguration") {
            Log.d(TAG, "getConfiguration called")
            mapOf(
                "version" to "1.0.0",
                "features" to mapOf(
                    "analytics" to true,
                    "notifications" to true,
                    "darkMode" to false
                ),
                "apiEndpoint" to "https://api.example.com",
                "maxRetries" to 3
            )
        }

        // Synchronous validation function
        Function("validateInput") { email: String, password: String ->
            Log.d(TAG, "validateInput called")
            val errors = mutableListOf<String>()

            if (email.isBlank()) {
                errors.add("Email is required")
            } else if (!email.contains("@")) {
                errors.add("Invalid email format")
            }

            if (password.isBlank()) {
                errors.add("Password is required")
            } else if (password.length < 8) {
                errors.add("Password must be at least 8 characters")
            }

            mapOf(
                "isValid" to errors.isEmpty(),
                "errors" to errors
            )
        }

        // Async function using Coroutine
        AsyncFunction("calculateSum") Coroutine { a: Int, b: Int ->
            Log.d(TAG, "calculateSum called: $a + $b")
            // Simulate some async work
            delay(100)
            a + b
        }

        // Async function that fetches data
        AsyncFunction("fetchUserData") Coroutine { userId: String ->
            Log.d(TAG, "fetchUserData called for userId: $userId")
            // Simulate API call
            delay(500)
            mapOf(
                "id" to userId,
                "name" to "John Doe",
                "email" to "john@example.com",
                "timestamp" to System.currentTimeMillis()
            )
        }

        // Async function that processes data and emits events
        AsyncFunction("processData") Coroutine { items: List<Map<String, Any>> ->
            Log.d(TAG, "processData called with ${items.size} items")
            // Simulate processing
            delay(200)

            val processed = items.mapIndexed { index, item ->
                item.toMutableMap().apply {
                    put("processed", true)
                    put("index", index)
                }
            }

            // Emit event to TypeScript
            sendEvent("onProcessingComplete", mapOf(
                "count" to processed.size,
                "timestamp" to System.currentTimeMillis()
            ))

            mapOf(
                "items" to processed,
                "count" to processed.size
            )
        }

        // Async function that can fail
        AsyncFunction("riskyOperation") Coroutine { shouldFail: Boolean ->
            Log.d(TAG, "riskyOperation called: shouldFail=$shouldFail")
            delay(100)

            if (shouldFail) {
                throw Exception("Operation failed as requested")
            }

            mapOf("success" to true)
        }

        // Start a periodic task that emits events
        AsyncFunction("startPeriodicTask") Coroutine { intervalMs: Long, count: Int ->
            Log.d(TAG, "startPeriodicTask called: interval=${intervalMs}ms, count=$count")

            // Launch periodic updates in background
            moduleScope.launch {
                var remaining = count
                while (remaining > 0) {
                    delay(intervalMs)
                    remaining--
                    this@BusinessLogicModule.sendEvent("onPeriodicUpdate", mapOf(
                        "remaining" to remaining,
                        "timestamp" to System.currentTimeMillis()
                    ))
                }
                this@BusinessLogicModule.sendEvent("onPeriodicComplete", mapOf(
                    "timestamp" to System.currentTimeMillis()
                ))
            }

            mapOf("started" to true)
        }

        // Function to demonstrate calling from Kotlin side
        // This can be invoked by the Fragment/Activity
        Function("ping") {
            Log.d(TAG, "ping called")
            "pong"
        }
    }
}
