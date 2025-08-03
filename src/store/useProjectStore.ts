// src/store/projectStore.ts
import { create } from "zustand";

interface ProjectState {
  projectName: string;
  projectSubtitle: string;
  itemProfileImage: File | null;
  itemPlanFile: File | null;
  topics: string[];

  setProjectName: (value: string) => void;
  setProjectSubtitle: (value: string) => void;
  setItemProfileImage: (file: File | null) => void;
  setItemPlanFile: (file: File | null) => void;
  setTopics: (topics: string[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectName: "",
  projectSubtitle: "",
  itemProfileImage: null,
  itemPlanFile: null,
  topics: [],

  setProjectName: (value) => set({ projectName: value }),
  setProjectSubtitle: (value) => set({ projectSubtitle: value }),
  setItemProfileImage: (file) => set({ itemProfileImage: file }),
  setItemPlanFile: (file) => set({ itemPlanFile: file }),
  setTopics: (topics) => set({ topics }),
}));
