import { AuthHeader } from "../../components/auth/AuthHeader";
import { NavLink } from "react-router-dom";

export const PasswordReset = () => {
  return (
    <div className="min-h-screen label-large flex flex-col justify-center items-center pt-4 overflow-hidden bg-[radial-gradient(ellipse_116.75%_116.75%_at_50%_-16.75%,rgba(255,217,225,0.4)_0%,rgba(255,255,255,0.4)_100%),radial-gradient(ellipse_65.2%_65.2%_at_50%_0%,#EBDDFF_0%,white_100%)] ">
      {/* 상단 헤더 */}
      <AuthHeader />

      {/* 로그인 카드 박스 */}
      <div className="w-[400px] px-8 py-12 bg-white rounded-3xl shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] inline-flex flex-col justify-center items-center gap-6">
        <div className="text-center justify-center title-large text-zinc-900 text-3xl ">
          비밀번호를 초기화
          <div className="mt-2 text-center justify-center title-medium text-[#49454E]">
            [이메일주소]의 비밀번호를 초기화하려면 "계속"을 클릭하세요.
          </div>
        </div>

        {/* 계속 버튼 링크 설정 필요 */}
        <NavLink to="/" className={"w-full"}>
          <button className="w-full h-12 bg-[#68548E] text-white rounded-full font-medium hover:bg-[#59407e] transition cursor-pointer">
            계속
          </button>
        </NavLink>

        {/* 로그인 링크 */}
        <NavLink
          to="/login"
          className="text-[#68548E] underline cursor-pointer"
        >
          로그인으로 돌아가기
        </NavLink>

        {/* 여백 맞춤용 */}
        <div></div>

        {/* 약관 / 개인정보 */}
        <div className="flex label-large items-center gap-3 text-sm mt-2">
          <span className="text-[#68548E] underline cursor-pointer">
            이용약관
          </span>
          <span className="text-[#1D1B20]">|</span>
          <span className="text-[#68548E] underline cursor-pointer">
            개인정보 보호 정책
          </span>
        </div>
      </div>
    </div>
  );
};
