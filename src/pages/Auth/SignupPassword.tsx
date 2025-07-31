import { AuthHeader } from "../../components/auth/AuthHeader";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/usejoinStore";
import { useSignUp } from '../../hooks/useJoin';

export const SignupPassword = () => {
  const navigate = useNavigate();

  const {
  email,
  name,
  nickname,
  password,
  setName,
  setNickname,
  setPassword,
  } = useAuthStore();

  const { mutate: signUp } = useSignUp();

  const handleSubmit = () => {
    signUp(
      {
        name,
        nickname,
        email, // Zustand에서 가져온 이메일
        password,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
  };


  return (
    <div className="min-h-screen label-large flex flex-col justify-center items-center pt-4 overflow-hidden bg-[radial-gradient(ellipse_116.75%_116.75%_at_50%_-16.75%,rgba(255,217,225,0.4)_0%,rgba(255,255,255,0.4)_100%),radial-gradient(ellipse_65.2%_65.2%_at_50%_0%,#EBDDFF_0%,white_100%)] ">
      {/* 상단 헤더 */}
      <AuthHeader />

      {/* 로그인 카드 박스 */}
      <div className="w-[400px] px-8 py-12 bg-white rounded-3xl shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] inline-flex flex-col justify-center items-center gap-6">
        <div className="text-center justify-center title-large text-zinc-900 text-3xl ">
          계정 만들기
          <div className="mt-2 text-center justify-center title-medium text-[#49454E]">
            비밀번호를 설정해 계속하세요.
          </div>
        </div>

        <form className="w-full" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {/* 이메일 입력 */}
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            disabled
            className="w-full h-[48px] body-large px-4 rounded-full border border-[#1D1B20]/10 bg-gray-100 text-gray-500"
          />
          {/* 이름 입력 */}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름"
            value={name}
            onChange={(e) => {
              console.log("🔧 이름 입력값:", e.target.value);
              setName(e.target.value);
}}
            className="mt-4 w-full h-[48px] body-large px-4 rounded-full border border-[#1D1B20]/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* 닉네임 입력 */}
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-4 w-full h-[48px] body-large px-4 rounded-full border border-[#1D1B20]/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* 비밀번호 입력 */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 w-full h-[48px] body-large px-4 rounded-full border border-[#1D1B20]/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* 계속 버튼 */}
          <button
            type="submit"
            className="mt-8 w-full h-12 bg-[#5A5891] text-white rounded-full font-medium hover:bg-[#62609c] transition cursor-pointer"
          >
            계속
          </button>
        </form>

        {/* 로그인 링크 */}
        <div className="text-sm title-small text-[#1D1B20] flex items-center gap-2">
          이미 계정이 있으신가요?
          <NavLink
            to="/login"
            className="text-[#5A5891] underline cursor-pointer"
          >
            로그인
          </NavLink>
        </div>

        {/* 여백 맞춤용 */}
        <div></div>
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
