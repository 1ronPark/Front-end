import { ChevronLeft, DoorOpen } from "lucide-react";
import editIcon from "../../../assets/icons/mypage/ic_edit.svg";
import sample from "../../../assets/icons/mypage/sample_profile.png";
import { useState } from "react";
import MyInfoEditModal from "../modal/MyInfoEditModal";
import addPhotoIcon from "../../../assets/icons/mypage/ic_camera.svg";
import AddPhotoModal from "../modal/AddPhotoModal";
import type { MyInfoProps } from "../../../types/MyInfoProps";

const MyInfo = (myProps: MyInfoProps) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [addPhotoModal, setIsAddPhotoModal] = useState<boolean>(false);

  return (
    <div className="w-[1280px] flex flex-col items-start gap-[62px]">
      {/* 회원정보 */}
      <div className="flex flex-col px-[160px] gap-4 py-6">
        {/* header */}
        <div className="flex justify-between items-center w-[960px] h-[32px]">
          <p className="headline-small-emphasis">
            {myProps.name} 님의 회원정보
          </p>
          <button
            className="flex flex-row justify-center px-1.5 py-3 gap-1 hover:cursor-pointer"
            onClick={() => setEditModalOpen(true)}
          >
            <img src={editIcon} />
            <p className="label-large text-[#49454E]">수정하기</p>
          </button>
        </div>
        {/* 구분선 */}
        <div className="w-full h-px bg-[#CBC4CF]" />
        {/* 내 정보 section */}
        <div className="flex justify-between items-center ">
          {/* 내 사진 */}
          <div className="w-[241px] flex-col items-center justify-center px-8 ">
            <div className="relative w-[160px] h-[160px]">
              <img
                className="w-full h-full rounded-full object-cover"
                src={sample}
                alt="프로필 이미지"
              />
              {/* 프로필 사진 등록 버튼 */}
              <button
                type="button"
                className="absolute bottom-0 right-0 w-[56px] h-[56px] rounded-full bg-[#E9DEF8] flex items-center justify-center hover:bg-[#D8CEF0] cursor-pointer"
                onClick={() => setIsAddPhotoModal(true)}
              >
                <img src={addPhotoIcon} />
              </button>
            </div>
          </div>
          {/* 내 정보 목록 */}
          <div className="flex flex-col w-[695px] gap-4">
            <div className="flex justify-between">
              <p className="label-large text-[#49454E]">이름</p>
              <p className="text-right label-large-emphasis">{myProps.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="label-large text-[#49454E]">닉네임</p>
              <p className="text-right label-large-emphasis">
                {myProps.nickname}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="label-large text-[#49454E]">휴대폰 번호</p>
              <p className="text-right label-large-emphasis">{myProps.phone}</p>
            </div>
            <div className="flex justify-between">
              <p className="label-large text-[#49454E]">이메일 주소</p>
              <p className="text-right label-large-emphasis">{myProps.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="label-large text-[#49454E]">대학교</p>
              <p className="text-right label-large-emphasis">{myProps.univ}</p>
            </div>
            <div className="flex justify-between">
              <p className="label-large text-[#49454E]">MBTI</p>
              <p className="text-right label-large-emphasis">{myProps.mbti}</p>
            </div>
            <div className="flex justify-between">
              <p className="label-large text-[#49454E]">한줄소개</p>
              <p className="text-right label-large-emphasis">{myProps.intro}</p>
            </div>
          </div>
        </div>
      </div>
      {/* 비밀번호 */}
      <div className="flex flex-col px-[160px] gap-6">
        <div className="flex justify-between h-[32px] items-center">
          <p className="headline-small-emphasis">비밀번호</p>
        </div>
        {/* 구분선 */}
        <div className="w-full h-px bg-[#CBC4CF]" />
        {/* content */}
        <div className="flex w-[960px] justify-between">
          <p className="label-large text-[#49454E]">
            카카오톡 로그인 사용 중 입니다.
            <br />
            비밀번호는 카카오톡에서 변경하실 수 있습니다.
          </p>
          <button className="flex justify-center items-center px-3 py-1.5 gap-1 hover:cursor-pointer">
            <ChevronLeft className="w-[20px] h-[20px] text-[#49454E]" />
            <p className="label-large text-[#49454E]">변경 하러 가기</p>
          </button>
        </div>
      </div>
      {/* 회원 탈퇴 */}
      <div className="flex flex-col  px-[160px] gap-6">
        <div className="flex justify-between w-[960px]">
          <p className="headline-small-emphasis">회원 탈퇴</p>
          <button className="flex px-3 py-1.5 gap-1 hover:cursor-pointer">
            <DoorOpen className="w-[20px] h-[20px] text-[#49454E]" />
            <p className="label-large text-[#49454E]">탈퇴 하기</p>
          </button>
        </div>
      </div>
      {editModalOpen && (
        <MyInfoEditModal
          onClose={() => setEditModalOpen(false)}
          myInfo={myProps}
        />
      )}

      {addPhotoModal && (
        <AddPhotoModal onClose={() => setIsAddPhotoModal(false)} />
      )}
    </div>
  );
};

export default MyInfo;
