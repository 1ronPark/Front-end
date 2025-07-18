import { useState, useRef, useEffect } from 'react';

const STRENGTH_OPTIONS = ['성실한', '열정있는', '꾸준한', '소통 전문가', '습득이 빠른', '느좋', '문제 해결 능력', '창의적인', '협업 능력', '긍정적인', '적극적인', '리더십 있는', '유연한 사고', '분석적인', '디테일이 뛰어난', '시간 관리 능력', '적응력이 뛰어난'];

interface StrengthDropdownProps {
  onSelect: (strength: string) => void;
}

const StrengthDropdown = ({ onSelect }: StrengthDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (strength: string) => {
    onSelect(strength);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredStrengths = STRENGTH_OPTIONS.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200  p-4"
      >
        <span className="text-base text-gray-400">강점을 선택하세요.</span>
        {/* 아래 화살표 아이콘 */}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          <ul className="max-h-52 overflow-y-auto">
            {filteredStrengths.map(option => (
              <li
                key={option}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StrengthDropdown;
