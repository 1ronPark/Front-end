import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const PART_OPTIONS = [
  "기획",
  "디자인",
  "웹 프론트엔드",
  "웹 백엔드",
  "iOS",
  "Android",
  "서버",
  "인프라",
  "데이터 사이언스",
  "AI",
  "DevOps",
  "QA",
  "기타",
];

interface PartDropdownProps {
  onSelect: (part: string) => void;
}

const PartDropdown = ({ onSelect }: PartDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setInputValue('');
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (part: string) => {
    onSelect(part);
    setIsOpen(false);
    setInputValue('');
  };

  const filteredParts = PART_OPTIONS.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-3"
        >
          <span className="text-sm text-gray-400">모집 파트를 선택해주세요.</span>
          <ChevronDown size={24} className="text-gray-400 disabled:text-gray-400" />
        </button>
      ) : (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          className="w-full rounded-xl border-2 border-[#5A588D] px-4 py-3 text-sm outline-none"
          placeholder="모집 파트를 검색하세요."
        />
      )}
      {isOpen && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredParts.map((part) => (
            <li
              key={part}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleSelect(part)}
            >
              {part}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PartDropdown;
