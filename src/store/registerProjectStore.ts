// registerProjectStore.ts 예시 (Zustand)
import { create } from 'zustand';

import type {
  RecruitPosition,
  ItemCategory,
  CollaborationRegion,
} from '../hooks/useMakeItem';

interface RegisterProjectState {
  // JSON 필드
  extraLink1?: string;
  extraLink2?: string;
  projectStatus: boolean;
  name: string;
  recruitPositions: RecruitPosition[];
  itemCategories: ItemCategory[];
  collaborationRegions: CollaborationRegion[];
  description: string;
  introduce: string;
  // 파일
  itemProfileImage?: File;
  itemPlanFile?: File;
  // actions
  setField: <K extends keyof RegisterProjectState>(
	key: K,
	value: RegisterProjectState[K]
  ) => void;
}

export const useRegisterProjectStore = create<RegisterProjectState>((set) => ({
  projectStatus: true,
  name: '',
  recruitPositions: [],
  itemCategories: [],
  collaborationRegions: [],
  description: '',
  introduce: '',
  setField: (key, value) => set({ [key]: value } as Partial<RegisterProjectState>),
}));

// 각 섹션(Header, Detail, Recruit)에서 useRegisterProjectStore((s) => s.setField)로
// 개별 필드를 업데이트하면, RegisterProject.tsx에서는 getState()로 모두 읽어와
// makeItem() 호출만 하면 됩니다.