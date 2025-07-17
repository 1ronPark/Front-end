
import {
  Heart,
  User,
  AtSign,
  GraduationCap,
  Baseline,
  MapPin,
  BellRing
} from "lucide-react";
import ic_send from "../../../assets/icons/ic_send.svg";
import Share from "../../../assets/icons/ic_share.svg";
import Siren from "../../../assets/icons/ic_siren.svg";
import ProjectLogo from "../../../assets/icons/projectDetail/lightupLogo.png";
import type { ProjectData } from "../../../types/ProjectCardProps";

type Props = ProjectData;

const ProjectInfoCard = ({ user, name, date, location }: Props) => {
  return (
    <section>
      <div className="flex items-center justify-between w-full mb-4">
        {/* 왼쪽: 게시일 */}
        <p className="label-large text-[#49454E]">게시일 : {date}</p>

        {/* 오른쪽: 버튼 2개 */}
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

      <div className="bg-white rounded-[8px] border border-[rgba(121,116,126,0.08)] px-4 py-8 w-full">
        <div className="flex justify-start items-center gap-8 mb-4.5">
          {/* 제목 */}
          <h2 className="headline-small-emphasis">{name}</h2>
          <div className="flex gap-4 px-4 py-1 bg-[#FFDCBE] rounded-xl text-[#693C00] justify-center items-center">
            <BellRing className="w-4 h-4 justify-center" />
            <span className="label-small-emphasis text-sm text-[#693C00] py-1">현재 모집 중인 프로젝트 입니다. 바로 지원해 보세요!</span>
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
              Lightup 라잇업
            </div>

            
            <div className="flex">
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px]">
                <User className="flex justify-center w-4 h-4" />
                PM
              </div>
              <span className="body-small ml-6 gap-4">일론박</span>
              <div className=" w-px h-4 ml-6 bg-[#C8C5D0]" />
              <span className="body-small ml-6 gap-4">{user}</span>
              <span className="body-small ml-6 gap-4 text-[#47464F]">남</span>
              <span className="body-small ml-6 gap-4 text-[#47464F]">23세</span>
              <span className="body-small ml-6 gap-4 text-[#47464F]">ENTP</span>
            </div>

            <hr className="border-t px-4 border-[rgba(121,116,126,0.08)] py-[2px]" />

            <div className="flex">
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px]">
                <AtSign className="flex justify-center w-4 h-4" />
                이메일
              </div>
              <span className="body-small ml-6">{user}</span>
            </div>

            <hr className="border-t px-4 border-[rgba(121,116,126,0.08)] py-[2px]" />

            <div className="flex">
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px]">
                <GraduationCap className="flex justify-center w-4 h-4" />
                대학교
              </div>
              <span className="body-small ml-6">{user}</span>
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
              <div className="flex gap-2 body-small text-[#49454E] min-w-[80px]">
                <Baseline className="flex justify-center w-4 h-4" />
                주제
              </div>
              <span className="body-small ml-6">ISFJ, ENTJ</span>
            </div>

            <hr className="border-t px-4 border-[rgba(121,116,126,0.08)] py-[2px]" />
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-4 justify-center mt-4 mb-4">
        <button className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] text-white bg-[#5A5891] cursor-pointer">
          <img src={ic_send} alt="send icon" className="w-4 h-4" />
          <p className="title-small text-white">지원하기</p>
        </button>

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
