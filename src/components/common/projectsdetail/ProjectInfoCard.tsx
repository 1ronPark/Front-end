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
import ic_hail from "../../../assets/icons/projectDetail/ic_hail.svg";
import Share from "../../../assets/icons/ic_share.svg";
import Siren from "../../../assets/icons/ic_siren.svg";
import { CATEGORY_ICON_MAP } from "../../../utils/categoryMap";
import { useState, useMemo, useEffect } from "react";
import type { ProjectDetailData } from "../../../types/ProjectDetalProps";

import ActionStatusModal from "../modals/ActionStatusModal";
import AlertModal from "../modals/AlertModal";
import ic_sendresume from "../../../assets/icons/ic_sendresume.svg";
import { useLikeProject, useUnlikeProject } from "../../../hooks/useProject";

const ProjectInfoCard = ({
  introduce: sub_title,
  itemName: title,
  itemProfileImageUrl: profileImage,
  memberName: name,
  nickName,
  gender,
  age,
  mbti,
  email,
  school: univ,
  regions,
  //description, -> projectOverview에 넘겨줄 형식
  // likedByCurrentUser: liked,
 //ecruitPositions,
  itemCategories,
  //emComments,
  updatedAt: date,
  likedByCurrentUser,
  applied_project = false, 
suggested_project = false, // 임시
}: 
ProjectDetailData) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [applied, setApplied] = useState(applied_project);
  const [liked, setLiked] = useState(likedByCurrentUser);

  // 카테고리 이름 배열로 변환
  const categoryNames = useMemo(
    () => itemCategories.map((c) => c.categoryName),
    [itemCategories]
  );

  // 지역 문자열
  const regionText = useMemo(
    () => regions.map((r) => `${r.siDo} ${r.siGunGu}`).join(", "),
    [regions]
  );
  useEffect(() => {
    setLiked(likedByCurrentUser);
  }, [likedByCurrentUser]);

  const likeProject = useLikeProject(itemId);
  const unlikeProject = useUnlikeProject(itemId);

  const loading = likeProject.isPending || unlikeProject.isPending;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return; // 중복 클릭 방지

    const prev = liked;
    setLiked(!prev); // 낙관적 업데이트

    const revert = () => setLiked(prev); // 실패 시 롤백
    if (prev) {
      unlikeProject.mutate(undefined, { onError: revert });
    } else {
      likeProject.mutate(undefined, { onError: revert });
    }
  };
  // 지원 버튼 클릭
  const handleApplyClick = () => {
    setShowActionModal(true);
  };

  // 지원 처리 완료
  const handleProposalSent = () => {
    setApplied(true);
    setShowAlertModal(true);
  };

  return (
    <div>
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
                src={profileImage}
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
                <span className="body-small ml-6 gap-4">{nickName}</span>
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
                <span className="body-small ml-6">{regionText}</span>
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
                  {categoryNames.map((name) => {
                    const icon =
                      CATEGORY_ICON_MAP[name] ?? CATEGORY_ICON_MAP["전체"];
                    return (
                      <div
                        key={name}
                        className="flex items-center gap-1 text-[#1C1B21]"
                      >
                        <img src={icon} alt={name} className="w-4 h-4" />
                        <span className="label-medium">{name}</span>
                      </div>
                    );
                  })}
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
              onClick={handleApplyClick}
              disabled={applied}
              className={`w-[200px] h-[56px] flex items-center justify-center gap-2.5 rounded-[16px] text-white
      ${applied ? "opacity-60 bg-[#5A5891]" : "bg-[#545891] cursor-pointer"}`}
            >
              <img
                src={applied ? ic_hail : ic_send}
                alt="send icon"
                className="w-6 h-6"
              />
              <p className="title-medium text-white">
                {applied ? "이미 지원했어요" : "지원하기"}
              </p>
            </button>

            {/* 고정 안내창 (suggested_project일 경우) */}
            {suggested_project && (
              <div
                className="absolute left-[-225px] top-[-42px]
             rounded-tl-xl rounded-tr-xl rounded-bl-xl max-w-[280px]
             bg-[#FCF8FF] px-4 py-2 shadow-md z-30
             body-medium-emphasis text-[#16134A]"
              >
                <p>히로님에게 제안을 보낸 프로젝트예요</p>
                <p>지금 바로 지원하고 연락해 보세요!</p>
              </div>
            )}

            {applied_project && (
              <div
                className="absolute left-[-212px] top-[-42px]
             rounded-tl-xl rounded-tr-xl rounded-bl-xlmax-w-[280px]
             bg-[#FCF8FF] px-4 py-2 shadow-md z-10
             body-medium-emphasis text-[#16134A]"
              >
                <p>제안을 기다리고 있어요</p>
                <p>제안이 오면 알림을 보내드릴게요</p>
              </div>
            )}
          </div>

    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-pressed={liked}
      className="flex items-center gap-2 cursor-pointer"
    >
      <Heart
        className={`w-5 h-5 transition-colors duration-200 ${
          liked ? "text-pink-600" : "text-gray-600 hover:text-gray-900"
        }`}
        fill={liked ? "currentColor" : "none"} // 색 채우기
      />
      <p className={liked ? "title-medium text-pink-600" : "title-medium text-[#49454E]"}>
        {liked ? "관심 해제" : "관심 목록 추가"}
      </p>
    </button>
        </div>
      </section>

      {/* 1. 제안/지원 확인 → 완료 흐름 */}
      {showActionModal && (
        <ActionStatusModal
          proposalConfirmTitle={`${title}\n프로젝트에 지원할까요?`}
          proposalConfirmButtonText="지원하기"
          proposalSentTitle={`지원이 완료되었어요`}
          proposalSentButtonText="확인"
          onClose={() => setShowActionModal(false)}
          onProposalSent={handleProposalSent}
        />
      )}

      {/* 2. 완료 후 알림 */}
      <AlertModal
        icon={ic_sendresume}
        title="지원 완료"
        content="지원한 프로젝트의 PM이 확인 후 연락을 드릴 거예요."
        subcontent="지원 내용을 마이페이지에서 확인할 수 있어요."
        primaryButtonText="확인"
        isVisible={showAlertModal}
        onClose={() => setShowAlertModal(false)}
      />
    </div>
  );
};

export default ProjectInfoCard;
