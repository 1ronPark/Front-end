import CommentSection from "../../components/common/projectsdetail/CommentSection";
import ProjectOverview from "../../components/common/projectsdetail/ProjectOverview";
import ProjectInfoCard from "../../components/common/projectsdetail/ProjectInfoCard";
import { dummyProjectInfo } from "../../../mockData/dummyProjectInfo";
import RecruitPart from "../../components/common/projectsdetail/RecruitPart";

export const ProjectDetail = () => {
  return (
    <div className="bg-[#EEE] min-h-screen py-[64px]">
      <div className="mx-auto flex flex-col gap-20 w-auto px-10 md:px-20 lg:px-40">
        <ProjectInfoCard {...dummyProjectInfo[0]} />{" "}
        {/*추후에 API 연결 시 수정 필요*/}
        <ProjectOverview />
        <RecruitPart />
        <CommentSection />
      </div>
    </div>
  );
};
