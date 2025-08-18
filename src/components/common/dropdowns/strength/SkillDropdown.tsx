// components/common/dropdowns/strength/SkillDropdown.tsx
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";
import { useGetSkills, type Skill } from "../../../../hooks/useSkill";

interface SkillDropdownProps {
  position?: string; // positions -> position
  disabled?: boolean;
  selectedIds?: number[]; // 이미 선택된 스킬 id
  onSelect: (skill: Skill) => void; // 선택 콜백
}

const SkillDropdown = ({
  position,
  disabled = false,
  selectedIds = [],
  onSelect,
}: SkillDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 포지션으로 스킬 목록 조회
  const { data, isLoading, error } = useGetSkills(position);

  // ✅ 응답을 유연하게 매핑: {result:{skills:[{id,name}]}} 또는 {skills:[...]}
  const options: Skill[] = useMemo(() => {
    const raw = data?.result?.skills ?? [];
    return raw.map((s) => ({
      skillId: s.skillId,
      skillName: s.skillName,
    })) as Skill[];
  }, [data]);

  // 포지션 바뀌면 초기화
  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [position]);

  // 외부 클릭 닫기
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
    return options.filter((o) => (o.skillName ?? "").toLowerCase().includes(q));
  }, [options, query]);

  // 선택
  const pick = (opt: Skill) => {
    if (selectedIds.includes(opt.skillId)) return; // 이미 선택된 건 무시
    onSelect(opt);
    setOpen(false);
    setQuery("");
  };

  // 키보드
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (isComposing) return; // 한글 조합 중에는 무시
    if (e.key === "Enter") {
      e.preventDefault();
      const candidate = filtered.find((o) => !selectedIds.includes(o.skillId));
      if (candidate) pick(candidate);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      if (!open) setOpen(true);
    }
  };

  // 체버론 토글
  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    setOpen((v) => !v);
    if (!open) requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* 입력 가능한 컨트롤 */}
      <div
        className={`flex w-full items-center gap-2 rounded-xl border p-4 pr-2 ${
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
              : "스킬을 입력하거나 선택하세요."
          }
          className={`flex-1 bg-transparent outline-none placeholder:text-gray-400 ${
            disabled ? "text-gray-400" : "text-gray-900"
          }`}
        />

        {query && !disabled && (
          <button
            type="button"
            aria-label="clear"
            className="p-1 mr-1 text-gray-400 hover:text-gray-600"
            onMouseDown={(e) => e.preventDefault()} // blur 방지
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <X size={16} />
          </button>
        )}

        <button
          type="button"
          aria-label="toggle dropdown"
          className={`p-1 shrink-0 ${
            disabled ? "text-gray-300" : "text-gray-500"
          }`}
          onMouseDown={toggleOpen}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* 드롭다운 목록 */}
      {open && !disabled && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          <ul role="listbox" className="max-h-52 overflow-y-auto">
            {isLoading && (
              <li className="px-4 py-3 text-sm text-gray-500">
                불러오는 중...
              </li>
            )}
            {error && (
              <li className="px-4 py-3 text-sm text-red-500">불러오기 실패</li>
            )}
            {!isLoading && filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500">
                일치하는 스킬이 없어요.
              </li>
            )}
            {!isLoading &&
              filtered.map((option) => {
                const picked = selectedIds.includes(option.skillId);
                return (
                  <li
                    key={option.skillId}
                    role="option"
                    aria-selected={false}
                    onMouseDown={() => !picked && pick(option)} // 선택 즉시 닫힘
                    className={`px-4 py-2 text-sm hover:bg-gray-100 ${
                      picked
                        ? "opacity-40 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    title={picked ? "이미 선택됨" : option.skillName}
                  >
                    {option.skillName}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillDropdown;
