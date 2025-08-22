import { AuthHeader } from "../../components/auth/AuthHeader";
import { NavLink } from "react-router-dom";
import { useLoginStore } from "../../store/useLoginStore";
import { useState } from "react";
import { usePasswordReset } from "../../hooks/usePasswordReset"; // 훅 import 추가

export const PasswordReset = () => {
  const { email } = useLoginStore();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const { mutate } = usePasswordReset();

  const handleClick = () => {
    setStatus("loading");
      mutate(
      {
        endpoint: `${import.meta.env.VITE_API_PASSWORD_RESET}?email=${encodeURIComponent(email)}`,
      },
      {
        onSuccess: () => setStatus("success"),
        onError: () => setStatus("idle"),
      }
    )
  };

  const getButtonText = () => {
    if (status === "loading") return "인증 대기중";
    if (status === "success") return "초기화 완료" ;
    return "계속";
  };

  const getButtonStyle = () => {
    if (status === "loading") return "bg-[#E6E1E5] text-[#49454F] cursor-default";
    if (status === "success") return "bg-[#E8DAFF] text-[#21005D] cursor-default";
    return "bg-[#5A5891] text-white hover:bg-[#62609c] cursor-pointer";
  };

  return (
    <div className="min-h-screen label-large flex flex-col justify-center items-center pt-4 overflow-hidden bg-[radial-gradient(ellipse_116.75%_116.75%_at_50%_-16.75%,rgba(255,217,225,0.4)_0%,rgba(255,255,255,0.4)_100%),radial-gradient(ellipse_65.2%_65.2%_at_50%_0%,#EBDDFF_0%,white_100%)] ">
      {/* 상단 헤더 */}
      <AuthHeader />

      {/* 로그인 카드 박스 */}
      <div className="w-[400px] px-8 py-12 bg-white rounded-3xl shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] inline-flex flex-col justify-center items-center gap-6">
        <div className="text-center justify-center title-large text-zinc-900 text-3xl ">
          비밀번호를 초기화
          <div className="mt-2 text-center justify-center title-medium text-[#49454E]">
            <span className="text-xl font-bold ">{email}</span>의 비밀번호를 초기화하려면 "계속"을 클릭하세요.
          </div>
        </div>

        {/* 버튼 상태에 따라 스타일 변경 */}
        <button
          onClick={handleClick}
          className={`w-full h-12 rounded-full font-medium transition ${getButtonStyle()}`}
          disabled={status !== "idle"}
        >
          {getButtonText()}
        </button>

        {/* 로그인 링크 */}
        <NavLink
          to="/login"
          className="text-[#5A5891] underline cursor-pointer"
        >
          로그인으로 돌아가기
        </NavLink>

        <div></div>

        {/* 약관 / 개인정보 */}
        <div className="flex label-large items-center gap-3 text-sm mt-2">
          <span className="text-[#5A5891] underline cursor-pointer">
            이용약관
          </span>
          <span className="text-[#1D1B20]">|</span>
          <span className="text-[#5A5891] underline cursor-pointer">
            개인정보 보호 정책
          </span>
        </div>
      </div>
    </div>
  );
};