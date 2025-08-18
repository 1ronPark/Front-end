// hooks/useStrengths.ts
import { useApiMutation, useApiQuery } from "./apiHooks";

export interface Strength {
  strengthId: number;
  strengthName: string;
}

export interface StrengthType {
  id: number;
  name: string;
  strengthType?: string; // 필요한 경우 enum 확장
}

interface GetStrengthsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    strengths: Strength[];
  };
}

type UseGetStrengthsOptions = {
  enabled?: boolean;
};

interface PostStrengthResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    strengthName: string;
    memberName: string;
  };
  success: boolean;
}
interface PostStrengthRequest {
  strengthId: number;
}

export const useGetStrengths = (
  positionName?: string | null,
  options: UseGetStrengthsOptions = {}
) => {
  const enabled = options.enabled ?? Boolean(positionName);

  return useApiQuery<GetStrengthsResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_STRENGTHS_ENDPOINT,
    params: positionName ? { positionName } : undefined,
    enabled,
  });
};

export const usePostStrengths = () => {
  return useApiMutation<PostStrengthRequest, PostStrengthResponse>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_POST_STRENGTHS_ENDPOINT, // 기본값 (호출 시 덮어씀)
    onSuccess: (data) => {
      alert(`강점 ${data.result.strengthName}이(가) 등록되었습니다.`);
    },
    onError: (error) => {
      alert(`강점 등록에 실패했습니다: ${error.message}`);
    },
  });
};
//✅ 삭제: path parameter로 strengthId 전달
export const useDeleteStrengthsById = () =>
  useApiMutation<undefined, { result: { strengthId: number } }>({
    method: "DELETE",
    endpoint: import.meta.env.VITE_API_POST_STRENGTHS_ENDPOINT, // 호출할 때 /{id} 로 덮어씀
  });
