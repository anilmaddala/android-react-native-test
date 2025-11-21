package com.example.skydioandroidapp

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.LifecycleResumeEffect
import com.facebook.react.ReactHost
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

data class User(
    val name: String,
    val email: String,
    val age: Int = 0
)

@Composable
fun ProtobufDemoScreen(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val application = context.applicationContext as MainApplication
    val reactHost = remember { application.reactHost }
    val bridge = remember { JavaScriptBridge(reactHost) }
    val scope = rememberCoroutineScope()

    var counter by remember { mutableStateOf(0) }
    var users by remember { mutableStateOf<List<User>>(emptyList()) }
    var lastResult by remember { mutableStateOf("") }
    var isJsReady by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(false) }

    // Check if JS runtime is ready
    LifecycleResumeEffect(Unit) {
        scope.launch {
            // Wait a bit for React Native to initialize
            delay(1000)
            isJsReady = bridge.isReady()
            if (isJsReady) {
                lastResult = "✅ JavaScript runtime ready!"
                // Get initial state
                try {
                    isLoading = true
                    val response = bridge.sendGetStateCommand()
                    counter = response.counter
                    users = response.users
                    lastResult = "✅ Initial state loaded"
                } catch (e: Exception) {
                    lastResult = "❌ Error: ${e.message}"
                } finally {
                    isLoading = false
                }
            } else {
                lastResult = "⚠️ JavaScript runtime not ready yet..."
            }
        }
        onPauseOrDispose { }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "Compose ↔ Protobuf ↔ TypeScript/Zustand",
            style = MaterialTheme.typography.headlineSmall
        )

        if (!isJsReady) {
            CircularProgressIndicator()
            Text("Waiting for JavaScript runtime...")
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Counter: $counter",
                    style = MaterialTheme.typography.headlineMedium
                )
                Text(
                    text = "Users: ${users.size}",
                    style = MaterialTheme.typography.bodyLarge
                )
            }
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = {
                    scope.launch {
                        try {
                            isLoading = true
                            val newValue = bridge.sendIncrementCommand(1)
                            counter = newValue
                            lastResult = "✅ Incremented to $newValue"
                        } catch (e: Exception) {
                            lastResult = "❌ Error: ${e.message}"
                        } finally {
                            isLoading = false
                        }
                    }
                },
                enabled = isJsReady && !isLoading,
                modifier = Modifier.weight(1f)
            ) {
                Text("Increment")
            }

            Button(
                onClick = {
                    scope.launch {
                        try {
                            isLoading = true
                            val newValue = bridge.sendIncrementCommand(5)
                            counter = newValue
                            lastResult = "✅ Incremented by 5 to $newValue"
                        } catch (e: Exception) {
                            lastResult = "❌ Error: ${e.message}"
                        } finally {
                            isLoading = false
                        }
                    }
                },
                enabled = isJsReady && !isLoading,
                modifier = Modifier.weight(1f)
            ) {
                Text("+5")
            }
        }

        Button(
            onClick = {
                scope.launch {
                    try {
                        isLoading = true
                        val name = "User ${users.size + 1}"
                        val email = "user${users.size + 1}@example.com"
                        val newUsers = bridge.sendAddUserCommand(name, email, 25)
                        users = newUsers
                        lastResult = "✅ Added $name"
                    } catch (e: Exception) {
                        lastResult = "❌ Error: ${e.message}"
                    } finally {
                        isLoading = false
                    }
                }
            },
            enabled = isJsReady && !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Add User")
        }

        Button(
            onClick = {
                scope.launch {
                    try {
                        isLoading = true
                        val result = bridge.sendMultiplyCommand(6, 7)
                        lastResult = "✅ 6 × 7 = $result"
                    } catch (e: Exception) {
                        lastResult = "❌ Error: ${e.message}"
                    } finally {
                        isLoading = false
                    }
                }
            },
            enabled = isJsReady && !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Calculate 6 × 7")
        }

        if (isLoading) {
            LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Text(
                text = lastResult,
                modifier = Modifier.padding(12.dp),
                style = MaterialTheme.typography.bodyMedium
            )
        }

        if (users.isNotEmpty()) {
            Text(
                text = "Users List:",
                style = MaterialTheme.typography.titleMedium
            )

            LazyColumn(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                items(users) { user ->
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(
                                text = user.name,
                                style = MaterialTheme.typography.titleSmall
                            )
                            Text(
                                text = user.email,
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }
                }
            }
        }
    }
}

// Helper extension functions to build and parse protobuf messages
// In production, use generated protobuf classes

suspend fun JavaScriptBridge.sendIncrementCommand(amount: Int): Int {
    val commandBytes = buildIncrementCommand(amount)
    val responseBytes = sendCommand(commandBytes)
    return parseCounterResponse(responseBytes)
}

suspend fun JavaScriptBridge.sendAddUserCommand(name: String, email: String, age: Int): List<User> {
    val commandBytes = buildAddUserCommand(name, email, age)
    val responseBytes = sendCommand(commandBytes)
    return parseUserListResponse(responseBytes)
}

suspend fun JavaScriptBridge.sendGetStateCommand(): StateResponse {
    val commandBytes = buildGetStateCommand()
    val responseBytes = sendCommand(commandBytes)
    return parseStateResponse(responseBytes)
}

suspend fun JavaScriptBridge.sendMultiplyCommand(a: Int, b: Int): Int {
    val commandBytes = buildMultiplyCommand(a, b)
    val responseBytes = sendCommand(commandBytes)
    return parseCalculationResponse(responseBytes)
}

data class StateResponse(
    val counter: Int,
    val users: List<User>
)

// Simplified protobuf builders (manual encoding for demo)
// TODO: Replace with proper protobuf-generated classes

private fun buildIncrementCommand(amount: Int): ByteArray {
    // This is a simplified version - in production use generated protobuf classes
    // For now, we'll create a minimal valid protobuf message
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","increment":{"amount":$amount}}""".toByteArray()
}

private fun buildAddUserCommand(name: String, email: String, age: Int): ByteArray {
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","addUser":{"name":"$name","email":"$email","age":$age}}""".toByteArray()
}

private fun buildGetStateCommand(): ByteArray {
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","getState":{}}""".toByteArray()
}

private fun buildMultiplyCommand(a: Int, b: Int): ByteArray {
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","multiply":{"a":$a,"b":$b}}""".toByteArray()
}

private fun parseCounterResponse(bytes: ByteArray): Int {
    // Simplified parser - use generated classes in production
    val json = String(bytes)
    val match = """"newValue":(\d+)""".toRegex().find(json)
    return match?.groupValues?.get(1)?.toInt() ?: 0
}

private fun parseUserListResponse(bytes: ByteArray): List<User> {
    // Simplified parser - use generated classes in production
    val json = String(bytes)
    // For demo purposes, we'll return a simplified parse
    // In production, use proper protobuf deserialization
    val users = mutableListOf<User>()
    val userPattern = """"name":"([^"]+)","email":"([^"]+)"""".toRegex()
    userPattern.findAll(json).forEach { match ->
        users.add(User(
            name = match.groupValues[1],
            email = match.groupValues[2]
        ))
    }
    return users
}

private fun parseStateResponse(bytes: ByteArray): StateResponse {
    val json = String(bytes)
    val counter = """"counter":(\d+)""".toRegex().find(json)?.groupValues?.get(1)?.toInt() ?: 0
    val users = parseUserListResponse(bytes)
    return StateResponse(counter, users)
}

private fun parseCalculationResponse(bytes: ByteArray): Int {
    val json = String(bytes)
    val match = """"result":(\d+)""".toRegex().find(json)
    return match?.groupValues?.get(1)?.toInt() ?: 0
}
