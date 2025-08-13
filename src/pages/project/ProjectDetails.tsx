import { useParams } from "react-router-dom";
import CommentSection from "../../components/common/comment/CommentSection";
import ProjectOverview from "../../components/common/projectsdetail/ProjectOverview";
import ProjectInfoCard from "../../components/common/projectsdetail/ProjectInfoCard";
import RecruitPart from "../../components/common/projectsdetail/RecruitPart";

import { dummyProjectCard } from "../../../mockData/dummyProjectCard";
import { dummyMemberInfo } from "../../../mockData/dummyMemberInfo";

import type { MyProjectCardProps } from "../../types/MyProjectCard";
import type { MyInfoProps } from "../../types/MyInfoProps";
import type { ProjectCardWithUserProps } from "../../types/ProjectCardWithUser";

export const ProjectDetail = () => {
  // 1. 추후 라우팅 시 사용할 수 있음
const { projectId } = useParams<{ projectId: string }>();
const projectIdNum = parseInt(projectId!); // <- 일단 undefined아님을 명시해두었는데 추후 오류 발생 시 수정 필요


  // 2. id 기준 프로젝트, 작성자(첫 번째 멤버 기준) 찾기
  const project: MyProjectCardProps =
    dummyProjectCard.find((p) => p.id === projectIdNum) || dummyProjectCard[0]; // -> 추후 에러페이지로 리다이랙션 필요함
  const member: MyInfoProps =
    dummyMemberInfo.find((m) => m.id === projectIdNum) || dummyMemberInfo[0];

  // 3. ProjectInfoCard에 넘길 props 구성 (ProjectCardWithUserProps 타입 맞춤)
  const projectCardWithUser: ProjectCardWithUserProps = {
    ...project,
    name: member.name,
    nickname: member.nickname ?? "", // 혹시 없을 수도 있으니
    email: member.email,
    school: member.school,
    age: member.age ?? 0,
    gender: member.gender ?? "미정",
    mbti: member.mbti ?? "미정",
    location: member.location ?? "위치 비공개",
  };

  return (
    <div className="bg-[#EEE] min-h-screen py-[64px]">
      <div className="mx-auto flex flex-col gap-20 w-auto px-10 md:px-20 lg:px-40">
        <ProjectInfoCard {...projectCardWithUser} />{" "}
        {/*추후에 API 연결 시 수정 필요*/}
        <ProjectOverview />
        <RecruitPart />
        <CommentSection />
      </div>
    </div>
  );
};
