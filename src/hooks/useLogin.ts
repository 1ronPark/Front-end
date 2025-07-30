import { useApiMutation } from './apiHooks';
import { useAuthStore } from '../store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';

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
  const mutation = useApiMutation<LoginRequest, LoginResponse>({
    method: 'POST',
    endpoint: '/api/v1/members/login',
    onError: (err) => {
      console.error('로그인 실패:', err.message);
    },
  });

  const login = (
    data: LoginRequest,
    callbacks?: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    }
  ) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        const token = res.result?.accessToken;

        if (!token) {
          console.error('❗ accessToken이 응답에서 누락됨:', res);
          callbacks?.onError?.(new Error('로그인 응답에 accessToken이 없습니다.'));
          return;
        }

        setToken(token);
        callbacks?.onSuccess?.();
        queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
        // console.log('저장된 token:', token);
        // console.log('zustand 내부 상태:', useAuthStore.getState().token);
      },
      onError: (err) => {
        callbacks?.onError?.(err);
      },
    });
  };

  return {
    login,
    isPending: mutation.isPending,
    onError: mutation.error,
    onSucess: mutation.isSuccess,
  };
};