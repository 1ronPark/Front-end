// src/pages/Auth/SocialCallback.tsx
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useSocialCallback } from "../../queries/auth";
import { AxiosError } from "axios";
import LoadingPage from "../LoadingPage";

const SocialCallback = () => {
  // const [sp] = useSearchParams(); // removed unused
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  const callbackMutation = useSocialCallback();
  
  const processingRef = useRef(false);

  // 고정된 URL 파라미터 계산 (초기 1회)
  const { code, provider } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("code") || "";
    const s = params.get("state") || ""; // "GOOGLE-xxxx" | "KAKAO-xxxx"
    const p = (s.split("-")[0] || "").toUpperCase() as "GOOGLE" | "KAKAO";
    return { code: c, provider: p };
  }, []);

  useEffect(() => {
    // 중복 실행 가드 (StrictMode / 재렌더 방지)
    if (processingRef.current) return;
    processingRef.current = true;

    const run = async () => {
      const SOCIAL_CALLBACK_TEMPLATE = import.meta.env.VITE_API_SOCIAL_CALLBACK;
      const redirectUrl = `${window.location.origin}${window.location.pathname}`;

      if (!code || (provider !== "GOOGLE" && provider !== "KAKAO")) {
        navigate("/login?error=social");
        return;
      }

      const endpoint =
        SOCIAL_CALLBACK_TEMPLATE.replace("{provider}", provider) +
        `?authCode=${encodeURIComponent(code)}&redirectUrl=${encodeURIComponent(redirectUrl)}`;

      try {
        const res = await callbackMutation.mutateAsync({ endpoint });
        const { accessToken } = res.result;
        setToken(accessToken);
        alert("LightUp에 오신 것을 환영합니다!");
        alert("회원정보를 수정하셔야 LightUp을 사용하실 수 있어요.");
        navigate("/myprofile?tab=info", { replace: true });
      } catch (error) {
      const err = error as AxiosError<{ code?: string; message?: string; result?: string }>;
      const status = err.response?.status;
      const backendCode = err.response?.data?.code;
      const backendMessage = err.response?.data?.message;

      // 디버깅 로그
      console.error("[SOCIAL_CALLBACK_FAIL]", {
        status,
        code: backendCode,
        message: backendMessage,
        result: err.response?.data?.result,
        endpoint,
      });

      // 특정 에러코드 처리
      if (backendCode === "CREDENTIAL4001") {
        alert(backendMessage || "이미 가입된 이메일입니다.");
      }

      navigate(`/login?error=${backendCode || status || "social"}`, { replace: true });
    }
  }
    void run();
    
  // 의존성 비움: code/provider는 useMemo로 고정, 뮤테이션 인스턴스 변경에도 재실행 방지
  }, ) ;

  return <LoadingPage />;
};

export default SocialCallback;