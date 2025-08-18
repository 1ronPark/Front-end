import { useApiQuery } from './apiHooks';
import type { CategoryType, ProjectDetailData } from '../types/ProjectDetailProps';

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
type SortApi = "popular" | "latest" | undefined;

const joinOrUndef = (arr?: (string | number)[]) =>
  arr && arr.length ? arr.join(",") : undefined;

export const useProjectList = (
  page: number,
  sort?: SortApi,
  filters?: {
    categories?: CategoryType[];
    part?: string;
    mbti?: string[];
    regions?: string[];
  }
) => {
  return useApiQuery<ProjectListResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_ITEMS_SEARCH_ENDPOINT,
    params: {
      page,
      sort, // 'popular' | 'latest'
      categories: joinOrUndef(filters?.categories as unknown as string[]),
      part: filters?.part,
      mbti: joinOrUndef(filters?.mbti),
      regions: joinOrUndef(filters?.regions),
    },
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
    endpoint: import.meta.env.VITE_API_ITEMS_GET_DETAIL_ENDPOINT.replace(':id', String(itemId)) ,
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
    endpoint: import.meta.env.VITE_API_ITEMS_LIKE_ENDPOINT.replace(":id", String(itemId)), 
  });
};
