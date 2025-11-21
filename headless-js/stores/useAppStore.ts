import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: number;
}

interface AppState {
  counter: number;
  users: User[];
  lastUpdated: number;

  // Actions
  increment: (amount: number) => number;
  addUser: (name: string, email: string, age: number) => User[];
  getState: () => { counter: number; users: User[]; lastUpdated: number };
  multiply: (a: number, b: number) => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  counter: 0,
  users: [],
  lastUpdated: Date.now(),

  increment: (amount: number) => {
    let newValue = 0;
    set((state) => {
      newValue = state.counter + amount;
      return { counter: newValue, lastUpdated: Date.now() };
    });
    console.log(`✅ Incremented by ${amount}, new value: ${newValue}`);
    return newValue;
  },

  addUser: (name: string, email: string, age: number) => {
    let newUsers: User[] = [];
    set((state) => {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        age,
        createdAt: Date.now(),
      };
      newUsers = [...state.users, newUser];
      return { users: newUsers, lastUpdated: Date.now() };
    });
    console.log(`✅ Added user: ${name}, total users: ${newUsers.length}`);
    return newUsers;
  },

  getState: () => {
    const state = get();
    console.log(`✅ Getting state: counter=${state.counter}, users=${state.users.length}`);
    return {
      counter: state.counter,
      users: state.users,
      lastUpdated: state.lastUpdated,
    };
  },

  multiply: (a: number, b: number) => {
    const result = a * b;
    console.log(`✅ Multiplying ${a} × ${b} = ${result}`);
    return result;
  },
}));
