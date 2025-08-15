import ProjectCard from "./ProjectCard";
import {type ProjectListItem } from "../../../hooks/useProjectQueries";


type Props = {
  items: ProjectListItem[];
  isLoading?: boolean;
  isError?: boolean;
};

const ProjectList: React.FC<Props> = ({ items, isLoading, isError }) => {
  if (isLoading) return <div className="p-8">불러오는 중…</div>;
  if (isError)   return <div className="p-8">목록을 불러오지 못했습니다.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-fit min-h-[688px] overflow-y-auto">
      {items.map((project) => (
        <ProjectCard
          key={project.itemId}
          itemId={project.itemId}
          itemName={project.itemName}
          memberName={project.memberName}
          itemImageUrl={project.itemImageUrl}
          updatedAt={project.updatedAt}
          recruitStatus={project.recruitStatus}
          viewCount={project.viewCount}
          commentCount={project.commentCount}
          likedByCurrentUser={project.likedByCurrentUser}
          // 목록 응답에 없을 수 있는 값은 카드에서 기본값 처리
          school={project.school}
          introduce={project.introduce}
        />
      ))}
      {items.length === 0 && (
        <div className="p-8 text-gray-500">프로젝트가 없습니다.</div>
      )}
    </div>
  );
};

export default ProjectList;