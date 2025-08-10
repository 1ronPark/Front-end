// src/pages/Auth/SocialCallback.tsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useSocialLogin, useSocialJoin } from "../../queries/auth";
import { AxiosError } from "axios";

const SocialCallback = () => {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  const loginMutation = useSocialLogin();
  const joinMutation  = useSocialJoin();

  useEffect(() => {
    const run = async () => {
      const code  = sp.get("code");
      const state = sp.get("state"); // "GOOGLE-xxxx" | "KAKAO-xxxx"
      const provider = state?.split("-")[0]?.toUpperCase() as "GOOGLE" | "KAKAO";

      if (!code || !provider) {
        navigate("/login?error=social");
        return;
      }

      // endpoint 오버라이드 + 쿼리스트링에 authCode 붙이기
      const loginEndpoint = `/api/v1/members/login/${provider}?authCode=${encodeURIComponent(code)}`;
      const joinEndpoint  = `/api/v1/members/join/${provider}?authCode=${encodeURIComponent(code)}`;

      try {
        const loginRes = await loginMutation.mutateAsync({ endpoint: loginEndpoint });
        const { accessToken } = loginRes.result;
        setToken(accessToken);
        navigate("/");
      } catch (error) {
        const err = error as AxiosError<{ code?: string }>;
        const codeStr = err.response?.data?.code;
        if (codeStr === "MEMBER_NOT_FOUND" || codeStr === "NEED_SIGNUP") {
          try {
            const joinRes = await joinMutation.mutateAsync({ endpoint: joinEndpoint });
            const { accessToken } = joinRes.result;
            setToken(accessToken);
            navigate("/"); // 또는 온보딩 경로
            return;
          } catch {
            navigate("/login?error=social");
          }
        } else {
          navigate("/login?error=social");
        }
      }
    };
    run();
  }, [sp, navigate, setToken, loginMutation, joinMutation]);

  return <div>소셜 로그인 처리 중...</div>;
};

export default SocialCallback;