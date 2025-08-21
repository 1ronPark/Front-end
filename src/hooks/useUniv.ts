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
  size?: number; // 페이지 크기
  enabled?: boolean; // 열림/닫힘 제어
  fetchAllWhenEmpty?: boolean; // 키워드 없을 때 전체조회
  minSearchLength?: number; // 검색 최소 글자수 (기본 0)
  pageStart?: 0 | 1; // API 페이지 시작 인덱스 (기본 1)
  debugLog?: boolean; // true면 콘솔에 최종 URL 로그
};

export const useInfiniteUniv = ({
  keyword,
  size = 10,
  enabled = true,
  fetchAllWhenEmpty = true,
  minSearchLength = 0,
  pageStart = 0, // 서버가 0-based면 0으로 바꿔주세요
}: Params) => {
  const raw = keyword?.trim() ?? "";
  const meetsMin = raw.length >= minSearchLength;
  const usingKeyword = meetsMin && raw.length > 0; // 최소 길이 통과한 키워드만 사용

  return useInfiniteQuery<GetUnivResponse>({
    // 👇 keyword와 size, pageStart 모두 key에 넣어 키 변경 시 새 쿼리로 전환
    queryKey: [
      "univ",
      usingKeyword ? raw : "__ALL__",
      size,
      pageStart,
      minSearchLength,
    ],
    enabled: enabled && (fetchAllWhenEmpty || usingKeyword),

    initialPageParam: pageStart, // 0-based/1-based 대응
    queryFn: async ({ pageParam }) => {
      const qs = new URLSearchParams();
      if (usingKeyword) qs.append("keyword", raw);
      qs.append("page", String(pageParam ?? pageStart));
      qs.append("size", String(size));

      const endpoint = `${
        import.meta.env.VITE_API_GET_UNIV_ENDPOINT
      }?${qs.toString()}`;
      return fetchRequest<GetUnivResponse>({ method: "GET", endpoint });
    },
    // 마지막 페이지 판단: 받아온 개수가 size보다 작으면 끝
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const got = lastPage?.result?.schoolList?.length ?? 0;
      if (got < size) return undefined;
      // 다음 페이지(0-based/1-based 모두 대응)
      return Number(lastPageParam ?? pageStart) + 1;
    },
    // 캐시 시간: 5분
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
};
