import ic_send from "../../../assets/icons/ic_send.svg";
import { Heart } from "lucide-react";
import Share from "../../../assets/icons/ic_share.svg";
import Siren from "../../../assets/icons/ic_siren.svg";
import ProjectLogo from "../../../assets/icons/projectDetail/lightupLogo.png";

export type ProjectCardProps = {
  user: string;
  name: string;
  date: string;
  location: string;
};

const ProjectInfoCard = ({ user, name, date, location }: ProjectCardProps) => {
  <section>
    <div className="flex justify-content items-center gap-6 mb-4">
      <p className="label-large text-[#49454E] mb-4">게시일 : {date}</p>
      <button className="w-[56px] h-[64px] flex flex-col items-center justify-center gap-1 rounded-lg hover:bg-gray-100 active:bg-gray-200">
        <img src={Share} className="w-5 h-5 text-[#49454E]" />
        <span className="text-sm text-[#49454E] font-medium">공유</span>
      </button>
      <button className="w-[56px] h-[64px] flex flex-col items-center justify-center gap-1 rounded-lg hover:bg-gray-100 active:bg-gray-200">
        <img src={Siren} className="w-5 h-5 text-[#49454E]" />
        <span className="text-sm text-[#49454E] font-medium">신고</span>
      </button>
    </div>

    <div className="bg-white rounded-[8px] border border-[#CBC4CF] px-4 py-8 w-full">
      <div className="flex justify-between items-center mb-4.5">
        {/* 제목 */}
        <h2 className="headline-medium-emphasis">{name}</h2>
        <span className="label-large text-[#49454E]">종료일:모집 완료시</span>
      </div>

      {/* 구분선 */}
      <hr className="border-t px-4 border-[#CBC4CF] mb-6" />

      {/* 본문: 3단 그리드 */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-16 min-w-0">
        {/* 왼쪽: 프로젝트 썸네일 */}
        <img
          src={ProjectLogo}
          alt="Thumbnail"
          className="flex items-center justify-center rounded-lg w-60 h-60"
        ></img>

        {/* 가운데: 프로필 정보 */}

        <div className="flex flex-col gap-6 w-full flex-shrink-0">
          <div className="flex w-full">
            <div className="title-medium text-[#49454E] min-w-[132px]">
              프로젝트 명
            </div>
            <span className="title-medium text-[#1D1B20]">lightup</span>
          </div>
          <div className="flex w-full">
            <div className="title-medium text-[#49454E] min-w-[132px]">
              Product Maneger
            </div>
            <span className="body-medium ml-6">{user}</span>
          </div>
          <div className="flex">
            <div className="title-medium text-[#49454E] min-w-[132px]">
              위치
              {/* 추후 위치 데이터 분류 필요*/}
            </div>
            <span className="body-medium ml-6">{location}</span>
          </div>
          <div className="flex">
            <div className="title-medium text-[#49454E] min-w-[132px]">
              우대 MBTI
            </div>
            <span className="body-medium ml-6">ISFJ, ENTJ</span>
          </div>
          <div className="flex">
            <div className="title-medium text-[#49454E] min-w-[132px]">
              모집파트
            </div>
            <span className="body-medium ml-6">
              UIUX 디자이너, React 기반 프론트엔드, Springboot 백엔드 개발자
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* 하단 버튼 */}
    <div className="flex gap-4 justify-center mt-4 mb-4">
      <button className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] bg-[#F8F1FA] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),_0px_1px_2px_0px_rgba(0,0,0,0.3)]">
        <img src={ic_send} alt="send icon" className="w-4 h-4" />
        <p className="title-medium text-[#68548E]">제안 보내기</p>
      </button>

      <button className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] bg-[#68548E] text-[#FFFFFF]">
        <Heart size={20} />
        <p className="title-medium text-[#FFFFFF]">관심 목록 추가</p>
      </button>
    </div>
  </section>;
};

export default ProjectInfoCard;
