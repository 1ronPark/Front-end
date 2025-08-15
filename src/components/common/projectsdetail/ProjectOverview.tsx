import lightupProject from "../../../assets/icons/projectDetail/lightupProject.png";
import { useProjectDetailCtx } from "../../../types/ProjectDetailContext";

const ProjectOverview = () => {
  const { description } = useProjectDetailCtx();

  return (
    <div>
      <p className="title-large-emphasis mb-4">프로젝트 소개</p>
      <div className="flex flex-col items-start bg-white rounded-lg border border-[rgba(121,116,126,0.08)] p-6 gap-12 w-full">
        <div className=" body-large-emphasis p-4 text-[#1C1B21]">
          {description}
        </div>
        <img
          src={lightupProject}
          alt="project overview img"
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default ProjectOverview;
