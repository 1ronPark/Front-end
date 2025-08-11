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
      const SOCIAL_JOIN_TEMPLATE  = import.meta.env.VITE_API_SOCIAL_JOIN;
      const SOCIAL_LOGIN_TEMPLATE = import.meta.env.VITE_API_SOCIAL_LOGIN;


      if (!code || !provider) {
        navigate("/login?error=social");
        return;
      }
      
      const loginEndpoint = SOCIAL_LOGIN_TEMPLATE
        .replace("{provider}", provider)
        + `?authCode=${encodeURIComponent(code)}`;

      const joinEndpoint = SOCIAL_JOIN_TEMPLATE
        .replace("{provider}", provider)
        + `?authCode=${encodeURIComponent(code)}`;

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