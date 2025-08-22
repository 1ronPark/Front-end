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

const buildProjectSearchQS = (p: ProjectListApiParams) => {
  const qs = new URLSearchParams();
  qs.append('page', String(p.page));
  if (p.sort) qs.append('sort', p.sort);
  if (p.category) qs.append('category', p.category);
  if (typeof p.positionId === 'number') qs.append('positionId', String(p.positionId));
  if (typeof p.onlyLiked === 'boolean') qs.append('onlyLiked', String(p.onlyLiked));
  if (p.regions && p.regions.length) {
    p.regions.forEach(r => qs.append('regions', r)); // ← 반복 키로 추가
  }
  return qs.toString();
};

// 전체 조회 api 훅
export const useProjectList = (params: ProjectListApiParams) => {
  const base = String(import.meta.env.VITE_API_ITEMS_SEARCH_ENDPOINT || '/v1/items/search');
  const qs = buildProjectSearchQS(params);
  const endpointWithQS = qs ? `${base}?${qs}` : base;

  return useApiQuery<ProjectListResponse>({
    method: 'GET',
    endpoint: endpointWithQS, // params 비움 → toQueryString 미사용
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



// 최근 본 프로젝트 api 데이터 타입

export const RECENT_REFRESH_EVENT = "recent:view:refresh";


export interface RecentViewedItem {
  itemId: number;
  itemName: string;
  introduce: string;
  itemProfileImageUrl: string | null;
  viewedAt: string; // ISO
}

export interface RecentViewedResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    recentViewedItems: RecentViewedItem[];
  };
  success: boolean;
}

// 
export const useRecentViewedProjects = () =>
  useApiQuery<RecentViewedResponse>({
    method: 'GET',
    endpoint: import.meta.env.VITE_API_ITEMS_RECENT_ENDPOINT,
  });