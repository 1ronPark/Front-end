import React from 'react';

interface ArrayBoxProps {
  onSelect: (option: string) => void;
}

const ArrayBox: React.FC<ArrayBoxProps> = ({ onSelect }) => {
  const sortOptions = ['조회수순', '추천순', '거리순'];

  return (
    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
      <ul className="py-1">
        {sortOptions.map((option) => (
          <li
            key={option}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            onClick={() => onSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArrayBox;
