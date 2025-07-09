import { AuthHeader } from "../../components/auth/AuthHeader";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const LoginPassword = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    // 여기에 비밀번호 유효성검사 로직 등을 추가할 수 있습니다!
    navigate("/"); // 로그인 완료 후 우선 홈페이지로 이동
  };

  return (
    <div className="min-h-screen label-large flex flex-col items-center pt-4 overflow-hidden bg-[radial-gradient(ellipse_116.75%_116.75%_at_50%_-16.75%,rgba(255,217,225,0.4)_0%,rgba(255,255,255,0.4)_100%),radial-gradient(ellipse_65.2%_65.2%_at_50%_0%,#EBDDFF_0%,white_100%)] ">
      {/* 상단 헤더 */}
      <AuthHeader />

      <div className="w-[400px] px-8 py-12 mt-20 bg-white rounded-3xl shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] inline-flex flex-col justify-center items-center">
        <div className="text-center justify-center title-large text-zinc-900 text-3xl ">
          비밀번호를 입력하세요
        </div>

        {/* 이메일 입력 */}
        <div className="w-full">
          <input
            type="email"
            id="email"
            placeholder="이메일 주소"
            className="w-full h-[48px] body-large px-4 mt-6 rounded-full border border-[#1D1B20]/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="w-full">
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            className="w-full h-[48px] body-large px-4 mt-4 rounded-full border border-[#1D1B20]/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <NavLink
            to="/passwordReset"
            className="pl-4 mt-2 flex text-sm text-[#68548E] underline cursor-pointer"
          >
            비밀번호를 잊으셨나요?
          </NavLink>
        </div>

        {/* 계속 버튼 */}
        <button
          onClick={handleContinue}
          className="w-full h-12 mt-8 bg-[#68548E] text-white rounded-full font-medium hover:bg-[#59407e] transition cursor-pointer"
        >
          계속
        </button>

        {/* 회원가입 링크 */}
        <div className="text-sm title-small mt-6 text-[#1D1B20] flex items-center">
          아직 라이텁의 회원이 아니신가요?
          <NavLink
            to="/signup"
            className="text-[#68548E] underline cursor-pointer"
          >
            회원가입
          </NavLink>
        </div>

        {/* 구분선 */}
        <div className="relative w-full flex items-center">
          <div className="flex-grow border-t mt-6 border-[#CBC4CF]" />
          <span className="px-2 text-sm mt-6 text-[#1D1B20] bg-white absolute left-1/2 transform -translate-x-1/2 -top-2">
            또는
          </span>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="w-full flex flex-col mt-6 gap-4">
          <button className="w-full h-12 border border-[#CBC4CF] rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 cursor-pointer">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-[#49454E]">
              Google 로 계속하기
            </span>
          </button>
          <button className="w-full h-12 border border-[#CBC4CF] rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 cursor-pointer">
            <img
              src="https://www.svgrepo.com/show/303176/kakaotalk-logo.svg"
              alt="KakaoTalk"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-[#49454E]">
              Kakaotalk 로 계속하기
            </span>
          </button>
        </div>

        {/* 약관 / 개인정보 */}
        <div className="flex label-large mt-6 items-center gap-3 text-sm">
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
