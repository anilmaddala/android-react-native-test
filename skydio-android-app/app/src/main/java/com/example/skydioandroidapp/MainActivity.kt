package com.example.skydioandroidapp

import android.os.Bundle
import android.util.Log
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.fragment.app.FragmentActivity
import com.example.skydioandroidapp.ui.theme.SkydioAndroidAppTheme
import dagger.hilt.android.AndroidEntryPoint

/**
 * Command Bridge Test Activity
 *
 * This activity demonstrates bidirectional communication between Kotlin and TypeScript:
 * 1. Creates a HeadlessReactNativeFragment
 * 2. Shows "Loading..." until React Native is ready
 * 3. Provides buttons to send increment/decrement commands
 * 4. Displays results in the UI
 */
@AndroidEntryPoint
class MainActivity : FragmentActivity() {

    companion object {
        private const val TAG = "MainActivity"
        private const val FRAGMENT_TAG = "headless_rn_fragment"
    }

    private var headlessFragment: HeadlessReactNativeFragment? = null
    private var commandBridge: CommandBridge? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate - Initializing React Native with CommandBridge")

        initializeHeadlessFragment()

        setContent {
            SkydioAndroidAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    CommandBridgeTestScreen(
                        isReactNativeReady = { headlessFragment?.isReady() == true },
                        onSendCommand = { command -> sendCommand(command) }
                    )
                }
            }
        }
    }

    private fun sendCommand(command: String) {
        val bridge = getCommandBridge()
        if (bridge == null) {
            Log.e(TAG, "CommandBridge not available")
            return
        }

        Log.d(TAG, "Sending command: $command")
        bridge.sendCommand(command) { result, error ->
            if (error != null) {
                Log.e(TAG, "Command error: $error")
            } else {
                Log.d(TAG, "Command result: $result")
            }
        }
    }

    private fun getCommandBridge(): CommandBridge? {
        if (commandBridge != null) {
            Log.d(TAG, "Returning cached CommandBridge")
            return commandBridge
        }

        Log.d(TAG, "Attempting to get CommandBridge...")

        val app = application as? MainApplication
        if (app == null) {
            Log.e(TAG, "Application is not MainApplication")
            return null
        }

        if (!app.isReactNativeInitialized()) {
            Log.e(TAG, "React Native not initialized")
            return null
        }

        Log.d(TAG, "React Native is initialized, getting CommandBridge instance...")

        // Use singleton instance instead of getNativeModule()
        commandBridge = CommandBridge.getInstance()
        if (commandBridge == null) {
            Log.e(TAG, "CommandBridge singleton not available yet")
        } else {
            Log.d(TAG, "CommandBridge acquired from singleton successfully")
        }
        return commandBridge
    }

    private fun initializeHeadlessFragment() {
        var fragment = supportFragmentManager.findFragmentByTag(FRAGMENT_TAG) as? HeadlessReactNativeFragment

        if (fragment == null) {
            Log.d(TAG, "Creating new HeadlessReactNativeFragment")
            fragment = HeadlessReactNativeFragment.newInstance()
            supportFragmentManager.beginTransaction()
                .add(fragment, FRAGMENT_TAG)
                .commit()
        } else {
            Log.d(TAG, "Reusing existing HeadlessReactNativeFragment")
        }

        headlessFragment = fragment
    }
}

@Composable
fun CommandBridgeTestScreen(
    isReactNativeReady: () -> Boolean,
    onSendCommand: (String) -> Unit
) {
    var isReady by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        while (!isReady) {
            isReady = isReactNativeReady()
            if (!isReady) kotlinx.coroutines.delay(100)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Command Bridge Test",
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.primary
        )

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = if (isReady) "✓ React Native Ready!" else "Loading...",
            style = MaterialTheme.typography.headlineMedium,
            color = if (isReady) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline
        )

        Spacer(modifier = Modifier.height(32.dp))

        if (isReady) {
            Text(
                text = "Test Commands:",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurface
            )

            Spacer(modifier = Modifier.height(16.dp))

            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Button(onClick = { onSendCommand("increment") }) {
                    Text("Increment")
                }

                Button(onClick = { onSendCommand("decrement") }) {
                    Text("Decrement")
                }

                Button(onClick = { onSendCommand("getCounter") }) {
                    Text("Get Value")
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            Text(
                text = "Check logcat for command results:",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface
            )

            Text(
                text = "adb logcat | grep -E \"(CommandBridge|Handlers|Store)\"",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.outline
            )
        } else {
            Text(
                text = "Initializing React Native...",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}
