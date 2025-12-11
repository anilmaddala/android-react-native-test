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
import com.example.skydioandroidapp.proto.Response
import com.example.skydioandroidapp.ui.theme.SkydioAndroidAppTheme

/**
 * MainActivity demonstrates type-safe Kotlin ↔ TypeScript communication via Protocol Buffers.
 *
 * Architecture:
 * - Business logic lives in TypeScript (Zustand stores)
 * - Kotlin sends typed protobuf commands via CommandBridge
 * - TypeScript processes and responds with typed protobuf responses
 * - All UI is Jetpack Compose
 *
 * Compile-time type safety:
 * - Commands are defined in proto/commands.proto
 * - Generated Kotlin classes: Command, Response, User, Configuration, etc.
 * - If proto changes, both Kotlin and TypeScript must be updated
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
                    onRunOnUiThread = { runOnUiThread(it) }
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
    onRunOnUiThread: (() -> Unit) -> Unit
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
                    isReactNativeReady = isReactNativeReady,
                    onRunOnUiThread = onRunOnUiThread
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
            text = "Protobuf + Zustand Demo",
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
            text = "Type-safe Kotlin ↔ TypeScript communication using Protocol Buffers.\n\n" +
                   "Commands/responses defined in proto/commands.proto.\n\n" +
                   "Compile-time safety: If proto changes, both sides must update.\n\n" +
                   "Go to Demo tab to test commands.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
    }
}

@Composable
fun DemoScreen(
    modifier: Modifier = Modifier,
    isReactNativeReady: () -> Boolean,
    onRunOnUiThread: (() -> Unit) -> Unit
) {
    val results = remember { mutableStateListOf<String>() }
    var isLoading by remember { mutableStateOf(false) }
    var counter by remember { mutableStateOf(0) }

    // Helper to format response result
    fun formatResponse(response: Response): String {
        return when (response.resultCase) {
            Response.ResultCase.COUNTER -> "counter: ${response.counter.value}"
            Response.ResultCase.USER -> "user: ${response.user.user.name} (${response.user.user.email})"
            Response.ResultCase.USERS -> "users: ${response.users.usersList.map { it.name }}"
            Response.ResultCase.SUCCESS -> "success: ${response.success.success}"
            Response.ResultCase.SUM -> "result: ${response.sum.result}"
            Response.ResultCase.VALIDATION -> "isValid: ${response.validation.isValid}, errors: ${response.validation.errorsList}"
            Response.ResultCase.CONFIGURATION -> "config: v${response.configuration.config.version}"
            Response.ResultCase.STATE -> "state: counter=${response.state.counter}, users=${response.state.usersList.size}"
            Response.ResultCase.ERROR -> "ERROR: ${response.error.message}"
            else -> "Unknown response type"
        }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Type-Safe Protobuf Commands", style = MaterialTheme.typography.headlineSmall)
        Text("Counter: $counter", style = MaterialTheme.typography.titleLarge)

        HorizontalDivider()

        // Counter commands - using typed API
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(
                onClick = {
                    isLoading = true
                    CommandBridge.increment { response ->
                        onRunOnUiThread {
                            isLoading = false
                            if (response.hasError()) {
                                results.add(0, "increment ERROR: ${response.error.message}")
                            } else {
                                counter = response.counter.value
                                results.add(0, "increment: ${formatResponse(response)}")
                            }
                        }
                    }
                },
                enabled = !isLoading
            ) { Text("+") }

            Button(
                onClick = {
                    isLoading = true
                    CommandBridge.decrement { response ->
                        onRunOnUiThread {
                            isLoading = false
                            if (response.hasError()) {
                                results.add(0, "decrement ERROR: ${response.error.message}")
                            } else {
                                counter = response.counter.value
                                results.add(0, "decrement: ${formatResponse(response)}")
                            }
                        }
                    }
                },
                enabled = !isLoading
            ) { Text("-") }

            Button(
                onClick = {
                    isLoading = true
                    CommandBridge.getCounter { response ->
                        onRunOnUiThread {
                            isLoading = false
                            if (response.hasError()) {
                                results.add(0, "getCounter ERROR: ${response.error.message}")
                            } else {
                                counter = response.counter.value
                                results.add(0, "getCounter: ${formatResponse(response)}")
                            }
                        }
                    }
                },
                enabled = !isLoading
            ) { Text("Get") }
        }

        HorizontalDivider()

        // Calculate Sum - using typed API
        Button(
            onClick = {
                isLoading = true
                CommandBridge.calculateSum(6, 7) { response ->
                    onRunOnUiThread {
                        isLoading = false
                        if (response.hasError()) {
                            results.add(0, "calculateSum ERROR: ${response.error.message}")
                        } else {
                            results.add(0, "calculateSum(6, 7): ${formatResponse(response)}")
                        }
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Calculate 6 + 7 = ?") }

        // Add User - using typed API
        Button(
            onClick = {
                isLoading = true
                CommandBridge.addUser("John Doe", "john@example.com") { response ->
                    onRunOnUiThread {
                        isLoading = false
                        if (response.hasError()) {
                            results.add(0, "addUser ERROR: ${response.error.message}")
                        } else {
                            results.add(0, "addUser: ${formatResponse(response)}")
                        }
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Add User") }

        // Get Users - using typed API
        Button(
            onClick = {
                isLoading = true
                CommandBridge.getUsers { response ->
                    onRunOnUiThread {
                        isLoading = false
                        if (response.hasError()) {
                            results.add(0, "getUsers ERROR: ${response.error.message}")
                        } else {
                            results.add(0, "getUsers: ${formatResponse(response)}")
                        }
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Get Users") }

        // Get State - using typed API
        Button(
            onClick = {
                isLoading = true
                CommandBridge.getState { response ->
                    onRunOnUiThread {
                        isLoading = false
                        if (response.hasError()) {
                            results.add(0, "getState ERROR: ${response.error.message}")
                        } else {
                            results.add(0, "getState: ${formatResponse(response)}")
                        }
                    }
                }
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) { Text("Get Full State") }

        // Validate Input - using typed API
        Button(
            onClick = {
                isLoading = true
                CommandBridge.validateInput("invalid", "short") { response ->
                    onRunOnUiThread {
                        isLoading = false
                        if (response.hasError()) {
                            results.add(0, "validateInput ERROR: ${response.error.message}")
                        } else {
                            results.add(0, "validateInput: ${formatResponse(response)}")
                        }
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
                    "• proto/commands.proto - Schema definition\n" +
                    "• CommandBridge.kt - Type-safe command methods\n" +
                    "• Generated protobuf classes (Command, Response, etc.)\n" +
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
                    "• generated/commands.js - Generated protobuf code\n" +
                    "• generated/commands.d.ts - TypeScript types\n" +
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
                    "1. Kotlin: CommandBridge.increment() [typed]\n" +
                    "2. Serialize Command protobuf → base64\n" +
                    "3. Event → TypeScript CommandHandler\n" +
                    "4. Deserialize → Zustand store.increment()\n" +
                    "5. Serialize Response protobuf → base64\n" +
                    "6. Kotlin callback receives typed Response",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Type Safety Benefits", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "✓ Compile-time validation on both sides\n" +
                    "✓ No string-based command names\n" +
                    "✓ Typed parameters and responses\n" +
                    "✓ Schema evolution support\n" +
                    "✓ IDE autocomplete and refactoring",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }
    }
}
