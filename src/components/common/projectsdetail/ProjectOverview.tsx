import lightupProject from "../../../assets/icons/projectDetail/lightupProject.png";

const ProjectOverview = () => (
    <div>
        <p className="title-large-emphasis mb-4">프로젝트 소개</p>
            <div className="flex flex-col items-start bg-white rounded-lg border border-[rgba(121,116,126,0.08)] p-6 gap-12 w-full">
                <div className=" body-large-emphasis p-4 text-[#1C1B21]">
                    라잇업은 대학생, 취준생, 주니어 층을 타깃으로 한 프로젝트 연계형 창업 도모 서비스입니다. <br />
                    라잇업은 프로젝트 및 협업에 대한 실전 경험이 필요한 사용자들이 쉽고 빠르게 기획이나 팀원을 탐색하고 제안을 보내거나 지원할 수 있도록 하고
                    추후 실제 론칭 및 창업까지 이어질 수 있도록 돕는 서비스입니다.
                </div>
                <img src={lightupProject} alt="project overview img" className="w-full rounded-lg" />
            </div>
    </div>
);

export default ProjectOverview;