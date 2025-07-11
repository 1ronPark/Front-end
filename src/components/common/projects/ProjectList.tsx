import ProjectCard from "./ProjectCard";
import { dummyProjectInfo } from "../../../../mockData/dummyProjectInfo";
import type { ProjectData } from "../../../types/ProjectCardProps";

const ProjectList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-fit min-h-[688px] overflow-y-auto">
      {dummyProjectInfo.map((project: ProjectData, index: number) => (
        <ProjectCard
          key={`project-${index}`}
          id={project.id}
          name={project.name}
          user={project.user}
          date={project.date}
          location={project.location}
        />
      ))}
    </div>
  );
};

export default ProjectList;
