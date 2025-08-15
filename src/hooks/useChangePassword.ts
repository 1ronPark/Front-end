import { useApiMutation } from "./apiHooks";

interface ChangePasswordRequest {
  prevPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  return useApiMutation<ChangePasswordRequest, void>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_CHANGE_PASSWORD_ENDPOINT,
    onSuccess: () => {
      alert("비밀번호 변경이 완료되었습니다.");
    },
  });
};
