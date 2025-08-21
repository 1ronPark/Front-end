import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecentViewedProjects } from "../../../../hooks/useProjectQueries";
import { History } from "lucide-react";
import RecentItem from "./RecentItem";

const RecentList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useRecentViewedProjects();

  // viewedAt 최신순 정렬
  const itemsSorted = useMemo(() => {
    const items = data?.result?.recentViewedItems ?? [];
    return [...items].sort(
      (a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
    );
  }, [data?.result?.recentViewedItems]);

  return (
    <div className="w-[300px]">
      {/* 헤더 */}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="title-large">최근 본</div>
      </div>
      {/*맴버 (우선 보류)*/}
      {/*
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        맴버
      </div>
      <div className="flex flex-col justify-center items-center min-h-[72px] border-b border-[#CBC4CF]">
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem /> 
      </div>
      */}

      {/*프로젝트*/}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        프로젝트
      </div>
      <div className="flex flex-col items-center justify-center min-h-[72px] border-[#CBC4CF]">
        {isLoading && (
          <div className="label-medium text-[#8B8692] py-3">불러오는 중...</div>
        )}
        {isError && (
          <div className="label-medium text-[#D32F2F] py-3">
            불러오기에 실패했어요
          </div>
        )}
        {!isLoading && !isError && itemsSorted.length === 0 && (
          <div className="flex w-full items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center w-full h-[300px]">
              <History className="w-12 h-12 text-[#E4E1EC] mb-2" />
              <span className="title-medium text-[#47464F]">
                다른 프로젝트를 둘러보세요
              </span>
            </div>
          </div>
        )}

        {!isLoading &&
          !isError &&
          itemsSorted.map((it) => (
            <RecentItem
              key={it.itemId}
              itemId={it.itemId}
              imageUrl={it.itemProfileImageUrl}
              overline={it.introduce}
              title={it.itemName}
              onClick={() => navigate(`/projects/${it.itemId}`)}
            />
          ))}
      </div>
    </div>
  );
};

export default RecentList;
