// components/common/dropdowns/strength/StrengthDropdown.tsx
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGetStrengths, type Strength } from "../../../../hooks/useStrengths";

interface StrengthDropdownProps {
  position?: string;
  disabled?: boolean;
  selectedIds?: number[]; // 이미 선택된 강점 id 목록
  onSelect: (item: Strength) => void; // 선택시 콜백
}

const StrengthDropdown = ({
  position,
  disabled = false,
  selectedIds = [],
  onSelect,
}: StrengthDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useGetStrengths(position);
  const options = data?.result?.strengths ?? [];

  // 외부 클릭 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ 선택 핸들러 추가
  const handleSelect = (opt: Strength) => {
    onSelect(opt); // 부모로 선택 전달
    setOpen(false); // ✅ 드롭다운 닫기
  };

  // 포지션 바뀌면 닫기
  useEffect(() => setOpen(false), [position]);

  return (
    <div ref={ref} className="relative">
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-xl border p-4 ${
          disabled
            ? "border-gray-100 bg-gray-50 text-gray-400"
            : "border-gray-200"
        }`}
      >
        <span className="text-gray-400">
          {disabled ? "포지션을 먼저 선택하세요." : "강점을 선택하세요."}
        </span>
        <ChevronDown
          size={20}
          className={disabled ? "text-gray-300" : "text-gray-500"}
        />
      </button>

      {open && !disabled && (
        <ul className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md border bg-white shadow">
          {isLoading && (
            <li className="px-4 py-3 text-sm text-gray-500">불러오는 중...</li>
          )}
          {error && (
            <li className="px-4 py-3 text-sm text-red-500">불러오기 실패</li>
          )}
          {!isLoading &&
            options.map((opt) => {
              const picked = selectedIds.includes(opt.strengthId);
              return (
                <li
                  key={opt.strengthId}
                  onMouseDown={() => !picked && handleSelect(opt)}
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
