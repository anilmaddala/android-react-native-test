#!/usr/bin/env node
/**
 * Bridge Code Generator
 *
 * Generates Kotlin and TypeScript bridge code from proto service definitions.
 * Configuration is read from bridge.yaml (similar to Djinni's approach).
 *
 * Usage: node scripts/generate-bridge.js [--config path/to/bridge.yaml]
 */

const fs = require('fs');
const path = require('path');
const protobuf = require('protobufjs');
const yaml = require('yaml');

// Parse command line arguments
const args = process.argv.slice(2);
let configPath = path.join(__dirname, '../bridge.yaml');

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--config' && args[i + 1]) {
    configPath = path.resolve(args[i + 1]);
    i++;
  }
}

// Load configuration
function loadConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`);
    process.exit(1);
  }

  const configContent = fs.readFileSync(configPath, 'utf8');
  return yaml.parse(configContent);
}

async function main() {
  console.log('🚀 Bridge Code Generator\n');
  console.log('Loading configuration...');
  const config = loadConfig(configPath);
  const rootDir = path.dirname(configPath);

  // Resolve paths relative to config file
  const protoFile = path.join(rootDir, config.proto.file);
  const kotlinOutDir = path.join(rootDir, config.kotlin.out_dir);
  const tsOutDir = path.join(rootDir, config.typescript.out_dir);

  // Compute Kotlin output path from package
  const kotlinPackagePath = config.kotlin.package.replace(/\./g, '/');
  const kotlinOutputFile = path.join(kotlinOutDir, kotlinPackagePath, `${config.kotlin.class_name}.kt`);
  const tsOutputFile = path.join(tsOutDir, `${config.typescript.module_name}.ts`);

  console.log(`Proto file: ${protoFile}`);
  console.log(`Kotlin output: ${kotlinOutputFile}`);
  console.log(`TypeScript output: ${tsOutputFile}`);

  // Load proto file
  console.log('\nParsing proto file...');
  const root = await protobuf.load(protoFile);

  const services = [];
  const messages = new Map();

  // Collect all services and messages
  function walk(obj, namespace = '') {
    if (obj.nested) {
      for (const [name, child] of Object.entries(obj.nested)) {
        const fullName = namespace ? `${namespace}.${name}` : name;
        if (child.methods) {
          services.push({ name, methods: child.methods, namespace });
        } else if (child.fields) {
          messages.set(name, { name, fields: child.fields, namespace });
        }
        walk(child, fullName);
      }
    }
  }

  walk(root);

  if (services.length === 0) {
    console.log('\n⚠️  No services found in proto file.');
    console.log('Add a service definition like:');
    console.log('  service CounterService {');
    console.log('    rpc Increment(IncrementCommand) returns (CounterResponse);');
    console.log('  }');
    return;
  }

  // Collect all RPC methods
  const rpcs = [];
  for (const service of services) {
    for (const [methodName, method] of Object.entries(service.methods)) {
      rpcs.push({
        service: service.name,
        method: methodName,
        methodLower: methodName.charAt(0).toLowerCase() + methodName.slice(1),
        requestType: method.requestType,
        responseType: method.responseType,
        responseField: method.responseType.replace('Response', '').charAt(0).toLowerCase() +
                       method.responseType.replace('Response', '').slice(1),
      });
    }
  }

  console.log(`\nFound ${rpcs.length} RPC methods:`);
  rpcs.forEach(rpc => {
    console.log(`  - ${rpc.method}(${rpc.requestType}) → ${rpc.responseType}`);
  });

  // Generate Kotlin code
  console.log('\n📝 Generating Kotlin code...');
  const kotlinCode = generateKotlin(config, rpcs, messages);
  fs.mkdirSync(path.dirname(kotlinOutputFile), { recursive: true });
  fs.writeFileSync(kotlinOutputFile, kotlinCode);
  console.log(`✅ Written: ${kotlinOutputFile}`);

  // Generate TypeScript code
  console.log('\n📝 Generating TypeScript code...');
  const tsCode = generateTypeScript(config, rpcs);
  fs.mkdirSync(path.dirname(tsOutputFile), { recursive: true });
  fs.writeFileSync(tsOutputFile, tsCode);
  console.log(`✅ Written: ${tsOutputFile}`);

  console.log('\n✨ Code generation complete!\n');
}

function protoToKotlinType(protoType) {
  const typeMap = {
    'int32': 'Int',
    'int64': 'Long',
    'uint32': 'Int',
    'uint64': 'Long',
    'sint32': 'Int',
    'sint64': 'Long',
    'fixed32': 'Int',
    'fixed64': 'Long',
    'sfixed32': 'Int',
    'sfixed64': 'Long',
    'bool': 'Boolean',
    'string': 'String',
    'bytes': 'ByteArray',
    'double': 'Double',
    'float': 'Float',
  };
  return typeMap[protoType] || 'Any';
}

function generateKotlin(config, rpcs, messages) {
  const pkg = config.kotlin.package;
  const className = config.kotlin.class_name;
  const protoPackage = config.kotlin.proto_package;

  // Collect unique response types
  const responseTypes = new Set(rpcs.map(rpc => rpc.responseType));

  // Generate data classes for response types
  const dataClasses = Array.from(responseTypes).map(typeName => {
    const msg = messages.get(typeName);
    if (!msg) return `    // ${typeName} not found in proto`;

    const fields = Object.entries(msg.fields).map(([fieldName, field]) => {
      const kotlinType = protoToKotlinType(field.type);
      return `val ${fieldName}: ${kotlinType}`;
    }).join(', ');

    return `    data class ${typeName}(${fields})`;
  }).join('\n');

  return `package ${pkg}

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

/**
 * GENERATED CODE - DO NOT EDIT
 * Generated from: ${config.proto.file}
 *
 * This file is auto-generated by scripts/generate-bridge.js
 * Re-run 'npm run generate' to update this file.
 */
class ${className}(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val TAG = "${className}"
        private const val MODULE_NAME = "${className}"

        // Singleton instance (REQUIRED for New Architecture)
        @Volatile
        private var instance: ${className}? = null

        fun getInstance(): ${className}? = instance

        fun clearInstance() {
            instance = null
        }
    }

    init {
        Log.d(TAG, "${className} native module created")
        instance = this
    }

    override fun getName(): String = MODULE_NAME

    /**
     * Response data classes
     */
${dataClasses}

${rpcs.map(rpc => `
    /**
     * ${rpc.method} command
     * Sends to TypeScript for processing
     */
    fun ${rpc.methodLower}(callback: (result: ${rpc.responseType}?, error: String?) -> Unit) {
        val reactContext = reactApplicationContext

        if (reactContext == null || !reactContext.hasActiveReactInstance()) {
            Log.e(TAG, "React Native context not ready")
            callback(null, "React Native not initialized")
            return
        }

        try {
            Log.d(TAG, "Sending ${rpc.methodLower} command to TypeScript")

            // Emit event to TypeScript
            reactContext
                .getJSModule(com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("${className}_${rpc.method}", "{}")

            // For now, return success immediately
            // TODO: Implement proper callback resolution
            Log.d(TAG, "${rpc.method} command sent successfully")

        } catch (e: Exception) {
            Log.e(TAG, "Error sending ${rpc.methodLower} command", e)
            callback(null, e.message)
        }
    }
`).join('\n')}
}
`;
}

function generateTypeScript(config, rpcs) {
  const moduleName = config.typescript.module_name;

  return `/**
 * GENERATED CODE - DO NOT EDIT
 * Generated from: ${config.proto.file}
 *
 * This file is auto-generated by scripts/generate-bridge.js
 * Re-run 'npm run generate' to update this file.
 */

// Command handler interface
// Implement this interface in your handlers.ts file
export interface CommandHandlers {
${rpcs.map(rpc => `  ${rpc.methodLower}: () => { value: number };`).join('\n')}
}

// Response types (simplified for now)
export interface CommandResponse {
  value: number;
}

/**
 * Initialize command handling
 * Call this from your index.js with your handler implementation
 */
export function initializeCommandHandler(handlers: CommandHandlers) {
  const { NativeModules, NativeEventEmitter } = require('react-native');
  const { CommandBridge } = NativeModules;

  if (!CommandBridge) {
    console.error('[${moduleName}] CommandBridge native module not found!');
    return;
  }

  console.log('[${moduleName}] Initializing command handler');

  const eventEmitter = new NativeEventEmitter(CommandBridge);

${rpcs.map(rpc => `
  eventEmitter.addListener('CommandBridge_${rpc.method}', () => {
    console.log('[${moduleName}] Received ${rpc.method} command');
    try {
      const response = handlers.${rpc.methodLower}();
      console.log('[${moduleName}] ${rpc.method} response:', response);
    } catch (error) {
      console.error('[${moduleName}] ${rpc.method} error:', error);
    }
  });`).join('\n')}

  console.log('[${moduleName}] Command handler initialized (${rpcs.length} commands)');
}
`;
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
