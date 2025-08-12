import type { CategoryType } from "../../../types/MyProjectCard";
import MyprojectCard from "./MyprojectCard";
import type { Project } from "../../../hooks/useMyProjects";

interface MyProjectListProps {
  projectList: Project[];
}

const MyProjectList = ({ projectList }: MyProjectListProps) => {
  return (
    <div className="gap-8 h-full">
      <div className="flex flex-col items-start gap-2">
        <div className="w-full flex flex-col justify-between">
          <p className="title-medium-emphasis text-[#1C1B21]">내 프로젝트</p>
        </div>
        {projectList.map((project, idx) => (
          <MyprojectCard
            key={`current-${idx}`}
            id={idx}
            categories={project.itemCategories.map(cat => cat.categoryName) as CategoryType[]}
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
    </div>
  );
};

export default MyProjectList;