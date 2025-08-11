// store/useProfileEditStore.ts
import { create } from "zustand";

export type Region = { id?: number; siDo: string; siGunGu: string };

type ProfileEditStore = {
  // 포지션 (현행 유지: 단일 선택)
  initialPositions: string[];
  positions: string[];
  // ✅ 선호지역
  initialRegions: Region[]; // 프로필 GET 스냅샷 (서버에 있던 건 id 포함)
  regions: Region[]; // 편집 중 값(신규는 id 없음)

  //포지션
  setInitialPositions: (v: string[]) => void;
  setPositions: (v: string[]) => void;
  togglePosition: (pos: string) => void;
  // ✅ 지역
  setInitialRegions: (v: Region[]) => void;
  setRegions: (v: Region[]) => void;

  reset: () => void;
};

export const useProfileStore = create<ProfileEditStore>((set, get) => ({
  // 포지션
  initialPositions: [],
  positions: [],
  // ✅ 지역
  initialRegions: [],
  regions: [],
  setInitialPositions: (v) => set({ initialPositions: v }),
  setPositions: (v) => set({ positions: v.length > 0 ? [v[0]] : [] }),
  togglePosition: (pos) => {
    const cur = get().positions;
    set({ positions: cur[0] === pos ? [] : [pos] });
  },

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
