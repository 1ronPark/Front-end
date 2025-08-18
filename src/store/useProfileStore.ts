// store/useProfileEditStore.ts
import { create } from "zustand";
import type { Strength } from "../hooks/useStrengths";
import type { Skill } from "../hooks/useSkill";

// ===== 타입 =====
export type Region = { id?: number; siDo: string; siGunGu: string };
type ProfileStrength = { id: number; name: string; strengthType: string };
type ProfileSkill = { id: number; name: string; skillType: string };

// 매퍼 (파일 밖에서도 쓰고 싶으면 export 해도 됨)
const mapProfileStrengths = (src: ProfileStrength[]): Strength[] =>
  src.map((s) => ({ strengthId: s.id, strengthName: s.name }));

// ✅ 스킬도 강점과 똑같이 매핑
const mapProfileSkills = (src: ProfileSkill[]): Skill[] =>
  src.map((s) => ({ skillId: s.id, skillName: s.name }));

const MAX_STRENGTHS = 10;
const MAX_SKILLS = 3;

type ProfileEditStore = {
  // 포지션
  initialPositions: string[];
  positions: string[];

  // 지역
  initialRegions: Region[];
  regions: Region[];

  // 강점
  initialStrengths: Strength[]; // 서버에서 최초 로드된 강점
  strengths: Strength[]; // 현재 선택된 강점(최대 10)

  // 스킬
  initialSkills: Skill[]; // 서버에서 최초 로드된 스킬
  skills: Skill[]; // 현재 선택된 스킬

  // 포지션 액션
  setInitialPositions: (v: string[]) => void;
  setPositions: (v: string[]) => void; // 단일 선택만 유지
  togglePosition: (pos: string) => void; // 같은 값이면 해제, 다르면 교체

  // 지역 액션
  setInitialRegions: (v: Region[]) => void;
  setRegions: (v: Region[]) => void;

  // 강점 액션
  setInitialStrengths: (v: Strength[]) => void; // ✅ 타입 수정
  setInitialStrengthsFromProfile: (src: ProfileStrength[]) => void; // ✅ 헬퍼 추가
  setStrengths: (v: Strength[]) => void; // 중복 제거 + 10개 제한
  addStrength: (s: Strength) => void; // 한 개 추가 (중복/제한 체크)
  removeStrength: (id: number) => void; // id로 제거
  resetStrengths: () => void; // 강점만 리셋

  // 스킬 액션
  setInitialSkills: (v: Skill[]) => void; // 초기 스킬 설정
  setInitialSkillsFromProfile: (src: ProfileSkill[]) => void; // ✅ 헬퍼 추가
  setSkills: (v: Skill[]) => void; // 현재 선택된 스킬
  addSkill: (s: Skill) => void; // 스킬 추가
  removeSkill: (id: number) => void; // id로 스킬 제거
  resetSkills: () => void; // 스킬만 리셋

  reset: () => void;
};

export const useProfileStore = create<ProfileEditStore>((set, get) => ({
  // ===== 포지션 =====
  initialPositions: [],
  positions: [],
  setInitialPositions: (v) => set({ initialPositions: v }),
  setPositions: (v) =>
    set({
      positions: v.length > 0 ? [v[0]] : [],
      strengths: [],
      initialStrengths: [],
    }),
  togglePosition: (pos) => {
    const cur = get().positions;
    const next = cur[0] === pos ? [] : [pos];
    // ✅ 포지션이 바뀌면 강점도 초기화
    set({
      positions: next,
      strengths: [],
      initialStrengths: [],
    });
  },

  // ===== 지역 =====
  initialRegions: [],
  regions: [],
  setInitialRegions: (v) => set({ initialRegions: v }),
  setRegions: (v) => set({ regions: v.slice(0, 3) }), // 최대 3개

  // ===== 강점 =====
  initialStrengths: [],
  strengths: [],
  setInitialStrengths: (v) => {
    if (!v?.length) {
      set({ initialStrengths: [], strengths: [] });
      return;
    }
    const map = new Map<number, Strength>();
    v.forEach((s) => map.set(s.strengthId, s));
    const uniq = Array.from(map.values()).slice(0, MAX_STRENGTHS);
    set({ initialStrengths: uniq, strengths: uniq });
  },
  setInitialStrengthsFromProfile: (src) => {
    if (!src?.length) {
      set({ initialStrengths: [], strengths: [] });
      return;
    }
    const mapped = mapProfileStrengths(src);
    const mapById = new Map<number, Strength>();
    mapped.forEach((s) => mapById.set(s.strengthId, s));
    const uniq = Array.from(mapById.values()).slice(0, MAX_STRENGTHS);
    set({ initialStrengths: uniq, strengths: uniq });
  },
  setStrengths: (v) => {
    const map = new Map<number, Strength>();
    v.forEach((s) => map.set(s.strengthId, s));
    set({ strengths: Array.from(map.values()).slice(0, MAX_STRENGTHS) });
  },
  addStrength: (s) => {
    const cur = get().strengths;
    if (cur.some((x) => x.strengthId === s.strengthId)) return; // 중복 방지
    if (cur.length >= MAX_STRENGTHS) return; // 10개 제한
    set({ strengths: [...cur, s] });
  },
  removeStrength: (id) => {
    const cur = get().strengths;
    set({ strengths: cur.filter((x) => x.strengthId !== id) });
  },
  resetStrengths: () => set({ strengths: [], initialStrengths: [] }),

  // ===== 스킬 =====
  initialSkills: [],
  skills: [],
  setInitialSkills: (v) => {
    const map = new Map<number, Skill>();
    (v ?? []).forEach((s) => map.set(s.skillId, s));
    const uniq = Array.from(map.values()).slice(0, MAX_SKILLS);
    set({ initialSkills: uniq, skills: uniq });
  },
  setInitialSkillsFromProfile: (src) => {
    if (!src?.length) {
      set({ initialSkills: [], skills: [] });
      return;
    }
    const mapped = mapProfileSkills(src);
    const mapById = new Map<number, Skill>();
    mapped.forEach((s) => mapById.set(s.skillId, s));
    const uniq = Array.from(mapById.values()).slice(0, MAX_SKILLS);
    set({ initialSkills: uniq, skills: uniq });
  },
  setSkills: (v) => {
    const map = new Map<number, Skill>();
    (v ?? []).forEach((s) => map.set(s.skillId, s));
    set({ skills: Array.from(map.values()).slice(0, MAX_SKILLS) });
  },
  addSkill: (s) => {
    const cur = get().skills;
    if (cur.some((x) => x.skillId === s.skillId)) return;
    if (cur.length >= MAX_SKILLS) return;
    set({ skills: [...cur, s] });
  },
  removeSkill: (id) => {
    const cur = get().skills;
    set({ skills: cur.filter((x) => x.skillId !== id) });
  },
  resetSkills: () => set({ skills: [], initialSkills: [] }),

  // ===== 전체 리셋 =====
  reset: () =>
    set({
      initialPositions: [],
      positions: [],
      initialRegions: [],
      regions: [],
      initialStrengths: [],
      strengths: [],
      initialSkills: [],
      skills: [],
    }),
}));
