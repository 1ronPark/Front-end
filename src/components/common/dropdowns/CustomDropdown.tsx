import { useRef, useEffect, useState } from 'react';
import SearchIcon from '../../../assets/icons/ic_search.svg';

interface CustomDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: string;
  searchable?: boolean;
}

const CustomDropdown = ({
  options,
  onSelect,
  isOpen,
  setIsOpen,
  selectedValue,
  searchable = false,
}: CustomDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const filteredOptions = searchable
    ? options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  return (
    <div ref={dropdownRef} className="relative">
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          {searchable && (
            <div className="relative border-b border-gray-200">
              <img
                src={SearchIcon}
                alt="Search"
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-50"
              />
              <input              
                type="text"
                placeholder="시/군/구 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-4 pr-10 text-sm outline-none bg-[#F1EDF2]"
                autoFocus
              />
            </div>
          )}
          <ul className="max-h-52 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${selectedValue === option ? 'bg-gray-100 font-semibold' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">검색 결과가 없습니다.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
