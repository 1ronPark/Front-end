import React, { useState } from 'react';
import CheckIcon from '../../../assets/icons/ic_check.svg';
import KeyboardArrowDownIcon from '../../../assets/icons/ic_keyboard_arrow_down.svg';
import KeyboardArrowUpIcon from '../../../assets/icons/ic_keyboard_arrow_up.svg';
import ArrayBox from './dropdowns/ArrayBox';
import MbtiBox from './dropdowns/MbtiBox';
import LocationBox from './dropdowns/LocationBox';

const FilterBar: React.FC = () => {
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
    handleDropdownClick('정렬순'); // 항목 선택 시 드롭다운을 닫습니다.
  };

  const handleMbtiSelect = (mbtiOption: string) => {
    setSelectedMbti(mbtiOption);
    handleDropdownClick('MBTI'); // 항목 선택 시 드롭다운을 닫습니다.
  };

  const handleLocationToggle = (locationOption: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationOption) ? prev.filter((loc) => loc !== locationOption) : [...prev, locationOption],
    );
    // 여러 항목을 선택할 수 있으므로 드롭다운을 닫지 않습니다.
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

  const chips = ['전체', '디자인', '개발자', '프론트엔드', '백엔드', '기획', '마케팅'];

  return (
    <div className="flex flex-col justify-center h-[72px] bg-white rounded-full ml-33">
      <div className="flex flex-col gap-1 px-4">
        <h2 className="text-sm font-semibold text-gray-800">어떤 파트에 관심이 있으신가요?</h2>
      </div>
      <div className="flex items-center self-stretch gap-10 px-4">
        <div className="flex flex-wrap items-center gap-2 py-2">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className={`flex items-center px-4 py-1 rounded-full text-xs font-medium border ${
                selectedChip === chip
                  ? 'bg-purple-100 border-purple-300 text-purple-800'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              {selectedChip === chip && <img src={CheckIcon} alt="check" className="w-3 h-3 mr-1" />}
              {chip}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {/*정렬순 dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-3 py-1 text-xs font-medium border border-r-0 rounded-l-full ${
                openDropdown['정렬순'] ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={() => handleDropdownClick('정렬순')}
            >
              {selectedSort}
            </button>
            <div className="w-[2px]" />
            <button
              className={`flex items-center px-2 py-1 text-xs font-medium border rounded-r-full ${
                openDropdown['정렬순'] ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={() => handleDropdownClick('정렬순')}
            >
              <img
                src={openDropdown['정렬순'] ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                alt="arrow icon"
                className="w-3 h-3"
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
              className={`flex items-center px-3 py-1 text-xs font-medium border border-r-0 rounded-l-full ${
                openDropdown['MBTI'] ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={() => handleDropdownClick('MBTI')}
            >
              {selectedMbti}
            </button>
            <div className="w-[2px]" />
            <button
              className={`flex items-center px-2 py-1 text-xs font-medium border rounded-r-full ${
                openDropdown['MBTI'] ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={() => handleDropdownClick('MBTI')}
            >
              <img
                src={openDropdown['MBTI'] ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                alt="arrow icon"
                className="w-3 h-3"
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
              className={`flex items-center px-3 py-1 text-xs font-medium border border-r-0 rounded-l-full ${
                openDropdown['위치'] ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={() => handleDropdownClick('위치')}
            >
              {getLocationButtonText()}
            </button>
            <div className="w-[2px]" />
            <button
              className={`flex items-center px-2 py-1 text-xs font-medium border rounded-r-full ${
                openDropdown['위치'] ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={() => handleDropdownClick('위치')}
            >
              <img
                src={openDropdown['위치'] ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                alt="arrow icon"
                className="w-3 h-3"
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

export default FilterBar;
