// hooks/useInfiniteUniv.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRequest } from "./fetchRequest";

export type School = { schoolId: number; schoolName: string };

export interface GetUnivResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: { schoolList: School[] };
}

type Params = {
  keyword?: string;
  size?: number; // 페이지 크기 (기본 10)
  enabled?: boolean; // 외부에서 열림/닫힘 등으로 제어
  fetchAllWhenEmpty?: boolean; // 키워드 없을 때 전체조회 여부(기본 true)
};

export const useInfiniteUniv = ({
  keyword,
  size = 10,
  enabled = true,
  fetchAllWhenEmpty = true,
}: Params) => {
  const k = keyword?.trim() ?? "";
  const noKeyword = k.length === 0;

  return useInfiniteQuery<GetUnivResponse>({
    queryKey: ["univ", noKeyword ? "__ALL__" : k, size],
    enabled: enabled && (fetchAllWhenEmpty || !noKeyword),
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const qs = new URLSearchParams();
      if (!noKeyword) qs.append("keyword", k); // 키워드 있을 때만 전달
      qs.append("page", String(pageParam ?? 1));
      qs.append("size", String(size));

      const endpoint = `${
        import.meta.env.VITE_API_GET_UNIV_ENDPOINT
      }?${qs.toString()}`;
      return fetchRequest<GetUnivResponse>({ method: "GET", endpoint });
    },
    // 마지막 페이지가 size보다 작으면 더 없음
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const got = lastPage?.result?.schoolList?.length ?? 0;
      return got < size ? undefined : (Number(lastPageParam) || 1) + 1;
    },
  });
};
