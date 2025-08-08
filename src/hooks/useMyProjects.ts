import { useApiQuery } from "./apiHooks";

export interface Project {
  itemName: string;
  introduce: string;
  itemImageUrl: string;
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
    endpoint: "/api/v1/items/me",
  });
};