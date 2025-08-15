import { ChevronLeft, DoorOpen } from "lucide-react";
import editIcon from "../../assets/icons/mypage/ic_edit.svg";
import { useState } from "react";
import addPhotoIcon from "../../assets/icons/mypage/ic_camera.svg";
import type { MyInfoProps } from "../../types/MyInfoProps";
import MyInfoEditModal from "./modal/MyInfoEditModal";
import AddPhotoModal from "./modal/AddPhotoModal";
import { useApiQuery } from "../../hooks/apiHooks";
import { useNavigate } from "react-router-dom";
import { usePostProfileImage } from "../../hooks/useProfile";

const MyPageInfo = () => {
  const navigate = useNavigate();

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [addPhotoModal, setIsAddPhotoModal] = useState<boolean>(false);

  // ✅ API 호출
  const {
    data: myProps,
    isLoading,
    error,
  } = useApiQuery<{ result: MyInfoProps }>({
    method: "GET",
    // 실제 백엔드 엔드포인트로 대체
    endpoint: import.meta.env.VITE_API_ME_ENDPOINT,
  });
  // 멀티파트 업로드 뮤테이션 (서버가 profileImageUrl 갱신까지 처리)
  const { mutate: profileChange } = usePostProfileImage();

  // 적용 시 업로드 수행
  const onUpload = async (file: File) => {
    const fd = new FormData();
    // ⚠️ 서버 스웨거에 맞는 필드명으로 변경 (예: "image" | "profileImage" | "file")
    fd.append("profileImage", file);

    // useApiMutation은 기본적으로 mutate(비동기X)지만,
    // 여기선 모달에서 로딩 표시를 위해 Promise로 래핑
    await new Promise<void>((resolve, reject) => {
      profileChange(
        { body: fd },
        {
          onSuccess: () => resolve(),
          onError: () => reject(new Error("upload failed")),
        }
      );
    });
    // 성공 시: 쿼리 무효화는 useApiMutation 내부(onSuccess)에서 처리되도록
    // 만들어져 있으면 그대로 사용. 없다면 훅 구현에서 invalidate 추가해줘.
  };

  if (isLoading) return <div>불러오는 중...</div>;
  if (error || !myProps) return <div>에러 발생 또는 데이터 없음</div>;
  console.log("myProps: ", myProps);

  return (
    <div className="w-full flex justify-center overflow-y-auto">
      <div className="w-[960px] flex flex-col gap-[80px]">
        {/* 회원정보 */}

        <div className="flex flex-col gap-4 y-6">
          {/* header */}
          <div className="flex justify-between items-center h-[32px]">
            <p className="headline-small-emphasis">
              {myProps.result.name} 님의 회원정보
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
          <div className="w-[960px] h-px bg-[#CBC4CF] " />
          {/* 내 정보 section */}
          <div className="flex justify-between items-center ">
            {/* 내 사진 */}
            <div className="w-[241px] flex-col items-center justify-center px-8 ">
              <div className="relative w-[160px] h-[160px]">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={myProps.result.profileImageUrl}
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
                <p className="text-right label-large-emphasis">
                  {myProps.result.name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="label-large text-[#49454E]">닉네임</p>
                <p className="text-right label-large-emphasis">
                  {myProps.result.nickname}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="label-large text-[#49454E]">휴대폰 번호</p>
                <p className="text-right label-large-emphasis">
                  {myProps.result.phoneNumber}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="label-large text-[#49454E]">이메일 주소</p>
                <p className="text-right label-large-emphasis">
                  {myProps.result.email}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="label-large text-[#49454E]">대학교</p>
                <p className="text-right label-large-emphasis">
                  {myProps.result.school}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="label-large text-[#49454E]">MBTI</p>
                <p className="text-right label-large-emphasis">
                  {myProps.result.mbti}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="label-large text-[#49454E]">한줄소개</p>
                <p className="text-right label-large-emphasis">
                  {myProps.result.career}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 비밀번호 */}

        <div className="w-[960px] flex flex-col gap-4">
          <div className="flex justify-between h-[32px] items-center">
            <p className="headline-small-emphasis">비밀번호</p>
          </div>
          {/* 구분선 */}
          <div className="w-[960px] h-px bg-[#CBC4CF]" />
          {/* content */}
          <div className="flex w-[960px] justify-between">
            <p className="label-large text-[#49454E]">
              카카오톡 로그인 사용 중 입니다.
              <br />
              비밀번호는 카카오톡에서 변경하실 수 있습니다.
            </p>
            <button
              className="flex justify-center items-center px-3 py-1.5 gap-1 hover:cursor-pointer"
              onClick={() => navigate("password")}
            >
              <ChevronLeft className="w-[20px] h-[20px] text-[#49454E]" />
              <p className="label-large text-[#49454E]">변경 하러 가기</p>
            </button>
          </div>
        </div>

        {/* 회원 탈퇴 */}

        <div className="w-[960px] flex flex-col gap-6">
          <div className="flex justify-between ">
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
            myInfo={myProps.result}
            //일단 오류 없애기 위한 임시 코드 수정필요.
            onCloseAll={() => setEditModalOpen(false)}
          />
        )}

        {addPhotoModal && (
          <AddPhotoModal
            onClose={() => setIsAddPhotoModal(false)}
            onUpload={onUpload} // ← 적용 시 업로드 수행
          />
        )}
      </div>
    </div>
  );
};

export default MyPageInfo;
