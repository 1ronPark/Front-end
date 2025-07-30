import ic_send from '../../../assets/icons/ic_send.svg';
import ic_member_part from '../../../assets/icons/ic_member_part.svg';
import ic_member_location from '../../../assets/icons/ic_member_location.svg';
import ic_member_univ from '../../../assets/icons/ic_member_univ.svg';
import ic_member_email from '../../../assets/icons/ic_member_email.svg';
import ic_profile from '../../../assets/icons/ic_profile.svg';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import ActionStatusModal from '../modals/ActionStatusModal';

type MemberProfileCardProps = {
  isApplicantToMyProject?: boolean;
  suggested_project?: boolean;
};

const profileInfos = [
  { icon: ic_member_part, alt: "파트", label: "파트", value: "디자인" },
  {
    icon: ic_member_location,
    alt: "위치",
    label: "위치",
    value: "서울 강남구, 성남 전체",
  },
  {
    icon: ic_member_univ,
    alt: "대학교",
    label: "대학교",
    value: "가천대학교 글로벌 캠퍼스 1년",
  },
  {
    icon: ic_member_email,
    alt: "이메일",
    label: "이메일",
    value: "harrysjuns@gachon.ac.kr",
  },
];

const MemberProfileCard = ({ isApplicantToMyProject = false }: MemberProfileCardProps) => {
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [isProposalSent, setIsProposalSent] = useState(false); // 추가: 제안 보낸 상태

  const handleProposalSent = () => {
    setIsProposalSent(true); // 제안 보낸 후 상태 업데이트
  };
  
  return (
    <section>
      <div className="bg-white rounded-[12px] border border-[#79747E]/[0.16] px-6 py-6 w-full">
        <div className="flex justify-between items-center mb-4.5">
          {/* 제목 */}
          <h2 className="headline-medium-emphasis">
            기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너
          </h2>
        </div>

        {/* 구분선 */}
        <hr className="border-t border-[rgba(121,116,126,0.16)] px-4 mb-6" />

        {/* 본문: 3단 그리드 */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-8 min-w-0">
          {/* 왼쪽: 로그인 안내 */}
          <div className="flex justify-center items-center self-center px-4">
            <img
              src={ic_profile}
              alt="프로필 이미지"
              className="w-[128px] h-[128px] rounded-full object-cover block"
            />
          </div>
          {/* 가운데: 프로필 정보 */} {/* 추후 리팩토링 예정 */}
          <div className="flex flex-col gap-[11px] w-full flex-shrink-0">
            <div className="flex gap-4 items-center mb-[13px]">
              <span className="body-large-emphasis">히로</span>
              <div className="w-px h-4 bg-[#C8C5D0]" />
              <span className="body-large-emphasis">강혜준</span>
              <span className="body-large text-[#47464F]">남</span>
              <span className="body-large text-[#47464F]">23세</span>
              <span className="body-large text-[#47464F]">ISFJ</span>
            </div>
            {/* 프로필 정보 반복 렌더링 */}
            {profileInfos.map(({ icon, alt, label, value }, index) => (
              <div key={label} className="px-4">
                <div className="flex items-start gap-2 mb-[11px]">
                  <img src={icon} alt={alt} className="w-4 h-4" />
                  <div className="body-small min-w-[40px]">{label}</div>
                  <div className="flex w-full body-small-emphasis ml-[44px]">
                    {value}
                  </div>
                </div>

                {/* 아래 구분선 (마지막 항목은 제외) */}
                {index < profileInfos.length - 1 && (
                  <hr className="border-[#79747E]/[0.08]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-4 justify-center mt-6 mb-4">
        <div className="relative">
          {/* ✅ 조건부 툴팁 */}
          {isApplicantToMyProject && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-[257px] px-4 py-2 rounded-[16px] bg-white text-[#16134A] shadow text-center body-medium-emphasis">
              히로님의 프로젝트에 지원한 팀원이에요
              <br />
              지금 바로 제안하고 연락해 보세요!
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 shadow-sm"></div>
            </div>
          )}
          <button
            onClick={()=>setShowProposalModal(true)}
            disabled={isProposalSent}
            className={`w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] ${
              isProposalSent
                ? 'bg-[#5A5891] opacity-60 text-[#68548E] cursor-not-allowed' // 제안 보냄
                : 'bg-[#5A5891] text-[#FFFFFF]' // 제안 보내기
              }`}
        >  
          <img src={ic_send} alt="send icon" className="w-4 h-4 text-white" />
          <p className="title-medium text-[#FFFFFF]"> 
              {isProposalSent ? '이미 제안했어요' : '제안 보내기'}
            </p>
        </button>
        </div>
        
        

        <button
          className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] border-[1px] border-[#C8C5D0] text-[#47464F]"
        >
            <Heart size={20} />
            <p className="title-medium text-[#47464F]">관심 목록 추가</p>  
        </button>
      </div>

      {showProposalModal && (
        <ActionStatusModal
          proposalConfirmTitle={`강혜준님께\n제안을\n보낼까요?`}
          proposalConfirmButtonText="보내기"
          proposalSentTitle={`강혜준님께\n제안을\n보냈어요`}
          proposalSentButtonText="확인"
          onClose={()=>setShowProposalModal(false)}
          onProposalSent={handleProposalSent}
        />
      )}
    </section>
  );
};

export default MemberProfileCard;
