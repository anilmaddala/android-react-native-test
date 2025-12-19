/**
 * Business logic handlers
 *
 * Implement the CommandHandlers interface from the generated code.
 * This is the only file you need to edit when adding new commands.
 */

import { useAppStore } from './stores/appStore';
import { CommandHandlers } from './generated/commandHandler';

/**
 * Handler implementations
 * These implement the generated CommandHandlers interface
 */
export const handlers: CommandHandlers = {
  increment: () => {
    useAppStore.getState().increment();
    const value = useAppStore.getState().counter;
    console.log('[Handlers] ✅ Increment -> counter:', value);
    return { value };
  },

  decrement: () => {
    useAppStore.getState().decrement();
    const value = useAppStore.getState().counter;
    console.log('[Handlers] ⬇️ Decrement -> counter:', value);
    return { value };
  },
};
