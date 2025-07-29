import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRequest } from '../utils/fetchRequest';

// API가 반환할 데이터 타입 정의 (예시)
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiQueryOptions {
  method: 'GET';
  endpoint: string;
  enabled?: boolean;
}

interface ApiMutationOptions {
  method: 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// =================================================================
// 1. 기존 checkAuth.ts를 대체하는 useUser 훅 (Query)
// =================================================================
const getMe = (): Promise<User> => {
  return fetchRequest({ method: 'GET', endpoint: '/api/v1/members/me' });
};

/*
 * 현재 로그인된 사용자 정보를 가져오는 커스텀 훅.
 * 앱 전체에서 사용자의 로그인 상태 및 정보를 관리합니다.
 */
export const useUser = () => {
  return useQuery<User, Error>({
    queryKey: ['user', 'me'], // 쿼리를 식별하는 고유 키
    queryFn: getMe,           // 데이터를 가져오는 함수
    retry: 1,                 // 인증 에러 시 불필요한 재시도를 줄입니다.
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 'fresh' 상태로 간주
  });
};

// =================================================================
// 2. API 요청을 위한 커스텀 훅들
// =================================================================
export const useApiQuery = <T>(options: ApiQueryOptions) => {
  return useQuery<T, Error>({
    queryKey: [options.method, options.endpoint],
    queryFn: () =>
      fetchRequest<T>({
        method: options.method,
        endpoint: options.endpoint,
      }),
    enabled: options.enabled !== false,
    staleTime: 1000 * 60 * 5, // optional: 5분 동안 fresh 처리
  });
};

export const useApiMutation = <TBody = unknown, TResult = unknown>(
  options: ApiMutationOptions
) => {
  const queryClient = useQueryClient();

  return useMutation<TResult, Error, TBody>({
    mutationFn: (body: TBody) =>
      fetchRequest<TResult>({
        method: options.method,
        endpoint: options.endpoint,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(); // 모든 쿼리 무효화 (필요시 queryKey 지정도 가능)
      options.onSuccess?.();
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};