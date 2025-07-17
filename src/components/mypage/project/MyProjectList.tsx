import { dummyProjectCard } from "../../../../mockData/dummyProjectCard";
import type { MyProjectCardProps } from "../../../types/MyProjectCard";
import MyprojectCard from "./MyprojectCard";

const projectList: MyProjectCardProps[] = dummyProjectCard;

const MyProjectList = () => {
  //내가
  const managedProjects = projectList.filter((p) =>
    ["참여중", "제안 수락됨", "제안 거절됨"].includes(p.status)
  );
  //내 프로젝트 list
  const ownedProjects = projectList.filter((p) =>
    ["모집중", "모집마감"].includes(p.status)
  );

  return (
    <div className="gap-8 h-full">
      {/* 내 프로젝트 */}
      <div className="flex flex-col items-center mt-[48px]">
        <div className="w-full flex flex-col justify-between mb-4">
          <p className="title-medium-emphasis text-[#1C1B21]">내 프로젝트</p>
        </div>
        {ownedProjects.map((project, idx) => (
          <MyprojectCard key={`owned-${idx}`} {...project} />
        ))}
      </div>

      {/* 내가 참여중인 프로젝트 */}

      <div className="text-black my-9">지원했던 프로젝트</div>
      {managedProjects.map((project, idx) => (
        <MyprojectCard key={`managed-${idx}`} {...project} />
      ))}
    </div>
  );
};

export default MyProjectList;
