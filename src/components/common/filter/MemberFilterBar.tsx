import React, { useState } from 'react';
import CheckIcon from '../../../assets/icons/ic_check.svg';
import KeyboardArrowDownIcon from '../../../assets/icons/ic_keyboard_arrow_down.svg';
import KeyboardArrowUpIcon from '../../../assets/icons/ic_keyboard_arrow_up.svg';
import ArrayBox from './dropdowns/ArrayBox';
import MbtiBox from './dropdowns/MbtiBox';
import LocationBox from './dropdowns/LocationBox';

const MemberFilterBar: React.FC = () => {
  const [selectedChip, setSelectedChip] = useState<string>('전체');
  const [selectedSort, setSelectedSort] = useState<string>('정렬순');
  const [selectedMbti, setSelectedMbti] = useState<string>('MBTI');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({
    정렬순: false,
    MBTI: false,
    위치: false,
  });

  const handleChipClick = (chip: string) => {
    setSelectedChip(chip);
  };

  const handleDropdownClick = (dropdownName: string) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
    }));
  };

  const handleSortSelect = (sortOption: string) => {
    setSelectedSort(sortOption);
    handleDropdownClick('정렬순');
  };

  const handleMbtiSelect = (mbtiOption: string) => {
    setSelectedMbti(mbtiOption);
    handleDropdownClick('MBTI');
  };

  const handleLocationToggle = (locationOption: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationOption) ? prev.filter((loc) => loc !== locationOption) : [...prev, locationOption],
    );
  };

  const getLocationButtonText = () => {
    if (selectedLocations.length === 0) {
      return '위치';
    }
    if (selectedLocations.length === 1) {
      return selectedLocations[0];
    }
    return `${selectedLocations[0]} 외 ${selectedLocations.length - 1}곳`;
  };

  const chips = ['전체', '기획', '디자인', '풀스택', '프론트엔드', '백엔드', '마케팅'];

  return (
    <div className=" bg-white rounded-lg font-pretendard ">
      <div className="flex flex-shrink-0 items-center justify-between gap-4">
        <div className="relative flex-1 flex-shrink-0 ">
          <div className="flex items-center gap-2 overflow-auto pt-2 -mt-2 pb-2 -mb-2">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover cursor-pointer hover:shadow-md transform transition duration-100 hover:scale-105 ${
                selectedChip === chip
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {selectedChip === chip && <img src={CheckIcon} alt="check" className="w-4 h-4 mr-2" />}
              {chip}
            </button>
          ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white" />
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {/*정렬순 dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none`}
              onClick={() => handleDropdownClick('정렬순')}
            >
              {selectedSort}
              <img
                src={openDropdown['정렬순'] ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                alt="arrow icon"
                className="w-4 h-4 ml-2"
              />
            </button>
            {openDropdown['정렬순'] && (
              <div className="absolute top-full mt-2 z-10">
                <ArrayBox onSelect={handleSortSelect} />
              </div>
            )}
          </div>
          {/*MBTI dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none`}
              onClick={() => handleDropdownClick('MBTI')}
            >
              {selectedMbti}
              <img
                src={openDropdown['MBTI'] ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                alt="arrow icon"
                className="w-4 h-4 ml-2"
              />
            </button>
            {openDropdown['MBTI'] && (
              <div className="absolute top-full mt-2 z-10">
                <MbtiBox onSelect={handleMbtiSelect} />
              </div>
            )}
          </div>
          {/*위치 dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none`}
              onClick={() => handleDropdownClick('위치')}
            >
              {getLocationButtonText()}
              <img
                src={openDropdown['위치'] ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                alt="arrow icon"
                className="w-4 h-4 ml-2"
              />
            </button>
            {openDropdown['위치'] && (
              <div className="absolute top-full mt-2 z-10">
                <LocationBox selectedLocations={selectedLocations} onToggleSelect={handleLocationToggle} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberFilterBar;
