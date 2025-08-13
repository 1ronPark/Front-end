import { useParams, Navigate } from "react-router-dom";
import { useProjectDetail } from "../../hooks/useProjectQueries";
import { ProjectDetailProvider } from "../../types/ProjectDetailContext";
import type { ProjectDetailData } from "../../types/ProjectDetailProps";

import CommentSection from "../../components/common/comment/CommentSection";
import ProjectOverview from "../../components/common/projectsdetail/ProjectOverview";
import ProjectInfoCard from "../../components/common/projectsdetail/ProjectInfoCard";
import RecruitPart from "../../components/common/projectsdetail/RecruitPart";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const numericId = Number(projectId ?? NaN);
  const invalid = !Number.isFinite(numericId) || numericId <= 0;

  // 훅은 항상 호출, invalid면 enabled:false
  const { data, isLoading, isError } = useProjectDetail(numericId);

  if (invalid) return <Navigate to="/projects" replace />;

<<<<<<< HEAD
  if (isLoading) return <LoadingPage />;

  if (isError || !data?.result)
    return <ErrorPage />;

  const value: ProjectDetailData = {  ...data.result, itemId: numericId };
=======
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
>>>>>>> 5de7cb27eafcc94f2f929724632e454fee1f9a8f

  return (
    <ProjectDetailProvider value={value}>
      <div className="bg-[#EEE] min-h-screen py-[64px]">
        <div className="mx-auto flex flex-col gap-20 w-auto px-10 md:px-20 lg:px-40">
          <ProjectInfoCard />
          <ProjectOverview />
          <RecruitPart />
          <CommentSection />
        </div>
      </div>
    </ProjectDetailProvider>
  );
};
