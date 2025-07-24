import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const MBTI_OPTIONS = [   
    'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
    'ENTJ', 'ENTP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
    'INTJ', 'INTP', 'INFJ', 'INFP',];

interface MbtiDropdownProps {
  onSelect: (mbti: string) => void;
}

const MbtiDropdown = ({ onSelect }: MbtiDropdownProps) => {
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

  const handleSelect = (mbti: string) => {
    onSelect(mbti);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredMbtis = MBTI_OPTIONS.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-3"
      >
        <span className="text-sm text-gray-400">선호하는 MBTI를 선택해주세요.</span>
        <ChevronDown size={24} className="text-gray-400 disabled:text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          <ul className="max-h-52 overflow-y-auto">
            {filteredMbtis.map(option => (
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

export default MbtiDropdown;
