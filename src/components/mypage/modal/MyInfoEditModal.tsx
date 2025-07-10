import { X } from "lucide-react";
import { useState } from "react";
import type { MyInfoProps } from '../../../types/MyInfoProps';

interface EditModalProps {
  onClose: () => void;
  //내 정보 전달 Props
  myInfo: MyInfoProps;
}

const MyInfoEditModal = ({ onClose, myInfo }: EditModalProps) => {
  //MyProfile 페이지에서 전달받은 초기값 설정
  const [nickname, setNickname] = useState(myInfo.nickname);
  const [phone, setPhone] = useState(myInfo.phone);
  const [email, setEmail] = useState(myInfo.email);
  const [univ, setUniv] = useState(myInfo.univ);
  const [selectedMbti, setSelectedMbti] = useState(myInfo.mbti);
  const [intro, setIntro] = useState(myInfo.intro);

  return (
    <div className="fixed inset-0 z-50 bg-black/10  flex items-center justify-center">
      {/* 바깥 클릭 시 닫기 */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 모달 박스 */}
      <div
        className="relative z-10 w-[520px] max-h-[90vh] overflow-y-scroll overflow-x-hidden bg-[#FFF] rounded-xl py-8 flex flex-col gap-12 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-8">
          <p className="headline-small-emphasis text-[#1D1B20]">내 정보 수정</p>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] aspect-square justify-center items-center hover:cursor-pointer"
          >
            <X className="w-[32px] h-[32px] aspect-square" />
          </button>
        </div>

        {/* 이름 닉네임 등등 수정 박스 */}
        <div className="flex flex-col px-8 gap-6">
          {/* 이름 */}
          <div className="flex flex-col items-start gap-2">
            <span className="body-medium text-[#49454E]">이름</span>
            <input
              type="text"
              value={myInfo.name}
              disabled={true}
              className="w-full h-[56px] py-1 pl-4 gap-1 rounded-xl  bg-[rgba(29,27,32,0.08)] title-medium opacity-[0.38]"
            />
          </div>

          {/* 닉네임 + 중복체크 */}
          <div className="h-[84px] flex flex-col items-start gap-2">
            <span className="body-medium text-[#49454E]">닉네임</span>
            <div className="w-full flex items-center gap-4">
              <div className="flex flex-col items-start flex-1 ">
                <input
                  type="text"
                  value={nickname}
                  // placeholder={myInfo.nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full h-[56px] py-1 pl-4 gap-1 border border-gray-200 rounded-xl title-medium text-[#49454E]"
                />
              </div>
              <button
                onClick={onClose} //일단 임의로 누르면 창 닫게 설정
                className="w-[123px] h-[56px] flex justify-center items-center rounded-xl 
                bg-[#F2ECF4] hover:cursor-pointer 
                title-medium text-[#49454E]"
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="-도 입력해주세요"
              className="w-full h-[56px] py-1 pl-4 gap-1  border border-gray-200 rounded-xl title-medium text-[#49454E]"
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
              className="w-full h-[56px] py-1 pl-4 gap-1  border border-gray-200 rounded-xl title-medium text-[#49454E]"
            />
          </div>

          {/* 대학교 */}
          <div className="flex flex-col items-start gap-2">
            <span className="body-medium text-[#49454E]">대학교</span>
            <input
              type="text"
              value={univ}
              onChange={(e) => setUniv(e.target.value)}
              className="w-full h-[56px] py-1 pl-4 gap-1  border border-gray-200 rounded-xl title-medium text-[#49454E]"
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
                    }
                    }
                    `}
                >
                  {mbti}
                </button>
              ))}
            </div>
          </div>

          {/* 한줄소개 */}
          <div className="flex flex-col items-start gap-2">
            <span className="body-medium text-[#49454E]">
              한 줄 소개 (최대 32자)
            </span>
            <input
              type="text"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="w-full h-[56px] py-1 pl-4 gap-1  border border-gray-200 rounded-xl title-medium text-[#49454E]"
              placeholder="자기소개를 입력해주세요"
              maxLength={32}
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex w-[520px] justify-end items-center px-8 gap-3">
          <button
            onClick={onClose} // 일단 임의로 누르면 모달 창 닫게 설정
            className="flex w-[123px] h-[56px] justify-center items-center rounded-xl bg-[#68548E] hover:cursor-pointer"
          >
            <p className="flex justify-center items-center px-6 py-4 gap-2 text-white">
              저장
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoEditModal;
