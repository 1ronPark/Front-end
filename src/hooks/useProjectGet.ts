import { useApiQuery, useApiMutation } from './apiHooks';
import { type ProjectDetailData } from '../types/ProjectProps';

// 전체 조회 응답 타입
export interface ProjectListItem {
  itemName: string;
  memberName: string;
  itemImageUrl: string;
  likedByCurrentUser: boolean;
}

export interface ProjectListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    items: ProjectListItem[];
  };
  success: boolean;
}

// 전체 조회 api 훅
export const useProjectList = (page: number = 0) => {
  return useApiQuery<ProjectListResponse>({
    method: `GET`,
    endpoint: `/api/v1/items/search${page}`, // 페이지네이션을 위한 쿼리 파라미터
  });
};



// 상세 조회 응답 타입
interface ProjectDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ProjectDetailData;
  success: boolean;
}

// 상세조회
export const useProjectDetail = (itemId: number) => {
  return useApiQuery<ProjectDetailResponse>({
    method: 'GET',
    endpoint: `/api/v1/items/${itemId}`,
  });
};

// 좋아요 응답 타입
interface ProjectLikeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {};
  success: boolean;
}


// 좋아요 등록
export const useLikeProject = (itemId: number) => {
  return useApiMutation<undefined, ProjectLikeResponse>({
    method: 'POST',
    endpoint: `/api/v1/items/${itemId}/like`,
  });
};

// 좋아요 취소
export const useUnLikeProject = (itemId: number) => {
  return useApiMutation<undefined, ProjectLikeResponse>({
    method: 'DELETE',
    endpoint: `/api/v1/items/${itemId}/like`,
  });
};
