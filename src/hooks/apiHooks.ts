import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRequest } from '../utils/fetchRequest';


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
//  API 요청을 위한 커스텀 훅들
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