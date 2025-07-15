import { CheckIcon } from 'lucide-react';
import React, { useState } from 'react';

interface MbtiBoxProps {
  selectedMbtis: string[];
  onSelect: (mbtiList: string[]) => void;
}

const MbtiBox: React.FC<MbtiBoxProps> = ({ selectedMbtis = [], onSelect }) => {
  const mbtiTypes = [
    'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
    'ENTJ', 'ENTP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
    'INTJ', 'INTP', 'INFJ', 'INFP',
  ];

  const [selectedMbtiList, setSelectedMbtiList] = useState<string[]>(selectedMbtis);

  const handleMbtiClick = (mbti: string) => {
    setSelectedMbtiList((prev) => {
      let updated;
      if (prev.includes(mbti)) {
        updated = prev.filter((item) => item !== mbti);
      } else {
        updated = [...prev, mbti];
      }
      onSelect(updated);
      return updated;
    });
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-30 bg-white border border-gray-300 rounded-md shadow-lg z-10">
      <ul className="h-80 overflow-y-auto py-1 gap-1 p-2">
        {mbtiTypes.map((mbti) => (
          <li
            key={mbti}
            className={`px-2 py-1 hover:bg-gray-100 cursor-pointer text-center text-sm rounded ${selectedMbtiList.includes(mbti) ? 'bg-gray-100' : ''}`}
            onClick={() => handleMbtiClick(mbti)}
          >
            <span className="flex items-center gap-1">
              {selectedMbtiList.includes(mbti) && <CheckIcon className="w-4 h-4" />}
              <span className="flex-1 text-center">{mbti}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MbtiBox;
