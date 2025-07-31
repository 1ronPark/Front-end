import { create } from 'zustand';

interface LoginState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  reset: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  reset: () => set({ email: '', password: '' }),
}));