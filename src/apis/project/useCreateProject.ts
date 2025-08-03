// src/apis/useCreateProject.ts
import { useApiMutation } from "../../hooks/apiHooks";

export interface CreateProjectResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: 0,
    itemName: string;
  };
  success: boolean;
}

export const useCreateProject = () => {
  return useApiMutation<FormData, CreateProjectResponse>({
    method: "POST",
    endpoint: "/api/v1/items",
    onSuccess: () => {
      alert("프로젝트 등록 완료!");
    },
    onError: (err: Error) => {
      alert(err.message || "등록 실패");
    },
  });
};
