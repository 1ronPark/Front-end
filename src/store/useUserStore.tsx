// src/store/useUserStore.tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // localStorage key 이름
    }
  )
);