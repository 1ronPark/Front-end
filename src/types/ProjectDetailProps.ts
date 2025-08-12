
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

export type ProjectDetailDataApi = {
  // 서버 응답 그대로 (itemId 없음)
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
  description?: string;
  recruitPositions: ProjectRecruitPosition[];
  itemCategories: CategoryType[];
  itemComments: ProjectComment[];
  commentCount: number;
  updatedAt: string;
  likedByCurrentUser: boolean;
  applied_project: boolean;
  suggested_project: boolean;
};

export type ProjectDetailData = ProjectDetailDataApi & { itemId: number };
