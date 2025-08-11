// store/useProfileEditStore.ts
import { create } from "zustand";

type ProfileEditStore = {
  initialPositions: string[];
  positions: string[]; // 유지 (항상 길이 0 또는 1)

  setInitialPositions: (v: string[]) => void;
  setPositions: (v: string[]) => void;
  togglePosition: (pos: string) => void;
  reset: () => void;
};

export const useProfileStore = create<ProfileEditStore>((set, get) => ({
  initialPositions: [],
  positions: [],

  setInitialPositions: (v) => set({ initialPositions: v }),
  setPositions: (v) => set({ positions: v.length > 0 ? [v[0]] : [] }), // 안전장치

  // ✅ 단일 선택 로직: 같은 걸 누르면 해제, 다른 걸 누르면 교체
  togglePosition: (pos) => {
    const cur = get().positions;
    set({
      positions: cur[0] === pos ? [] : [pos],
    });
  },

  reset: () => set({ initialPositions: [], positions: [] }),
}));
