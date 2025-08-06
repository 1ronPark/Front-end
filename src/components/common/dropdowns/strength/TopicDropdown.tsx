import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import PlatformIcon from "../../../../assets/icons/ic_platform.svg";
import LifeIcon from "../../../../assets/icons/ic_life.svg";
import FinenceIcon from "../../../../assets/icons/ic_finence.svg";
import CommunityIcon from "../../../../assets/icons/ic_community.svg";
import MediaIcon from "../../../../assets/icons/ic_media.svg";
import EduIcon from "../../../../assets/icons/ic_edu.svg";
import WorkflowIcon from "../../../../assets/icons/ic_workflow.svg";
import BlockchainIcon from "../../../../assets/icons/ic_blockchain.svg";
import NocodeIcon from "../../../../assets/icons/ic_nocode.svg";
import AiIcon from "../../../../assets/icons/ic_ai.svg";
import AnalyticsIcon from "../../../../assets/icons/ic_analytics.svg";
import DesignIcon from "../../../../assets/icons/ic_design.svg";
import MarketingIcon from "../../../../assets/icons/ic_marketing.svg";
import GameIcon from "../../../../assets/icons/ic_game.svg";
import ShoppingIcon from "../../../../assets/icons/ic_shopping.svg";
import HealthIcon from "../../../../assets/icons/ic_health.svg";
import BioIcon from "../../../../assets/icons/ic_bio.svg";
import MetabusIcon from "../../../../assets/icons/ic_metabus.svg";
import SalesIcon from "../../../../assets/icons/ic_sales.svg";
import SecurityIcon from "../../../../assets/icons/ic_security.svg";
import EsgIcon from "../../../../assets/icons/ic_esg.svg";
import RobotIcon from "../../../../assets/icons/ic_robot.svg";

const PART_OPTIONS = [
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

interface PartDropdownProps {
  onSelect: (part: string) => void;
}

const PartDropdown = ({ onSelect }: PartDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setInputValue('');
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (part: string) => {
    onSelect(part);
    setIsOpen(false);
    setInputValue('');
  };

  const filteredParts = PART_OPTIONS.filter(option =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-3"
        >
          <span className="text-sm text-gray-400">프로젝트의 주제를 선택해주세요.</span>
          <ChevronDown size={24} className="text-gray-400 disabled:text-gray-400" />
        </button>
      ) : (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          className="w-full rounded-xl border-2 border-[#5A588D] px-4 py-3 text-sm outline-none"
          placeholder="프로젝트의 주제를 검색하세요."
        />
      )}
      {isOpen && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredParts.map((option) => (
            <li
              key={option.name}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleSelect(option.name)}
            >
              <span className="inline-flex items-center gap-2">
                <img src={option.icon} alt={option.name} className="w-5 h-5" />
                {option.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PartDropdown;
