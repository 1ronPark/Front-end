// store/useProfileEditStore.ts
import { create } from "zustand";

export type Region = { id?: number; siDo: string; siGunGu: string };

type ProfileEditStore = {
  // 포지션
  initialPositions: string[];
  positions: string[];

  // 지역
  initialRegions: Region[];
  regions: Region[];

  // 포지션
  setInitialPositions: (v: string[]) => void;
  setPositions: (v: string[]) => void;
  togglePosition: (pos: string) => void;

  // 지역
  setInitialRegions: (v: Region[]) => void;
  setRegions: (v: Region[]) => void;

  reset: () => void;
};

export const useProfileStore = create<ProfileEditStore>((set, get) => ({
  // 포지션
  initialPositions: [],
  positions: [],
  setInitialPositions: (v) => set({ initialPositions: v }),
  setPositions: (v) => set({ positions: v.length > 0 ? [v[0]] : [] }),
  togglePosition: (pos) => {
    const cur = get().positions;
    set({ positions: cur[0] === pos ? [] : [pos] });
  },
  // 지역
  initialRegions: [],
  regions: [],
  setInitialRegions: (v) => set({ initialRegions: v }),
  setRegions: (v) => set({ regions: v.slice(0, 3) }), // 최대 3개

  reset: () =>
    set({
      initialPositions: [],
      positions: [],
      initialRegions: [],
      regions: [],
    }),
}));
