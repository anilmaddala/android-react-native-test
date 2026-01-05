import { create } from 'zustand';

interface AppState {
  counter: number;
}

interface AppActions {
  increment: () => void;
  decrement: () => void;
}

type AppStore = AppState & AppActions;

/**
 * Zustand store for counter state
 */
export const useAppStore = create<AppStore>((set, get) => ({
  counter: 0,

  increment: () => {
    set((state) => ({ counter: state.counter + 1 }));
    console.log('[Store] Counter:', get().counter);
  },

  decrement: () => {
    set((state) => ({ counter: Math.max(0, state.counter - 1) }));
    console.log('[Store] Counter:', get().counter);
  },
}));
