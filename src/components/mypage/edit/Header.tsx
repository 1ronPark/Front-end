import { useState } from 'react';
import editIcon from '../../../assets/icons/mypage/ic_edit.svg';
import type { MyInfoProps } from '../../../types/MyInfoProps';
import MyInfoEditModal from "../modal/MyInfoEditModal";
import AddPhotoModal from "../modal/AddPhotoModal";
import sample from "../../../assets/icons/mypage/sample_profile.png";
import addPhotoIcon from "../../../assets/icons/mypage/ic_camera.svg";



const Header = (myProps: MyInfoProps) => {

const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
const [addPhotoModal, setIsAddPhotoModal] = useState<boolean>(false);

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
          <div className="flex-1 mt-3 space-y-8">
            <div className="flex items-center gap-4 ">
              <span className="text-xl">{myProps.name}</span>
              <span className="text-gray-600">{myProps.nickname}</span>
              <span className="text-gray-600">{myProps.sex}</span>
              <span className="text-gray-600">{myProps.mbti}</span>
            </div>
            <div className="space-y-6 text-sm text-gray-800">
              <div className="flex gap-6">
                <div className="flex gap-8 flex-[2]">
                  <p className="text-gray-500 shrink-0">대학교</p>
                  <p>{myProps.univ}</p>
                </div>
                <div className="flex gap-8 flex-[2]">
                  <p className="text-gray-500 shrink-0">이메일</p>
                  <p>{myProps.email}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex gap-8 flex-[2]">
                  <p className="text-gray-500 shrink-0">블로그</p>
                  <p>{myProps.blog}</p>
                </div>
                <div className="flex gap-8 flex-[2]">
                  <p className="text-gray-500 shrink-0">휴대폰</p>
                  <p>{myProps.phone}</p>
                </div>
              </div>
            </div>
          </div>
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


export default Header;
