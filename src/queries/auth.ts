// src/queries/auth.ts
import { useApiMutation } from "../hooks/apiHooks";

export type Provider = "GOOGLE" | "KAKAO";

export type ApiEnvelope<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  success?: boolean; // 일부 응답에 존재
};

export type LoginJoinResult = {
  accessToken: string;
  memberId: number;
  // 필요 시 서버 스키마에 맞춰 확장
};

/**
 * 서버가 로그인/미가입을 내부에서 처리하고 토큰을 반환하는 단일 콜백 API 훅
 * 기본 endpoint 설정.
 * 실제 호출 시 endpoint를 오버라이드하여 {provider}와 authCode를 붙여 사용합니다.
 */
export const useSocialCallback = () =>
  useApiMutation<undefined, ApiEnvelope<LoginJoinResult>>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_SOCIAL_CALLBACK_DEFAULT,
    options: { retry: 0 },
  });