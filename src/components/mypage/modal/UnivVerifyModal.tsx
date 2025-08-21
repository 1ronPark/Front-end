// UnivVerifyModal.tsx
import { useState } from "react";
import { X } from "lucide-react";
import UnivDropdown from "../../common/dropdowns/UnivDropdown";
import type { School } from "../../../hooks/useUniv";

type Props = { onClose: () => void };

const SchoolVerifyModal = ({ onClose }: Props) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [school, setSchool] = useState<School | null>(null);

  const canNext = email.trim() !== "" && !!school;

  return (
    <div className="fixed inset-0 z-60 bg-black/20 flex items-center justify-center">
      <div className="relative w-[480px] py-8 bg-white rounded-xl shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-8">
          <p className="headline-small-emphasis text-[#1C1B21]">대학교 인증</p>
          <button onClick={onClose} className="w-6 h-6 hover:cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 1 && (
          <div className="flex flex-col px-8">
            {/* 학교 이메일 */}
            <span className="body-medium mt-[64px] text-[#47464F]">
              학교 이메일
            </span>
            <input
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 border-[#C8C5D0] mt-2 px-4 py-3 rounded-xl"
            />

            {/* 대학교 드롭다운 */}
            <span className="body-medium mt-6 text-[#47464F]">대학교</span>
            <div className="mt-2">
              <UnivDropdown
                value={school}
                onSelect={setSchool}
                placeholder="대학교 선택"
                pageSize={10}
              />
            </div>

            {/* 액션 */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!canNext}
                className={`w-[121px] rounded-xl title-medium py-4 px-6 mt-[64px] ${
                  canNext
                    ? "bg-[#545891] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                다음
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col px-8">
            <span className="body-medium mt-[64px] text-[#47464F]">
              학교 이메일
            </span>
            <div className="border px-4 py-3 mt-2 rounded-xl title-medium text-[#47464F]">
              {email}
            </div>

            <span className="mt-4 body-medium text-[#47464F]">
              선택한 대학교
            </span>
            <div className="border px-4 py-3 mt-2 rounded-xl text-[#47464F]">
              {school?.schoolName ?? "-"}
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

export default SchoolVerifyModal;
