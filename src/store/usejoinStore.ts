// src/store/usejoinStore.ts
import { create } from 'zustand';

interface JoinState {
  email: string;
  name: string;
  nickname: string;
  password: string;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setNickname: (nickname: string) => void;
  setPassword: (password: string) => void;
}

export const useAuthStore = create<JoinState>((set) => ({
  email: '',
  name: '',
  nickname: '',
  password: '',
  setEmail: (email) => set({ email }),
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setPassword: (password) => set({ password }),
}));