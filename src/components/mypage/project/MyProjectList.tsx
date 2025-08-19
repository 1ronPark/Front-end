import MyprojectCard from "./MyprojectCard";
import type { Project } from "../../../hooks/useMyProjects";

export interface MyProjectListProps {
  createdProjects: Project[]; // 내가 만든 프로젝트
  appliedProjects: Project[]; // 지원했던 프로젝트
}

const MyProjectList = ({ createdProjects, appliedProjects }: MyProjectListProps) => {
  return (
    <div className="gap-8 h-full">
      <div className="flex flex-col items-start gap-2">
        <div className="w-full flex flex-col justify-between">
          <p className="title-medium-emphasis mb-5 text-lg text-[#1C1B21]">내 프로젝트</p>
        </div>
        {createdProjects.map((project, idx) => (
          <MyprojectCard
            key={`created-${idx}`}
            itemId={project.itemId}
            categories={project.itemCategories.map(cat => cat.categoryName)}
            title={project.itemName}
            sub_title={project.introduce}
            itemImageUrl={project.itemImageUrl}
            status={project.recruitStatus ? "모집중" : "모집마감"}
            hasTeammate={false}
            current_project={true}
            applied_project={false}
          />
        ))}
      </div>
      
      <div className="flex flex-col items-start gap-2">
        <div className="w-full flex flex-col justify-between mt-30">
          <p className="title-medium-emphasis mb-5 text-lg text-[#1C1B21]">지원 했던 프로젝트</p>
          {appliedProjects.map((project, idx) => (
            <MyprojectCard
              key={`applied-${idx}`}
              itemId={project.itemId}
              categories={project.itemCategories.map(cat => cat.categoryName)}
              title={project.itemName}
              sub_title={project.introduce}
              itemImageUrl={project.itemImageUrl}
              status={project.recruitStatus ? "모집중" : "모집마감"}
              hasTeammate={false}
              current_project={false}
              applied_project={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProjectList;