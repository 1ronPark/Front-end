import ProjectCard from "./ProjectCard";
import { dummyProjectInfo } from "../../../../mockData/dummyProjectCard";
import {useMemo} from "react";

type SortOption = "인기순" | "최신순" | null;

const ProjectList = ({ sortOption }: { sortOption: SortOption }) => {
  const sorted = useMemo(() => {
    const list = [...dummyProjectInfo];

    if (sortOption === "최신순") {
      return list.sort((a, b) => {
        const ta = new Date(a.updatedAt ?? 0).getTime();
        const tb = new Date(b.updatedAt ?? 0).getTime();
        return tb - ta; // 최신 먼저
      });
    }
    if (sortOption === "인기순") {
      return list.sort((a, b) => {
        const va = a.viewCount ?? 0;
        const vb = b.viewCount ?? 0;
        if (vb !== va) return vb - va; // 조회수 높은 순
        // 동률이면 최신순 보조 정렬
        const ta = new Date(a.updatedAt ?? 0).getTime();
        const tb = new Date(b.updatedAt ?? 0).getTime();
        return tb - ta;
      });
    }
    return list; // 선택 없으면 원본 순서
  }, [sortOption]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-fit min-h-[688px] overflow-y-auto">
      {sorted.map((project, index) => (
        <ProjectCard
          key={`project-${index}`}
          itemId={project.itemId}
          itemName={project.itemName}
          memberName={project.memberName}
          itemImageUrl={project.itemImageUrl}
          updatedAt={project.updatedAt}
          recruitStatus={project.recruitStatus}
          viewCount={project.viewCount}
          commentCount={project.commentCount}
          likedByCurrentUser={project.likedByCurrentUser}
          school={project.school}
          introduce={project.introduce}
        />
      ))}
    </div>
  );
};

export default ProjectList;