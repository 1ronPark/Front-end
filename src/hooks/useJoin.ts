import axios from 'axios';
import { useApiMutation } from '../hooks/apiHooks';

export interface SignUpRequest {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    createdAt: string;
  };
  success: boolean;
}

export const useSignUp = () => {

  return useApiMutation<SignUpRequest, SignUpResponse>({
    method: 'POST',
    endpoint: import.meta.env.VITE_API_SIGNUP_ENDPOINT,
    onSuccess: () => {
      console.log('회원가입 성공!');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const result = error.response?.data?.result;
        if (result?.email === 'DUPLICATE_EMAIL') {
          alert('이미 존재하는 이메일입니다.');
        } else if (result?.nickname === 'DUPLICATE_NICKNAME') {
          alert('이미 존재하는 닉네임입니다.');
        } else if (result?.name === 'DUPLICATE_NAME') {
          alert('이미 존재하는 사용자입니다.');
        } else if (result?.password === 'DUPLICATE_PASSWORD') {
          alert('이미 존재하는 비밀번호입니다.');
        } else {
          alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
        }
        console.error('회원가입 실패:', error.message);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};