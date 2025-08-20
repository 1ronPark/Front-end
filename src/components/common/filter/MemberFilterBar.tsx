import React, { useEffect, useState } from 'react';
import PinIcon from '../../../assets/pin.svg';
import KeyboardArrowDownIcon from '../../../assets/icons/ic_keyboard_arrow_down.svg';
import KeyboardArrowUpIcon from '../../../assets/icons/ic_keyboard_arrow_up.svg';
import PartBox from './dropdowns/PartBox';
import MbtiBox from './dropdowns/MbtiBox';
import LocationBox from './dropdowns/LocationBox';
import type { MemberFiltersParams } from '../../../types/MemberProps';

interface MemberFilterBarProps {
  // 부모에게 선택된 필드 알려서 API 호출
  onFiltersChange: (filters: MemberFiltersParams) => void;
}

const MemberFilterBar: React.FC<MemberFilterBarProps> = ({ onFiltersChange }) => { 
  const [selectedSort, setSelectedSort] = useState<string>('파트');
  const [selectedMbti, setSelectedMbti] = useState<string[]> ([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({
    파트: false,
    MBTI: false,
    위치: false,
  });

  useEffect(() => {
  const toTri = (pos: 'E'|'N'|'F'|'P'): boolean | undefined =>
    selectedMbti.includes(pos) ? true : undefined; // 선택 안 하면 undefined

  const filters: MemberFiltersParams = {
    positions: selectedChips.filter(c => c !== '전체').join(',') || undefined,
    regions:   selectedLocations.filter(l => l !== '전체').join(',') || undefined,
    mbtiE: toTri('E'), // false는 보내지 않음(=I 필터하지 않음)
    mbtiN: toTri('N'),
    mbtiF: toTri('F'),
    mbtiP: toTri('P'),
    page: 1,
    limit: 16,
  };

  onFiltersChange(filters);
}, [selectedChips, selectedMbti, selectedLocations]);

  const handleChipClick = (chip: string) => {
    if (chip === '전체') {
      // '전체' 칩을 클릭하면, 이미 선택된 경우 선택 해제하고,
      // 그렇지 않으면 '전체'만 선택합니다.
      setSelectedChips(selectedChips.includes('전체') ? [] : ['전체']);
    } else {
      // 다른 칩을 클릭하면 '전체'는 선택 해제하고, 클릭된 칩의 상태를 토글합니다.
      const otherChips = selectedChips.filter(c => c !== '전체');
      const newChips = otherChips.includes(chip)
        ? otherChips.filter(c => c !== chip) // 선택 해제
          : [...otherChips, chip]; // 선택
      setSelectedChips(newChips);
      // setSelectedChips(prev => {
      //   const otherChips = prev.filter(c => c !== '전체');
      //   return otherChips.includes(chip)
      //     ? otherChips.filter(c => c !== chip) // 선택 해제
      //     : [...otherChips, chip]; // 선택
      // });
    }
  };

  

  const handleDropdownClick = (name: '파트' | 'MBTI' | '위치') => {
      setOpenDropdown(prev => {
      const isOpen = prev[name];
      return { 파트: false, MBTI: false, 위치: false, [name]: !isOpen };
    });
  }; 

  const handleSortSelect = (sortOption: string) => { // sort 변경
    setSelectedSort(sortOption);
    handleDropdownClick('파트');
  };

  const handleMbtiSelect = (mbtiList: string[]) => {
    setSelectedMbti(mbtiList);
    handleDropdownClick('MBTI');
  };

  const handleLocationToggle = (locationOption: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationOption) ? prev.filter((loc) => loc !== locationOption) : [...prev, locationOption],
    );
    handleDropdownClick('위치'); 
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
              {selectedSort} {/* 수정 */}
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
