// types/ProjectCardWithUser.ts
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
