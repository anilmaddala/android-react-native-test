package com.example.skydioandroidapp

import android.content.Context
import android.util.AttributeSet
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.AbstractComposeView
import androidx.compose.ui.unit.dp
import com.example.skydioandroidapp.ui.theme.SkydioAndroidAppTheme
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManager

@Composable
fun CounterScreen(modifier: Modifier = Modifier) {
    var count by rememberSaveable { mutableStateOf(0) }

    Surface(modifier = modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            CounterText(count = count)
            Spacer(modifier = Modifier.height(16.dp))
            CounterButtons(
                onIncrement = { count++ },
                onDecrement = { if (count > 0) count-- }
            )
        }
    }
}

@Composable
private fun CounterText(count: Int) {
    Text(
        text = "Count: $count",
        style = MaterialTheme.typography.headlineMedium
    )
}

@Composable
private fun CounterButtons(
    onIncrement: () -> Unit,
    onDecrement: () -> Unit,
) {
    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
        Button(onClick = onDecrement) {
            Text(text = "-")
        }
        Button(onClick = onIncrement) {
            Text(text = "+")
        }
    }
}

class ComposeCounterView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : AbstractComposeView(context, attrs) {

    @Composable
    override fun Content() {
        SkydioAndroidAppTheme {
            CounterScreen()
        }
    }
}

class ComposeCounterViewManager : SimpleViewManager<ComposeCounterView>() {

    override fun getName(): String = "ComposeCounterView"

    override fun createViewInstance(reactContext: ThemedReactContext): ComposeCounterView {
        return ComposeCounterView(reactContext)
    }
}

class ComposeCounterPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> = emptyList()

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
        listOf(ComposeCounterViewManager())
}
