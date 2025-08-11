// pages/Projects.tsx
import { useState } from "react";
import ProjectFilterBar from "../../components/common/filter/ProjectFilterBar";
import ProjectList from "../../components/common/projects/ProjectList";

type SortOption = "인기순" | "최신순" | null;

export const Projects = () => {
  const [sortOption, setSortOption] = useState<SortOption>(null);

  return (
    <div className="flex justify-center">
      <div className="w-full mt-[30px] max-w-[1440px] px-[132px] mb-[27px]">
        <ProjectFilterBar
          sortOption={sortOption}
          onChangeSort={setSortOption}
        />
        <ProjectList sortOption={sortOption} />
      </div>
    </div>
  );
};
