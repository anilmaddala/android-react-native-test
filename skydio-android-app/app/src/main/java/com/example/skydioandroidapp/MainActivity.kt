package com.example.skydioandroidapp

import android.os.Bundle
import android.util.Log
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.fragment.app.FragmentActivity
import com.example.skydioandroidapp.ui.theme.SkydioAndroidAppTheme

/**
 * MainActivity demonstrates Kotlin → TypeScript communication via CommandBridge.
 *
 * Architecture:
 * - Business logic lives in TypeScript (Zustand stores)
 * - Kotlin sends commands via CommandBridge
 * - TypeScript processes and responds
 * - All UI is Jetpack Compose
 */
class MainActivity : FragmentActivity() {

    companion object {
        private const val TAG = "MainActivity"
        private const val FRAGMENT_TAG = "headless_rn_fragment"
    }

    private var headlessFragment: HeadlessReactNativeFragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate")
        enableEdgeToEdge()

        initializeHeadlessFragment()

        setContent {
            SkydioAndroidAppTheme {
                SkydioAndroidAppApp(
                    isReactNativeReady = { headlessFragment?.isReady() == true },
                    onSendCommand = { command, params, callback ->
                        sendCommand(command, params, callback)
                    }
                )
            }
        }
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

    private fun sendCommand(
        command: String,
        params: Map<String, Any?>,
        callback: (Any?, String?) -> Unit
    ) {
        Log.d(TAG, "Sending command: $command")
        CommandBridge.sendCommand(command, params) { result, error ->
            runOnUiThread {
                callback(result, error)
            }
        }
    }
}

enum class AppDestinations(
    val label: String,
    val icon: ImageVector,
) {
    HOME("Home", Icons.Default.Home),
    DEMO("Demo", Icons.Default.PlayArrow),
    ARCHITECTURE("Architecture", Icons.Default.Info),
}

@Composable
fun SkydioAndroidAppApp(
    isReactNativeReady: () -> Boolean,
    onSendCommand: (String, Map<String, Any?>, (Any?, String?) -> Unit) -> Unit
) {
    var currentDestination by rememberSaveable { mutableStateOf(AppDestinations.HOME) }

    NavigationSuiteScaffold(
        navigationSuiteItems = {
            AppDestinations.entries.forEach {
                item(
                    icon = { Icon(it.icon, contentDescription = it.label) },
                    label = { Text(it.label) },
                    selected = it == currentDestination,
                    onClick = { currentDestination = it }
                )
            }
        }
    ) {
        Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
            when (currentDestination) {
                AppDestinations.HOME -> HomeScreen(
                    modifier = Modifier.padding(innerPadding),
                    isReactNativeReady = isReactNativeReady
                )
                AppDestinations.DEMO -> DemoScreen(
                    modifier = Modifier.padding(innerPadding),
                    onSendCommand = onSendCommand,
                    isReactNativeReady = isReactNativeReady
                )
                AppDestinations.ARCHITECTURE -> ArchitectureScreen(
                    modifier = Modifier.padding(innerPadding)
                )
            }
        }
    }
}

@Composable
fun HomeScreen(
    modifier: Modifier = Modifier,
    isReactNativeReady: () -> Boolean
) {
    var isReady by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        while (!isReady) {
            isReady = isReactNativeReady()
            if (!isReady) kotlinx.coroutines.delay(100)
        }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Zustand + CommandBridge Demo",
            style = MaterialTheme.typography.headlineMedium
        )

        Spacer(modifier = Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = if (isReady)
                    MaterialTheme.colorScheme.primaryContainer
                else
                    MaterialTheme.colorScheme.errorContainer
            )
        ) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("TypeScript Runtime:", style = MaterialTheme.typography.bodyLarge)
                if (isReady) {
                    Text("Ready", color = MaterialTheme.colorScheme.onPrimaryContainer)
                } else {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        CircularProgressIndicator(modifier = Modifier.height(16.dp))
                        Text(" Initializing...")
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = "Business logic runs in TypeScript with Zustand state management.\n\n" +
                   "Kotlin sends commands via CommandBridge → TypeScript processes → responds.\n\n" +
                   "Go to Demo tab to test commands.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
    }
}

@Composable
fun DemoScreen(
    modifier: Modifier = Modifier,
    onSendCommand: (String, Map<String, Any?>, (Any?, String?) -> Unit) -> Unit,
    isReactNativeReady: () -> Boolean
) {
    val results = remember { mutableStateListOf<String>() }
    var isLoading by remember { mutableStateOf(false) }
    var counter by remember { mutableStateOf(0) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Execute TypeScript Commands", style = MaterialTheme.typography.headlineSmall)
        Text("Counter: $counter", style = MaterialTheme.typography.titleLarge)

        HorizontalDivider()

        // Counter commands
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(
                onClick = {
                    isLoading = true
                    onSendCommand("increment", emptyMap()) { result, error ->
                        isLoading = false
                        if (error != null) {
                            results.add(0, "increment ERROR: $error")
                        } else {
                            val newCounter = (result as? Map<*, *>)?.get("counter") as? Number
                            counter = newCounter?.toInt() ?: counter
                            results.add(0, "increment: counter = $counter")
                        }
                    }
                },
                enabled = !isLoading
            ) { Text("+") }

            Button(
                onClick = {
                    isLoading = true
                    onSendCommand("decrement", emptyMap()) { result, error ->
                        isLoading = false
                        if (error != null) {
                            results.add(0, "decrement ERROR: $error")
                        } else {
                            val newCounter = (result as? Map<*, *>)?.get("counter") as? Number
                            counter = newCounter?.toInt() ?: counter
                            results.add(0, "decrement: counter = $counter")
                        }
                    }
                },
                enabled = !isLoading
            ) { Text("-") }

            Button(
                onClick = {
                    isLoading = true
                    onSendCommand("getCounter", emptyMap()) { result, error ->
                        isLoading = false
                        if (error != null) {
                            results.add(0, "getCounter ERROR: $error")
                        } else {
                            val newCounter = (result as? Map<*, *>)?.get("counter") as? Number
                            counter = newCounter?.toInt() ?: counter
                            results.add(0, "getCounter: $counter")
                        }
                    }
                },
                enabled = !isLoading
            ) { Text("Get") }
        }

        HorizontalDivider()

        // Calculate Sum
        Button(
            onClick = {
                isLoading = true
                onSendCommand("calculateSum", mapOf("a" to 6, "b" to 7)) { result, error ->
                    isLoading = false
                    if (error != null) {
                        results.add(0, "calculateSum ERROR: $error")
                    } else {
                        results.add(0, "calculateSum(6, 7): ${(result as? Map<*, *>)?.get("result")}")
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Calculate 6 × 7 = ?") }

        // Add User
        Button(
            onClick = {
                isLoading = true
                onSendCommand("addUser", mapOf("name" to "John Doe", "email" to "john@example.com")) { result, error ->
                    isLoading = false
                    if (error != null) {
                        results.add(0, "addUser ERROR: $error")
                    } else {
                        results.add(0, "addUser: ${result}")
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Add User") }

        // Get Users
        Button(
            onClick = {
                isLoading = true
                onSendCommand("getUsers", emptyMap()) { result, error ->
                    isLoading = false
                    if (error != null) {
                        results.add(0, "getUsers ERROR: $error")
                    } else {
                        val users = (result as? Map<*, *>)?.get("users")
                        results.add(0, "getUsers: $users")
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Get Users") }

        // Get State
        Button(
            onClick = {
                isLoading = true
                onSendCommand("getState", emptyMap()) { result, error ->
                    isLoading = false
                    if (error != null) {
                        results.add(0, "getState ERROR: $error")
                    } else {
                        results.add(0, "getState: $result")
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Get Full State") }

        // Validate Input
        Button(
            onClick = {
                isLoading = true
                onSendCommand("validateInput", mapOf("email" to "invalid", "password" to "short")) { result, error ->
                    isLoading = false
                    if (error != null) {
                        results.add(0, "validateInput ERROR: $error")
                    } else {
                        results.add(0, "validateInput: $result")
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Validate (Invalid Input)") }

        // Clear
        Button(
            onClick = { results.clear() },
            modifier = Modifier.fillMaxWidth()
        ) { Text("Clear Results") }

        HorizontalDivider()

        Text("Results:", style = MaterialTheme.typography.titleMedium)

        if (results.isEmpty()) {
            Text("No results yet.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        } else {
            results.forEach { result ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(
                        containerColor = if (result.contains("ERROR"))
                            MaterialTheme.colorScheme.errorContainer
                        else MaterialTheme.colorScheme.surfaceVariant
                    )
                ) {
                    Text(
                        text = result,
                        style = MaterialTheme.typography.bodySmall,
                        fontFamily = FontFamily.Monospace,
                        modifier = Modifier.padding(12.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun ArchitectureScreen(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Architecture", style = MaterialTheme.typography.headlineMedium)

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Kotlin Side", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "• CommandBridge.kt - Sends commands to TypeScript\n" +
                    "• HeadlessReactNativeFragment.kt - RN lifecycle\n" +
                    "• MainActivity.kt - Compose UI",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("TypeScript Side", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "• stores/appStore.ts - Zustand state & business logic\n" +
                    "• bridge/commandHandler.ts - Processes commands\n" +
                    "• src/headless.ts - Entry point",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Data Flow", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "1. Kotlin: CommandBridge.sendCommand(\"increment\")\n" +
                    "2. Event → TypeScript CommandHandler\n" +
                    "3. CommandHandler → Zustand store.increment()\n" +
                    "4. Result → CommandBridge.sendResponse()\n" +
                    "5. Kotlin callback receives result",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Benefits", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "✓ Business logic in TypeScript\n" +
                    "✓ Zustand for state management\n" +
                    "✓ Hot reload for JS changes\n" +
                    "✓ Full npm ecosystem access\n" +
                    "✓ Minimal bridge code",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }
    }
}
