import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  itemProfileImage: File | null;
  itemPlanFile: File | null;
  // setter
  setItemProfileImage: (file: File | null) => void;
  setItemPlanFile: (file: File | null) => void;
  setName: (name: string) => void;
  setIntroduce: (introduce: string) => void;
  setDescription: (description: string) => void;
  setExtraLink1: (link: string) => void;
  setExtraLink2: (link: string) => void;
  setProjectStatus: (status: boolean) => void;
  setRecruitPositions: (positions: RecruitPosition[]) => void;
  setItemCategories: (categories: ItemCategory[]) => void;
  setCollaborationRegions: (regions: CollaborationRegion[]) => void;
  // actions
  setField: <K extends keyof RegisterProjectState>(
    key: K,
    value: RegisterProjectState[K]
  ) => void;
  resetState: () => void;
}

export const useRegisterProjectStore = create(
  persist<RegisterProjectState>(
    (set) => ({
      projectStatus: true,
      name: '',
      recruitPositions: [],
      itemCategories: [],
      collaborationRegions: [],
      description: '',
      introduce: '',
      itemProfileImage: null,
      itemPlanFile: null,
      setItemProfileImage: (file) => set({ itemProfileImage: file }),
      setItemPlanFile: (file) => set({ itemPlanFile: file }),
      setField: (key, value) => set({ [key]: value } as Partial<RegisterProjectState>),
      setName: (name) => set({ name }),
      setIntroduce: (introduce) => set({ introduce }),
      setDescription: (description) => set({ description }),
      setExtraLink1: (link) => set({ extraLink1: link }),
      setExtraLink2: (link) => set({ extraLink2: link }),
      setProjectStatus: (status) => set({ projectStatus: status }),
      setRecruitPositions: (positions) => set({ recruitPositions: positions }),
      setItemCategories: (categories) => set({ itemCategories: categories }),
      setCollaborationRegions: (regions) => set({ collaborationRegions: regions }),
      resetState: () =>
        set(() => ({
          extraLink1: '',
          extraLink2: '',
          projectStatus: true,
          name: '',
          recruitPositions: [],
          itemCategories: [],
          collaborationRegions: [],
          description: '',
          introduce: '',
          itemProfileImage: null,
          itemPlanFile: null,
        })),
    }),
    {
      name: 'register-project-storage',
      partialize: (state) => ({
        extraLink1: state.extraLink1,
        extraLink2: state.extraLink2,
        projectStatus: state.projectStatus,
        name: state.name,
        recruitPositions: state.recruitPositions,
        itemCategories: state.itemCategories,
        collaborationRegions: state.collaborationRegions,
        description: state.description,
        introduce: state.introduce,
        itemProfileImage: state.itemProfileImage,
        itemPlanFile: state.itemPlanFile,
        setItemProfileImage: state.setItemProfileImage,
        setItemPlanFile: state.setItemPlanFile,
        setField: state.setField,
        setName: state.setName,
        setIntroduce: state.setIntroduce,
        setDescription: state.setDescription,
        setExtraLink1: state.setExtraLink1,
        setExtraLink2: state.setExtraLink2,
        setProjectStatus: state.setProjectStatus,
        setRecruitPositions: state.setRecruitPositions,
        setItemCategories: state.setItemCategories,
        setCollaborationRegions: state.setCollaborationRegions,
        resetState: state.resetState,
      }),
    }
  )
);

// 각 섹션(Header, Detail, Recruit)에서 useRegisterProjectStore((s) => s.setField)로
// 개별 필드를 업데이트하면, RegisterProject.tsx에서는 getState()로 모두 읽어와
// makeItem() 호출만 하면 됩니다.