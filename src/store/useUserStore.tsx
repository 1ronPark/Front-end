// src/store/useUserStore.tsx
import { create } from 'zustand';

interface User {
  memberId: number;
  name: string;
  nickname: string;
  email: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));