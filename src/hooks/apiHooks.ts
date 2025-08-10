import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRequest } from "./fetchRequest";

interface ApiQueryOptions {
  method: "GET";
  endpoint: string;
  enabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ApiMutationOptions<_TBody = unknown, TResult = unknown> {
  method: "POST" | "PUT" | "DELETE";
  endpoint: string;
  onSuccess?: (data: TResult) => void;
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
  options: ApiMutationOptions<TBody, TResult>
) => {
  const queryClient = useQueryClient();

  return useMutation<TResult, Error, { body?: TBody; endpoint?: string }>({
    mutationFn: ({ body, endpoint }) =>
      fetchRequest<TResult>({
        method: options.method,
        endpoint: endpoint ?? options.endpoint, //호출 시 endpoint 우선
        body,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(); // 모든 쿼리 무효화 (필요시 queryKey 지정도 가능)
      options.onSuccess?.(data); //응답 데이터 전달
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};
