package expo.modules

import expo.modules.core.interfaces.Package
import expo.modules.kotlin.ModulesProvider
import expo.modules.kotlin.modules.Module
import com.example.skydioandroidapp.CommandBridge

/**
 * Custom ExpoModulesPackageList that includes app-level modules plus
 * all auto-linked expo modules.
 *
 * This class is discovered by ExpoModulesHelper via reflection and provides
 * the list of Expo modules to register.
 */
class ExpoModulesPackageList : ModulesProvider {

    companion object {
        private val packagesList: List<Package> = listOf(
            expo.modules.adapters.react.ReactAdapterPackage(),
            expo.modules.constants.ConstantsPackage(),
            expo.modules.core.BasePackage(),
            expo.modules.filesystem.legacy.FileSystemPackage(),
            expo.modules.keepawake.KeepAwakePackage(),
            expo.modules.kotlin.edgeToEdge.EdgeToEdgePackage(),
            expo.modules.linking.ExpoLinkingPackage(),
            expo.modules.systemui.SystemUIPackage()
        )

        @JvmStatic
        fun getPackageList(): List<Package> = packagesList
    }

    override fun getModulesList(): List<Class<out Module>> {
        return listOf(
            // App-level modules
            CommandBridge::class.java,
            // Auto-linked expo modules
            expo.modules.fetch.ExpoFetchModule::class.java,
            expo.modules.asset.AssetModule::class.java,
            expo.modules.constants.ConstantsModule::class.java,
            expo.modules.filesystem.FileSystemModule::class.java,
            expo.modules.filesystem.legacy.FileSystemLegacyModule::class.java,
            expo.modules.font.FontLoaderModule::class.java,
            expo.modules.font.FontUtilsModule::class.java,
            expo.modules.haptics.HapticsModule::class.java,
            expo.modules.image.ExpoImageModule::class.java,
            expo.modules.keepawake.KeepAwakeModule::class.java,
            expo.modules.linking.ExpoLinkingModule::class.java,
            expo.modules.splashscreen.SplashScreenModule::class.java,
            expo.modules.systemui.SystemUIModule::class.java,
            expo.modules.webbrowser.WebBrowserModule::class.java
        )
    }
}
