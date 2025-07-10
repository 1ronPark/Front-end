import ic_send from '../../../assets/icons/ic_send.svg';
import { Heart } from 'lucide-react';

const MemberProfileCard = () => (
    
  <section>
    <p className="label-large text-[#49454E] mb-4">마지막 업데이트 : 2025-07-01, 23:00:20</p>
    <div className="bg-white rounded-[8px] border border-[#CBC4CF] px-4 py-8 w-full">
      {/* 상단: 마지막 업데이트, 제안 상태 */}
      
      <div className="flex justify-between items-center mb-4.5">
          {/* 제목 */}
          <h2 className="headline-medium-emphasis">
          기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너
          </h2>
          <span className="label-large text-[#68548E]">제안 받는 중</span>
      </div>
      
      {/* 구분선 */}
      <hr className="border-t px-4 border-[#CBC4CF] mb-6" />

      {/* 본문: 3단 그리드 */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-16 min-w-0">

        {/* 왼쪽: 로그인 안내 */}
        <div className="flex items-center justify-center title-small bg-[#F2ECF4] rounded-lg w-60 h-60 text-center text-[#000000]">
          로그인 후<br />프로젝트 등록 시<br />열람 가능
        </div>

        {/* 가운데: 프로필 정보 */}
        <div className="flex flex-col gap-6 w-full flex-shrink-0">
          <div className="flex gap-4 items-center mb-[2px]">
            <span className="title-medium min-w-[132px]">UXUI Designer</span>
            <span className="title-large-emphasis ml-2">강**</span>
            <span className="body-large text-[#49454E]">23세</span>
            <span className="body-large text-[#49454E]">남</span>
            <span className="body-large text-[#49454E]">ISFJ</span>
          </div>
          <div className="flex w-full">
            <div className="title-small text-[#49454E] min-w-[132px]">위치</div>
            <span className="body-medium ml-6">가천대학교 글로벌 캠퍼스, 서울 강남구, 성남 전체</span>
          </div>
          <div className="flex">
            <div className="title-small text-[#49454E] min-w-[132px]">파트</div>
            <span className="body-medium ml-6">UXUI Design</span>
          </div>
          <div className="flex">
            <div className="title-small text-[#49454E] min-w-[132px]">사용 가능 툴</div>
            <span className="body-medium ml-6">Figma, Adobe XD, Notion</span>
          </div>
          <div className="flex">
            <div className="title-small text-[#49454E] min-w-[132px]">블로그</div>
            <span className="body-medium ml-6">깃허브 링크 임베드, 블로그 링크 임베드 최대 2개</span>
          </div>
        </div>

        {/* 오른쪽: 연락처 안내 */}
        <div className="flex items-center justify-center title-small bg-[#FFFBFF] w-[200px] h-[127px] text-center text-[#49454E] mt-[23px]">  
          <div>제안 수락 시,<br />연락처가 공개됩니다.</div>
        </div>
      </div>
    </div>

    {/* 하단 버튼 */}
    <div className="flex gap-4 justify-center mt-4 mb-4">
      <button
        className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] bg-[#F8F1FA] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),_0px_1px_2px_0px_rgba(0,0,0,0.3)]"
      >
        <img src={ic_send} alt="send icon" className="w-4 h-4" />
        <p className="title-medium text-[#68548E]">제안 보내기</p>
      </button>

      <button
        className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] bg-[#68548E] text-[#FFFFFF]"
      >
          <Heart size={20} />
          <p className="title-medium text-[#FFFFFF]">관심 목록 추가</p>  
      </button>
    </div>
  </section>
);

export default MemberProfileCard;