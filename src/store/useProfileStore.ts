// store/useProfileEditStore.ts
import { create } from "zustand";

type ProfileEditStore = {
  initialPositions: string[];
  positions: string[];

  setInitialPositions: (v: string[]) => void;
  setPositions: (v: string[]) => void;
  togglePosition: (pos: string) => void;
  reset: () => void;
};

export const useProfileStore = create<ProfileEditStore>((set, get) => ({
  initialPositions: [],
  positions: [],

  setInitialPositions: (v) => set({ initialPositions: v }),
  setPositions: (v) => set({ positions: v }),
  togglePosition: (pos) => {
    const cur = get().positions;
    set({
      positions: cur.includes(pos)
        ? cur.filter((p) => p !== pos)
        : [...cur, pos],
    });
  },
  reset: () => set({ initialPositions: [], positions: [] }),
}));
