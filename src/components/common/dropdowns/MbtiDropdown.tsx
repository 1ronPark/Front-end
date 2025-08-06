import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const MBTI_OPTIONS = [   
    'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
    'ENTJ', 'ENTP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
    'INTJ', 'INTP', 'INFJ', 'INFP',];

interface MbtiDropdownProps {
  selected: string[]; // 단일 선택이면 string, 다중 선택이면 string[]
  onSelect: (mbti: string) => void;
}

const MbtiDropdown = ({ selected, onSelect }: MbtiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const handleSelect = (mbti: string) => {
    // 이미 선택된 값이면 추가 안 함 (사실상 중복 방지, 진짜 중복 허용하려면 그냥 onSelect만 호출)
    if (!selected.includes(mbti)) {
      onSelect(mbti);
    }
    setIsOpen(false);
    setInputValue('');
  };

  const filteredMbtis = MBTI_OPTIONS.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-3"
        >
          <span className={`text-sm ${selected.length === 0 ? 'text-gray-400' : 'text-gray-800'}`}>
            {selected.length === 0 ? '선호하는 MBTI를 선택해주세요.' : selected.join(', ')}
          </span>
          <ChevronDown size={24} className="text-gray-400 disabled:text-gray-400" />
        </button>
      ) : (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          className="w-full rounded-xl border-2 border-[#5A588D] px-4 py-3 text-sm outline-none"
          placeholder="선호하는 MBTI를 검색하세요."
        />
      )}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          <ul className="max-h-52 overflow-y-auto">
            {filteredMbtis.map(option => {
              const isSelected = selected.includes(option);
              return (
                <li
                  key={option}
                  className={`px-4 py-2 text-sm ${isSelected
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-100 cursor-pointer'
                  }`}
                  onClick={() => !isSelected && handleSelect(option)}
                >
                  {option}
                  {isSelected && <span className="ml-2">(선택됨)</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MbtiDropdown;
