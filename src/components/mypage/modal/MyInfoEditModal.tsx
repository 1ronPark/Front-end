// src/components/mypage/edit/modal/MyInfoEditModal.tsx
import { X } from "lucide-react";
import { useState } from "react";
import type { MyInfoProps } from "../../../types/MyInfoProps";
// (선택) 확인 모달을 계속 쓸 거면 유지
import MyInfoEditCheckModal from "./MyInfoEditCheckModal";

// ✅ useProfile 훅에서 업데이트 훅 import (파일 경로는 프로젝트 구조에 맞춰 변경)
import { usePutProfileEdit } from "../../../hooks/useProfile";

interface EditModalProps {
  onClose: () => void; // 바깥 클릭 등으로 일시 닫기
  onCloseAll: () => void; // 저장 성공 시 전체 닫기
  myInfo: MyInfoProps; // 초기값
}

const MyInfoEditModal = ({ onClose, onCloseAll, myInfo }: EditModalProps) => {
  // 초기값 세팅
  const [nickname, setNickname] = useState(myInfo.nickname);
  const [phoneNumber, setPhoneNumber] = useState(myInfo.phoneNumber);
  const [email, setEmail] = useState(myInfo.email);
  const [school, setSchool] = useState(myInfo.school);
  const [selectedMbti, setSelectedMbti] = useState(myInfo.mbti);
  const [profileTitle, setProfileTitle] = useState(myInfo.profileTitle);

  // (선택) 비밀번호 확인 모달
  const [showCheckModal, setShowCheckModal] = useState(false);

  // ⬇️ 수정 API 훅
  const { mutate, isPending, error } = usePutProfileEdit();

  // (선택) 변경분만 보낼 때 diff 계산 — 전체 필드 전송이면 base만 쓰면 됨
  const payload = {
    nickname,
    phoneNumber,
    email,
    mbti: selectedMbti,
    profileTitle,
  };

  // 저장 클릭
  const handleSave = () => {
    // (필요 시) 간단한 유효성 검사
    if (!nickname.trim()) return alert("닉네임을 입력해주세요.");
    if (!email.trim()) return alert("이메일을 입력해주세요.");

    // ✅ 반드시 mutate({ body: payload }) 형태!
    mutate(
      { body: payload },
      {
        onSuccess: () => {
          onCloseAll();
        },
        onError: () => {
          alert("내 정보 수정에 실패했어요. 잠시 후 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <>
      {/* (선택) 확인 모달을 사용하고 싶을 때 켜기 */}
      {showCheckModal && (
        <MyInfoEditCheckModal
          onClose={() => setShowCheckModal(false)}
          onCloseAll={onCloseAll}
          // 만약 확인 버튼 클릭 시 저장하려면, MyInfoEditCheckModal에 onConfirm props를 하나 추가해 사용:
          // onConfirm={handleSave}
        />
      )}

      <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
        {/* 바깥 클릭 시 닫기 */}
        <div className="absolute inset-0" onClick={onClose}></div>

        {/* 모달 박스 */}
        <div
          className="relative z-10 w-[520px] max-h-[90vh] overflow-y-scroll overflow-x-hidden bg-[#FFF] rounded-xl py-8 flex flex-col gap-12 shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-8">
            <p className="headline-small-emphasis text-[#1D1B20]">
              내 정보 수정
            </p>
            <button
              onClick={onClose}
              className="w-[32px] h-[32px] aspect-square justify-center items-center hover:cursor-pointer"
            >
              <X className="w-[32px] h-[32px] aspect-square" />
            </button>
          </div>

          {/* 폼 */}
          <div className="flex flex-col px-8 gap-6">
            {/* 이름 (고정) */}
            <div className="flex flex-col items-start gap-2">
              <span className="body-medium text-[#49454E]">이름</span>
              <input
                type="text"
                value={myInfo.name}
                disabled
                className="w-full h-[56px] py-1 pl-4 gap-1 rounded-xl bg-[rgba(29,27,32,0.08)] title-medium opacity-[0.38]"
              />
            </div>

            {/* 닉네임 */}
            <div className="h-[84px] flex flex-col items-start gap-2">
              <span className="body-medium text-[#49454E]">닉네임</span>
              <div className="w-full flex items-center gap-4">
                <div className="flex flex-col items-start flex-1">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full h-[56px] py-1 pl-4 gap-1 border border-gray-200 rounded-xl title-medium text-[#49454E]"
                  />
                </div>
                {/* (선택) 중복체크 버튼 — 아직 API 미연결이면 disabled */}
                <button
                  type="button"
                  disabled
                  className="w-[123px] h-[56px] flex justify-center items-center rounded-xl 
                  bg-[#F2ECF4] title-medium text-[#49454E] opacity-50"
                >
                  중복체크
                </button>
              </div>
            </div>

            {/* 전화번호 */}
            <div className="flex flex-col items-start gap-2">
              <span className="body-medium text-[#49454E]">전화 번호</span>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="-도 입력해주세요"
                className="w-full h-[56px] py-1 pl-4 gap-1 border border-gray-200 rounded-xl title-medium text-[#49454E]"
              />
            </div>

            {/* 이메일 */}
            <div className="flex flex-col items-start gap-2">
              <span className="body-medium text-[#49454E]">이메일</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full h-[56px] py-1 pl-4 gap-1 border border-gray-200 rounded-xl title-medium text-[#49454E]"
              />
            </div>

            {/* 대학교 */}
            <div className="flex flex-col items-start gap-2">
              <span className="body-medium text-[#49454E]">대학교</span>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full h-[56px] py-1 pl-4 gap-1 border border-gray-200 rounded-xl title-medium text-[#49454E]"
              />
            </div>

            {/* MBTI */}
            <div className="flex flex-col items-start gap-2">
              <span className="body-medium text-[#49454E]">MBTI</span>
              <div className="w-[439px] grid grid-cols-6 gap-2">
                {[
                  "ESTJ",
                  "ESTP",
                  "ESFJ",
                  "ESFP",
                  "ENTJ",
                  "ENTP",
                  "ENFJ",
                  "ENFP",
                  "ISTJ",
                  "ISTP",
                  "ISFJ",
                  "ISFP",
                  "INTJ",
                  "INTP",
                  "INFJ",
                  "INFP",
                ].map((mbti) => (
                  <button
                    key={mbti}
                    onClick={() => setSelectedMbti(mbti)}
                    type="button"
                    className={`w-[64px] h-[32px] border px-4 py-1.5 flex justify-center items-center gap-2 
                    border-gray-200 rounded-lg border-solid label-large text-[#49454E] hover:cursor-pointer
                    ${
                      selectedMbti === mbti
                        ? "bg-[#E9DEF8] text-[#3F2E63] border-[#6F4DBF]"
                        : "hover:bg-[#E9DEF8] hover:text-[#3F2E63] text-[#1D1B20] border-gray-300"
                    }`}
                  >
                    {mbti}
                  </button>
                ))}
              </div>
            </div>

            {/* 한 줄 소개 */}
            <div className="flex flex-col items-start gap-2">
              <span className="body-medium text-[#49454E]">
                한 줄 소개 (최대 32자)
              </span>
              <input
                type="text"
                value={profileTitle}
                onChange={(e) => setProfileTitle(e.target.value)}
                className="w-full h-[56px] py-1 pl-4 gap-1 border border-gray-200 rounded-xl title-medium text-[#49454E]"
                placeholder="자기소개를 입력해주세요"
                maxLength={32}
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <p className="text-red-500 text-sm">
                수정 중 오류가 발생했습니다.
              </p>
            )}
          </div>

          {/* 저장 버튼 */}
          <div className="flex w-[520px] justify-end items-center px-8 gap-3">
            {/* (선택) 확인 모달 거치고 저장하려면 아래 버튼 onClick을 setShowCheckModal(true)로 바꾸고,
                확인 모달 내부에서 onConfirm={handleSave}를 호출하도록 구현하세요. */}
            <button
              onClick={handleSave}
              disabled={isPending}
              className={`flex w-[123px] h-[56px] justify-center items-center rounded-xl 
              ${
                isPending ? "bg-gray-300" : "bg-[#68548E] hover:opacity-90"
              } text-white`}
            >
              {isPending ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInfoEditModal;
