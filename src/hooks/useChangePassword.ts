import { useApiMutation } from "./apiHooks";

interface ChangePasswordRequest {
  prevPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  return useApiMutation<ChangePasswordRequest, void>({
    method: "POST",
    endpoint: "/v1/members/password/change",
    onSuccess: () => {
      alert("비밀번호 변경이 완료되었습니다.");
    },
  });
};
