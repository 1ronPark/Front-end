// components/common/dropdowns/strength/StrengthDropdown.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useGetStrengths, type Strength } from "../../../../hooks/useStrengths";

interface StrengthDropdownProps {
  position?: string;
  disabled?: boolean;
  selectedIds?: number[]; // 이미 선택된 강점 id
  onSelect: (item: Strength) => void; // 선택 콜백
}

const StrengthDropdown = ({
  position,
  disabled = false,
  selectedIds = [],
  onSelect,
}: StrengthDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false); // 한글 IME 처리
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, error } = useGetStrengths(position);
  const options = data?.result?.strengths ?? [];

  // 포지션 바뀌면 초기화
  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [position]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 필터링
  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => o.strengthName.toLowerCase().includes(q));
  }, [options, query]);

  const pick = (opt: Strength) => {
    if (selectedIds.includes(opt.strengthId)) return;
    onSelect(opt);
    setOpen(false);
    setQuery("");
    // 포커스 유지가 필요하면 아래 라인 주석 해제
    // requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (isComposing) return; // 한글 조합 중에는 무시
    if (e.key === "Enter") {
      e.preventDefault();
      const candidate = filtered.find(
        (o) => !selectedIds.includes(o.strengthId)
      );
      if (candidate) pick(candidate);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      // 간단 모드: 화살표는 드롭다운만 열기
      if (!open) setOpen(true);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      {/* 버튼 대신 입력가능한 컨트롤 */}
      <div
        className={`flex w-full items-center rounded-xl border p-4 pr-2 ${
          disabled ? "border-gray-100 bg-gray-50" : "border-gray-200"
        }`}
        onClick={() => {
          if (disabled) return;
          setOpen(true);
          inputRef.current?.focus();
        }}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={disabled}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => !disabled && setOpen(true)}
          onKeyDown={onKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={
            disabled
              ? "포지션을 먼저 선택하세요."
              : "강점을 입력하거나 선택하세요."
          }
          className={` flex-1 bg-transparent outline-none placeholder:text-gray-400 ${
            disabled ? "text-gray-400" : "text-gray-900"
          }`}
        />
        {query && !disabled && (
          <button
            type="button"
            aria-label="clear"
            className="p-1 mr-1 text-gray-400 hover:text-gray-600"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <X size={16} />
          </button>
        )}

        <ChevronDown
          className={`shrink-0 ${disabled ? "text-gray-300" : "text-gray-500"}`}
          size={20}
        />
      </div>

      {/* 드롭다운 */}
      {open && !disabled && (
        <ul
          role="listbox"
          className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md border bg-white shadow"
        >
          {isLoading && (
            <li className="px-4 py-3 text-sm text-gray-500">불러오는 중...</li>
          )}
          {error && (
            <li className="px-4 py-3 text-sm text-red-500">불러오기 실패</li>
          )}
          {!isLoading && filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500">
              일치하는 강점이 없어요.
            </li>
          )}
          {!isLoading &&
            filtered.map((opt) => {
              const picked = selectedIds.includes(opt.strengthId);
              return (
                <li
                  key={opt.strengthId}
                  role="option"
                  aria-selected={false}
                  onMouseDown={() => !picked && pick(opt)} // 선택 즉시 닫힘
                  className={`px-4 py-2 text-sm hover:bg-gray-100 ${
                    picked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  title={picked ? "이미 선택됨" : opt.strengthName}
                >
                  {opt.strengthName}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default StrengthDropdown;
