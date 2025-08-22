// src/apis/useCreateProject.ts
import { useApiMutation, useApiQuery } from "../hooks/apiHooks";

export interface ApiResponse<T>{
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  success: boolean;
}

//프로젝트 생성 API 훅================================================
export interface CreateProjectResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number,
    itemName: string;
  };
  success: boolean;
}

// 프로젝트 제안 API 훅 (회원 상세 페이지에서의 제안 보내기)
export interface OfferProjectRequest {
  itemId: number;
  memberId: number;
}

export interface OfferProjectResponse {
  appliedAt: string;
}

// 프로젝트 제안 상태 조회 API 훅
export interface ItemApplyStatus {
  itemOwned: boolean;
  itemId: number;
  itemName: string;
  itemImageUrl: string;
  itemOwnerUsername: string;
  memberId: number;
  memberUsername: string;
  memberProfileImageUrl: string;
  applyId: number;
  fromOwner: boolean;
  applyStatus: "PENDING" | "ACCEPTED" | "REJECTED";
}

export interface ApplyStatusResponse {
  itemApplyStatuses: ItemApplyStatus[];
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
    method: 'POST',
    endpoint: import.meta.env.VITE_API_ITEMS_LIKE_ENDPOINT.replace(':id', String(itemId)),
    onSuccess: () => {
      alert('좋아요 등록 완료!');
    },
    onError: (error) => {
      alert(error.message || '좋아요 등록 실패');
    },
  });
};

// 프로젝트 좋아요 취소 API 훅================================================
export const useUnlikeProject = (itemId: number) =>
  useApiMutation<undefined, void>({
    method: "DELETE",
    endpoint: import.meta.env.VITE_API_ITEMS_LIKE_ENDPONIT.replace(':id', String(itemId)),
    onSuccess: () => {
      console.log("좋아요 취소 성공");
    },
    onError: (err) => {
      alert(err.message || "좋아요 취소 실패");
    },
  });


// 프로젝트 제안 API 훅 (회원 상세 페이지에서의 제안 보내기)
export const useOfferProject = () => 
    useApiMutation<OfferProjectRequest, ApiResponse<OfferProjectResponse>>({
      method: "POST",
      endpoint: import.meta.env.VITE_API_ITEMS_OFFER_ENDPOINT,
      onSuccess: (res) => {
        console.log('제안 보내기 성공', res.result.appliedAt);
      },
      onError: (err) => {
        alert(err.message || "제안 실패");
      }
  });

// 프로젝트 제안 상태 조회 API 훅
export const useOfferedProject = () => 
    useApiQuery<ApiResponse<ApplyStatusResponse>>({
      method: "GET",
      endpoint: import.meta.env.VITE_API_ITEMS_OFFERED_ENDPOINT,
    });