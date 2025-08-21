// components/common/UnivDropdown.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Loader2, Search, X } from "lucide-react";
import { useGetUniv, type School } from "../../../hooks/useUniv";

type Props = {
  value?: School | null; // 현재 선택값(옵션)
  onSelect: (v: School) => void; // 선택 콜백
  placeholder?: string; // 버튼 placeholder
  pageSize?: number; // 페이지 크기 (기본 10)
  disabled?: boolean;
  className?: string;
};

const UnivDropdown = ({
  value,
  onSelect,
  placeholder = "대학교 선택",
  pageSize = 10,
  disabled,
  className = "",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  // 입력 디바운스
  const [debounced, setDebounced] = useState(keyword);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(keyword), 300);
    return () => clearTimeout(t);
  }, [keyword]);

  // API 호출
  const { data, isLoading, error } = useGetUniv();

  const list = useMemo(() => data?.result.schoolList ?? [], [data]);

  // 외부 클릭 닫기
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleSelect = (s: School) => {
    onSelect(s);
    setOpen(false);
  };

  const resetSearch = () => {
    setKeyword("");
    setPage(1);
  };

  return (
    <div className={`relative ${className}`} ref={boxRef}>
      {/* 버튼 */}
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

      {/* 드롭다운 */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border bg-white shadow-lg">
          {/* 검색박스 */}
          <div className="flex items-center gap-2 px-3 py-2 border-b">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
              placeholder="학교명으로 검색"
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

          {/* 컨텐츠 */}
          <div className="max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center gap-2 px-3 py-4 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" /> 불러오는 중…
              </div>
            ) : error ? (
              <div className="px-3 py-4 text-sm text-red-500">
                목록을 불러오지 못했어요.
              </div>
            ) : list.length === 0 ? (
              <div className="px-3 py-4 text-sm text-gray-500">
                검색 결과가 없습니다.
              </div>
            ) : (
              <ul className="py-1">
                {list.map((s) => (
                  <li key={s.schoolId}>
                    <button
                      type="button"
                      onClick={() => handleSelect(s)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      {s.schoolName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 페이지네이션 (서버가 totalPages 제공 안 해도 이전/다음 동작 가능) */}
          <div className="flex items-center justify-between border-t px-3 py-2">
            <button
              className="text-sm text-gray-700 disabled:text-gray-300"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              이전
            </button>
            <span className="text-xs text-gray-500">page {page}</span>
            <button
              className="text-sm text-gray-700 disabled:text-gray-300"
              disabled={isLoading || list.length < pageSize} // 결과가 pageSize보다 작으면 마지막 페이지로 가정
              onClick={() => setPage((p) => p + 1)}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnivDropdown;
