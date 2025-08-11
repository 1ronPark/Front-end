// store/useProfileEditStore.ts
import { create } from "zustand";

export type Region = { id?: number; siDo: string; siGunGu: string };
export type Strength = { id: number; name: string; strengthType: string };

const MAX_STRENGTHS = 10;

type ProfileEditStore = {
  // 포지션
  initialPositions: string[];
  positions: string[];

  // 지역
  initialRegions: Region[];
  regions: Region[];

  // 강점 (id 기반)
  initialStrengthIds: number[];
  strengthIds: number[];

  // 포지션
  setInitialPositions: (v: string[]) => void;
  setPositions: (v: string[]) => void;
  togglePosition: (pos: string) => void;

  // 지역
  setInitialRegions: (v: Region[]) => void;
  setRegions: (v: Region[]) => void;

  // 강점 (id 배열을 받도록 수정)
  setInitialStrengthIds: (ids: number[]) => void;
  setStrengthIds: (ids: number[]) => void;

  // 편의 함수 (프로필 응답 Strength[] → id[]로 매핑)
  setInitialStrengthsFromObjects: (list: Strength[]) => void;
  setStrengthsFromObjects: (list: Strength[]) => void;

  toggleStrengthId: (id: number) => void;
  removeStrengthId: (id: number) => void;
  clearStrengths: () => void;

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

  // 강점 (id 배열)
  initialStrengthIds: [],
  strengthIds: [],
  setInitialStrengthIds: (ids) =>
    set({ initialStrengthIds: Array.from(new Set(ids)) }),
  setStrengthIds: (ids) =>
    set({ strengthIds: Array.from(new Set(ids)).slice(0, MAX_STRENGTHS) }),

  // 편의: 객체 배열을 받아 id만 저장
  setInitialStrengthsFromObjects: (list) =>
    set({
      initialStrengthIds: Array.from(new Set(list.map((s) => s.id))),
    }),
  setStrengthsFromObjects: (list) =>
    set({
      strengthIds: Array.from(new Set(list.map((s) => s.id))).slice(
        0,
        MAX_STRENGTHS
      ),
    }),

  toggleStrengthId: (id) => {
    const cur = get().strengthIds;
    const exists = cur.includes(id);
    if (exists) {
      set({ strengthIds: cur.filter((x) => x !== id) });
    } else {
      if (cur.length >= MAX_STRENGTHS) return; // 10개 제한
      set({ strengthIds: [...cur, id] });
    }
  },
  removeStrengthId: (id) =>
    set({ strengthIds: get().strengthIds.filter((x) => x !== id) }),
  clearStrengths: () => set({ strengthIds: [] }),

  reset: () =>
    set({
      initialPositions: [],
      positions: [],
      initialRegions: [],
      regions: [],
      initialStrengthIds: [],
      strengthIds: [],
    }),
}));
