import { useApiMutation } from "./apiHooks";

interface PasswordCheckRequest {
  password: string;
}

export const usePasswordCheck = () => {
  return useApiMutation<PasswordCheckRequest, void>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_PASSWORD_CHECK_ENDPOINT,
    onSuccess: () => {
      alert("비밀번호가 확인되었습니다.");
    },
    onError: (error) => {
      alert(`비밀번호 확인에 실패했습니다: ${error.message}`);
    },
  });
};
