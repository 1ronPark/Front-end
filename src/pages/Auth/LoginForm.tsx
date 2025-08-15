import { useLoginStore } from "../../store/useLoginStore";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { email, setEmail, } = useLoginStore();
  const handleContinue = () => {
    // 여기에 이메일 입력 및 유효성 검사 로직을 추가할 수 있습니다!
    navigate("/loginPassword"); // 비밀번호 입력 페이지로 이동
  };

  // 상단 import 라인 아래 쪽 어딘가에 유틸 함수 추가
const makeState = () => Math.random().toString(36).slice(2);

// 현재 도메인을 동적으로 가져오기 (배포 환경 대응)
  const getCurrentDomain = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return import.meta.env.VITE_FRONT_ORIGIN; // fallback for SSR
  };

// 구글/카카오 인가 URL 생성기
const googleAuthorizeUrl = (clientId: string) => {
  const FRONT = getCurrentDomain();
  const p = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${FRONT}${import.meta.env.VITE_SOCIAL_CALLBACK}`,
    response_type: "code",
    scope: "openid email profile",
    state: "GOOGLE-" + makeState(),
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${p.toString()}`;
};

const kakaoAuthorizeUrl = (restKey: string) => {
  const FRONT = getCurrentDomain();
  const p = new URLSearchParams({
    client_id: restKey,
    redirect_uri: `${FRONT}${import.meta.env.VITE_SOCIAL_CALLBACK}`,
    response_type: "code",
    state: "KAKAO-" + makeState(),
    scope: "account_email profile_nickname profile_image", // ✅ 필요한 항목 모두
    prompt: "consent", // ✅ 재동의 창 강제 표시
  });
  return `https://kauth.kakao.com/oauth/authorize?${p.toString()}`;
};

  return (
    <div className="min-h-screen label-large flex flex-col justify-center items-center pt-4 overflow-hidden bg-[radial-gradient(ellipse_116.75%_116.75%_at_50%_-16.75%,rgba(255,217,225,0.4)_0%,rgba(255,255,255,0.4)_100%),radial-gradient(ellipse_65.2%_65.2%_at_50%_0%,#EBDDFF_0%,white_100%)] ">
      {/* 상단 헤더 */}
      <AuthHeader />

      {/* 로그인 카드 박스 */}

      <div className="w-[400px] px-8 py-12 bg-white rounded-3xl shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] inline-flex flex-col justify-center items-center gap-6">
        <div className="text-center justify-center title-large text-zinc-900 text-3xl ">
          로그인
        </div>

        {/* 이메일 입력 */}
        <div className="w-full">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            className="w-full h-[48px] body-large px-4 rounded-full border border-[#1D1B20]/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* 계속 버튼 */}
        <button
          onClick={handleContinue}
          className="w-full h-12 bg-[#5A5891] text-white rounded-full font-medium hover:bg-[#62609c] transition cursor-pointer"
        >
          계속
        </button>

        {/* 회원가입 링크 */}
        <div className="text-sm title-small text-[#1D1B20] flex items-center gap-2">
          아직 라이텁의 회원이 아니신가요?
          <NavLink
            to="/signup"
            className="text-[#5A5891] underline cursor-pointer"
          >
            회원가입
          </NavLink>
        </div>

        {/* 구분선 */}
        <div className="relative w-full flex items-center">
          <div className="flex-grow border-t border-[#CBC4CF]" />
          <span className="px-2 text-sm text-[#1D1B20] bg-white absolute left-1/2 transform -translate-x-1/2 -top-2">
            또는
          </span>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => {
              const url = googleAuthorizeUrl(import.meta.env.VITE_GOOGLE_CLIENT_ID);
              window.location.href = url;
            }}
            className="w-full h-12 border border-[#CBC4CF] rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-[#49454E]">
              Google 로 계속하기
            </span>
          </button>

          <button
            onClick={() => {
              const url = kakaoAuthorizeUrl(import.meta.env.VITE_KAKAO_REST_KEY);
              window.location.href = url;
            }}
            className="w-full h-12 border border-[#CBC4CF] rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/303176/kakaotalk-logo.svg"
              alt="KakaoTalk"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-[#49454E]">
              KakaoTalk 로 계속하기
            </span>
          </button>
        </div>

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
