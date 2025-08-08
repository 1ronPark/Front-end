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
            //서버에서 데이터 넘겨주는 값 수정 필요 
            categories={["기본"] as CategoryType[]}
            title={project.itemName}
            sub_title={project.introduce}
            status={"모집중"} // 서버에서 구분값 오면 실제로 반영
            hasTeammate={false} // 서버에서 정보 오면 반영, 기본값 false
            current_project={true} // 서버에서 구분시 반영
            applied_project={false} // 서버에서 구분시 반영
          />
        ))}
      </div>
    </div>
  );
};

export default MyProjectList;