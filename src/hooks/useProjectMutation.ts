import { useApiMutation } from "../hooks/apiHooks";

//프로젝트 생성 API 훅================================================
export interface CreateProjectResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    itemName: string;
  };
  success: boolean;
}

export const useCreateProject = () => {
  return useApiMutation<FormData, CreateProjectResponse>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_ITEMS_ENDPOINT,  
    onSuccess: () => {
      alert("프로젝트 등록 완료!");
    },
    onError: (err: Error) => {
      alert(err.message || "등록 실패");
    },
  });
};

// 프로젝트 좋아요 등록 API 훅================================================
export const useLikeProject = (itemId: number) => {
  return useApiMutation<undefined, void>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_ITEMS_LIKE_ENDPOINT.replace(":id", String(itemId)),
  });
};

// 프로젝트 좋아요 취소 API 훅================================================
export const useUnlikeProject = (itemId: number) =>
  useApiMutation<undefined, void>({
    method: "DELETE",
    endpoint: import.meta.env.VITE_API_ITEMS_LIKE_ENDPOINT.replace(":id", String(itemId)),
  });

//프로젝트 지원 API 훅================================================
type BaseResponse<T = unknown> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  success: boolean;
};

type ApplyResult = { appliedAt: string; message?: string };


export const useApplyToProject = (itemId: number) =>
  useApiMutation<undefined, BaseResponse<ApplyResult>>({
    method: 'POST',
    endpoint: import.meta.env.VITE_API_ITEMS_APPLY_ENDPOINT.replace(':id', String(itemId)), 
  });