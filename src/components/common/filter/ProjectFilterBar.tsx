import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "../../../assets/icons/ic_keyboard_arrow_down.svg";
import KeyboardArrowUpIcon from "../../../assets/icons/ic_keyboard_arrow_up.svg";
import PartBox from "./dropdowns/PartBox";
import MbtiBox from "./dropdowns/MbtiBox";
import LocationBox from "./dropdowns/LocationBox";
import { CATEGORY_ICON_MAP } from "../../../utils/categoryMap";
import type { CategoryType, ProjectQueryParams } from "../../../types/ProjectProps";

//카테고리 & 아이콘 매핑
const categories = Object.entries(CATEGORY_ICON_MAP).map(([name, icon]) => ({
  name: name as CategoryType,
  icon,
}));



type SortOption = '인기순' | '최신순' | null;

type Props = {
  sortOption: "인기순" | "최신순" | null;
  onChangeSort: (opt: "인기순" | "최신순" | null) => void;
  onFiltersChange: (filters: Partial<ProjectQueryParams>) => void; // Partial 권장
};


const ProjectFilterBar: React.FC<Props> = ({ sortOption, onChangeSort, onFiltersChange }) => {
  const handleSortOptionClick = (option: Exclude<SortOption, null>) => {
    onChangeSort(sortOption === option ? null : option);
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("파트");
  const [selectedMbti, setSelectedMbti] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({
    파트: false,
    MBTI: false,
    위치: false,
  });

const ALL = "전체";

useEffect(() => {
  const ALL = '전체';
  // '전체'는 제외
  const effectiveCats = selectedCategories.includes(ALL)
    ? []
    : selectedCategories;

  const toTri = (pos: 'E'|'N'|'F'|'P'): boolean | undefined =>
    selectedMbti.includes(pos) ? true : undefined;

  const sortMap = { '인기순': 'popular', '최신순': 'latest' } as const;

  const filters: ProjectQueryParams = {
    categories: effectiveCats.length ? effectiveCats.join(',') : undefined,
    positions: selectedSort !== '파트' ? selectedSort : undefined,
    regions: selectedLocations.length ? selectedLocations.join(',') : undefined,
    mbtiE: toTri('E'),
    mbtiN: toTri('N'),
    mbtiF: toTri('F'),
    mbtiP: toTri('P'),
    sort: sortOption ? sortMap[sortOption] : undefined,
    page: 1,
    limit: 20,
  };

  onFiltersChange(filters); 
}, [selectedCategories, selectedSort, selectedMbti, selectedLocations, sortOption]);



const handleCategoryClick = (category: string) => {
  setSelectedCategories(prev => {
    if (category === ALL) {
      return prev.includes(ALL) ? [] : [ALL];
    }
    const withoutAll = prev.filter(c => c !== ALL);
    return withoutAll.includes(category)
      ? withoutAll.filter(c => c !== category)
      : [...withoutAll, category];
  });
};

  const handleDropdownClick = (dropdownName: string) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
    }));
  };

  const handleSortSelect = (sortOption: string) => {
    setSelectedSort(sortOption);
    handleDropdownClick("파트");
  };

  const handleMbtiSelect = (mbtiList: string[]) => {
    setSelectedMbti(mbtiList);
  };

  const handleLocationToggle = (locationOption: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationOption)
        ? prev.filter((loc) => loc !== locationOption)
        : [...prev, locationOption]
    );
  };

  const getLocationButtonText = () => {
    if (selectedLocations.length === 0) {
      return "위치";
    }
    if (selectedLocations.length === 1) {
      return selectedLocations[0];
    }
    return `${selectedLocations[0]} 외 ${selectedLocations.length - 1}곳`;
  };

  const getMbtiButtonText = () => {
    if (selectedMbti.length === 0) {
      return "MBTI";
    }
    return `${selectedMbti[0]} 외 ${selectedMbti.length - 1}개`;
  };


  return (
    <div className=" bg-white rounded-lg font-pretendard ">
      <div className="flex items-center justify-between whitespace-nowrap gap-4">
        <div className="relative flex-1  ">
          <div className="flex items-center gap-2 overflow-x-auto pt-8 -mt-5 pb-2 -mb-2 w-180 thin-scrollbar">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex-shrink-0 px-2 py-1 text-sm rounded-lg flex flex-col items-center gap-1 hover cursor-pointer hover:shadow-md transform transition duration-200 hover:scale-105 ${
                  selectedCategories.includes(category.name)
                    ? "border border-gray-300 "
                    : "bg-white text-gray-700"
                }`}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-4 h-4"
                />
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {/*정렬박스*/}
          <div className="relative flex hover cursor-pointer">
            <button
              className={`flex items-center px-3.5 py-2 text-sm font-semimedium border border-gray-200 rounded-md hover:bg-[#EAE7EF] cursor-pointer focus:outline-none ${
                sortOption === "인기순" ? "bg-[#E3E0F9]" : ""
              }`}
              onClick={() => handleSortOptionClick("인기순")}
            >
              인기순
            </button>
          </div>
          <div className="relative flex hover cursor-pointer">
            <button
              className={`flex items-center px-3.5 py-2 text-sm font-semimedium border border-gray-200 rounded-md hover:bg-[#EAE7EF] cursor-pointer focus:outline-none ${
                sortOption === "최신순" ? "bg-[#E3E0F9]" : ""
              }`}
              onClick={() => handleSortOptionClick("최신순")}
            >
              최신순
            </button>
          </div>

          {/*파트 dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-semimedium border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none`}
              onClick={() => handleDropdownClick("파트")}
            >
              {selectedSort}
              <img
                src={
                  openDropdown["파트"]
                    ? KeyboardArrowUpIcon
                    : KeyboardArrowDownIcon
                }
                alt="arrow icon"
                className="w-4 h-4 ml-2"
              />
            </button>
            {openDropdown["파트"] && (
              <div className="absolute top-full mt-2 z-50">
                <PartBox onSelect={handleSortSelect} />
              </div>
            )}
          </div>
          {/*MBTI dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-semimedium rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none`}
              onClick={() => handleDropdownClick("MBTI")}
            >
              {getMbtiButtonText()}
              <img
                src={
                  openDropdown["MBTI"]
                    ? KeyboardArrowUpIcon
                    : KeyboardArrowDownIcon
                }
                alt="arrow icon"
                className="w-4 h-4 ml-2"
              />
            </button>
            {openDropdown["MBTI"] && (
              <div className="absolute top-full mt-2 z-10">
                <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <MbtiBox
                    selectedMbtis={selectedMbti}
                    onSelect={handleMbtiSelect}
                  />
                </div>
              </div>
            )}
          </div>
          {/*위치 dropdown*/}
          <div className="relative flex">
            <button
              className={`flex items-center px-4 py-2 text-sm font-semimedium border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none`}
              onClick={() => handleDropdownClick("위치")}
            >
              {getLocationButtonText()}
              <img
                src={
                  openDropdown["위치"]
                    ? KeyboardArrowUpIcon
                    : KeyboardArrowDownIcon
                }
                alt="arrow icon"
                className="w-4 h-4 ml-2"
              />
            </button>
            {openDropdown["위치"] && (
              <div className="absolute top-full mt-2 z-50">
                <LocationBox
                  selectedLocations={selectedLocations}
                  onToggleSelect={handleLocationToggle}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/*{sortOption !== null && <div>선택된 정렬 옵션: {sortOption}</div>}*/}
    </div>
  );
};

export default ProjectFilterBar;
