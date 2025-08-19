import React, { useState } from "react";
import KeyboardArrowDownIcon from "../../../assets/icons/ic_keyboard_arrow_down.svg";
import KeyboardArrowUpIcon from "../../../assets/icons/ic_keyboard_arrow_up.svg";
import PartBox from "./dropdowns/PartBox";
import MbtiBox from "./dropdowns/MbtiBox";
import LocationBox from "./dropdowns/LocationBox";

// 아이콘 import
import AllIcon from "../../../assets/icons/ic_all.svg";
import PlatformIcon from "../../../assets/icons/ic_platform.svg";
import LifeIcon from "../../../assets/icons/ic_life.svg";
import FinenceIcon from "../../../assets/icons/ic_finence.svg";
import CommunityIcon from "../../../assets/icons/ic_community.svg";
import MediaIcon from "../../../assets/icons/ic_media.svg";
import EduIcon from "../../../assets/icons/ic_edu.svg";
import WorkflowIcon from "../../../assets/icons/ic_workflow.svg";
import BlockchainIcon from "../../../assets/icons/ic_blockchain.svg";
import NocodeIcon from "../../../assets/icons/ic_nocode.svg";
import AiIcon from "../../../assets/icons/ic_ai.svg";
import AnalyticsIcon from "../../../assets/icons/ic_analytics.svg";
import DesignIcon from "../../../assets/icons/ic_design.svg";
import MarketingIcon from "../../../assets/icons/ic_marketing.svg";
import GameIcon from "../../../assets/icons/ic_game.svg";
import ShoppingIcon from "../../../assets/icons/ic_shopping.svg";
import HealthIcon from "../../../assets/icons/ic_health.svg";
import BioIcon from "../../../assets/icons/ic_bio.svg";
import MetabusIcon from "../../../assets/icons/ic_metabus.svg";
import SalesIcon from "../../../assets/icons/ic_sales.svg";
import SecurityIcon from "../../../assets/icons/ic_security.svg";
import EsgIcon from "../../../assets/icons/ic_esg.svg";
import RobotIcon from "../../../assets/icons/ic_robot.svg";

const categories = [
  { name: "전체", icon: AllIcon },
  { name: "플랫폼", icon: PlatformIcon },
  { name: "라이프스타일", icon: LifeIcon },
  { name: "금융", icon: FinenceIcon },
  { name: "커뮤니티", icon: CommunityIcon },
  { name: "미디어", icon: MediaIcon },
  { name: "교육", icon: EduIcon },
  { name: "생산성", icon: WorkflowIcon },
  { name: "블록체인", icon: BlockchainIcon },
  { name: "노코드", icon: NocodeIcon },
  { name: "인공지능", icon: AiIcon },
  { name: "데이터 분석", icon: AnalyticsIcon },
  { name: "디자인", icon: DesignIcon },
  { name: "마케팅", icon: MarketingIcon },
  { name: "게임", icon: GameIcon },
  { name: "이커머스", icon: ShoppingIcon },
  { name: "헬스케어", icon: HealthIcon },
  { name: "바이오", icon: BioIcon },
  { name: "메타버스", icon: MetabusIcon },
  { name: "세일즈", icon: SalesIcon },
  { name: "보안", icon: SecurityIcon },
  { name: "ESG", icon: EsgIcon },
  { name: "로보틱스", icon: RobotIcon },
];

type SortOption = "인기순" | "최신순" | null;
type Props = {
  sortOption: SortOption;
  onChangeSort: (opt: SortOption) => void;
};

const ProjectFilterBar: React.FC<Props> = ({ sortOption, onChangeSort }) => {
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

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
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
      <div className="w-full flex items-center justify-between whitespace-nowrap gap-4">
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
