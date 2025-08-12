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
  school?: string;
  introduce?: string;
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
export type ListSort = 'latest' | 'popular';

export const useProjectList = (page: number, sort?: ListSort) => {
  const apiPage = Math.max(1, Math.trunc(page));

  const qs = new URLSearchParams();
  qs.set('page', String(apiPage));
  if (sort) qs.set('sort', sort);

  return useApiQuery<ProjectListResponse>({
    method: 'GET',
    endpoint: `/api/v1/items/search?${qs.toString()}`,
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
    enabled: Number.isFinite(itemId) && itemId > 0,
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
