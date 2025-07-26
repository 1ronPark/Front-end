import ic_send from "../../../assets/icons/ic_send.svg";
import ic_member_part from "../../../assets/icons/ic_member_part.svg";
import ic_member_location from "../../../assets/icons/ic_member_location.svg";
import ic_member_univ from "../../../assets/icons/ic_member_univ.svg";
import ic_member_email from "../../../assets/icons/ic_member_email.svg";
import ic_profile from "../../../assets/icons/ic_profile.svg";
import { Heart } from "lucide-react";
import BaseModal from "../modals/BaseModal";
import SuggestSuccessModal from "./modal/SupportSuccessModal";
import { useState } from "react";

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

const MemberProfileCard = ({
  isApplicantToMyProject = false,
  suggested_project
}: MemberProfileCardProps) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [suggested, setSuggested] = useState(suggested_project);
    // 지원하기 클릭 시 팝업 표시
    const handleSuggestClick = () => {
      setShowConfirmModal(true);
    };
  
    const handleConfirmSuggest = () => {
      setSuggested(true); // 실제 지원 처리
      setShowConfirmModal(false);
      setShowSuccessModal(true);
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

          {/*이미 제안을 보낸 사용자일 경우 UI 필요? */}
          
          <button 
          onClick={handleSuggestClick}
          disabled={suggested}
          
          className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] bg-[#68548E] text-[#FFFFFF]">
            <img src={ic_send} alt="send icon" className="w-4 h-4 text-white" />
            <p className="title-medium text-[#FFFFFF]">제안 보내기</p>
          </button>
        </div>

        <BaseModal
          visible={showConfirmModal}
          title="강혜준"
          description=" 님께 제안을 보낼까요?"
          confirmText="보내기"
          cancelText="닫기"
          onConfirm={handleConfirmSuggest}
          onCancel={() => setShowConfirmModal(false)}
        />

        <SuggestSuccessModal
          isVisible={showSuccessModal}
          name="강혜준"
          onClose={() => setShowSuccessModal(false)}
        />
        <button className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] border-[1px] border-[#C8C5D0] text-[#47464F]">
          <Heart size={20} />
          <p className="title-medium text-[#47464F]">관심 목록 추가</p>
        </button>
      </div>
    </section>
  );
};

export default MemberProfileCard;
