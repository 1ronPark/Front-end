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
  minSearchLength?: number; // 2로 주면 '서'는 전체, '서울'부터 검색
  pageStart?: 0; // 서버 page 시작(0 또는 1)
  debug?: boolean;
};

const UnivDropdown = ({
  value,
  onSelect,
  placeholder = "대학교 선택",
  pageSize = 10,
  disabled,
  className = "",
  autoFocusOpen = false,
  minSearchLength = 0,
  pageStart = 0, // 스웨거가 0부터면 0 유지
  debug = false,
}: Props) => {
  const [open, setOpen] = useState(autoFocusOpen);

  // ⬇️ 입력창에 표시되는 값 (선택값과 동기화)
  const [inputValue, setInputValue] = useState<string>(value?.schoolName ?? "");
  useEffect(() => {
    setInputValue(value?.schoolName ?? "");
  }, [value?.schoolName]);

  // ⬇️ 실제 검색에 쓰는 키워드
  const [keyword, setKeyword] = useState<string>("");

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
    status,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteUniv({
    keyword,
    size: pageSize,
    enabled: open && !disabled,
    fetchAllWhenEmpty: true, // 빈 키워드면 전체(가나다)
    minSearchLength,
    pageStart,
    debugLog: debug,
  });

  // 평탄화 + 가나다 정렬(가드)
  const flatList = useMemo(() => {
    const arr = (data?.pages ?? []).flatMap((p) => p?.result?.schoolList ?? []);
    return [...arr].sort((a, b) =>
      a.schoolName.localeCompare(b.schoolName, "ko")
    );
  }, [data]);

  const listBoxRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // sentinel: 화면에 들어오면 다음 페이지
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
      { root, rootMargin: "0px 0px 200px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 열릴 때 스크롤이 안 생기면 한 페이지 더
  useEffect(() => {
    if (!open) return;
    if (!isLoading && hasNextPage && flatList.length < pageSize) {
      fetchNextPage();
    }
  }, [open, isLoading, hasNextPage, flatList.length, pageSize, fetchNextPage]);

  const handleSelect = (s: School) => {
    onSelect(s); // 부모에 선택 전달
    setInputValue(s.schoolName);
    setKeyword(""); // 다음에 열 때 전체 보이도록 초기화
    setOpen(false);
  };

  const onInputChange = (v: string) => {
    setInputValue(v); // 입력창에 표시
    setKeyword(v); // 즉시 검색
    if (!open) setOpen(true); // 타이핑하면 자동으로 열기
  };

  const clearInput = () => {
    setInputValue("");
    setKeyword("");
    if (!open) setOpen(true);
  };

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      {/* 🔎 트리거 = 입력창 */}
      <div
        className={`w-full flex items-center gap-2 rounded-xl border-1 border-[#C8C5D0] mt-2 px-4 py-3 bg-white
          ${disabled ? "pointer-events-none opacity-60" : ""}`}
        onClick={() => !disabled && setOpen(true)}
      >
        <Search className="h-4 w-4 text-gray-500 shrink-0" />
        <input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={() => !disabled && setOpen(true)}
          placeholder={placeholder}
          className="flex-1 outline-none text-sm text-[#47464F] bg-transparent"
          disabled={disabled}
        />
        {/* 입력 중일 때만 clear 노출 (열려있을 때) */}
        {open && inputValue && (
          <button
            type="button"
            onClick={clearInput}
            className="text-gray-400 hover:text-gray-600"
            aria-label="clear"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          className="text-gray-500"
          onClick={() => !disabled && setOpen((v) => !v)}
          aria-label="toggle"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* ▼ 드롭다운 목록 */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border-1 border-[#C8C5D0] bg-white shadow-lg">
          <div ref={listBoxRef} className="max-h-64 overflow-y-auto">
            {status === "pending" && (
              <div className="flex items-center gap-2 px-3 py-4 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" /> 불러오는 중…
              </div>
            )}

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
                    {/* sentinel */}
                    <li>
                      <div ref={sentinelRef} />
                    </li>
                  </ul>
                )}

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
