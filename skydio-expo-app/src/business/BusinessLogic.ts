import { NativeBridge, CommandParams } from '../bridge/NativeBridge';

/**
 * BusinessLogic contains the headless business logic that can be
 * executed from Kotlin code.
 *
 * Each method here is registered as a command that Kotlin can call
 * via HeadlessReactNativeFragment.executeCommand()
 */

// Example: Simple calculation
async function calculateSum(params: CommandParams): Promise<number> {
  const { a, b } = params;
  console.log(`[BusinessLogic] calculateSum: ${a} + ${b}`);

  // Simulate some async work
  await delay(100);

  const result = (Number(a) || 0) + (Number(b) || 0);
  return result;
}

// Example: Fetch data (simulated)
async function fetchUserData(params: CommandParams): Promise<Record<string, any>> {
  const { userId } = params;
  console.log(`[BusinessLogic] fetchUserData for userId: ${userId}`);

  // Simulate API call
  await delay(500);

  return {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    timestamp: new Date().toISOString(),
  };
}

// Example: Process data
async function processData(params: CommandParams): Promise<Record<string, any>> {
  const { items } = params;
  console.log(`[BusinessLogic] processData with ${Array.isArray(items) ? items.length : 0} items`);

  // Simulate processing
  await delay(200);

  const processed = Array.isArray(items)
    ? items.map((item: any, index: number) => ({
        ...item,
        processed: true,
        index,
      }))
    : [];

  // Emit progress event to Kotlin
  NativeBridge.emitEvent('processingComplete', {
    count: processed.length,
    timestamp: Date.now(),
  });

  return { items: processed, count: processed.length };
}

// Example: Validate input
function validateInput(params: CommandParams): { isValid: boolean; errors: string[] } {
  const { email, password } = params;
  console.log(`[BusinessLogic] validateInput`);

  const errors: string[] = [];

  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else if (!email.includes('@')) {
    errors.push('Invalid email format');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Example: Get configuration
function getConfiguration(): Record<string, any> {
  console.log(`[BusinessLogic] getConfiguration`);

  return {
    version: '1.0.0',
    features: {
      analytics: true,
      notifications: true,
      darkMode: false,
    },
    apiEndpoint: 'https://api.example.com',
    maxRetries: 3,
  };
}

// Example: Command that periodically emits events
async function startPeriodicTask(params: CommandParams): Promise<{ started: boolean }> {
  const { intervalMs = 1000, count = 5 } = params;
  console.log(`[BusinessLogic] startPeriodicTask: interval=${intervalMs}ms, count=${count}`);

  // Run periodic task in background
  let remaining = Number(count);
  const interval = setInterval(() => {
    remaining--;
    NativeBridge.emitEvent('periodicUpdate', {
      remaining,
      timestamp: Date.now(),
    });

    if (remaining <= 0) {
      clearInterval(interval);
      NativeBridge.emitEvent('periodicComplete', {
        timestamp: Date.now(),
      });
    }
  }, Number(intervalMs));

  return { started: true };
}

// Example: Command that can fail
async function riskyOperation(params: CommandParams): Promise<{ success: boolean }> {
  const { shouldFail = false } = params;
  console.log(`[BusinessLogic] riskyOperation: shouldFail=${shouldFail}`);

  await delay(100);

  if (shouldFail) {
    throw new Error('Operation failed as requested');
  }

  return { success: true };
}

// Utility function
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Register all business logic commands with the bridge
 */
export function registerBusinessLogicCommands(): void {
  console.log('[BusinessLogic] Registering commands...');

  NativeBridge.registerCommand('calculateSum', calculateSum);
  NativeBridge.registerCommand('fetchUserData', fetchUserData);
  NativeBridge.registerCommand('processData', processData);
  NativeBridge.registerCommand('validateInput', validateInput);
  NativeBridge.registerCommand('getConfiguration', getConfiguration);
  NativeBridge.registerCommand('startPeriodicTask', startPeriodicTask);
  NativeBridge.registerCommand('riskyOperation', riskyOperation);

  console.log('[BusinessLogic] All commands registered');
}
