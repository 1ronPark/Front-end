import ProjectCard from "./ProjectCard";
import { dummyProjectCard } from "../../../../mockData/dummyProjectCard";
import { dummyMemberInfo } from "../../../../mockData/dummyMemberInfo";
import type { ProjectCardWithUserProps } from "../../../types/ProjectCardWithUser";

const ProjectList = () => {
  const projectsWithUser: ProjectCardWithUserProps[] = dummyProjectCard.map((project) => {
    const member = dummyMemberInfo.find((m) => m.id === project.id);

    return {
      ...project,
      name: member?.name ?? "이름 없음",
      nickname: member?.nickname ?? "",
      email: member?.email ?? "",
      school: member?.school ?? "",
      age: member?.age ?? 0,
      gender: member?.gender ?? "미정",
      mbti: member?.mbti ?? "",
      location: member?.location ?? "위치 비공개",
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-fit min-h-[688px] overflow-y-auto">
      {projectsWithUser.map((project, index) => (
        <ProjectCard
          key={`project-${index}`}
          {...project}
        />
      ))}
    </div>
  );
};

export default ProjectList;
