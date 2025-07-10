import ProjectCard from "./ProjectCard";
import { dummyProjectInfo } from "../../../../mockData/dummyProjectInfo";

const ProjectList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-fit min-h-[688px] overflow-y-auto">
      {dummyProjectInfo.map((project: { id: number; name: string; user: string; date: string; location: string; }, index: number) => (
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
