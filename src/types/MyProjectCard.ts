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

export interface MyProjectCardProps {
  id: number;
  categories: CategoryType[];
  title: string;
  sub_title: string;
  status: "모집중" | "모집마감";
  hasTeammate: boolean;
  current_project: boolean; //현재 참여하고 있는 프로젝트
  applied_project: boolean; //지원한 프로젝트인지 여부 이건 current_project가 true이면 false여야 함
  logo?: string; // Optional logo property
}
