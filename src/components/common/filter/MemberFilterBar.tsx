import React, { useState } from 'react';
import PinIcon from '../../../assets/pin.svg';
import KeyboardArrowDownIcon from '../../../assets/icons/ic_keyboard_arrow_down.svg';
import KeyboardArrowUpIcon from '../../../assets/icons/ic_keyboard_arrow_up.svg';
import PartBox from './dropdowns/PartBox';
import MbtiBox from './dropdowns/MbtiBox';
import LocationBox from './dropdowns/LocationBox';

// interface MemberFilterBarProps {
//   selectedChips: string[];
//   onChipSelection: (chips: string[]) => void;
// }

const MemberFilterBar: React.FC = () => { 
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('파트');
  const [selectedMbti, setSelectedMbti] = useState<string[]> ([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({
    파트: false,
    MBTI: false,
    위치: false,
  });

  const handleChipClick = (chip: string) => {
    // let newSelectedChips: string[];

    if (chip === '전체') {
      // '전체' 칩을 클릭하면, 이미 선택된 경우 선택 해제하고,
      // 그렇지 않으면 '전체'만 선택합니다.
      // newSelectedChips = selectedChips.includes('전체') ? [] : ['전체']; // ?????
    } else {
      // 다른 칩을 클릭하면 '전체'는 선택 해제하고, 클릭된 칩의 상태를 토글합니다.
      // const otherChips = selectedChips.filter(c => c !== '전체');
      // newSelectedChips = otherChips.includes(chip)
      //   ? 
      setSelectedChips(prev => {
        const otherChips = prev.filter(c => c !== '전체');
        return otherChips.includes(chip)
          ? otherChips.filter(c => c !== chip) // 선택 해제
          : [...otherChips, chip]; // 선택
      });
    }
  };

  const handleDropdownClick = (dropdownName: string) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
    }));
  };

  const handleSortSelect = (sortOption: string) => {
    setSelectedSort(sortOption);
    handleDropdownClick('파트');
  };

  const handleMbtiSelect = (mbtiList: string[]) => {
    setSelectedMbti(mbtiList);
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

  const getMbtiButtonText = () => {
    if (selectedMbti.length === 0) {
      return 'MBTI';
    }
    return `${selectedMbti[0]} 외 ${selectedMbti.length - 1}개`;
  };

  const chips = [ '전체', '기획', '디자인', '풀스택', '프론트엔드', '백엔드', '마케팅'];

  return (
    <div className="bg-white rounded-lg font-pretendard">
      <div className="flex items-center justify-between whitespace-nowrap gap-4">
        <div className="flex flex-wrap items-center gap-2 max-w-full">
          {/* 칩 목록 */}
          <div className="flex items-center gap-2 w-full">
            {chips.map((chip) => (
              <button
                key={chip}
                 onClick={() => handleChipClick(chip)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover cursor-pointer hover:shadow-md transform transition duration-100 hover:scale-105 ${
                  selectedChips.includes(chip)
                    ? 'text-gray-800 border border-gray-800'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {selectedChips.includes(chip) && <img src={PinIcon} alt="pin" className="w-4 h-4 mr-2" />}
                 {chip}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {/*파트 dropdown*/}
        <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-semimedium border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none`}
              onClick={() => handleDropdownClick('파트')}
            >
              {selectedSort}
              <img
            src={openDropdown['파트'] ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
            alt="arrow icon"
            className="w-4 h-4 ml-2"
              />
          </button>       
            {openDropdown['파트'] && (
              <div className="absolute top-full mt-2 z-20">
                <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <PartBox onSelect={handleSortSelect} />
                </div>
              </div>
            )}
          </div>
          {/*MBTI dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-semimedium border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none`}
              onClick={() => handleDropdownClick('MBTI')}
            >
              {getMbtiButtonText()}
              <img
                src={openDropdown['MBTI'] ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                alt="arrow icon"
                className="w-4 h-4 ml-2"
              />
            </button>
            {openDropdown['MBTI'] && (
              <div className="absolute top-full mt-2 z-20">
                <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MbtiBox selectedMbtis={selectedMbti} onSelect={handleMbtiSelect} />
                </div>
              </div>
            )}
          </div>
          {/*위치 dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-semimedium border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none`}
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
              <div className="absolute top-full mt-2 z-20">
                <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <LocationBox selectedLocations={selectedLocations} onToggleSelect={handleLocationToggle} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberFilterBar;
