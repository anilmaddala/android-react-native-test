package com.example.skydioandroidapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBox
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.platform.LocalContext
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.tooling.preview.PreviewScreenSizes
import androidx.compose.ui.viewinterop.AndroidView
import com.example.skydioandroidapp.ui.theme.SkydioAndroidAppTheme
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

class MainActivity : ComponentActivity(), DefaultHardwareBackBtnHandler {
    private val reactHost by lazy {
        (application as MainApplication).reactHost
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SkydioAndroidAppTheme {
                SkydioAndroidAppApp()
            }
        }
    }

    override fun onPause() {
        super.onPause()
        reactHost.onHostPause(this)
    }

    override fun onResume() {
        super.onResume()
        reactHost.onHostResume(this, this)
    }

    override fun onDestroy() {
        super.onDestroy()
        reactHost.onHostDestroy(this)
    }

    override fun onUserLeaveHint() {
        super.onUserLeaveHint()
        reactHost.onHostLeaveHint(this)
    }

    override fun onBackPressed() {
        val handled = reactHost.onBackPressed()
        if (!handled) {
            super.onBackPressed()
        }
    }

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }
}

@PreviewScreenSizes
@Composable
fun SkydioAndroidAppApp() {
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
                AppDestinations.HOME -> ProtobufDemoScreen(
                    modifier = Modifier.padding(innerPadding)
                )
                AppDestinations.FAVORITES -> ReactNativeView(
                    modifier = Modifier.padding(innerPadding)
                )
                AppDestinations.PROFILE -> Text(
                    text = "Profile Screen",
                    modifier = Modifier.padding(innerPadding)
                )
            }
        }
    }
}

enum class AppDestinations(
    val label: String,
    val icon: ImageVector,
) {
    HOME("Home", Icons.Default.Home),
    FAVORITES("Favorites", Icons.Default.Favorite),
    PROFILE("Profile", Icons.Default.AccountBox),
}

@Composable
fun ReactNativeView(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val application = context.applicationContext as MainApplication
    val reactHost = remember { application.reactHost }

    val reactSurface = remember(reactHost, context) {
        reactHost.createSurface(context, "main", null)
    }

    DisposableEffect(reactSurface) {
        reactSurface.start()
        onDispose {
            reactSurface.stop()
        }
    }

    AndroidView(
        modifier = modifier.fillMaxSize(),
        factory = {
            reactSurface.view
                ?: throw IllegalStateException("React surface view is not available")
        }
    )
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    SkydioAndroidAppTheme {
        Greeting("Android")
    }
}