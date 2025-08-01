// src/store/projectStore.ts
import { create } from 'zustand';

interface ProjectState {
  itemName: string;
  introduction: string;
  itemProfileImage: File | null;
  itemPlanFile: File | null;
  setItemName: (value: string) => void;
  setIntroduction: (value: string) => void;
  setItemProfileImage: (file: File | null) => void;
  setItemPlanFile: (file: File | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  itemName: '',
  introduction: '',
  itemProfileImage: null,
  itemPlanFile: null,
  setItemName: (value) => set({ itemName: value }),
  setIntroduction: (value) => set({ introduction: value }),
  setItemProfileImage: (file) => set({ itemProfileImage: file }),
  setItemPlanFile: (file) => set({ itemPlanFile: file }),
}));
