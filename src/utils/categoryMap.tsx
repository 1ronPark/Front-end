import type { CategoryType } from "../types/ProjectDetailProps";

// utils/categoryMap.ts
import AllIcon from "../assets/icons/ic_all.svg";
import PlatformIcon from "../assets/icons/ic_platform.svg";
import LifeIcon from "../assets/icons/ic_life.svg";
import FinenceIcon from "../assets/icons/ic_finence.svg";
import CommunityIcon from "../assets/icons/ic_community.svg";
import MediaIcon from "../assets/icons/ic_media.svg";
import EduIcon from "../assets/icons/ic_edu.svg";
import WorkflowIcon from "../assets/icons/ic_workflow.svg";
import BlockchainIcon from "../assets/icons/ic_blockchain.svg";
import NocodeIcon from "../assets/icons/ic_nocode.svg";
import AiIcon from "../assets/icons/ic_ai.svg";
import AnalyticsIcon from "../assets/icons/ic_analytics.svg";
import DesignIcon from "../assets/icons/ic_design.svg";
import MarketingIcon from "../assets/icons/ic_marketing.svg";
import GameIcon from "../assets/icons/ic_game.svg";
import ShoppingIcon from "../assets/icons/ic_shopping.svg";
import HealthIcon from "../assets/icons/ic_health.svg";
import BioIcon from "../assets/icons/ic_bio.svg";
import MetabusIcon from "../assets/icons/ic_metabus.svg";
import SalesIcon from "../assets/icons/ic_sales.svg";
import SecurityIcon from "../assets/icons/ic_security.svg";
import EsgIcon from "../assets/icons/ic_esg.svg";
import RobotIcon from "../assets/icons/ic_robot.svg";


export const CATEGORY_ICON_MAP: Record<CategoryType, string> = {
  "전체": AllIcon,
  "플랫폼": PlatformIcon,
  "라이프스타일": LifeIcon,
  "금융": FinenceIcon,
  "커뮤니티": CommunityIcon,
  "미디어": MediaIcon,
  "교육": EduIcon,
  "생산성": WorkflowIcon,
  "블록체인": BlockchainIcon,
  "노코드": NocodeIcon,
  "인공지능": AiIcon,
  "데이터 분석": AnalyticsIcon,
  "디자인": DesignIcon,
  "마케팅": MarketingIcon,
  "게임": GameIcon,
  "이커머스": ShoppingIcon,
  "헬스케어": HealthIcon,
  "바이오": BioIcon,
  "메타버스": MetabusIcon,
  "세일즈": SalesIcon,
  "보안": SecurityIcon,
  "ESG": EsgIcon,
  "로보틱스": RobotIcon,
};

