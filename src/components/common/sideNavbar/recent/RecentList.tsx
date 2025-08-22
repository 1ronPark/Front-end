// src/components/.../recent/RecentList.tsx
import { useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecentViewedProjects, RECENT_REFRESH_EVENT } from "../../../../hooks/useProjectQueries";
import { History } from "lucide-react";
import RecentItem from "./RecentItem";

const RecentList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // refetch가 useApiQuery에서 노출된다고 가정
  const { data, isLoading, isError, refetch } = useRecentViewedProjects();

  // refetch가 없을 때 대비용 (fallback)
  const doRefresh = useCallback(() => {
    if (typeof refetch === "function") {
      refetch();
      return;
    }
    // fallback: endpoint 포함된 쿼리만 선택적으로 리페치
    const endpoint = import.meta.env.VITE_API_ITEMS_RECENT_ENDPOINT;
    queryClient.refetchQueries({
      predicate: ({ queryKey }) =>
        Array.isArray(queryKey) && String(queryKey[1] ?? "").includes(endpoint),
      // type: "active",  // 활성 쿼리만 원하면 주석 해제
    });
  }, [refetch, queryClient]);

  //  상세에서 쏜 이벤트를 들으면 최근본만 리페치
  useEffect(() => {
    const onRefresh = () => doRefresh();
    window.addEventListener(RECENT_REFRESH_EVENT, onRefresh);
    return () => window.removeEventListener(RECENT_REFRESH_EVENT, onRefresh);
  }, [doRefresh]);

  // 정렬 값은 의존성에 원시 배열만 넣자
  const recent = data?.result?.recentViewedItems ?? [];
  const itemsSorted = useMemo(
    () =>
      [...recent].sort(
        (a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
      ),
    [recent]
  );

  return (
    <div className="w-[300px]">
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="title-large">최근 본</div>
      </div>

      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        프로젝트
      </div>

      <div className="flex flex-col items-center justify-center min-h-[72px] border-[#CBC4CF]">
        {isLoading && (
          <div className="label-medium text-[#8B8692] py-3">불러오는 중...</div>
        )}
        {isError && (
          <div className="label-medium text-[#D32F2F] py-3">불러오기에 실패했어요</div>
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
