import { useState, useCallback } from "react";
import ProjectFilterBar from "../../components/common/filter/ProjectFilterBar";
import ProjectList from "../../components/common/projects/ProjectList";
import Pagination from "../../components/common/pagination/Pagination";
import { useProjectList } from "../../hooks/useProjectQueries";
import type { ProjectListApiParams, SortParam } from "../../types/ProjectProps";

type SortOption = "인기순" | "최신순" | null;

export const Projects = () => {
  // 단일 쿼리 상태 (page는 반드시 초기화)
  const [query, setQuery] = useState<ProjectListApiParams>({
    page: 1,
    sort: "latest", // 초기 정렬값
  });

  const { data, isLoading, isError } = useProjectList(query);
  const items = data?.result?.items ?? [];

  const page = query.page;
  const pageSize = 12; 
  const hasPrev = page > 1;
  const hasNext = items.length === pageSize; // 총 개수 응답 없으면 이렇게

  // 필터 변경: Partial만 merge
  const handleFiltersChange = useCallback((next: Partial<ProjectListApiParams>) => {
    setQuery(prev => ({ ...prev, page: 1, ...next }));
  }, []);

  // 정렬 버튼: UI → API 값 매핑
  const handleChangeSort = useCallback((opt: SortOption) => {
    const map: Record<Exclude<SortOption, null>, SortParam> = {
      인기순: "popular",
      최신순: "latest",
    };
    setQuery(prev => ({ ...prev, page: 1, sort: opt ? map[opt] : undefined }));
  }, []);

  // UI용 표시값
  const uiSort: SortOption =
    query.sort === "latest" ? "최신순" :
    query.sort === "popular" ? "인기순" : null;

  return (
    <div className="flex justify-center">
      <div
        className=" w-full mt-12 mb-7 overflow-visible
                max-w-[1440px]
                px-4 sm:px-8 md:px-16 xl:px-[208px]"
      >
        <ProjectFilterBar
          sortOption={uiSort}
          onChangeSort={handleChangeSort}
          onFiltersChange={handleFiltersChange}
        />

        <ProjectList items={items} isLoading={isLoading} isError={isError} />

        <Pagination
          page={page}
          onPageChange={(p) => setQuery(prev => ({ ...prev, page: p }))}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
};
