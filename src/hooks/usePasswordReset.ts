import { useApiMutation } from "./apiHooks";

interface PasswordResetInitResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Record<string, unknown>;
  success: boolean;
}

export const usePasswordReset = () => {
  return useApiMutation<undefined, PasswordResetInitResponse>({
    method: "POST",
    endpoint: "", // 빈 값으로 두고 아래 mutate에서 완성
  });
};