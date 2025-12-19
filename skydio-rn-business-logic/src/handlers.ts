/**
 * Business logic handlers
 *
 * Process commands from the native side and return responses.
 * This is where all the TypeScript business logic lives.
 */

import { useAppStore } from './stores/appStore';

export interface CommandResponse {
  status: 'success' | 'error';
  value?: number;
  error?: string;
}

/**
 * Handle increment command
 */
export function handleIncrement(): CommandResponse {
  try {
    useAppStore.getState().increment();
    const newValue = useAppStore.getState().counter;
    console.log('[Handlers] Increment -> counter:', newValue);
    return { status: 'success', value: newValue };
  } catch (error) {
    console.error('[Handlers] Increment error:', error);
    return { status: 'error', error: String(error) };
  }
}

/**
 * Handle decrement command
 */
export function handleDecrement(): CommandResponse {
  try {
    useAppStore.getState().decrement();
    const newValue = useAppStore.getState().counter;
    console.log('[Handlers] Decrement -> counter:', newValue);
    return { status: 'success', value: newValue };
  } catch (error) {
    console.error('[Handlers] Decrement error:', error);
    return { status: 'error', error: String(error) };
  }
}

/**
 * Get current counter value
 */
export function handleGetCounter(): CommandResponse {
  try {
    const value = useAppStore.getState().counter;
    console.log('[Handlers] GetCounter -> counter:', value);
    return { status: 'success', value };
  } catch (error) {
    console.error('[Handlers] GetCounter error:', error);
    return { status: 'error', error: String(error) };
  }
}

/**
 * Route a command to the appropriate handler
 */
export function routeCommand(command: string): CommandResponse {
  console.log('[Handlers] Routing command:', command);

  switch (command) {
    case 'increment':
      return handleIncrement();
    case 'decrement':
      return handleDecrement();
    case 'getCounter':
      return handleGetCounter();
    default:
      console.error('[Handlers] Unknown command:', command);
      return { status: 'error', error: `Unknown command: ${command}` };
  }
}
