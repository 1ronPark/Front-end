import { AuthHeader } from "../../components/auth/AuthHeader";
import { NavLink } from "react-router-dom";

export const PasswordReset = () => {
  return (
    <div className="min-h-screen label-large flex flex-col items-center pt-4 overflow-hidden bg-[radial-gradient(ellipse_116.75%_116.75%_at_50%_-16.75%,rgba(255,217,225,0.4)_0%,rgba(255,255,255,0.4)_100%),radial-gradient(ellipse_65.2%_65.2%_at_50%_0%,#EBDDFF_0%,white_100%)] ">
      {/* 상단 헤더 */}
      <AuthHeader />

      {/* 로그인 카드 박스 */}
      <div className="w-96 px-8 py-12 mt-20 bg-white rounded-3xl shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] inline-flex flex-col justify-center items-center">
          <div className="flex-1 inline-flex flex-col justify-center items-center gap-2">
            <div className=" self-stretch text-center justify-center title-large text-3xl ">
              비밀번호를 초기화
            </div>
            <div className="text-center justify-center title-medium text-[#49454E]">
              [이메일주소]의 비밀번호를 초기화하려면 "계속"을 클릭하세요.
            </div>
        </div>

        {/* 계속 버튼 다음 작업 아직 미구현 */}
        <button className="w-full h-12 bg-[#68548E] text-white rounded-full font-medium hover:bg-[#59407e] transition cursor-pointer">
          계속
        </button>

        {/* 로그인 링크 */}
        <NavLink
          to="/login"
          className="text-[#68548E] underline cursor-pointer"
        >
          로그인으로 돌아가기
        </NavLink>

        {/* 구분선 */}
        <div className="relative w-full flex items-center">
          <div className="flex-grow border-t border-[#CBC4CF]" />
          <span className="px-2 text-sm text-[#1D1B20] bg-white absolute left-1/2 transform -translate-x-1/2 -top-2">
            또는
          </span>
        </div>

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
