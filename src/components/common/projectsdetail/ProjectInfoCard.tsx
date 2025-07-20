import {
  Heart,
  User,
  AtSign,
  GraduationCap,
  Baseline,
  MapPin,
  BellRing,
} from "lucide-react";
import ic_send from "../../../assets/icons/ic_send.svg";
import Share from "../../../assets/icons/ic_share.svg";
import Siren from "../../../assets/icons/ic_siren.svg";
import ProjectLogo from "../../../assets/icons/projectDetail/lightupLogo.png";
import { useState } from "react";
import type { ProjectCardWithUserProps } from "../../../types/ProjectCardWithUser";

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
import type { CategoryType } from "../../../types/MyProjectCard";

const mapcategories = [
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

type Props = ProjectCardWithUserProps;

const ProjectInfoCard = ({
  name,
  title,
  nickname,
  sub_title,
  gender,
  age,
  mbti,
  email,
  date,
  univ,
  suggested_project,
  location,
  categories,
}: Props) => {
  const [showGuide, setShowGuide] = useState(false);

  // 지원하기 클릭 시 팝업 표시
  const handleSupportClick = () => {
    setShowGuide(true);
    setTimeout(() => setShowGuide(false), 3000); // 3초 후 팝업 사라짐
  };

  const categoryNames = categories;

  return (
    <section>
      <div className="flex items-center justify-between w-full mb-4">
        {/* 왼쪽: 게시일 */}
        <p className="label-large text-[#49454E]">게시일 : {date}</p>

        {/* 오른쪽: 공유 / 신고 버튼 */}
        <div className="flex gap-2">
          <button className="w-[56px] h-[64px] flex flex-col items-center justify-center gap-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 cursor-pointer">
            <img src={Share} className="w-5 h-5 text-[#49454E]" />
            <span className="text-sm text-[#49454E] font-small">공유</span>
          </button>
          <button className="w-[56px] h-[64px] flex flex-col items-center justify-center gap-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 cursor-pointer">
            <img src={Siren} className="w-5 h-5 text-[#49454E]" />
            <span className="text-sm text-[#49454E] font-small">신고</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[8px] border border-[rgba(121,116,126,0.08)] p-6 w-full">
        <div className="flex justify-start items-center gap-8 mb-4.5">
          {/* 제목 */}
          <h2 className="headline-small-emphasis">{sub_title}</h2>
          <div className="flex gap-4 px-4 py-1 bg-[#FFDCBE] rounded-xl text-[#693C00] justify-center items-center">
            <BellRing className="w-4 h-4 justify-center" />
            <span className="label-small-emphasis text-sm text-[#693C00] py-1">
              현재 모집 중인 프로젝트 입니다. 바로 지원해 보세요!
            </span>
          </div>
        </div>

        {/* 구분선 */}
        <hr className="border-t px-4 border-[rgba(121,116,126,0.16)] mb-6" />

        {/*-------------- 프로젝트 정보 카드 내용 --------------*/}
        <div className="grid grid-cols-[auto_1fr] gap-8 w-full">
          {/* 왼쪽: 썸네일 */}
          <div className="flex px-4 items-center justify-center">
            <img
              src={ProjectLogo}
              alt="Thumbnail"
              className="rounded-lg w-[128px] h-[128px] object-cover place-self-center"
            />
          </div>

          {/* 오른쪽: 텍스트 정보 */}
          <div className="flex flex-col px-4 itmes-start gap-2 w-full">
            <div className="title-small-emphasis -mx-4 mb-4 text-[#1C1B21] min-w-[160px]">
              {title}
            </div>

            <div className="flex">
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px]">
                <User className="flex justify-center w-4 h-4" />
                PM
              </div>
              <span className="body-small ml-6 gap-4">{nickname}</span>
              <div className=" w-px h-4 ml-6 bg-[#C8C5D0]" />
              <span className="body-small ml-6 gap-4">{name}</span>
              <span className="body-small ml-6 gap-4 text-[#47464F]">
                {gender}
              </span>
              <span className="body-small ml-6 gap-4 text-[#47464F]">
                {age}세
              </span>
              <span className="body-small ml-6 gap-4 text-[#47464F]">
                {mbti}
              </span>
            </div>

            <hr className="border-t px-4 border-[rgba(121,116,126,0.08)] py-[2px]" />

            <div className="flex">
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px]">
                <AtSign className="flex justify-center w-4 h-4" />
                이메일
              </div>
              <span className="body-small ml-6">{email}</span>
            </div>

            <hr className="border-t px-4 border-[rgba(121,116,126,0.08)] py-[2px]" />

            <div className="flex">
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px]">
                <GraduationCap className="flex justify-center w-4 h-4" />
                대학교
              </div>
              <span className="body-small ml-6">{univ}</span>
            </div>

            <hr className="border-t px-4 border-[rgba(121,116,126,0.08)] py-[2px]" />

            <div className="flex">
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px]">
                <MapPin className="flex justify-center w-4 h-4" />
                위치
              </div>
              <span className="body-small ml-6">{location}</span>
            </div>

            <hr className="border-t px-4 border-[rgba(121,116,126,0.08)] py-[2px]" />

            <div className="flex">
              {/* 왼쪽 라벨 */}
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px] items-center">
                <Baseline className="w-4 h-4" />
                주제
              </div>

              {/* 오른쪽: 카테고리 아이콘+텍스트 목록 */}
              <div className="flex flex-wrap gap-4 ml-6">
                {mapcategories
                  .filter((cat) => categoryNames.includes(cat.name as CategoryType)) // 그대로 작동함
                  .map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center gap-1 py-1text-sm text-[#1C1B21]"
                    >
                      <img src={cat.icon} alt={cat.name} className="w-4 h-4" />
                      <span className="label-medium">{cat.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            <hr className="border-t px-4 border-[rgba(121,116,126,0.08)] py-[2px]" />
          </div>
        </div>
      </div>

      {/* 하단 버튼 + 팝업*/}
      <div className="flex gap-4 justify-center mt-4 mb-4">
        <div className="relative">
          <button
            onClick={handleSupportClick}
            className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] text-white bg-[#5A5891] cursor-pointer"
          >
            <img src={ic_send} alt="send icon" className="w-4 h-4" />
            <p className="title-small text-white">
              {suggested_project ? "이미 지원했어요" : "지원하기"}
            </p>
          </button>

          {/*팝업 말풍선*/}
          {showGuide && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[280px] bg-white px-4 py-2 rounded-xl shadow-md z-50 text-sm text-[#1D1B20] whitespace-pre-line">
              {!suggested_project ? (
                <>
                  <p>히로님에게 제안을 보낸 프로젝트예요</p>
                  <p>지금 바로 지원하고 연락해 보세요!</p>
                </>
              ) : (
                <>
                  <p>제안을 기다리고 있어요</p>
                  <p>제안이 오면 알림을 보내드릴게요</p>
                </>
              )}
            </div>
          )}
        </div>

        <button
          className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 border border-[#CBC6D9] rounded-[16px]
         text-[#49454E] cursor-pointer"
        >
          <Heart size={20} />
          <p className="title-small text-[#49454E]">관심 목록 추가</p>
        </button>
      </div>
    </section>
  );
};

export default ProjectInfoCard;
