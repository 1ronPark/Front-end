import { dummyProjectInfo } from "../../../../mockData/dummyProjectCard";
import type { MyProjectCardProps } from "../../../types/MyProjectCard";
import MyprojectCard from "./MyprojectCard";

const projectList: MyProjectCardProps[] = dummyProjectInfo;

const MyProjectList = () => {
  //내가 현재 하고 있는 프로젝트 list
  const currentProjects = projectList.filter((p) =>
    [true].includes(p.current_project)
  );
  //내 프로젝트 list
  const appliedProjects = projectList.filter((p) =>
    [true, undefined].includes(p.applied_project)
  );

  return (
    <div className="gap-8 h-full">
      {/* 내가 진행하고 있는 프로젝트 */}
      <div className="flex flex-col items-start gap-2">
        <div className="w-full flex flex-col justify-between">
          <p className="title-medium-emphasis text-[#1C1B21]">내 프로젝트</p>
        </div>
        {currentProjects.map((project, idx) => (
          <MyprojectCard key={`current-${idx}`} {...project} />
        ))}
      </div>

      {/* 내가 지원했던 */}
      <div className="flex flex-col items-start gap-2 mt-[128px]">
        <div className="flex justify-between items-center">
          <p className="title-medium-emphasis text-[#1C1B21]">
            지원했던 프로젝트
          </p>
        </div>
        {appliedProjects.map((project, idx) => (
          <MyprojectCard key={`applied-${idx}`} {...project} />
        ))}
      </div>
    </div>
  );
};

export default MyProjectList;
