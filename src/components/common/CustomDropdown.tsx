import { useRef, useEffect } from 'react';

interface CustomDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: string;
}

const CustomDropdown = ({
  options,
  onSelect,
  isOpen,
  setIsOpen,
  selectedValue,
}: CustomDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${selectedValue === option ? 'bg-gray-100 font-semibold' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
