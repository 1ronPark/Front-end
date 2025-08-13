import { useState } from "react";
import editIcon from "../../../assets/icons/mypage/ic_edit.svg";
// import type { MyInfoProps } from "../../../types/MyInfoProps";
import MyInfoEditModal from "../modal/MyInfoEditModal";
import AddPhotoModal from "../modal/AddPhotoModal";
import sample from "../../../assets/icons/mypage/sample_profile.png";
import addPhotoIcon from "../../../assets/icons/mypage/ic_camera.svg";
import { AtSign, GraduationCap } from "lucide-react";
// import { useProfileStore } from "../../../store/useProfileStore";
import { useUser } from "../../../hooks/useUser";
import { usePostProfileImage } from "../../../hooks/useProfile";
import ProfileImageEditModal from "./ProfileImageEditModal";

type HeaderProps = {
  /** FormEdit에서 내려주는 임시 미리보기 URL (선택됨이 있지만 아직 저장 안 됨) */
  pendingPreviewUrl?: string | null;
  /** 모달에서 파일 적용 시 호출 (FormEdit으로 파일 전달) */
  onPickProfileImage: (file: File) => void;
};

const Header = ({ pendingPreviewUrl, onPickProfileImage }: HeaderProps) => {
  const { data } = useUser();

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [addPhotoModal, setIsAddPhotoModal] = useState<boolean>(false);

  const imageSrc = pendingPreviewUrl || data?.profileImageUrl || "";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">프로필 수정</h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow shawdow-md">
        <div className="mb-4 flex items-center justify-between">
          {/* career부분 profileTitle로 변경될 것 같음 */}
          <h2 className="title-large-emphasis">{data?.career}</h2>
          <button
            className="flex flex-row justify-center px-1.5 py-3 gap-1 hover:cursor-pointer"
            onClick={() => setEditModalOpen(true)}
          >
            <img src={editIcon} />
            <p className="label-large text-[#49454E]">수정하기</p>
          </button>
        </div>
        <hr className="my-4 border-[#EAE9EA]" />
        <div className="flex items-start gap-[64px]">
          <div className="relative h-40 w-40 rounded-full bg-gray-200 flex items-center justify-center">
            {/* 프로필 이미지 영역 */}
            <img
              className="w-full h-full rounded-full object-cover"
              src={imageSrc}
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
              <span className="body-large-emphasis text-[#1C1B21]">
                {data?.nickname}
              </span>

              {/* 세로 바 추가 */}
              <div className="h-10 border-l border-gray-300" />

              <span className="body-large-emphasis text-[#1C1B21]">
                {data?.name}
              </span>
              <span className="body-large text-[#47464F]">
                {" "}
                {data?.gender ? "남" : "여"}
              </span>
              <span className="body-large text-[#47464F]">{data?.age}</span>
              <span className="body-large text-[#47464F]">{data?.mbti}</span>
            </div>
            <div className="space-y-6 text-sm text-gray-800">
              <div className="m-6 flex flex-col gap-3">
                <div className="flex items-center gap-8">
                  <p className="text-gray-500 shrink-0 flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    대학교
                  </p>
                  <p>{data?.school}</p>
                </div>

                <hr className="border-t border-gray-300" />

                <div className="flex items-center gap-8">
                  <p className="text-gray-500 shrink-0 flex items-center gap-1">
                    <AtSign className="w-4 h-4 text-gray-500" />
                    이메일
                  </p>
                  <p>{data?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editModalOpen && (
        <MyInfoEditModal
          onClose={() => setEditModalOpen(false)}
          myInfo={data}
        />
      )}

      {addPhotoModal && (
        <ProfileImageEditModal
          onClose={() => setIsAddPhotoModal(false)}
          onPick={(file) => onPickProfileImage(file)} // ← 파일만 부모로 전달
        />
      )}
    </div>
  );
};

export default Header;
