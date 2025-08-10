//import type { CategoryType } from "./MyProjectCard";

export type ProjectRegion = { siDo: string; siGunGu: string;};

export type ProjectRecruitPosition = {
  positionName: string;
  recruitNumber: number;
  mainTasks: string;
  preferentialTreatment: string;
  preferMbti: string;
};

export type CategoryType = {
  categoryName: string;
};

export type ProjectComment = {
  itemCommentId: number;
  authorName: string;
  authorProfileImageURL: string;
  content: string;
  updatedAt: string; //ISO 8601 형식의 날짜 문자열
};

export type ProjectDetailData = {
  introduce: string;
  itemName: string;
  itemProfileImageUrl: string;
  memberName: string;
  nickName: string;
  gender: boolean;
  age: number;
  mbti: string;
  email: string;
  school: string;
  regions: ProjectRegion[];
  description: string;
  recruitPositions: ProjectRecruitPosition[];
  itemCategories: CategoryType[];
  itemComments: ProjectComment[];
  commentCount: number;
  updatedAt: string;  // "YYYY-MM-DD"
  likedByCurrentUser: boolean;
  applied_project: boolean; // 지원한 프로젝트인지 여부
  suggested_project: boolean; // 제안받은 프로젝트인지 여부
};
