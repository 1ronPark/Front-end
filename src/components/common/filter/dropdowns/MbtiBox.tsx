
import React from 'react';

interface MbtiBoxProps {
  onSelect: (mbti: string) => void;
}

const MbtiBox: React.FC<MbtiBoxProps> = ({ onSelect }) => {
  const mbtiTypes = [
    'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
    'ENTJ', 'ENTP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
    'INTJ', 'INTP', 'INFJ', 'INFP',
  ];

  return (
    <div className="absolute top-full left-0 mt-2 w-30 bg-white border border-gray-300 rounded-md shadow-lg z-10">
      <ul className="h-80 overflow-y-auto py-1 gap-1 p-2">
        {mbtiTypes.map((mbti) => (
          <li
            key={mbti}
            className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-center text-sm rounded"
            onClick={() => onSelect(mbti)}
          >
            {mbti}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MbtiBox;
