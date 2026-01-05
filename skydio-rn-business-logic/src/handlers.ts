/**
 * Business logic handlers
 *
 * Implement the CommandHandlers interface from the generated code.
 * This is the only file you need to edit when adding new commands.
 */

import { useAppStore } from './stores/appStore';
import { CommandHandlers } from './generated/commandHandler';

export const handlers: CommandHandlers = {
  increment: () => {
    useAppStore.getState().increment();
    return { value: useAppStore.getState().counter };
  },

  decrement: () => {
    useAppStore.getState().decrement();
    return { value: useAppStore.getState().counter };
  },
};
