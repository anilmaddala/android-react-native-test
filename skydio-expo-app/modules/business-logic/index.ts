import { requireNativeModule, NativeModule } from 'expo-modules-core';

/**
 * Type definitions for the BusinessLogic native module.
 * These types are automatically enforced by the Expo Modules API.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  timestamp: number;
}

export interface Configuration {
  version: string;
  features: {
    analytics: boolean;
    notifications: boolean;
    darkMode: boolean;
  };
  apiEndpoint: string;
  maxRetries: number;
}

export interface ProcessedData {
  items: Array<Record<string, any>>;
  count: number;
}

export interface PeriodicTaskResult {
  started: boolean;
}

export interface RiskyOperationResult {
  success: boolean;
}

/**
 * Events emitted by the BusinessLogic module
 */
export interface BusinessLogicEvents {
  onProcessingComplete: { count: number; timestamp: number };
  onPeriodicUpdate: { remaining: number; timestamp: number };
  onPeriodicComplete: { timestamp: number };
}

/**
 * BusinessLogic native module interface.
 * All methods here are implemented in Kotlin and exposed via Expo Modules API.
 */
declare class BusinessLogicModule extends NativeModule<BusinessLogicEvents> {
  /**
   * Get application configuration
   */
  getConfiguration(): Configuration;

  /**
   * Validate user input
   */
  validateInput(email: string, password: string): ValidationResult;

  /**
   * Calculate sum of two numbers (async for demo)
   */
  calculateSum(a: number, b: number): Promise<number>;

  /**
   * Fetch user data by ID
   */
  fetchUserData(userId: string): Promise<UserData>;

  /**
   * Process a list of items
   */
  processData(items: Array<Record<string, any>>): Promise<ProcessedData>;

  /**
   * Perform a risky operation that might fail
   */
  riskyOperation(shouldFail: boolean): Promise<RiskyOperationResult>;

  /**
   * Start a periodic task that emits events
   */
  startPeriodicTask(intervalMs: number, count: number): Promise<PeriodicTaskResult>;

  /**
   * Simple ping function
   */
  ping(): string;
}

// Export the native module
export default requireNativeModule<BusinessLogicModule>('BusinessLogic');
