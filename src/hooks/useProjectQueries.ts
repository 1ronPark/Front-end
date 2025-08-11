import { useApiQuery } from './apiHooks';
import type { ProjectDetailData } from '../types/ProjectDetailProps';

// 전체 조회 응답 타입
export interface ProjectListItem {
  itemId: number;
  itemName: string;
  memberName: string;
  itemImageUrl?: string; 
  updatedAt: string;
  recruitStatus?: boolean;
  school: string;
  introduce: string;
  viewCount: number;
  commentCount: number;
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
    endpoint: `/api/v1/items/search?page=${page}`, // 페이지네이션을 위한 쿼리 파라미터
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

// 좋아요 상태 조회 응답 타입
interface LikedStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    liked: boolean;
  };
  success: boolean;
}

export const useLikedStatus = (itemId: number) => {
  return useApiQuery<LikedStatusResponse>({
    method: "GET",
    endpoint: `/api/v1/items/${itemId}/like`, 
  });
};
