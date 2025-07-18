// 회원 정보와 프로젝트 정보 매핑 타입
// (필요하실 때마다 유동적으로 추가 가능합니다!)

import type { MyProjectCardProps } from "./MyProjectCard";

export type ProjectCardWithUserProps = MyProjectCardProps & {
  name: string;
  nickname: string;
  email: string;
  univ: string;
  age: number;
  gender: "남" | "여" | "미정";
  mbti: string;
  location: string;
};
