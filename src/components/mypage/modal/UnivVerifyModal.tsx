import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

const schoolVerifyModal = ({ onClose }: Props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="fixed inset-0 z-60 bg-black/20 flex items-center justify-center">
      <div className="relative w-[480px] py-8 bg-white rounded-xl shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-8">
          <p className="headline-small-emphasis text-[#1C1B21]">대학교 인증</p>
          <button
            onClick={onClose}
            className="w-6 h-6 aspect-square justify-center items-center hover:cursor-pointer"
          >
            <X className="w-6 h-6 aspect-square" />
          </button>
        </div>

        {step === 1 && (
          <div className="flex flex-col px-8">
            <span className="body-medium mt-[64px] text-[#47464F]">
              학교 이메일
            </span>
            <input
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 border-[#C8C5D0] mt-2 px-4 py-3 rounded-xl"
            />
            <span className="body-medium mt-6 text-[#47464F]">대학교</span>
            <input
              placeholder="대학교"
              className="border-1 border-[#C8C5D0] mt-2 px-4 py-3 rounded-xl"
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setStep(2)}
                className="w-[121px] bg-[#545891] justify-end text-white rounded-xl title-medium py-4 px-6 mt-[64px]"
              >
                다음
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col px-8">
            <span className="body-medium mt-[64px] text-[#47464F]">대학교</span>
            <input
              placeholder="학교명을 입력해 보세요"
              className="bg-[#E5E1E9] mt-2 py-3 px-4 rounded-xl"
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setStep(3)}
                className="w-[121px] bg-[#545891] text-white rounded-xl title-medium py-4 px-6 mt-[64px]"
              >
                적용
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col px-8">
            <span className="body-medium mt-[64px] text-[#47464F]">
              학교 이메일
            </span>
            <div
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
              className="border px-4 py-3 mt-2 rounded-xl title-medium text-[#47464F]"
            >
              harrysjuns@gachon.ac.kr
            </div>
            <span className="mt-6 body-medium text-[#47464F]">
              인증번호를 입력해 주세요.
            </span>
            <input
              placeholder="인증번호"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border-1 border-[#C8C5D0] mt-2 px-4 py-3 rounded-xl"
            />
            <div className="body-small text-red-500 mt-2 ">
              인증에 실패하였습니다.
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={onClose}
                className="w-[121px] py-4 px-6 border border-[#C8C5D0] title-medium rounded-xl mt-[64px]"
              >
                취소
              </button>
              <button
                onClick={() => alert("인증이 완료 되었습니다.")}
                className="w-[121px] bg-[#545891] text-white rounded-xl title-medium py-4 px-6 mt-[64px]"
              >
                저장
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default schoolVerifyModal;
