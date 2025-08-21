// UnivVerifyModal.tsx
import { useState } from "react";
import { X } from "lucide-react";
import UnivDropdown from "../../common/dropdowns/UnivDropdown";
import type { School } from "../../../hooks/useUniv";
import { usePostUnivSendMail } from "../../../hooks/useUniv"; // 경로 맞춰주세요

type Props = { onClose: () => void };

const SchoolVerifyModal = ({ onClose }: Props) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [school, setSchool] = useState<School>();

  // 메일 발송 훅
  const { mutate: sendMail, isPending } = usePostUnivSendMail();
  const base = import.meta.env.VITE_API_POST_UNIV_SENDMAIL_ENDPOINT;

  const canNext = email.trim() !== "" && !!school;

  // ✅ 드롭다운에서 고른 값 사용
  const payload = { schoolId: school?.schoolId, email: email.trim() };
  console.log(payload);

  const handleNext = () => {
    if (!canNext || !payload) return;

    const url = `${base}?schoolId=${school.schoolId}&email=${encodeURIComponent(
      email.trim()
    )}`;

    // (선택) 이메일 형식 간단 체크
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      alert("올바른 이메일 형식이 아니에요.");
      return;
    }

    sendMail(
      { endpoint: url }, // { body: ... } 없음!
      {
        onSuccess: (res) => {
          if (res.isSuccess) setStep(2); // 성공하면 다음 스텝으로
        },
        onError: () => {
          // 훅 onError에서도 안내하지만 여기서 한 번 더
          alert("메일 발송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        },
      }
    );
  };

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
            <div className="mt-2">
              <UnivDropdown
                value={school}
                onSelect={setSchool} // ← School 전체(state에 저장)
                placeholder="대학교 선택"
                pageSize={10}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleNext}
                disabled={!canNext || isPending}
                className={`w-[121px] rounded-xl title-medium py-4 px-6 mt-[64px] ${
                  !canNext || isPending
                    ? "bg-gray-200 text-gray-400"
                    : "bg-[#545891] text-white"
                }`}
              >
                {isPending ? "메일 발송 중…" : "다음"}
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
