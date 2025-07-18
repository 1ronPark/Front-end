import type { MyProjectCardProps } from "../src/types/MyProjectCard";

export const dummyProjectCard: MyProjectCardProps[] = [
  {
    id: 1,
    categories: ["커뮤니티", "세일즈", "인공지능"],
    title: "Lightup | 라잇업",
    sub_title: "대학생들을 위한 프로젝트 연계형 창업도모 서비스",
    status: "모집중",
    hasTeammate: true,
    current_project: true,
    applied_project: false,
  },
  {
    id: 2,
    categories: ["커뮤니티", "세일즈", "인공지능"],
    title: "Lightup | 라잇업",
    sub_title: "대학생들을 위한 프로젝트 연계형 창업도모 서비스",
    status: "모집마감",
    hasTeammate: false,
    current_project: true,
    applied_project: false,
  },
  {
    id: 3,
    categories: ["라이프스타일", "커뮤니티", "플랫폼"],
    title: "UMFlight",
    sub_title: "예약, 여행정보, 피드를 하나로",
    status: "모집중",
    hasTeammate: false,
    current_project: false,
    applied_project: true,
  },
  {
    id: 4,
    categories: ["라이프스타일", "커뮤니티", "플랫폼"],
    title: "UMFlight",
    sub_title: "예약, 여행정보, 피드를 하나로",
    status: "모집중",
    hasTeammate: false,
    current_project: false,
    applied_project: true,
  },
];
