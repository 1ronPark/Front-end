// components/common/UnivDropdown.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Loader2, Search, X } from "lucide-react";
import { useInfiniteUniv, type School } from "../../../hooks/useUniv";

type Props = {
  value?: School | null;
  onSelect: (v: School) => void;
  placeholder?: string;
  pageSize?: number;
  disabled?: boolean;
  className?: string;
  autoFocusOpen?: boolean;
};

const UnivDropdown = ({
  value,
  onSelect,
  placeholder = "대학교 선택",
  pageSize = 10,
  disabled,
  className = "",
  autoFocusOpen = false,
}: Props) => {
  const [open, setOpen] = useState(autoFocusOpen);
  const [keyword, setKeyword] = useState("");

  // 외부 클릭 닫기
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  // 무한스크롤 쿼리
  const {
    data,
    isLoading,
    // error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    status,
  } = useInfiniteUniv({
    keyword,
    size: pageSize,
    enabled: open,
    fetchAllWhenEmpty: true, // 키워드 없으면 전체 조회
  });

  // 평탄화 + 가나다 정렬(서버 정렬이 보장 안 될 때 가드)
  const flatList = useMemo(() => {
    const arr = (data?.pages ?? []).flatMap((p) => p?.result?.schoolList ?? []);
    return [...arr].sort((a, b) =>
      a.schoolName.localeCompare(b.schoolName, "ko")
    );
  }, [data]);

  const listBoxRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // sentinel 관찰 → 다음 페이지 로드
  useEffect(() => {
    if (!open) return;
    const root = listBoxRef.current || undefined;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root, rootMargin: "0px 0px 200px 0px", threshold: 0 } // 여유 margin
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 드롭다운 열릴 때 초기 로드가 너무 적어 스크롤이 안 생기면 한 페이지 더 가져오기(옵션)
  useEffect(() => {
    if (!open) return;
    if (!isLoading && hasNextPage && flatList.length < pageSize) {
      fetchNextPage();
    }
  }, [open, isLoading, hasNextPage, flatList.length, pageSize, fetchNextPage]);

  const handleSelect = (s: School) => {
    onSelect(s);
    setOpen(false);
  };

  const resetSearch = () => {
    setKeyword("");
  };

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      {/* 토글 버튼 */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-left
          ${
            disabled ? "bg-gray-100 text-gray-400" : "bg-white hover:bg-gray-50"
          }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value ? value.schoolName : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {/* 드롭다운 패널 */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border bg-white shadow-lg">
          {/* 검색 */}
          <div className="flex items-center gap-2 px-3 py-2 border-b">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="학교명으로 검색 (즉시 검색)"
              className="flex-1 outline-none text-sm py-1"
            />
            {keyword && (
              <button
                onClick={resetSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 리스트(스크롤 컨테이너) */}
          <div ref={listBoxRef} className="max-h-64 overflow-y-auto">
            {/* 첫 로딩 */}
            {status === "pending" && (
              <div className="flex items-center gap-2 px-3 py-4 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" /> 불러오는 중…
              </div>
            )}

            {/* 에러 */}
            {status === "error" && (
              <div className="px-3 py-4 text-sm text-red-500">
                목록을 불러오지 못했어요.
                <button
                  onClick={() => refetch()}
                  className="ml-2 underline text-red-600"
                >
                  다시 시도
                </button>
              </div>
            )}

            {/* 데이터 */}
            {status === "success" && (
              <>
                {flatList.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-gray-500">
                    검색 결과가 없습니다.
                  </div>
                ) : (
                  <ul className="py-1">
                    {flatList.map((s) => (
                      <li key={`${s.schoolId}-${s.schoolName}`}>
                        <button
                          type="button"
                          onClick={() => handleSelect(s)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                        >
                          {s.schoolName}
                        </button>
                      </li>
                    ))}
                    {/* sentinel: 화면에 들어오면 다음 페이지 로드 */}
                    <li>
                      <div ref={sentinelRef} />
                    </li>
                  </ul>
                )}

                {/* 로딩/끝 상태 표시 */}
                <div className="border-t px-3 py-2">
                  {isFetchingNextPage ? (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Loader2 className="h-4 w-4 animate-spin" /> 더 불러오는
                      중…
                    </div>
                  ) : !hasNextPage && flatList.length > 0 ? (
                    <div className="text-xs text-gray-400">모두 불러왔어요</div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnivDropdown;
