import { useApiMutation } from "./apiHooks";
import { useAuthStore } from "../store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  result: {
    memberId: number;
    accessToken: string;
  };
}


export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useApiMutation<LoginRequest, LoginResponse>({
  method: "POST",
  endpoint: "/v1/members/login",
  onError: (err: Error) => {
    // Axios 에러인지 안전하게 판별 후 코드별 처리
    if (isAxiosError<{ code: string; message: string }>(err)) {
      const code = err.response?.data?.code;
      if (code === "CREDENTIAL4000") {
        alert("등록되지 않은 이메일입니다. 회원가입을 진행해주세요.");
        navigate("/signup");
        return;
      }
      if (code === "CREDENTIAL4001") {
        alert("비밀번호가 올바르지 않습니다.");
        return;
      }
      // 기타 Axios 에러
      alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // Axios 가 아닌 일반 Error
    alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  },
});

  const login = (
    data: LoginRequest,
    callbacks?: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    }
  ) => {
    mutation.mutate(
      { body: data },
      {
        onSuccess: (res) => {
          const token = res.result?.accessToken;

          if (!token) {
            console.error("❗ accessToken이 응답에서 누락됨:", res);
            callbacks?.onError?.(
              new Error("로그인 응답에 accessToken이 없습니다.")
            );
            return;
          }

          setToken(token);
          callbacks?.onSuccess?.();
          queryClient.invalidateQueries({ queryKey: ["user", "me"] });
          // console.log('저장된 token:', token);
          // console.log('zustand 내부 상태:', useAuthStore.getState().token);
        },
        onError: (err) => {
          callbacks?.onError?.(err);
        },
      }
    );
  };

  return {
    login,
    isPending: mutation.isPending,
    onError: mutation.error,
    onSucess: mutation.isSuccess,
  };
};