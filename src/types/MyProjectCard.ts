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
}
