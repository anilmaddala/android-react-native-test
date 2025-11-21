# Guide: Extracting Business Logic from React Components

**Goal**: Reuse business logic between React web applications and headless React Native (with Jetpack Compose UI)

**Strategy**: Extract business logic into Zustand stores that can be shared across platforms, leaving only UI-specific code in components.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Concepts](#core-concepts)
3. [Step-by-Step Extraction Process](#step-by-step-extraction-process)
4. [Complete Example: Price Range Slider](#complete-example-price-range-slider)
5. [More Examples](#more-examples)
6. [Platform-Specific APIs](#platform-specific-apis)
7. [Project Structure](#project-structure)
8. [Best Practices](#best-practices)
9. [Testing Strategy](#testing-strategy)
10. [Migration Checklist](#migration-checklist)

---

## Overview

### The Problem

Traditional React web applications often mix business logic with UI components:

```jsx
// ❌ Business logic tightly coupled to UI
function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  // Business logic embedded in component
  const filterProducts = (query) => {
    const result = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  const sortProducts = (field) => {
    const sorted = [...filtered].sort((a, b) =>
      a[field] > b[field] ? 1 : -1
    );
    setFiltered(sorted);
  };

  return (
    <div>
      <input onChange={(e) => filterProducts(e.target.value)} />
      <select onChange={(e) => sortProducts(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      {filtered.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}
```

This makes it impossible to reuse the logic in:
- React Native
- Headless JavaScript environments
- Server-side rendering
- Unit tests (without mounting components)

### The Solution

Extract business logic into **Zustand stores**:

```typescript
// ✅ Business logic in reusable store
export const useProductStore = create((set, get) => ({
  products: [],
  filtered: [],
  sortBy: 'name',

  filterProducts: (query) => {
    const { products } = get();
    const result = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    set({ filtered: result });
  },

  sortProducts: (field) => {
    const { filtered } = get();
    const sorted = [...filtered].sort((a, b) =>
      a[field] > b[field] ? 1 : -1
    );
    set({ filtered: sorted });
  }
}));
```

Now this logic works in:
- ✅ React web components
- ✅ React Native components
- ✅ Headless React Native (our use case!)
- ✅ Unit tests
- ✅ Server-side code

---

## Core Concepts

### What to Extract

**Extract these from components:**
- ✅ State management (`useState`, `useReducer`)
- ✅ Business calculations and computations
- ✅ Data transformations
- ✅ Validation rules
- ✅ API calls and data fetching
- ✅ Side effects with business logic
- ✅ Complex conditions and rules
- ✅ Derived/computed values

**Keep in components:**
- ❌ UI-specific state (e.g., `isHovered`, `isMenuOpen`)
- ❌ Animation states
- ❌ Form input values (unless part of business logic)
- ❌ Layout/styling state

### What is a Zustand Store?

Zustand is a lightweight state management library that works identically in React web and React Native:

```typescript
import { create } from 'zustand';

const useStore = create((set, get) => ({
  // State
  count: 0,

  // Actions (can access state via get())
  increment: () => set(state => ({ count: state.count + 1 })),

  // Computed values
  getDouble: () => get().count * 2
}));

// Usage in any React component
const { count, increment, getDouble } = useStore();
```

**Key benefits:**
- No provider/context needed
- Works outside React components
- TypeScript support
- Minimal boilerplate
- Can be called from anywhere (perfect for headless!)

---

## Step-by-Step Extraction Process

### Step 1: Identify Business Logic

Audit your React component and mark business logic:

```jsx
function ShoppingCart() {
  // ✅ BUSINESS LOGIC - Extract this
  const [items, setItems] = useState([]);

  // ✅ BUSINESS LOGIC - Extract this
  const addItem = (product) => {
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      setItems(items.map(i =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  // ✅ BUSINESS LOGIC - Extract this
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // ❌ UI STATE - Keep in component
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsCartOpen(!isCartOpen)}>
        Cart ({items.length})
      </button>
      {isCartOpen && (
        <div>
          {items.map(item => (
            <div key={item.id}>{item.name} x {item.quantity}</div>
          ))}
          <p>Total: ${calculateTotal()}</p>
        </div>
      )}
    </div>
  );
}
```

### Step 2: Create Store File

Create a new file in your shared directory:

```bash
mkdir -p shared/stores
touch shared/stores/useCartStore.ts
```

### Step 3: Define TypeScript Interfaces

Always start with types:

```typescript
// shared/stores/useCartStore.ts

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  // State
  items: CartItem[];

  // Actions
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed/Getters
  getTotal: () => number;
  getItemCount: () => number;
  hasItem: (productId: string) => boolean;
}
```

### Step 4: Implement the Store

```typescript
import { create } from 'zustand';

export const useCartStore = create<CartStore>((set, get) => ({
  // Initial state
  items: [],

  // Actions
  addItem: (product) => {
    set(state => {
      const existing = state.items.find(i => i.id === product.id);

      if (existing) {
        // Increment quantity
        return {
          items: state.items.map(i =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      } else {
        // Add new item
        return {
          items: [...state.items, { ...product, quantity: 1 }]
        };
      }
    });
  },

  removeItem: (productId) => {
    set(state => ({
      items: state.items.filter(i => i.id !== productId)
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set(state => ({
      items: state.items.map(i =>
        i.id === productId ? { ...i, quantity } : i
      )
    }));
  },

  clearCart: () => set({ items: [] }),

  // Computed getters (use get() to access current state)
  getTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  hasItem: (productId) => {
    return get().items.some(i => i.id === productId);
  }
}));
```

### Step 5: Update React Web Component

Replace embedded logic with store usage:

```jsx
// ✅ Clean UI component
import { useCartStore } from '@shared/stores/useCartStore';

function ShoppingCart() {
  // Get state and actions from store
  const { items, getTotal, getItemCount } = useCartStore();

  // UI-only state stays in component
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsCartOpen(!isCartOpen)}>
        Cart ({getItemCount()})
      </button>
      {isCartOpen && (
        <div>
          {items.map(item => (
            <div key={item.id}>{item.name} x {item.quantity}</div>
          ))}
          <p>Total: ${getTotal()}</p>
        </div>
      )}
    </div>
  );
}
```

### Step 6: Use in Headless React Native

Add to your headless runtime:

```typescript
// headless-js/index.tsx
import { useCartStore } from './stores/useCartStore';

eventEmitter.addListener('ProtoCommand', (event) => {
  const command = Command.decode(bytes);

  if (command.addToCart) {
    useCartStore.getState().addItem({
      id: command.addToCart.productId,
      name: command.addToCart.productName,
      price: command.addToCart.price
    });

    // Send response back to Kotlin
    const response = {
      items: useCartStore.getState().items,
      total: useCartStore.getState().getTotal(),
      itemCount: useCartStore.getState().getItemCount()
    };
    sendResponse(response);
  }

  if (command.removeFromCart) {
    useCartStore.getState().removeItem(command.removeFromCart.productId);

    const response = {
      items: useCartStore.getState().items,
      total: useCartStore.getState().getTotal()
    };
    sendResponse(response);
  }

  if (command.getCart) {
    const response = {
      items: useCartStore.getState().items,
      total: useCartStore.getState().getTotal(),
      itemCount: useCartStore.getState().getItemCount()
    };
    sendResponse(response);
  }
});
```

### Step 7: Call from Compose

```kotlin
Button(onClick = {
    scope.launch {
        val result = bridge.sendAddToCartCommand(
            productId = "123",
            productName = "Widget",
            price = 29.99
        )

        // Update Compose UI
        cartItems = result.items
        cartTotal = result.total
    }
}) {
    Text("Add to Cart")
}
```

---

## Complete Example: Price Range Slider

This is a comprehensive example showing how to extract complex slider logic with business rules.

### Original React Web Component (Before)

```jsx
import React, { useState, useEffect } from 'react';

function PriceRangeSlider() {
  // State
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentValue, setCurrentValue] = useState(500);
  const [discountTier, setDiscountTier] = useState('none');

  // Business logic: Calculate discount based on price
  const calculateDiscount = (price) => {
    if (price >= 500) return 0.20;
    if (price >= 200) return 0.10;
    if (price >= 100) return 0.05;
    return 0;
  };

  // Business logic: Calculate final price with discount
  const calculateFinalPrice = (price) => {
    const discount = calculateDiscount(price);
    return price * (1 - discount);
  };

  // Business logic: Determine tier
  const getTier = (price) => {
    if (price >= 500) return 'premium';
    if (price >= 200) return 'standard';
    if (price >= 100) return 'basic';
    return 'none';
  };

  // Business logic: Validate range
  const handleChange = (value) => {
    const validated = Math.max(minPrice, Math.min(maxPrice, value));
    setCurrentValue(validated);
    setDiscountTier(getTier(validated));
  };

  // Business logic: Snap to step
  const snapToStep = (value, step = 10) => {
    return Math.round(value / step) * step;
  };

  // Computed values
  const finalPrice = calculateFinalPrice(currentValue);
  const discount = calculateDiscount(currentValue);

  return (
    <div className="slider-container">
      <h3>Select Price: ${currentValue}</h3>

      {/* HTML Range Input */}
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={currentValue}
        onChange={(e) => handleChange(Number(e.target.value))}
        step={10}
        className="price-slider"
      />

      <div className="price-info">
        <p>Original Price: ${currentValue}</p>
        <p>Discount: {(discount * 100).toFixed(0)}%</p>
        <p>Final Price: ${finalPrice.toFixed(2)}</p>
        <p>Tier: <span className={`tier-${discountTier}`}>{discountTier}</span></p>
      </div>

      <div className="controls">
        <button onClick={() => handleChange(currentValue - 10)}>-$10</button>
        <button onClick={() => handleChange(currentValue + 10)}>+$10</button>
        <button onClick={() => handleChange(500)}>Reset</button>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
```

### Step 1: Create Store with Business Logic

**File**: `shared/stores/usePriceSliderStore.ts`

```typescript
import { create } from 'zustand';

// Type definitions
interface PriceSliderStore {
  // State
  minPrice: number;
  maxPrice: number;
  currentValue: number;
  step: number;

  // Actions - These modify state
  setValue: (value: number) => void;
  setRange: (min: number, max: number) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  snapToStep: () => void;

  // Getters - These compute derived values (business logic)
  getDiscount: () => number;
  getFinalPrice: () => number;
  getTier: () => 'none' | 'basic' | 'standard' | 'premium';
  getDiscountPercentage: () => string;
  getSavings: () => number;
  isAtMin: () => boolean;
  isAtMax: () => boolean;
  getProgress: () => number; // Percentage of slider (0-100)
}

export const usePriceSliderStore = create<PriceSliderStore>((set, get) => ({
  // ========================================
  // Initial State
  // ========================================
  minPrice: 0,
  maxPrice: 1000,
  currentValue: 500,
  step: 10,

  // ========================================
  // Actions (State Mutations)
  // ========================================

  /**
   * Set the current price value with validation
   */
  setValue: (value: number) => {
    const { minPrice, maxPrice } = get();

    // Business logic: Validate range
    const validated = Math.max(minPrice, Math.min(maxPrice, value));

    set({ currentValue: validated });
  },

  /**
   * Update the min/max range
   */
  setRange: (min: number, max: number) => {
    if (min >= max) {
      console.error('Invalid range: min must be less than max');
      return;
    }

    set({ minPrice: min, maxPrice: max });

    // Re-validate current value against new range
    get().setValue(get().currentValue);
  },

  /**
   * Increment by step amount
   */
  increment: () => {
    const { currentValue, step, maxPrice } = get();
    const newValue = Math.min(currentValue + step, maxPrice);
    set({ currentValue: newValue });
  },

  /**
   * Decrement by step amount
   */
  decrement: () => {
    const { currentValue, step, minPrice } = get();
    const newValue = Math.max(currentValue - step, minPrice);
    set({ currentValue: newValue });
  },

  /**
   * Reset to middle of range
   */
  reset: () => {
    const { minPrice, maxPrice } = get();
    const middle = Math.floor((minPrice + maxPrice) / 2);
    set({ currentValue: middle });
  },

  /**
   * Snap current value to nearest step
   */
  snapToStep: () => {
    const { currentValue, step } = get();
    const snapped = Math.round(currentValue / step) * step;
    set({ currentValue: snapped });
  },

  // ========================================
  // Getters (Business Logic - Read-only)
  // ========================================

  /**
   * Calculate discount percentage based on price
   * Business rule: Higher prices get bigger discounts
   */
  getDiscount: () => {
    const { currentValue } = get();

    // Business logic: Tiered discount structure
    if (currentValue >= 500) return 0.20;  // 20% off for $500+
    if (currentValue >= 200) return 0.10;  // 10% off for $200+
    if (currentValue >= 100) return 0.05;  // 5% off for $100+
    return 0;                              // No discount below $100
  },

  /**
   * Calculate final price after discount
   */
  getFinalPrice: () => {
    const { currentValue } = get();
    const discount = get().getDiscount();
    return currentValue * (1 - discount);
  },

  /**
   * Determine tier based on price
   * Business rule: Different tiers have different benefits
   */
  getTier: () => {
    const { currentValue } = get();

    if (currentValue >= 500) return 'premium';
    if (currentValue >= 200) return 'standard';
    if (currentValue >= 100) return 'basic';
    return 'none';
  },

  /**
   * Get discount as formatted percentage string
   */
  getDiscountPercentage: () => {
    const discount = get().getDiscount();
    return `${(discount * 100).toFixed(0)}%`;
  },

  /**
   * Calculate total savings amount
   */
  getSavings: () => {
    const { currentValue } = get();
    const finalPrice = get().getFinalPrice();
    return currentValue - finalPrice;
  },

  /**
   * Check if slider is at minimum
   */
  isAtMin: () => {
    const { currentValue, minPrice } = get();
    return currentValue <= minPrice;
  },

  /**
   * Check if slider is at maximum
   */
  isAtMax: () => {
    const { currentValue, maxPrice } = get();
    return currentValue >= maxPrice;
  },

  /**
   * Get slider progress as percentage (0-100)
   */
  getProgress: () => {
    const { currentValue, minPrice, maxPrice } = get();
    const range = maxPrice - minPrice;
    if (range === 0) return 0;
    return ((currentValue - minPrice) / range) * 100;
  }
}));

// ========================================
// Export typed hooks for convenience
// ========================================

/**
 * Hook to get just the slider value and setter
 */
export const useSliderValue = () => {
  const currentValue = usePriceSliderStore(state => state.currentValue);
  const setValue = usePriceSliderStore(state => state.setValue);
  return [currentValue, setValue] as const;
};

/**
 * Hook to get computed values
 */
export const useSliderComputed = () => {
  return usePriceSliderStore(state => ({
    finalPrice: state.getFinalPrice(),
    discount: state.getDiscountPercentage(),
    tier: state.getTier(),
    savings: state.getSavings()
  }));
};
```

### Step 2: Use in React Web (Simplified)

```jsx
// ✅ Clean UI component - all business logic in store
import React from 'react';
import { usePriceSliderStore, useSliderValue, useSliderComputed } from '@shared/stores/usePriceSliderStore';

function PriceRangeSlider() {
  // Get state from store
  const { minPrice, maxPrice, step } = usePriceSliderStore();
  const [currentValue, setValue] = useSliderValue();
  const { finalPrice, discount, tier, savings } = useSliderComputed();

  // Get actions
  const { increment, decrement, reset } = usePriceSliderStore();

  return (
    <div className="slider-container">
      <h3>Select Price: ${currentValue}</h3>

      {/* HTML Range Input - Just handles UI interaction */}
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={currentValue}
        onChange={(e) => setValue(Number(e.target.value))}
        step={step}
        className="price-slider"
      />

      {/* All computed values come from store */}
      <div className="price-info">
        <p>Original Price: ${currentValue}</p>
        <p>Discount: {discount}</p>
        <p>Final Price: ${finalPrice.toFixed(2)}</p>
        <p>You Save: ${savings.toFixed(2)}</p>
        <p>Tier: <span className={`tier-${tier}`}>{tier}</span></p>
      </div>

      <div className="controls">
        <button onClick={decrement}>-$10</button>
        <button onClick={increment}>+$10</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
```

### Step 3: Add to Headless React Native

**File**: `headless-js/index.tsx`

```typescript
import { usePriceSliderStore } from './stores/usePriceSliderStore';

// Listen for commands from Kotlin/Compose
eventEmitter.addListener('ProtoCommand', (event) => {
  const command = Command.decode(bytes);

  // Handle: Set price value
  if (command.setPriceValue) {
    // Update store
    usePriceSliderStore.getState().setValue(command.setPriceValue.value);

    // Get all computed values from store
    const state = usePriceSliderStore.getState();

    // Build response with business logic results
    const response = Response.create({
      requestId: command.requestId,
      success: true,
      priceUpdate: {
        currentValue: state.currentValue,
        finalPrice: state.getFinalPrice(),
        discount: state.getDiscount(),
        discountPercentage: state.getDiscountPercentage(),
        tier: state.getTier(),
        savings: state.getSavings(),
        isAtMin: state.isAtMin(),
        isAtMax: state.isAtMax(),
        progress: state.getProgress()
      }
    });

    console.log(`✅ Price set to $${state.currentValue}, tier: ${state.getTier()}`);
    sendResponse(response);
  }

  // Handle: Increment price
  if (command.incrementPrice) {
    usePriceSliderStore.getState().increment();

    const state = usePriceSliderStore.getState();
    sendResponse({
      currentValue: state.currentValue,
      finalPrice: state.getFinalPrice(),
      tier: state.getTier()
    });
  }

  // Handle: Decrement price
  if (command.decrementPrice) {
    usePriceSliderStore.getState().decrement();

    const state = usePriceSliderStore.getState();
    sendResponse({
      currentValue: state.currentValue,
      finalPrice: state.getFinalPrice(),
      tier: state.getTier()
    });
  }

  // Handle: Reset to default
  if (command.resetPrice) {
    usePriceSliderStore.getState().reset();

    const state = usePriceSliderStore.getState();
    sendResponse({
      currentValue: state.currentValue,
      finalPrice: state.getFinalPrice(),
      tier: state.getTier()
    });
  }

  // Handle: Snap to step
  if (command.snapPriceToStep) {
    usePriceSliderStore.getState().snapToStep();

    const state = usePriceSliderStore.getState();
    sendResponse({
      currentValue: state.currentValue
    });
  }

  // Handle: Get current state
  if (command.getPriceState) {
    const state = usePriceSliderStore.getState();

    sendResponse({
      currentValue: state.currentValue,
      minPrice: state.minPrice,
      maxPrice: state.maxPrice,
      step: state.step,
      finalPrice: state.getFinalPrice(),
      discount: state.getDiscount(),
      tier: state.getTier(),
      savings: state.getSavings()
    });
  }
});
```

### Step 4: Update Protobuf Schema

**File**: `protos/messages.proto`

```protobuf
syntax = "proto3";

package app;

message Command {
  string request_id = 1;

  oneof command_type {
    // ... existing commands ...

    // Price slider commands
    SetPriceValueCommand set_price_value = 10;
    IncrementPriceCommand increment_price = 11;
    DecrementPriceCommand decrement_price = 12;
    ResetPriceCommand reset_price = 13;
    SnapPriceToStepCommand snap_price_to_step = 14;
    GetPriceStateCommand get_price_state = 15;
  }
}

message Response {
  string request_id = 1;
  bool success = 2;
  string error = 3;

  oneof response_data {
    // ... existing responses ...

    PriceUpdateResponse price_update = 10;
  }
}

// Price slider command messages
message SetPriceValueCommand {
  int32 value = 1;
}

message IncrementPriceCommand {}

message DecrementPriceCommand {}

message ResetPriceCommand {}

message SnapPriceToStepCommand {}

message GetPriceStateCommand {}

// Price slider response
message PriceUpdateResponse {
  int32 current_value = 1;
  double final_price = 2;
  double discount = 3;
  string discount_percentage = 4;
  string tier = 5;
  double savings = 6;
  bool is_at_min = 7;
  bool is_at_max = 8;
  double progress = 9;
  int32 min_price = 10;
  int32 max_price = 11;
  int32 step = 12;
}
```

### Step 5: Create Jetpack Compose UI

**File**: `skydio-android-app/app/src/main/java/com/example/skydioandroidapp/PriceSliderScreen.kt`

```kotlin
package com.example.skydioandroidapp

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.LifecycleResumeEffect
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun PriceSliderScreen(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val application = context.applicationContext as MainApplication
    val reactHost = remember { application.reactHost }
    val bridge = remember { JavaScriptBridge(reactHost) }
    val scope = rememberCoroutineScope()

    // State mirroring JavaScript store
    var currentPrice by remember { mutableStateOf(500) }
    var finalPrice by remember { mutableStateOf(500.0) }
    var discount by remember { mutableStateOf("0%") }
    var tier by remember { mutableStateOf("none") }
    var savings by remember { mutableStateOf(0.0) }
    var isLoading by remember { mutableStateOf(false) }
    var minPrice by remember { mutableStateOf(0) }
    var maxPrice by remember { mutableStateOf(1000) }

    // Initialize state from JavaScript on mount
    LifecycleResumeEffect(Unit) {
        scope.launch {
            delay(1000) // Wait for JS runtime to initialize
            try {
                isLoading = true
                val state = bridge.sendGetPriceStateCommand()

                // Update all state from JavaScript
                currentPrice = state.currentValue
                finalPrice = state.finalPrice
                discount = state.discountPercentage
                tier = state.tier
                savings = state.savings
                minPrice = state.minPrice
                maxPrice = state.maxPrice
            } catch (e: Exception) {
                println("❌ Error loading price state: ${e.message}")
            } finally {
                isLoading = false
            }
        }

        onPauseOrDispose { }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "Price Slider Demo",
            style = MaterialTheme.typography.headlineMedium
        )

        Text(
            text = "Business logic runs in TypeScript/Zustand",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        // Price Information Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Current Price: $$currentPrice",
                    style = MaterialTheme.typography.headlineSmall
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Final Price: $${String.format("%.2f", finalPrice)}",
                    style = MaterialTheme.typography.titleLarge,
                    color = MaterialTheme.colorScheme.primary
                )
                Text(
                    text = "Discount: $discount",
                    style = MaterialTheme.typography.bodyLarge
                )
                Text(
                    text = "You Save: $${String.format("%.2f", savings)}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.tertiary
                )
                Text(
                    text = "Tier: $tier",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }

        // Native Compose Slider
        // This is native UI - but business logic runs in JavaScript!
        Text(
            text = "Drag slider:",
            style = MaterialTheme.typography.labelLarge
        )

        Slider(
            value = currentPrice.toFloat(),
            onValueChange = { newValue ->
                // Update local state immediately for smooth UI
                currentPrice = newValue.toInt()
            },
            onValueChangeFinished = {
                // When user releases, send to JavaScript for business logic
                scope.launch {
                    try {
                        isLoading = true

                        // Send to JavaScript - it will calculate discount, tier, etc.
                        val result = bridge.sendSetPriceValueCommand(currentPrice)

                        // Update UI with calculated values from JavaScript
                        currentPrice = result.currentValue
                        finalPrice = result.finalPrice
                        discount = result.discountPercentage
                        tier = result.tier
                        savings = result.savings
                    } catch (e: Exception) {
                        println("❌ Error updating price: ${e.message}")
                    } finally {
                        isLoading = false
                    }
                }
            },
            valueRange = minPrice.toFloat()..maxPrice.toFloat(),
            steps = 99, // 100 steps = $10 increments
            modifier = Modifier.fillMaxWidth()
        )

        // Control Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = {
                    scope.launch {
                        try {
                            isLoading = true
                            val result = bridge.sendDecrementPriceCommand()
                            currentPrice = result.currentValue
                            finalPrice = result.finalPrice
                            discount = result.discountPercentage
                            tier = result.tier
                            savings = result.savings
                        } finally {
                            isLoading = false
                        }
                    }
                },
                enabled = !isLoading,
                modifier = Modifier.weight(1f)
            ) {
                Text("-$10")
            }

            Button(
                onClick = {
                    scope.launch {
                        try {
                            isLoading = true
                            val result = bridge.sendResetPriceCommand()
                            currentPrice = result.currentValue
                            finalPrice = result.finalPrice
                            discount = result.discountPercentage
                            tier = result.tier
                            savings = result.savings
                        } finally {
                            isLoading = false
                        }
                    }
                },
                enabled = !isLoading,
                modifier = Modifier.weight(1f)
            ) {
                Text("Reset")
            }

            Button(
                onClick = {
                    scope.launch {
                        try {
                            isLoading = true
                            val result = bridge.sendIncrementPriceCommand()
                            currentPrice = result.currentValue
                            finalPrice = result.finalPrice
                            discount = result.discountPercentage
                            tier = result.tier
                            savings = result.savings
                        } finally {
                            isLoading = false
                        }
                    }
                },
                enabled = !isLoading,
                modifier = Modifier.weight(1f)
            ) {
                Text("+$10")
            }
        }

        if (isLoading) {
            LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
        }

        // Explanation
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    text = "How it works:",
                    style = MaterialTheme.typography.titleSmall
                )
                Text(
                    text = """
                        1. You drag the slider (Compose UI)
                        2. Value sent to JavaScript via Protobuf
                        3. Zustand store calculates discount/tier
                        4. Results sent back to Compose
                        5. UI updates with calculated values
                    """.trimIndent(),
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }
    }
}

// Helper data class for price state
data class PriceState(
    val currentValue: Int,
    val finalPrice: Double,
    val discount: Double,
    val discountPercentage: String,
    val tier: String,
    val savings: Double,
    val minPrice: Int = 0,
    val maxPrice: Int = 1000
)
```

### Step 6: Add Bridge Helper Methods

Add to `ProtobufDemo.kt`:

```kotlin
// Extension functions for price slider commands

suspend fun JavaScriptBridge.sendSetPriceValueCommand(value: Int): PriceState {
    val commandBytes = buildSetPriceValueCommand(value)
    val responseBytes = sendCommand(commandBytes)
    return parsePriceStateResponse(responseBytes)
}

suspend fun JavaScriptBridge.sendIncrementPriceCommand(): PriceState {
    val commandBytes = buildIncrementPriceCommand()
    val responseBytes = sendCommand(commandBytes)
    return parsePriceStateResponse(responseBytes)
}

suspend fun JavaScriptBridge.sendDecrementPriceCommand(): PriceState {
    val commandBytes = buildDecrementPriceCommand()
    val responseBytes = sendCommand(commandBytes)
    return parsePriceStateResponse(responseBytes)
}

suspend fun JavaScriptBridge.sendResetPriceCommand(): PriceState {
    val commandBytes = buildResetPriceCommand()
    val responseBytes = sendCommand(commandBytes)
    return parsePriceStateResponse(responseBytes)
}

suspend fun JavaScriptBridge.sendGetPriceStateCommand(): PriceState {
    val commandBytes = buildGetPriceStateCommand()
    val responseBytes = sendCommand(commandBytes)
    return parsePriceStateResponse(responseBytes)
}

// Command builders (simplified - use proper protobuf in production)

private fun buildSetPriceValueCommand(value: Int): ByteArray {
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","setPriceValue":{"value":$value}}""".toByteArray()
}

private fun buildIncrementPriceCommand(): ByteArray {
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","incrementPrice":{}}""".toByteArray()
}

private fun buildDecrementPriceCommand(): ByteArray {
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","decrementPrice":{}}""".toByteArray()
}

private fun buildResetPriceCommand(): ByteArray {
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","resetPrice":{}}""".toByteArray()
}

private fun buildGetPriceStateCommand(): ByteArray {
    val requestId = java.util.UUID.randomUUID().toString()
    return """{"requestId":"$requestId","getPriceState":{}}""".toByteArray()
}

// Response parser

private fun parsePriceStateResponse(bytes: ByteArray): PriceState {
    val json = String(bytes)

    val currentValue = """"currentValue":(\d+)""".toRegex()
        .find(json)?.groupValues?.get(1)?.toInt() ?: 0

    val finalPrice = """"finalPrice":([\d.]+)""".toRegex()
        .find(json)?.groupValues?.get(1)?.toDouble() ?: 0.0

    val discount = """"discount":([\d.]+)""".toRegex()
        .find(json)?.groupValues?.get(1)?.toDouble() ?: 0.0

    val discountPercentage = """"discountPercentage":"([^"]+)"""".toRegex()
        .find(json)?.groupValues?.get(1) ?: "0%"

    val tier = """"tier":"([^"]+)"""".toRegex()
        .find(json)?.groupValues?.get(1) ?: "none"

    val savings = """"savings":([\d.]+)""".toRegex()
        .find(json)?.groupValues?.get(1)?.toDouble() ?: 0.0

    return PriceState(
        currentValue = currentValue,
        finalPrice = finalPrice,
        discount = discount,
        discountPercentage = discountPercentage,
        tier = tier,
        savings = savings
    )
}
```

### Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│  User Interaction: Drag Compose Slider to $750              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Compose: onValueChangeFinished                              │
│  Triggers: bridge.sendSetPriceValueCommand(750)              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Bridge: Encode to Protobuf/JSON                             │
│  {"requestId":"abc","setPriceValue":{"value":750}}           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  JavaScript Runtime: Receives command                         │
│  eventEmitter.addListener('ProtoCommand', ...)               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Zustand Store: Business Logic Executes                      │
│                                                               │
│  1. setValue(750)                                             │
│     → Validate: max(0, min(1000, 750)) = 750 ✓               │
│                                                               │
│  2. getDiscount()                                             │
│     → if (750 >= 500) return 0.20 → 20% ✓                    │
│                                                               │
│  3. getFinalPrice()                                           │
│     → 750 * (1 - 0.20) = $600 ✓                              │
│                                                               │
│  4. getTier()                                                 │
│     → if (750 >= 500) return 'premium' ✓                     │
│                                                               │
│  5. getSavings()                                              │
│     → 750 - 600 = $150 ✓                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Response: Encode results                                     │
│  {                                                            │
│    currentValue: 750,                                         │
│    finalPrice: 600.00,                                        │
│    discount: 0.20,                                            │
│    discountPercentage: "20%",                                 │
│    tier: "premium",                                           │
│    savings: 150.00                                            │
│  }                                                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Bridge: Send back to Kotlin                                 │
│  ProtoHandlerModule.sendResponse()                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Compose: Update UI State                                    │
│  currentPrice = 750                                           │
│  finalPrice = 600.00                                          │
│  discount = "20%"                                             │
│  tier = "premium"                                             │
│  savings = 150.00                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  User Sees: Updated UI                                        │
│  ┌─────────────────────────────────────────────────┐         │
│  │ Current Price: $750                             │         │
│  │ Final Price: $600.00                            │         │
│  │ Discount: 20%                                   │         │
│  │ You Save: $150.00                               │         │
│  │ Tier: premium                                   │         │
│  └─────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### Key Benefits

1. **Single Source of Truth**: All discount logic is in `usePriceSliderStore.ts`
   - Change discount rules once, applies everywhere
   - No duplicate logic in React web and Kotlin

2. **Reusability**: Same store works for:
   - React web `<input type="range">`
   - Compose `Slider()`
   - React Native `<Slider />` (if you add it)
   - Unit tests
   - Server-side calculations

3. **Testability**: Test business logic without UI:
```typescript
describe('Price Slider Business Logic', () => {
  it('should calculate 20% discount for $500+', () => {
    const store = usePriceSliderStore.getState();
    store.setValue(750);

    expect(store.getDiscount()).toBe(0.20);
    expect(store.getFinalPrice()).toBe(600);
    expect(store.getTier()).toBe('premium');
  });

  it('should validate range bounds', () => {
    const store = usePriceSliderStore.getState();
    store.setValue(9999); // Way over max

    expect(store.currentValue).toBe(1000); // Clamped to max
  });
});
```

4. **Maintainability**: Change business rules in one place:
```typescript
// Update discount structure - applies everywhere!
getDiscount: () => {
  const { currentValue } = get();

  // NEW RULES: More aggressive discounts
  if (currentValue >= 1000) return 0.30;  // 30% off for $1000+
  if (currentValue >= 500) return 0.25;   // 25% off for $500+
  if (currentValue >= 200) return 0.15;   // 15% off for $200+
  if (currentValue >= 100) return 0.08;   // 8% off for $100+
  return 0;
}
```

---

## More Examples

### Example 1: Form Validation

**Before** (React Web):
```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be 8+ characters';
    }
    setErrors(newErrors);
  };

  return <form>...</form>;
}
```

**After** (Zustand Store):
```typescript
// shared/stores/useAuthStore.ts
interface AuthStore {
  email: string;
  password: string;
  errors: Record<string, string>;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  validate: () => boolean;
  isValidEmail: () => boolean;
  isValidPassword: () => boolean;
  clearErrors: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  email: '',
  password: '',
  errors: {},

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  // Business logic: Email validation
  isValidEmail: () => {
    const { email } = get();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Business logic: Password validation
  isValidPassword: () => {
    const { password } = get();
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[0-9]/.test(password);
  },

  // Business logic: Full validation
  validate: () => {
    const errors: Record<string, string> = {};

    if (!get().isValidEmail()) {
      errors.email = 'Invalid email format';
    }

    if (!get().isValidPassword()) {
      errors.password = 'Password must be 8+ chars with uppercase and number';
    }

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  clearErrors: () => set({ errors: {} })
}));
```

### Example 2: Data Filtering

**Before** (React Web):
```jsx
function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    inStock: false
  });

  const applyFilters = () => {
    let result = products;

    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    result = result.filter(p =>
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.inStock) {
      result = result.filter(p => p.stock > 0);
    }

    setFiltered(result);
  };

  return <div>...</div>;
}
```

**After** (Zustand Store):
```typescript
// shared/stores/useProductStore.ts
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  searchQuery: string;
}

interface ProductStore {
  products: Product[];
  filters: Filters;

  setProducts: (products: Product[]) => void;
  setFilter: (key: keyof Filters, value: any) => void;
  resetFilters: () => void;

  getFilteredProducts: () => Product[];
  getCategories: () => string[];
  getProductCount: () => number;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filters: {
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
    searchQuery: ''
  },

  setProducts: (products) => set({ products }),

  setFilter: (key, value) => {
    set(state => ({
      filters: { ...state.filters, [key]: value }
    }));
  },

  resetFilters: () => {
    set({
      filters: {
        category: 'all',
        minPrice: 0,
        maxPrice: 1000,
        inStock: false,
        searchQuery: ''
      }
    });
  },

  // Business logic: Apply all filters
  getFilteredProducts: () => {
    const { products, filters } = get();
    let result = products;

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    // Price range filter
    result = result.filter(p =>
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Stock filter
    if (filters.inStock) {
      result = result.filter(p => p.stock > 0);
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query)
      );
    }

    return result;
  },

  getCategories: () => {
    const { products } = get();
    return Array.from(new Set(products.map(p => p.category)));
  },

  getProductCount: () => {
    return get().getFilteredProducts().length;
  }
}));
```

### Example 3: Shopping Cart with Complex Logic

```typescript
// shared/stores/useCartStore.ts
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: number; // for shipping calculation
}

interface CartStore {
  items: CartItem[];
  promoCode: string | null;

  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyPromoCode: (code: string) => boolean;
  clearCart: () => void;

  // Business logic getters
  getSubtotal: () => number;
  getDiscount: () => number;
  getShippingCost: () => number;
  getTax: () => number;
  getTotal: () => number;
  getTotalWeight: () => number;
  canCheckout: () => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  promoCode: null,

  addItem: (product) => {
    set(state => {
      const existing = state.items.find(i => i.id === product.id);

      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }]
      };
    });
  },

  removeItem: (productId) => {
    set(state => ({
      items: state.items.filter(i => i.id !== productId)
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set(state => ({
      items: state.items.map(i =>
        i.id === productId ? { ...i, quantity } : i
      )
    }));
  },

  applyPromoCode: (code) => {
    // Business logic: Validate promo code
    const validCodes = ['SAVE10', 'SAVE20', 'FREESHIP'];
    if (validCodes.includes(code)) {
      set({ promoCode: code });
      return true;
    }
    return false;
  },

  clearCart: () => set({ items: [], promoCode: null }),

  // Business logic: Calculate subtotal
  getSubtotal: () => {
    return get().items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
  },

  // Business logic: Calculate discount
  getDiscount: () => {
    const { promoCode } = get();
    const subtotal = get().getSubtotal();

    if (promoCode === 'SAVE10') return subtotal * 0.10;
    if (promoCode === 'SAVE20') return subtotal * 0.20;
    return 0;
  },

  // Business logic: Calculate shipping
  getShippingCost: () => {
    const { promoCode } = get();
    if (promoCode === 'FREESHIP') return 0;

    const weight = get().getTotalWeight();
    const subtotal = get().getSubtotal();

    // Free shipping over $100
    if (subtotal >= 100) return 0;

    // Weight-based shipping
    if (weight < 5) return 5.99;
    if (weight < 10) return 9.99;
    return 14.99;
  },

  // Business logic: Calculate tax (8.5%)
  getTax: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscount();
    return (subtotal - discount) * 0.085;
  },

  // Business logic: Calculate final total
  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscount();
    const shipping = get().getShippingCost();
    const tax = get().getTax();

    return subtotal - discount + shipping + tax;
  },

  getTotalWeight: () => {
    return get().items.reduce(
      (sum, item) => sum + (item.weight * item.quantity),
      0
    );
  },

  // Business logic: Validation
  canCheckout: () => {
    const { items } = get();
    const total = get().getTotal();

    return items.length > 0 && total > 0;
  }
}));
```

---

## Platform-Specific APIs

Some APIs differ between web and React Native. Here's how to handle them:

### Storage Abstraction

**Create interface:**
```typescript
// shared/api/storage.ts
export interface IStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

**Web implementation:**
```typescript
// shared/api/storage.web.ts
export const storage: IStorage = {
  async getItem(key) {
    return localStorage.getItem(key);
  },

  async setItem(key, value) {
    localStorage.setItem(key, value);
  },

  async removeItem(key) {
    localStorage.removeItem(key);
  },

  async clear() {
    localStorage.clear();
  }
};
```

**React Native implementation:**
```typescript
// shared/api/storage.native.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage: IStorage = {
  getItem: AsyncStorage.getItem,
  setItem: AsyncStorage.setItem,
  removeItem: AsyncStorage.removeItem,
  clear: AsyncStorage.clear
};
```

**Use in store:**
```typescript
// Platform is auto-detected by bundler (.web.ts vs .native.ts)
import { storage } from '../api/storage';

export const useAuthStore = create((set) => ({
  // ...
  login: async (email, password) => {
    const token = await api.login(email, password);
    await storage.setItem('token', token); // Works on both platforms!
    set({ token });
  }
}));
```

### Network Requests

`fetch` works on both platforms, but you might want abstractions:

```typescript
// shared/api/client.ts
export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers, etc.
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }
};
```

---

## Project Structure

### Recommended Structure for Code Sharing

```
android-react-native-test/
│
├── shared/                          # Shared business logic
│   ├── stores/                      # Zustand stores
│   │   ├── useAuthStore.ts
│   │   ├── useCartStore.ts
│   │   ├── useProductStore.ts
│   │   └── usePriceSliderStore.ts
│   │
│   ├── api/                         # API clients
│   │   ├── client.ts                # Generic API client
│   │   ├── storage.ts               # Interface
│   │   ├── storage.web.ts           # Web implementation
│   │   └── storage.native.ts        # React Native implementation
│   │
│   ├── utils/                       # Utility functions
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── calculations.ts
│   │
│   ├── types/                       # TypeScript types
│   │   ├── user.ts
│   │   ├── product.ts
│   │   └── cart.ts
│   │
│   └── hooks/                       # Custom React hooks
│       ├── useDebounce.ts
│       └── useAsync.ts
│
├── web/                             # React web application
│   ├── src/
│   │   ├── components/              # Web UI components
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
│
├── headless-js/                     # React Native headless
│   ├── stores/                      # Symlink to ../shared/stores
│   ├── api/                         # Symlink to ../shared/api
│   ├── utils/                       # Symlink to ../shared/utils
│   ├── index.tsx                    # Headless runtime
│   └── package.json
│
└── skydio-android-app/              # Native Android
    └── Jetpack Compose UI
```

### Setting Up Symlinks

```bash
# Link shared code to headless-js
cd headless-js
ln -s ../shared/stores ./stores
ln -s ../shared/api ./api
ln -s ../shared/utils ./utils
ln -s ../shared/types ./types
```

### Or Use Yarn Workspaces

**Root `package.json`:**
```json
{
  "private": true,
  "workspaces": [
    "shared",
    "web",
    "headless-js"
  ]
}
```

**In web and headless-js:**
```json
{
  "dependencies": {
    "shared": "1.0.0"
  }
}
```

Then import:
```typescript
import { useCartStore } from 'shared/stores/useCartStore';
```

---

## Best Practices

### 1. Always Use TypeScript

```typescript
// ✅ Good - Type-safe
interface UserStore {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
}

export const useUserStore = create<UserStore>((set) => ({
  // ...
}));

// ❌ Bad - No types
export const useUserStore = create((set) => ({
  user: null,
  login: async (email, password) => { }
}));
```

### 2. Keep Getters Pure

```typescript
// ✅ Good - Pure function
getTotal: () => {
  return get().items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad - Side effects in getter
getTotal: () => {
  const total = get().items.reduce((sum, item) => sum + item.price, 0);
  console.log('Total calculated:', total); // Side effect!
  return total;
}
```

### 3. Use Descriptive Names

```typescript
// ✅ Good
getDiscountedPrice: () => number;
isEligibleForFreeShipping: () => boolean;
calculateTaxAmount: () => number;

// ❌ Bad
getPrice: () => number;  // Which price? Original? Final?
check: () => boolean;    // Check what?
calc: () => number;      // Calculate what?
```

### 4. Document Business Rules

```typescript
/**
 * Calculate shipping cost based on business rules:
 * - Free shipping for orders >= $100
 * - Free shipping with FREESHIP promo code
 * - Weight-based: < 5 lbs = $5.99, < 10 lbs = $9.99, else $14.99
 */
getShippingCost: () => {
  // Implementation
}
```

### 5. Group Related Logic

```typescript
// ✅ Good - Group cart logic together
export const useCartStore = create<CartStore>((set, get) => ({
  // State
  items: [],
  promoCode: null,

  // Actions
  addItem: () => { },
  removeItem: () => { },

  // Calculations
  getSubtotal: () => { },
  getDiscount: () => { },
  getTotal: () => { }
}));

// ❌ Bad - Split across multiple stores unnecessarily
export const useCartItemsStore = create(() => ({ items: [] }));
export const useCartPromoStore = create(() => ({ promoCode: null }));
export const useCartCalculationsStore = create(() => ({ getTotal: () => 0 }));
```

### 6. Handle Errors Gracefully

```typescript
fetchUsers: async () => {
  set({ loading: true, error: null });

  try {
    const users = await api.get('/users');
    set({ users, loading: false });
  } catch (error) {
    set({
      error: error.message,
      loading: false,
      users: [] // Reset to safe state
    });
  }
}
```

### 7. Use Selectors for Performance

```typescript
// ✅ Good - Only re-renders when items change
const items = useCartStore(state => state.items);

// ❌ Bad - Re-renders on any store change
const { items } = useCartStore();
```

---

## Testing Strategy

### Unit Test Business Logic

```typescript
// stores/__tests__/usePriceSliderStore.test.ts
import { usePriceSliderStore } from '../usePriceSliderStore';

describe('Price Slider Business Logic', () => {
  beforeEach(() => {
    // Reset store before each test
    usePriceSliderStore.setState({
      currentValue: 500,
      minPrice: 0,
      maxPrice: 1000
    });
  });

  describe('Discount Calculation', () => {
    it('should give 20% discount for $500+', () => {
      const store = usePriceSliderStore.getState();
      store.setValue(750);

      expect(store.getDiscount()).toBe(0.20);
      expect(store.getFinalPrice()).toBe(600);
    });

    it('should give 10% discount for $200-$499', () => {
      const store = usePriceSliderStore.getState();
      store.setValue(300);

      expect(store.getDiscount()).toBe(0.10);
      expect(store.getFinalPrice()).toBe(270);
    });

    it('should give no discount below $100', () => {
      const store = usePriceSliderStore.getState();
      store.setValue(50);

      expect(store.getDiscount()).toBe(0);
      expect(store.getFinalPrice()).toBe(50);
    });
  });

  describe('Tier Assignment', () => {
    it('should assign premium tier for $500+', () => {
      const store = usePriceSliderStore.getState();
      store.setValue(600);

      expect(store.getTier()).toBe('premium');
    });
  });

  describe('Range Validation', () => {
    it('should clamp value to max', () => {
      const store = usePriceSliderStore.getState();
      store.setValue(9999);

      expect(store.currentValue).toBe(1000);
    });

    it('should clamp value to min', () => {
      const store = usePriceSliderStore.getState();
      store.setValue(-100);

      expect(store.currentValue).toBe(0);
    });
  });

  describe('Step Snapping', () => {
    it('should snap to nearest step', () => {
      const store = usePriceSliderStore.getState();
      store.setValue(237);
      store.snapToStep();

      expect(store.currentValue).toBe(240); // Nearest $10
    });
  });
});
```

### Integration Test with Headless Runtime

```typescript
// __tests__/headless-integration.test.ts
import { usePriceSliderStore } from '../stores/usePriceSliderStore';

describe('Headless Runtime Integration', () => {
  it('should handle setPriceValue command', async () => {
    // Simulate command from Kotlin
    const command = {
      requestId: 'test-123',
      setPriceValue: { value: 750 }
    };

    // Process command (like headless runtime does)
    usePriceSliderStore.getState().setValue(command.setPriceValue.value);

    // Get response data
    const state = usePriceSliderStore.getState();
    const response = {
      currentValue: state.currentValue,
      finalPrice: state.getFinalPrice(),
      tier: state.getTier()
    };

    // Assert
    expect(response.currentValue).toBe(750);
    expect(response.finalPrice).toBe(600);
    expect(response.tier).toBe('premium');
  });
});
```

---

## Migration Checklist

Use this checklist when extracting business logic from React components:

### Phase 1: Preparation
- [ ] Identify components with business logic
- [ ] List all state variables in component
- [ ] List all functions that modify state
- [ ] List all computed/derived values
- [ ] Document business rules

### Phase 2: Create Store
- [ ] Create new file in `shared/stores/`
- [ ] Define TypeScript interfaces
- [ ] Create Zustand store with `create()`
- [ ] Add initial state
- [ ] Implement actions (state modifiers)
- [ ] Implement getters (computed values)
- [ ] Add JSDoc comments for complex logic

### Phase 3: Update React Web
- [ ] Import store in component
- [ ] Replace `useState` with store usage
- [ ] Replace local functions with store actions
- [ ] Replace computed values with store getters
- [ ] Remove business logic from component
- [ ] Keep only UI-specific state
- [ ] Test component still works

### Phase 4: Add to Headless Runtime
- [ ] Import store in `headless-js/index.tsx`
- [ ] Add command handler for each action
- [ ] Call store methods from handlers
- [ ] Send responses with computed values
- [ ] Add console.log for debugging
- [ ] Test with Metro bundler

### Phase 5: Protobuf Integration
- [ ] Define commands in `.proto` file
- [ ] Define response message
- [ ] Update JSON proto definitions
- [ ] Test protobuf encoding/decoding

### Phase 6: Kotlin/Compose Integration
- [ ] Create Compose screen
- [ ] Add bridge helper methods
- [ ] Implement command builders
- [ ] Implement response parsers
- [ ] Add UI state management
- [ ] Test end-to-end flow

### Phase 7: Testing
- [ ] Write unit tests for store
- [ ] Test business logic independently
- [ ] Test integration with headless runtime
- [ ] Test end-to-end from Compose
- [ ] Test error cases
- [ ] Test edge cases (min/max values, etc.)

### Phase 8: Documentation
- [ ] Document business rules
- [ ] Add code comments
- [ ] Update README
- [ ] Create examples

---

## Summary

**Key Takeaways:**

1. **Extract business logic into Zustand stores** - Works in React web, React Native, and headless environments

2. **Keep UI separate** - Components should only handle rendering and user interaction

3. **Use TypeScript** - Type safety catches errors early

4. **Test business logic independently** - No need to mount components

5. **Single source of truth** - Change business rules in one place

6. **Platform abstractions** - Handle web vs React Native differences with interfaces

7. **Gradual migration** - Extract one component at a time

**This architecture enables:**
- ✅ Code reuse between web and mobile
- ✅ Headless JavaScript business logic
- ✅ Native UI (Jetpack Compose) with JavaScript business logic
- ✅ Testable business logic
- ✅ Maintainable codebase
- ✅ Flexible UI implementations

The slider example demonstrates that even complex UI components with business rules can be successfully extracted and shared across platforms!
