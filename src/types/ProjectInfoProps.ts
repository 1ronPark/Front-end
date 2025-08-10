// src/types/project.ts

/** 공통 API 응답 래퍼 */
export interface ApiEnvelope<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  success: boolean;
}

/** 프로젝트 목록 아이템 (목록 뷰 최소 필드) */
export interface ProjectListItem {
  itemId: number;
  itemName: string;
  memberName: string;
  itemImageUrl: string;
  updatedAt: string;
  recruitStatus?: boolean;
  viewCount: number;
  commentCount: number;
  likedByCurrentUser: boolean;
}

/** 목록 응답 */
export type ProjectListResponse = ApiEnvelope<{
  items: ProjectListItem[];
}>;

/** 상세 데이터
 *  - 기존에 따로 파일이 있다면 아래 import 경로만 맞춰줘.
 *  - 예: "./ProjectDetailProps" 또는 "../types/ProjectDetailProps"
 */
import type { ProjectDetailData } from "./ProjectDetailProps";

/** 상세 응답 */
export type ProjectDetailResponse = ApiEnvelope<ProjectDetailData>;

/** 생성(등록) 응답 */
export type CreateProjectResponse = ApiEnvelope<{
  memberId: number;
  itemName: string;
  // 서버가 내려주면 추가
  // itemId?: number;
}>;

/** (선택) 좋아요/취소 응답이 필요하다면 */
export type ProjectLikeResponse = ApiEnvelope<Record<string, never>>;
