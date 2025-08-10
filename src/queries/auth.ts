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

/** 소셜 로그인 (가입된 사용자) */
export const useSocialLogin = () =>
  useApiMutation<undefined, ApiEnvelope<LoginJoinResult>>({
    method: "POST",
    endpoint: "/api/v1/members/login/GOOGLE",
  });

/** 소셜 회원가입 (최초 로그인 시) */
export const useSocialJoin = () =>
  useApiMutation<undefined, ApiEnvelope<LoginJoinResult>>({
    method: "POST",
    endpoint: "/api/v1/members/join/GOOGLE",
  });

/** 계정에 소셜 로그인 방법 추가/연동 (로그인 상태 필요) */
export const useLinkSocial = () =>
  useApiMutation<undefined, ApiEnvelope<unknown>>({
    method: "POST",
    endpoint: "/api/v1/members/login/path/GOOGLE",
  });