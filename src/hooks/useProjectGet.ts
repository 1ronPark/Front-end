import { useQuery } from "@tanstack/react-query";
import { fetchRequest } from "./fetchRequest";

export interface ProjectItem {
  itemName: string;
  memberName: string;
  itemImageUrl: string;
}

export interface ProjectListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    items: ProjectItem[];
  };
  success: boolean;
}

export const useGetProjects = (page: number = 0) => {
  return useQuery<ProjectListResponse>({
    queryKey: ["projects", page],
    queryFn: () => fetchRequest(`/api/v1/items/search?page=${page}`),
  });
};
