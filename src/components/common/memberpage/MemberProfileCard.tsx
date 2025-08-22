import ic_send from '../../../assets/icons/ic_send.svg';
import ic_member_part from '../../../assets/icons/ic_member_part.svg';
import ic_member_location from '../../../assets/icons/ic_member_location.svg';
import ic_member_univ from '../../../assets/icons/ic_member_univ.svg';
import ic_member_email from '../../../assets/icons/ic_member_email.svg';
import ic_profile from '../../../assets/icons/ic_profile.svg';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import ToolTip from '../tooltips/ToolTip';
import type { MemberDetailData } from '../../../types/MemberProps';
import { formatRegions } from '../../../utils/formatRegions';
import { useLikeMember, useUnLikeMember } from '../../../hooks/useMember';
import MyProjectListBox from '../filter/dropdowns/MyProjectListBox';
import { useUserStore } from '../../../store/useUserStore';
// import MyProjectListBox from '../filter/dropdowns/MyProjectListBox';
// import type { MemberDetailData } from '../../../types/MemberProps';

type MemberProfileCardProps = {
  memberData: MemberDetailData
  isApplicantToMyProject?: boolean; // 다른 멤버 -> 나 (내가 PM) - tooltip
  suggested_project: boolean; // 나 -> 다른 멤버 (내가 지원자) - 제안 보내기 버튼 눌렀을 때 true
  onProposalClick: ()=>void;
  showDropdown?: boolean;
  onProjectSelect?: (project: {itemId: number; itemName: string}) => void;
  selectedProject?: {itemId: number; itemName: string} | null;
};

const MemberProfileCard = ({ memberData, isApplicantToMyProject, suggested_project, onProposalClick, showDropdown, onProjectSelect, selectedProject }: MemberProfileCardProps) => {

  const [isLiked, setIsLiked] = useState(memberData.liked);
  const user = useUserStore((state) => state.user);
  const currentUserName = user?.name || '';

  const likeMutation = useLikeMember(memberData.id);
  const unlikeMutation = useUnLikeMember(memberData.id);

  useEffect(() => {
    setIsLiked(!!memberData.liked);
  }, [memberData.liked]);

  // const isMutating = likeMutation.isPending || unlikeMutation.isPending;

  const profileInfos = [
    { icon: ic_member_part, alt: "파트", label: "파트", value: memberData.positions.join(', ') },
    { icon: ic_member_location, alt: "위치", label: "위치", value: formatRegions(memberData.regions) /* data.regions.join(', ') */ },
    { icon: ic_member_univ, alt: "대학교", label: "대학교", value: memberData.school /* data.school */ },
    { icon: ic_member_email, alt: "이메일", label: "이메일", value: memberData.email /*data.email*/ },
  ];

  const showTooltip = Boolean(isApplicantToMyProject) && !suggested_project;
  const tooltipMsg = `${currentUserName}님의 프로젝트에 지원한 팀원이에요\n지금 바로 제안하고 연락해 보세요!`; // 이름 수정

  useEffect(()=>setIsLiked(!!memberData.liked), [memberData.liked]);

    const onHeartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLiked) {
            unlikeMutation.mutate({}, {
                onSuccess: () => setIsLiked(false),
                onError: () => setIsLiked(true),
            });
            console.log('좋아요 등록');
        } else {
            likeMutation.mutate({}, {
                onSuccess: () => setIsLiked(true),
                onError: () => setIsLiked(false),
            });
        }
    }
  
  return (
    <section>
      <div className="bg-white rounded-[12px] border border-[#79747E]/[0.16] px-6 py-6 w-full">
        <div className="flex justify-between items-center mb-4.5">
          {/* 제목 */}
          <h2 className="headline-medium-emphasis">
            {memberData.profileTitle}
          </h2>
        </div>

        {/* 구분선 */}
        <hr className="border-t border-[rgba(121,116,126,0.16)] px-4 mb-6" />

        {/* 본문: 3단 그리드 */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-8 min-w-0">
          {/* 왼쪽: 로그인 안내 */}
          <div className="flex justify-center items-center self-center px-4 ">
            <img
              src={memberData.profileImageUrl || ic_profile}
              alt="프로필 이미지"
              className="w-[128px] h-[128px] rounded-full object-cover block"
            />
          </div>
          {/* 가운데: 프로필 정보 */} {/* 추후 리팩토링 예정 */}
          <div className="flex flex-col gap-[11px] w-full flex-shrink-0">
            <div className="flex gap-4 items-center mb-[13px]">
              <span className="body-large-emphasis">{memberData.name}</span>
              <div className="w-px h-4 bg-[#C8C5D0]" />
              <span className="body-large-emphasis">{memberData.nickname}</span>
              <span className="body-large text-[#47464F]">{memberData.gender ? '남' : '여'}</span>
              <span className="body-large text-[#47464F]">{memberData.age}</span>
              <span className="body-large text-[#47464F]">{memberData.mbti}</span>
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

      {/*  */}

      {/* 하단 버튼 */}
      <div className="flex gap-4 justify-center mt-6 mb-4">
        <div className="relative inline-block group">
          {(() => {
            const proposalButton = (
              <button
                onClick={onProposalClick}
                disabled={suggested_project}
                className={`w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] ${
                  suggested_project
                    ? 'bg-[#5A5891] opacity-60 text-[#68548E] cursor-not-allowed' // 제안 보냄
                    : 'bg-[#5A5891] text-[#FFFFFF]' // 제안 보내기
                }`}
              >  
                <img src={ic_send} alt="send icon" className="w-4 h-4 text-white" />
                <p className="title-medium text-[#FFFFFF]"> 
                  {suggested_project ? '이미 제안했어요' : '제안 보내기'}
                </p>
              </button>
            );

            return showTooltip ? (
              <ToolTip content={tooltipMsg}>
                {proposalButton}
              </ToolTip>
            ) : proposalButton;
          })()}
        </div>
        
        <button
          onClick={onHeartClick}
          className="w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] border-[1px] border-[#C8C5D0] text-[#47464F]"
        >
            {isLiked ? (
              // 좋아요 상태: 채워진 하트
              <>
                <Heart size={20} fill="currentColor" stroke="currentColor" />
                <p className="title-medium text-[#47464F]">관심 목록 추가됨</p> 

              </>
              
            ) : (
              // 기본 상태: 빈 하트
              <>
                <Heart size={20} />
              <p className="title-medium text-[#47464F]">관심 목록 추가</p> 
              </>
              
            )}
        </button>
      </div>

      {showDropdown && onProjectSelect && (
        <div className="mt-4 mb-4">
          <div className="max-w-[300px] mx-auto">
            <MyProjectListBox
              onProjectSelect={onProjectSelect}
              selectedProjectId={selectedProject?.itemId}
            />
          </div>
        </div>    
      )}
    </section>
  );
};

export default MemberProfileCard;
