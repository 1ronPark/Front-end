import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

const UnivVerifyModal = ({ onClose }: Props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="relative w-[520px] py-8 bg-white rounded-xl shadow-xl gap-12">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-8">
          <p className="headline-small-emphasis text-[#1D1B20]">대학교 인증</p>
          <button
            onClick={onClose}
            className="w-6 h-6 aspect-square justify-center items-center hover:cursor-pointer"
          >
            <X className="w-6 h-6 aspect-square" />
          </button>
        </div>

        {step === 1 && (
          <div>
            <div className="flex flex-col px-4 gap-6">
              <input
                placeholder="학교 이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <input
                placeholder="대학교"
                className="border px-4 py-2 rounded-md"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="bg-[#5A5891] text-white title-medium rounded-md py-2"
            >
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="text-center text-2xl text-white bg-red-500 py-2 rounded-md">
              1774
            </div>
            <input
              placeholder="학번(학번 입력 시 자동 인증)"
              className="border px-4 py-2 rounded-md"
            />
            <button
              onClick={() => setStep(3)}
              className="bg-purple-600 text-white rounded-md py-2"
            >
              적용
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <input
              placeholder="인증번호"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border px-4 py-2 rounded-md"
            />
            <div className="text-sm text-red-500">인증에 실패하였습니다.</div>
            <div className="flex gap-2 justify-end">
              <button onClick={onClose} className="px-4 py-2 border rounded-md">
                취소
              </button>
              <button
                onClick={() => alert("제출!")}
                className="bg-purple-600 text-white rounded-md px-4 py-2"
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

export default UnivVerifyModal;
