import { create } from 'zustand';

type RecruitPosition = {
  positionId: number;
  mainTasks: string;
  preferentialTreatment: string;
  preferMbti: string;
  recruitNumber: number;
};

type ItemCategory = {
  itemCategory: string;
};

type Region = {
  siDo: string;
  siGunGu: string;
};

type EditProjectState = {
  name: string;
  introduce: string;
  description: string;
  itemCategories: ItemCategory[];
  itemProfileImage: File | null;
  itemPlanFile: File | null;
  extraLink1: string;
  extraLink2: string;
  projectStatus: boolean;
  recruitPositions: RecruitPosition[];
  collaborationRegions: Region[];
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  setField: <T extends keyof EditProjectState>(field: T, value: EditProjectState[T]) => void;
  reset: () => void;
};

export const useEditProjectStore = create<EditProjectState>((set) => ({
  isEditMode: false,
  name: '',
  introduce: '',
  description: '',
  itemCategories: [],
  itemProfileImage: null,
  itemPlanFile: null,
  extraLink1: '',
  extraLink2: '',
  projectStatus: true,
  recruitPositions: [],
  collaborationRegions: [],
  setIsEditMode: (value) => set({ isEditMode: value }),
  setField: (field, value) => set({ [field]: value }),
  reset: () =>
    set({
      isEditMode: false,
      name: '',
      introduce: '',
      description: '',
      itemCategories: [],
      itemProfileImage: null,
      itemPlanFile: null,
      extraLink1: '',
      extraLink2: '',
      projectStatus: true,
      recruitPositions: [],
      collaborationRegions: [],
    }),
}));