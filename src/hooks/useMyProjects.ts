import type { CategoryType } from "../types/ProjectDetailProps";
import { useApiQuery } from "./apiHooks";

export interface Project {
  itemName: string;
  introduce: string;
  itemImageUrl: string;
  itemCategories: { categoryName: CategoryType }[];
  recruitStatus: boolean; // true면 모집중, false면 모집마감
  // 추가적인 프로젝트 정보가 필요하면 여기에 정의
}

interface MyProjectsResponse {
  result: {
    items: Project[];
  };
  isSuccess: boolean;
  code: string;
  message: string;
  success: boolean;
}

export const useMyProjects = () => {
  return useApiQuery<MyProjectsResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_ITEMSME_ENDPOINT,
  });
};