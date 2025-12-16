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
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.fragment.app.FragmentActivity
import com.example.skydioandroidapp.ui.theme.SkydioAndroidAppTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : FragmentActivity() {

    companion object {
        private const val TAG = "MainActivity"
        private const val FRAGMENT_TAG = "headless_rn_fragment"
    }

    private var headlessFragment: HeadlessReactNativeFragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate")

        initializeHeadlessFragment()

        setContent {
            SkydioAndroidAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MainScreen(
                        isReactNativeReady = { headlessFragment?.isReady() == true },
                        onRunOnUiThread = { runOnUiThread(it) }
                    )
                }
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

@Composable
fun MainScreen(
    isReactNativeReady: () -> Boolean,
    onRunOnUiThread: (() -> Unit) -> Unit
) {
    var isReady by remember { mutableStateOf(false) }
    var counter by remember { mutableIntStateOf(0) }

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
            text = if (isReady) "TypeScript Ready" else "Loading...",
            style = MaterialTheme.typography.titleMedium,
            color = if (isReady) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline
        )

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = "$counter",
            style = MaterialTheme.typography.displayLarge
        )

        Spacer(modifier = Modifier.height(24.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Button(
                onClick = {
                    CommandBridge.decrement { response ->
                        onRunOnUiThread {
                            if (!response.hasError()) {
                                counter = response.counter.value
                            }
                        }
                    }
                },
                enabled = isReady
            ) {
                Text("-", style = MaterialTheme.typography.headlineMedium)
            }

            Button(
                onClick = {
                    CommandBridge.increment { response ->
                        onRunOnUiThread {
                            if (!response.hasError()) {
                                counter = response.counter.value
                            }
                        }
                    }
                },
                enabled = isReady
            ) {
                Text("+", style = MaterialTheme.typography.headlineMedium)
            }
        }
    }
}
