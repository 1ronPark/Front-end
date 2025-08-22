import { useParams, Navigate } from "react-router-dom";
import {
  useProjectDetail,
  RECENT_REFRESH_EVENT,
} from "../../hooks/useProjectQueries";
import { ProjectDetailProvider } from "../../types/ProjectDetailContext";
import type { ProjectDetailData } from "../../types/ProjectProps";

import CommentSection from "../../components/common/comment/CommentSection";
import ProjectOverview from "../../components/common/projectsdetail/ProjectOverview";
import ProjectInfoCard from "../../components/common/projectsdetail/ProjectInfoCard";
import RecruitPart from "../../components/common/projectsdetail/RecruitPart";
//import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import { useEffect } from "react";

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const numericId = Number(projectId ?? NaN);
  const invalid = !Number.isFinite(numericId) || numericId <= 0;

  // 훅은 항상 호출, invalid면 enabled:false
  const { data, isLoading, isError, refetch, isFetching } =
    useProjectDetail(numericId);

useEffect(() => {
  if (!data?.result) return;
  // 혹시 서버 반영이 약간 늦다면 아주 짧은 지연(50~150ms)도 실전에서 종종 씁니다.
  const t = setTimeout(() => {
    window.dispatchEvent(new Event(RECENT_REFRESH_EVENT));
  }, 50);
  return () => clearTimeout(t);
}, [data?.result]);


  if (invalid) return <Navigate to="/projects" replace />;

  if (isLoading) return <div className="p-8">불러오는 중…</div>;

  if (isError || !data?.result) return <ErrorPage />;

  const value: ProjectDetailData = { ...data.result, itemId: numericId };

  return (
    <ProjectDetailProvider value={value}>
      <div className="bg-[#EEE] min-h-screen py-[64px]">
        <div className="mx-auto flex flex-col gap-20 w-auto px-10 md:px-20 lg:px-40">
          <ProjectInfoCard />
          <ProjectOverview />
          <RecruitPart />
          <CommentSection onRefresh={refetch} isRefreshing={isFetching} />
        </div>
      </div>
    </ProjectDetailProvider>
  );
};
