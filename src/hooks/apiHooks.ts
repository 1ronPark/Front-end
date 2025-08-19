import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRequest } from "./fetchRequest";

interface ApiQueryOptions {
  method: "GET";
  endpoint: string;
  enabled?: boolean;
  params?: Record<string, string | number | boolean | undefined | null>; // ✅ 추가
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ApiMutationOptions<_TBody = unknown, TResult = unknown> {
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  onSuccess?: (data: TResult) => void;
  onError?: (error: Error) => void;
  options?: {
    retry?: number;
    // 다른 옵션들 추가 가능
  };
}

const toQueryString = (params?: ApiQueryOptions["params"]) => {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.append(key, String(value));
    }
  });
  return search.toString();
};
// =================================================================
//  API 요청을 위한 커스텀 훅들
// =================================================================
export const useApiQuery = <T>(options: ApiQueryOptions) => {
  const queryString = toQueryString(options.params);
  const endpointWithQuery = queryString
    ? `${options.endpoint}?${queryString}`
    : options.endpoint;

  return useQuery<T, Error>({
    queryKey: [options.method, options.endpoint, queryString], // params도 캐시에 반영
    queryFn: () =>
      fetchRequest<T>({
        method: options.method,
        endpoint: endpointWithQuery,
      }),
    enabled: options.enabled !== false,
    staleTime: 1000 * 60 * 5,
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
    retry: options.options?.retry,
  });
};
