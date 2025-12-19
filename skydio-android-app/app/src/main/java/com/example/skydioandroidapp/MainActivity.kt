package com.example.skydioandroidapp

import android.os.Bundle
import android.util.Log
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
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
 * BARE MINIMUM React Native Test Activity
 *
 * This activity simply:
 * 1. Creates a HeadlessReactNativeFragment
 * 2. Shows "Loading..." until React Native is ready
 * 3. Shows "React Native Ready!" when initialized
 *
 * Check logcat for "[BARE MINIMUM TEST]" messages to verify JS is running.
 */
@AndroidEntryPoint
class MainActivity : FragmentActivity() {

    companion object {
        private const val TAG = "MainActivity"
        private const val FRAGMENT_TAG = "headless_rn_fragment"
    }

    private var headlessFragment: HeadlessReactNativeFragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate - Initializing bare minimum React Native test")

        initializeHeadlessFragment()

        setContent {
            SkydioAndroidAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    BareMinimumTestScreen(
                        isReactNativeReady = { headlessFragment?.isReady() == true }
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
fun BareMinimumTestScreen(isReactNativeReady: () -> Boolean) {
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
            text = "BARE MINIMUM TEST",
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.primary
        )

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = if (isReady) "✓ React Native Ready!" else "Loading...",
            style = MaterialTheme.typography.headlineMedium,
            color = if (isReady) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = if (isReady)
                "Check logcat for '[BARE MINIMUM TEST]' messages.\nIf you see no PlatformConstants error, it works!"
            else
                "Initializing React Native...",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}
