import { useParams, Navigate } from "react-router-dom";
import { useProjectDetail } from "../../hooks/useProjectQueries";
import { ProjectDetailProvider } from "../../types/ProjectDetailContext";
import type { ProjectDetailData } from "../../types/ProjectDetailProps";

import CommentSection from "../../components/common/comment/CommentSection";
import ProjectOverview from "../../components/common/projectsdetail/ProjectOverview";
import ProjectInfoCard from "../../components/common/projectsdetail/ProjectInfoCard";
import RecruitPart from "../../components/common/projectsdetail/RecruitPart";

export const ProjectDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const numericId = Number(itemId ?? NaN);
  const invalid = !Number.isFinite(numericId) || numericId <= 0;

  
  const { data, isLoading, isError } = useProjectDetail(numericId);

  // itemId가 유효하지 않으면 프로젝트 목록으로 리다이렉트
  if (invalid) return <Navigate to="/projects" replace />;
  if (isLoading) return <div className="p-8">상세 불러오는 중…</div>;
  if (isError || !data?.result)
    return <div className="p-8">상세를 불러오지 못했습니다.</div>;

  const value: ProjectDetailData = {  ...data.result, itemId: numericId };

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
