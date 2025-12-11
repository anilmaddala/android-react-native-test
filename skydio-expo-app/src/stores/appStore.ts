import { create } from 'zustand';

/**
 * Application state managed by Zustand
 */
interface AppState {
  // Counter state
  counter: number;

  // Users state
  users: User[];

  // Configuration
  config: Configuration;

  // Last operation result (for async operations)
  lastResult: any;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number;
}

interface Configuration {
  version: string;
  features: {
    analytics: boolean;
    notifications: boolean;
    darkMode: boolean;
  };
  apiEndpoint: string;
  maxRetries: number;
}

/**
 * Actions available on the store
 */
interface AppActions {
  // Counter actions
  increment: () => void;
  decrement: () => void;
  setCounter: (value: number) => void;

  // User actions
  addUser: (name: string, email: string) => User;
  removeUser: (id: string) => void;
  getUsers: () => User[];

  // Calculation (stateless)
  calculateSum: (a: number, b: number) => number;

  // Validation
  validateInput: (email: string, password: string) => ValidationResult;

  // Async operation simulation
  fetchUserData: (userId: string) => Promise<User>;

  // Get full state
  getState: () => AppState;

  // Configuration
  getConfiguration: () => Configuration;
  updateConfiguration: (partial: Partial<Configuration>) => void;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

type AppStore = AppState & AppActions;

/**
 * Zustand store for application business logic
 *
 * This store is the single source of truth for the application state.
 * All business logic runs here in TypeScript, and Kotlin can interact
 * with it via the CommandBridge.
 */
export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  counter: 0,
  users: [],
  config: {
    version: '1.0.0',
    features: {
      analytics: true,
      notifications: true,
      darkMode: false,
    },
    apiEndpoint: 'https://api.example.com',
    maxRetries: 3,
  },
  lastResult: null,

  // Counter actions
  increment: () => {
    set((state) => ({ counter: state.counter + 1 }));
    console.log('[Store] Counter incremented to:', get().counter);
  },

  decrement: () => {
    set((state) => ({ counter: Math.max(0, state.counter - 1) }));
    console.log('[Store] Counter decremented to:', get().counter);
  },

  setCounter: (value: number) => {
    set({ counter: value });
    console.log('[Store] Counter set to:', value);
  },

  // User actions
  addUser: (name: string, email: string) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      createdAt: Date.now(),
    };
    set((state) => ({ users: [...state.users, newUser] }));
    console.log('[Store] User added:', newUser);
    return newUser;
  },

  removeUser: (id: string) => {
    set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
    console.log('[Store] User removed:', id);
  },

  getUsers: () => {
    return get().users;
  },

  // Calculation (stateless, but can be called through the store)
  calculateSum: (a: number, b: number) => {
    const result = a + b;
    console.log('[Store] calculateSum:', a, '+', b, '=', result);
    set({ lastResult: result });
    return result;
  },

  // Validation
  validateInput: (email: string, password: string) => {
    const errors: string[] = [];

    if (!email || email.trim() === '') {
      errors.push('Email is required');
    } else if (!email.includes('@')) {
      errors.push('Invalid email format');
    }

    if (!password || password.trim() === '') {
      errors.push('Password is required');
    } else if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    const result = {
      isValid: errors.length === 0,
      errors,
    };
    console.log('[Store] validateInput result:', result);
    return result;
  },

  // Async operation simulation
  fetchUserData: async (userId: string) => {
    console.log('[Store] Fetching user data for:', userId);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user: User = {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: Date.now(),
    };

    set({ lastResult: user });
    console.log('[Store] User data fetched:', user);
    return user;
  },

  // Get full state (for syncing with Kotlin)
  getState: () => {
    const { counter, users, config, lastResult } = get();
    return { counter, users, config, lastResult };
  },

  // Configuration
  getConfiguration: () => {
    return get().config;
  },

  updateConfiguration: (partial: Partial<Configuration>) => {
    set((state) => ({
      config: { ...state.config, ...partial },
    }));
    console.log('[Store] Configuration updated');
  },
}));

// Export types for TypeScript consumers
export type { AppState, AppActions, User, Configuration, ValidationResult };
