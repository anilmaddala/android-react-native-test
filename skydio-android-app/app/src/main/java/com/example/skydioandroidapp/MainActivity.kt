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
import androidx.compose.material.icons.filled.AccountBox
import androidx.compose.material.icons.filled.Home
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
import androidx.compose.runtime.DisposableEffect
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

        // Initialize the headless React Native fragment
        initializeHeadlessFragment()

        setContent {
            SkydioAndroidAppTheme {
                SkydioAndroidAppApp(
                    onExecuteCommand = { commandName, params, onResult, onError ->
                        executeTypeScriptCommand(commandName, params, onResult, onError)
                    },
                    isReactNativeReady = { headlessFragment?.isReady() == true }
                )
            }
        }
    }

    private fun initializeHeadlessFragment() {
        // Check if fragment already exists (e.g., after configuration change)
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

        // Set up event listener for TypeScript events
        ReactNativeBridge.addEventListener("processingComplete") { data ->
            Log.d(TAG, "Received processingComplete event: $data")
        }

        ReactNativeBridge.addEventListener("periodicUpdate") { data ->
            Log.d(TAG, "Received periodicUpdate event: $data")
        }

        ReactNativeBridge.addEventListener("periodicComplete") { data ->
            Log.d(TAG, "Received periodicComplete event: $data")
        }
    }

    private fun executeTypeScriptCommand(
        commandName: String,
        params: Map<String, Any?>,
        onResult: (Any?) -> Unit,
        onError: (String) -> Unit
    ) {
        Log.d(TAG, "Executing TypeScript command: $commandName")
        headlessFragment?.executeCommand(
            commandName = commandName,
            params = params,
            onSuccess = { result ->
                Log.d(TAG, "Command $commandName succeeded: $result")
                runOnUiThread { onResult(result) }
            },
            onError = { error ->
                Log.e(TAG, "Command $commandName failed: $error")
                runOnUiThread { onError(error) }
            }
        )
    }

    override fun onDestroy() {
        super.onDestroy()
        ReactNativeBridge.clearEventListeners("processingComplete")
        ReactNativeBridge.clearEventListeners("periodicUpdate")
        ReactNativeBridge.clearEventListeners("periodicComplete")
    }
}

enum class AppDestinations(
    val label: String,
    val icon: ImageVector,
) {
    HOME("Home", Icons.Default.Home),
    COMMANDS("Commands", Icons.Default.PlayArrow),
    PROFILE("Profile", Icons.Default.AccountBox),
}

@Composable
fun SkydioAndroidAppApp(
    onExecuteCommand: (String, Map<String, Any?>, (Any?) -> Unit, (String) -> Unit) -> Unit,
    isReactNativeReady: () -> Boolean
) {
    var currentDestination by rememberSaveable { mutableStateOf(AppDestinations.HOME) }

    NavigationSuiteScaffold(
        navigationSuiteItems = {
            AppDestinations.entries.forEach {
                item(
                    icon = {
                        Icon(
                            it.icon,
                            contentDescription = it.label
                        )
                    },
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
                AppDestinations.COMMANDS -> CommandsScreen(
                    modifier = Modifier.padding(innerPadding),
                    onExecuteCommand = onExecuteCommand,
                    isReactNativeReady = isReactNativeReady
                )
                AppDestinations.PROFILE -> ProfileScreen(
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

    // Poll for ready state
    LaunchedEffect(Unit) {
        while (!isReady) {
            isReady = isReactNativeReady()
            if (!isReady) {
                kotlinx.coroutines.delay(100)
            }
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
            text = "Headless React Native Demo",
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
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "React Native Status:",
                    style = MaterialTheme.typography.bodyLarge
                )
                if (isReady) {
                    Text(
                        text = "Ready",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                } else {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        CircularProgressIndicator(
                            modifier = Modifier.height(16.dp)
                        )
                        Text(
                            text = "Initializing...",
                            style = MaterialTheme.typography.bodyLarge
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = "This app demonstrates React Native running in headless mode.\n\n" +
                   "React Native executes TypeScript business logic without rendering any UI.\n\n" +
                   "All UI is rendered by Jetpack Compose.\n\n" +
                   "Go to the Commands tab to execute TypeScript functions from Kotlin.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
    }
}

@Composable
fun CommandsScreen(
    modifier: Modifier = Modifier,
    onExecuteCommand: (String, Map<String, Any?>, (Any?) -> Unit, (String) -> Unit) -> Unit,
    isReactNativeReady: () -> Boolean
) {
    val results = remember { mutableStateListOf<String>() }
    var isLoading by remember { mutableStateOf(false) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "Execute TypeScript Commands",
            style = MaterialTheme.typography.headlineSmall
        )

        HorizontalDivider()

        // Calculate Sum
        CommandButton(
            title = "Calculate Sum (5 + 3)",
            isLoading = isLoading,
            onClick = {
                isLoading = true
                onExecuteCommand(
                    "calculateSum",
                    mapOf("a" to 5, "b" to 3),
                    { result ->
                        results.add(0, "calculateSum: $result")
                        isLoading = false
                    },
                    { error ->
                        results.add(0, "calculateSum ERROR: $error")
                        isLoading = false
                    }
                )
            }
        )

        // Fetch User Data
        CommandButton(
            title = "Fetch User Data",
            isLoading = isLoading,
            onClick = {
                isLoading = true
                onExecuteCommand(
                    "fetchUserData",
                    mapOf("userId" to "user_123"),
                    { result ->
                        results.add(0, "fetchUserData: $result")
                        isLoading = false
                    },
                    { error ->
                        results.add(0, "fetchUserData ERROR: $error")
                        isLoading = false
                    }
                )
            }
        )

        // Get Configuration
        CommandButton(
            title = "Get Configuration",
            isLoading = isLoading,
            onClick = {
                isLoading = true
                onExecuteCommand(
                    "getConfiguration",
                    emptyMap(),
                    { result ->
                        results.add(0, "getConfiguration: $result")
                        isLoading = false
                    },
                    { error ->
                        results.add(0, "getConfiguration ERROR: $error")
                        isLoading = false
                    }
                )
            }
        )

        // Validate Input (Valid)
        CommandButton(
            title = "Validate Input (Valid)",
            isLoading = isLoading,
            onClick = {
                isLoading = true
                onExecuteCommand(
                    "validateInput",
                    mapOf("email" to "test@example.com", "password" to "securepassword123"),
                    { result ->
                        results.add(0, "validateInput (valid): $result")
                        isLoading = false
                    },
                    { error ->
                        results.add(0, "validateInput ERROR: $error")
                        isLoading = false
                    }
                )
            }
        )

        // Validate Input (Invalid)
        CommandButton(
            title = "Validate Input (Invalid)",
            isLoading = isLoading,
            onClick = {
                isLoading = true
                onExecuteCommand(
                    "validateInput",
                    mapOf("email" to "invalid", "password" to "short"),
                    { result ->
                        results.add(0, "validateInput (invalid): $result")
                        isLoading = false
                    },
                    { error ->
                        results.add(0, "validateInput ERROR: $error")
                        isLoading = false
                    }
                )
            }
        )

        // Risky Operation (Success)
        CommandButton(
            title = "Risky Operation (Success)",
            isLoading = isLoading,
            onClick = {
                isLoading = true
                onExecuteCommand(
                    "riskyOperation",
                    mapOf("shouldFail" to false),
                    { result ->
                        results.add(0, "riskyOperation (success): $result")
                        isLoading = false
                    },
                    { error ->
                        results.add(0, "riskyOperation ERROR: $error")
                        isLoading = false
                    }
                )
            }
        )

        // Risky Operation (Fail)
        CommandButton(
            title = "Risky Operation (Fail)",
            isLoading = isLoading,
            onClick = {
                isLoading = true
                onExecuteCommand(
                    "riskyOperation",
                    mapOf("shouldFail" to true),
                    { result ->
                        results.add(0, "riskyOperation (fail): $result")
                        isLoading = false
                    },
                    { error ->
                        results.add(0, "riskyOperation ERROR: $error")
                        isLoading = false
                    }
                )
            }
        )

        // Clear Results
        Button(
            onClick = { results.clear() },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Clear Results")
        }

        HorizontalDivider()

        Text(
            text = "Results:",
            style = MaterialTheme.typography.titleMedium
        )

        if (results.isEmpty()) {
            Text(
                text = "No results yet. Click a command button above.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        } else {
            results.forEach { result ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(
                        containerColor = if (result.contains("ERROR"))
                            MaterialTheme.colorScheme.errorContainer
                        else
                            MaterialTheme.colorScheme.surfaceVariant
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
fun CommandButton(
    title: String,
    isLoading: Boolean,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        enabled = !isLoading,
        modifier = Modifier.fillMaxWidth()
    ) {
        if (isLoading) {
            CircularProgressIndicator(
                modifier = Modifier.height(16.dp),
                color = MaterialTheme.colorScheme.onPrimary
            )
        } else {
            Text(title)
        }
    }
}

@Composable
fun ProfileScreen(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Profile Screen",
            style = MaterialTheme.typography.headlineMedium
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "This screen is rendered entirely by Jetpack Compose",
            style = MaterialTheme.typography.bodyMedium
        )
    }
}
