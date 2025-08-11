// src/pages/Auth/SocialCallback.tsx
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useSocialCallback } from "../../queries/auth";
import { AxiosError } from "axios";

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

      if (!code || (provider !== "GOOGLE" && provider !== "KAKAO")) {
        navigate("/login?error=social");
        return;
      }

      const endpoint = SOCIAL_CALLBACK_TEMPLATE.replace("{provider}", provider) + `?authCode=${encodeURIComponent(code)}`;

      try {
        const res = await callbackMutation.mutateAsync({ endpoint });
        const { accessToken } = res.result;
        setToken(accessToken);
        navigate("/", { replace: true });
      } catch (error) {
        const err = error as AxiosError<{ code?: string; message?: string; result?: string }>; // 타입 안전화
        const status = err.response?.status;
        const backendCode = err.response?.data?.code;
        // 디버깅용 로그 (콘솔에서 백엔드 코드/메시지 확인)
        console.error("[SOCIAL_CALLBACK_FAIL]", {
          status,
          code: backendCode,
          message: err.response?.data?.message,
          result: err.response?.data?.result,
          endpoint,
        });
        navigate(`/login?error=${backendCode || status || "social"}`, { replace: true });
      }
    };

    void run();
  // 의존성 비움: code/provider는 useMemo로 고정, 뮤테이션 인스턴스 변경에도 재실행 방지
  }, []);

  return <div>소셜 로그인 처리 중...</div>;
};

export default SocialCallback;