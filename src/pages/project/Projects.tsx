import { useState } from "react";
import ProjectFilterBar from "../../components/common/filter/ProjectFilterBar";
import ProjectList from "../../components/common/projects/ProjectList";
import Pagination from "../../components/common/pagination/Pagination";
import { useProjectList } from "../../hooks/useProjectQueries";

export const Projects = () => {
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState<"인기순" | "최신순" | null>(
    "인기순"
  );

  const apiSort =
    sortOption === "최신순"
      ? "latest"
      : sortOption === "인기순"
      ? "popular"
      : undefined;

  const { data, isLoading, isError } = useProjectList(page, apiSort);
  const items = data?.result?.items ?? [];

  const PAGE_SIZE = 12; // 서버와 합의 필요?
  const hasPrev = page > 1;
  const hasNext = items.length === PAGE_SIZE;

  return (
    <div className="flex justify-center">
      <div className="w-full mt-[30px] max-w-[1440px] px-[132px] mb-[27px]">
        <ProjectFilterBar
          sortOption={sortOption}
          onChangeSort={(opt) => {
            setPage(1);
            setSortOption(opt);
          }}
        />
        <ProjectList items={items} isLoading={isLoading} isError={isError} />
        <Pagination
          page={page}
          onPageChange={setPage}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
};
