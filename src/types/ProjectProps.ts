// 전체 조회 응답 타입
export interface ProjectListItem {
  itemId: number;
  itemName: string;
  memberName: string;
  itemImageUrl?: string; 
  updatedAt: string;
  recruitStatus?: boolean;
  schoolName?: string;
  introduce?: string;
  viewCount: number;
  commentCount: number;
  likedByCurrentUser: boolean;
}

// 상세 조회 응답 타입
export type ProjectRegion = { siDo: string; siGunGu: string };

export type ProjectRecruitPosition = {
  positionName: string;
  recruitNumber: number;
  mainTasks: string;
  preferentialTreatment: string;
  preferMbti: string;
};

export type CategoryType =
  | "전체"
  | "플랫폼"
  | "라이프스타일"
  | "금융"
  | "커뮤니티"
  | "미디어"
  | "교육"
  | "생산성"
  | "블록체인"
  | "노코드"
  | "인공지능"
  | "데이터 분석"
  | "디자인"
  | "마케팅"
  | "게임"
  | "이커머스"
  | "헬스케어"
  | "바이오"
  | "메타버스"
  | "세일즈"
  | "보안"
  | "ESG"
  | "로보틱스";


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
  schoolName: string;
  regions: ProjectRegion[];
  description?: string;
  recruitPositions: ProjectRecruitPosition[];
  itemCategories: { categoryName: CategoryType }[];
  itemComments: ProjectComment[];
  commentCount: number;
  updatedAt: string;
  likedByCurrentUser: boolean;
  applicantStatus: boolean;
  suggestStatus: boolean;
};

export type ProjectDetailData = ProjectDetailDataApi & { itemId: number };

// 필터 타입
export type SortParam = 'popular' | 'latest'; // 스웨거에 열거가 없으면 프로젝트 합의 값으로

export type ProjectListApiParams = {
  page: number;        // 스웨거 예시가 1-based → 그대로 사용
  sort?: SortParam;    // 정렬 (없으면 서버 기본)
  mbti?: string;       // "E,N" 처럼 CSV (없으면 필터 X)
  categories?: string; 
};

