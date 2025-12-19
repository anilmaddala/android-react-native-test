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
        requestFields: messages.get(method.requestType)?.fields || {},
      });
    }
  }

  console.log(`\nFound ${rpcs.length} RPC methods:`);
  rpcs.forEach(rpc => {
    console.log(`  - ${rpc.method}(${rpc.requestType}) → ${rpc.responseType}`);
  });

  // Generate Kotlin code
  console.log('\n📝 Generating Kotlin code...');
  const kotlinCode = generateKotlin(rpcs, messages, config.kotlin);
  fs.mkdirSync(path.dirname(kotlinOutputFile), { recursive: true });
  fs.writeFileSync(kotlinOutputFile, kotlinCode);
  console.log(`✅ Written: ${kotlinOutputFile}`);

  // Generate TypeScript code
  console.log('\n📝 Generating TypeScript code...');
  const tsCode = generateTypeScript(rpcs, messages, config.typescript);
  fs.mkdirSync(path.dirname(tsOutputFile), { recursive: true });
  fs.writeFileSync(tsOutputFile, tsCode);
  console.log(`✅ Written: ${tsOutputFile}`);

  console.log('\n✨ Code generation complete!\n');
}

function generateKotlin(rpcs, messages, config) {
  const methods = rpcs.map(rpc => {
    const fields = rpc.requestFields;
    const fieldNames = Object.keys(fields);

    const params = fieldNames.map(name => {
      const field = fields[name];
      const kotlinType = protoToKotlinType(field.type);
      return `${name}: ${kotlinType}`;
    });
    params.push('callback: ((Response) -> Unit)? = null');

    const builderCalls = fieldNames.map(name => {
      const setterName = 'set' + name.charAt(0).toUpperCase() + name.slice(1);
      return `.${setterName}(${name})`;
    }).join('');

    const requestBuilder = fieldNames.length > 0
      ? `${rpc.requestType}.newBuilder()${builderCalls}.build()`
      : `${rpc.requestType}.getDefaultInstance()`;

    return `
        fun ${rpc.methodLower}(${params.join(', ')}) {
            val callbackId = generateCallbackId()
            val command = Command.newBuilder()
                .setCallbackId(callbackId)
                .set${rpc.method}(${requestBuilder})
                .build()
            sendCommand(command, callback)
        }`;
  }).join('\n');

  return `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/generate-bridge.js
// Configuration: bridge.yaml
//
// To regenerate: ./gradlew generateBridgeCode

package ${config.package}

import android.util.Base64
import android.util.Log
import ${config.proto_package}.*
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.concurrent.ConcurrentHashMap

/**
 * ${config.class_name} - Generated React Native Native Module
 *
 * Provides type-safe communication between Kotlin and TypeScript
 * using Protocol Buffers for serialization.
 */
class ${config.class_name}(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    companion object {
        private const val TAG = "${config.class_name}"
        const val NAME = "${config.class_name}"

        @Volatile
        private var instance: ${config.class_name}? = null
        private val pendingCallbacks = ConcurrentHashMap<String, (Response) -> Unit>()
        private var callbackCounter = 0L

        private fun generateCallbackId(): String {
            return "cb_\${++callbackCounter}_\${System.currentTimeMillis()}"
        }

        private fun sendCommand(command: Command, callback: ((Response) -> Unit)? = null) {
            val bridge = instance
            if (bridge == null) {
                Log.e(TAG, "${config.class_name} not initialized")
                callback?.invoke(
                    Response.newBuilder()
                        .setCallbackId(command.callbackId)
                        .setError(ErrorResponse.newBuilder().setMessage("${config.class_name} not initialized"))
                        .build()
                )
                return
            }

            if (callback != null) {
                pendingCallbacks[command.callbackId] = callback
            }

            val bytes = command.toByteArray()
            val base64 = Base64.encodeToString(bytes, Base64.NO_WRAP)

            Log.d(TAG, "Sending command: \${command.commandCase}, callbackId: \${command.callbackId}")
            bridge.sendEvent("onCommand", base64)
        }

        // ==========================================
        // Generated command methods
        // ==========================================
${methods}

        internal fun handleResponse(base64Data: String) {
            try {
                val bytes = Base64.decode(base64Data, Base64.NO_WRAP)
                val response = Response.parseFrom(bytes)

                Log.d(TAG, "Received response for callbackId: \${response.callbackId}, type: \${response.resultCase}")

                val callback = pendingCallbacks.remove(response.callbackId)
                if (callback != null) {
                    callback(response)
                } else {
                    Log.w(TAG, "No callback found for callbackId: \${response.callbackId}")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Failed to parse response: \${e.message}")
            }
        }

        fun getInstance(): ${config.class_name}? = instance
        fun isInitialized(): Boolean = instance != null
    }

    override fun getName(): String = NAME

    override fun initialize() {
        super.initialize()
        instance = this
        reactContext.addLifecycleEventListener(this)
        Log.d(TAG, "${config.class_name} initialized")
    }

    override fun invalidate() {
        super.invalidate()
        instance = null
        pendingCallbacks.clear()
        reactContext.removeLifecycleEventListener(this)
        Log.d(TAG, "${config.class_name} invalidated")
    }

    private fun sendEvent(eventName: String, data: String) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, data)
    }

    @ReactMethod
    fun sendResponse(base64Data: String) {
        Log.d(TAG, "sendResponse called")
        handleResponse(base64Data)
    }

    @ReactMethod
    fun notifyReady() {
        Log.d(TAG, "TypeScript runtime is ready")
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun isReady(): Boolean {
        return instance != null
    }

    @ReactMethod
    fun addListener(eventName: String) {
        Log.d(TAG, "addListener called for: \$eventName")
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        Log.d(TAG, "removeListeners called: \$count")
    }

    override fun onHostResume() {
        Log.d(TAG, "onHostResume")
    }

    override fun onHostPause() {
        Log.d(TAG, "onHostPause")
    }

    override fun onHostDestroy() {
        Log.d(TAG, "onHostDestroy")
    }
}
`;
}

function generateTypeScript(rpcs, messages, config) {
  const handlerMethods = rpcs.map(rpc => {
    const fields = rpc.requestFields;
    const fieldNames = Object.keys(fields);
    const params = fieldNames.map(name => {
      const tsType = protoToTsType(fields[name].type);
      return `${name}: ${tsType}`;
    }).join(', ');
    return `  ${rpc.methodLower}: (${params}) => { value: number };`;
  }).join('\n');

  const cases = rpcs.map(rpc => {
    const fields = rpc.requestFields;
    const fieldNames = Object.keys(fields);

    const fieldExtraction = fieldNames.map(name => {
      const tsDefault = protoToTsDefault(fields[name].type);
      return `command.${rpc.methodLower}?.${name} ?? ${tsDefault}`;
    }).join(', ');

    const args = fieldNames.length > 0 ? fieldExtraction : '';

    return `
      case '${rpc.methodLower}': {
        const result = handlers.${rpc.methodLower}(${args});
        return {
          callbackId,
          ${rpc.responseField}: result,
        };
      }`;
  }).join('\n');

  return `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/generate-bridge.js
// Configuration: bridge.yaml
//
// To regenerate: ./gradlew generateBridgeCode

import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native';
import { Buffer } from 'buffer';
import { commands } from '${config.proto_import}';

const { Command, Response } = commands;
type IResponse = commands.IResponse;

interface CommandBridgeModule {
  sendResponse(base64Data: string): void;
  notifyReady(): void;
  isReady(): boolean;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

const { CommandBridge } = NativeModules as { CommandBridge: CommandBridgeModule };
const commandBridgeEmitter = new NativeEventEmitter(NativeModules.CommandBridge);

/**
 * Handler interface - implement these methods with your business logic
 */
export interface CommandHandlers {
${handlerMethods}
}

/**
 * Generated command handler
 */
class GeneratedCommandHandler {
  private isInitialized = false;
  private subscription: EmitterSubscription | null = null;
  private handlers: CommandHandlers | null = null;

  initialize(handlers: CommandHandlers): void {
    if (this.isInitialized) {
      console.log('[CommandHandler] Already initialized');
      return;
    }

    this.handlers = handlers;
    console.log('[CommandHandler] Initializing...');

    this.subscription = commandBridgeEmitter.addListener(
      'onCommand',
      this.handleCommand.bind(this)
    );

    CommandBridge.notifyReady();

    this.isInitialized = true;
    console.log('[CommandHandler] Ready');
  }

  private handleCommand(data: string): void {
    try {
      const bytes = Buffer.from(data, 'base64');
      const command = Command.decode(bytes);
      const callbackId = command.callbackId;

      console.log(\`[CommandHandler] Received: \${command.command}\`);

      const response = this.routeCommand(command, callbackId);

      const responseBytes = Response.encode(response).finish();
      const base64Response = Buffer.from(responseBytes).toString('base64');
      CommandBridge.sendResponse(base64Response);
    } catch (error) {
      console.error('[CommandHandler] Error:', error);

      const errorResponse: IResponse = {
        callbackId: 'unknown',
        error: { message: error instanceof Error ? error.message : String(error) },
      };

      const responseBytes = Response.encode(Response.create(errorResponse)).finish();
      CommandBridge.sendResponse(Buffer.from(responseBytes).toString('base64'));
    }
  }

  private routeCommand(command: commands.Command, callbackId: string): IResponse {
    const handlers = this.handlers!;

    switch (command.command) {${cases}

      default:
        return {
          callbackId,
          error: { message: \`Unknown command: \${command.command}\` },
        };
    }
  }

  destroy(): void {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
    this.isInitialized = false;
    this.handlers = null;
    console.log('[CommandHandler] Destroyed');
  }
}

export const commandHandler = new GeneratedCommandHandler();
export { CommandBridge };
`;
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

function protoToTsType(protoType) {
  const map = {
    'string': 'string',
    'int32': 'number',
    'int64': 'number',
    'bool': 'boolean',
    'float': 'number',
    'double': 'number',
    'bytes': 'Uint8Array',
  };
  return map[protoType] || 'unknown';
}

function protoToTsDefault(protoType) {
  const map = {
    'string': "''",
    'int32': '0',
    'int64': '0',
    'bool': 'false',
    'float': '0',
    'double': '0',
  };
  return map[protoType] || 'undefined';
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
