import { useState } from "react";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { useNavigate } from "react-router-dom";

const PasswordChangeForm = () => {
  const navigate = useNavigate();
  const { mutate } = useChangePassword();

  const [step, setStep] = useState<1 | 2>(1);
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // 간단한 유효성 검사만 하고 바로 다음 단계
    if (prevPassword.length < 4) {
      alert("기존 비밀번호를 정확히 입력해주세요.");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert("새 비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    mutate(
      { prevPassword, newPassword },
      {
        onSuccess: () => {
          alert("비밀번호가 성공적으로 변경되었습니다.");
          navigate("/myprofile");
        },
        onError: (error) => {
          alert("변경 실패: " + (error as Error).message);
        },
      }
    );
  };

  return (
    <div className="flex-1 overflow-y-auto mx-[100px]">
      <div className="flex justify-center items-center mt-[100px]">
        <form
          onSubmit={step === 1 ? handleStep1Submit : handleStep2Submit}
          className="w-[1040px] flex flex-col justify-center items-center gap-4 px-8 py-10"
        >
          <h2 className="text-xl font-bold mb-4">비밀번호 변경</h2>

          {step === 1 && (
            <>
              <input
                type="password"
                placeholder="기존 비밀번호"
                value={prevPassword}
                onChange={(e) => setPrevPassword(e.target.value)}
                className="w-[320px] border p-2 rounded"
                required
              />
              <button
                type="submit"
                className="cursor-pointer bg-[#68548E] title-medium text-[#FFF] py-4 px-8 rounded-lg transition-all hover:scale-105 hover:bg-[#59407e]"
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-[320px] border p-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-[320px] border p-2 rounded"
                required
              />
              <button
                type="submit"
                className="cursor-pointer bg-[#68548E] title-medium text-[#FFF] py-4 px-8 rounded-lg transition-all hover:scale-105 hover:bg-[#59407e]"
              >
                변경하기
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-[#68548E] underline mt-2"
              >
                이전 단계로
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
