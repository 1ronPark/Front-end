import { useState } from "react";
import editIcon from "../../../assets/icons/mypage/ic_edit.svg";
import type { MyInfoProps } from "../../../types/MyInfoProps";
import MyInfoEditModal from "../modal/MyInfoEditModal";
import AddPhotoModal from "../modal/AddPhotoModal";
import sample from "../../../assets/icons/mypage/sample_profile.png";
import addPhotoIcon from "../../../assets/icons/mypage/ic_camera.svg";
import { AtSign, GraduationCap } from "lucide-react";

const Header = (myProps: MyInfoProps) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [addPhotoModal, setIsAddPhotoModal] = useState<boolean>(false);

  // 주디: 일단 TS 오류를 위해 임시로 만들어놓았습니다!
  //       추후에 수정해주세요!
  const onCloseAll = () => {
    console.log('수정 완료시 닫기');
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">프로필 수정</h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow shawdow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{myProps.intro}</h2>
          <button
            className="flex flex-row justify-center px-1.5 py-3 gap-1 hover:cursor-pointer"
            onClick={() => setEditModalOpen(true)}
          >
            <img src={editIcon} />
            <p className="label-large text-[#49454E]">수정하기</p>
          </button>
        </div>
        <hr className="my-4 border-[#EAE9EA]" />
        <div className="flex items-start gap-8">
          <div className="relative h-40 w-40 rounded-full bg-gray-200 flex items-center justify-center">
            {/* 프로필 이미지 영역 */}
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
          <div className="flex-1 mt-3 space-y-4">
            <div className="flex items-center gap-4 ">
              <span className="text-gray-500 text-lg">{myProps.nickname}</span>

              {/* 세로 바 추가 */}
              <div className="h-10 border-l border-gray-300" />

              <span className="text-xl">{myProps.name}</span>
              <span className="text-gray-400">{myProps.gender}</span>
              <span className="text-gray-400">{myProps.age}</span>
              <span className="text-gray-400">{myProps.mbti}</span>
            </div>
            <div className="space-y-6 text-sm text-gray-800">
              <div className="m-6 flex flex-col gap-3">
                <div className="flex items-center gap-8">
                  <p className="text-gray-500 shrink-0 flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    대학교
                  </p>
                  <p>{myProps.school}</p>
                </div>

                <hr className="border-t border-gray-300" />

                <div className="flex items-center gap-8">
                  <p className="text-gray-500 shrink-0 flex items-center gap-1">
                    <AtSign className="w-4 h-4 text-gray-500" />
                    이메일
                  </p>
                  <p>{myProps.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editModalOpen && (
        <MyInfoEditModal
          onClose={() => setEditModalOpen(false)}
          onCloseAll={onCloseAll}
          myInfo={myProps}
        />
      )}

      {addPhotoModal && (
        <AddPhotoModal onClose={() => setIsAddPhotoModal(false)} />
      )}
    </div>
  );
};

export default Header;
