import type { CategoryType } from "../types/ProjectDetailProps";
import { useApiQuery } from "./apiHooks";

export interface Project {
  itemName: string;
  itemId: number;
  introduce: string;
  itemImageUrl: string;
  itemCategories: { categoryName: CategoryType }[];
  recruitStatus: boolean; // true면 모집중, false면 모집마감
  // 추가적인 프로젝트 정보가 필요하면 여기에 정의
  myApplyItem: boolean;
  applicantStatus?: boolean; 
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
  const { data, isLoading } = useApiQuery<MyProjectsResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_ITEMSME_ENDPOINT,
  });

  const items = data?.result?.items ?? [];

  const createdProjects = items.filter((item) => item.myApplyItem === false);
  const appliedProjects = items.filter((item) => item.myApplyItem === true);

  return {
    isLoading,
    createdProjects,
    appliedProjects,
  };
};