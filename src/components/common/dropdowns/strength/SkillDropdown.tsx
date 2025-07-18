import { useState, useRef, useEffect } from 'react';

const SKILL_OPTIONS = ['JavaScript', 'React', 'Spring', 'Node.js', 'C#', 'C++', 'Python', 'Java', 'HTML', 'CSS', 'SQL', 'TypeScript', 'Go', 'Ruby', 'PHP', 'Swift', 'Kotlin'];

interface SkillDropdownProps {
  onSelect: (skill: string) => void;
}

const SkillDropdown = ({ onSelect }: SkillDropdownProps) => {
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

  const handleSelect = (skill: string) => {
    onSelect(skill);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredSkills = SKILL_OPTIONS.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-4"
      >
        <span className="text-base text-gray-400">스킬을 선택하세요.</span>
        {/* 아래 화살표 아이콘 */}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          <ul className="max-h-52 overflow-y-auto">
            {filteredSkills.map(option => (
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

export default SkillDropdown;
