   import { useApiQuery } from './apiHooks';
import type { ProjectListItem, ProjectDetailData, ProjectListApiParams } from '../types/ProjectProps';


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
export const useProjectList = (params: ProjectListApiParams) => {
  const { page, ...rest } = params;

  return useApiQuery<ProjectListResponse>({
    method: 'GET',
    endpoint: import.meta.env.VITE_API_ITEMS_SEARCH_ENDPOINT,
    params: {
      page,      // 스웨거 예시대로 1-based
      ...rest,   // sort, mbti
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
export const useProjectDetail = (id: number) =>
  useApiQuery<ProjectDetailResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_ITEMS_DETAIL_ENDPOINT.replace(":id", String(id)),
    // queryKey를 내부에서 [method, endpoint, queryString]로 만들면 자동 동일
    enabled: Number.isFinite(id) && id > 0,
  });

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
