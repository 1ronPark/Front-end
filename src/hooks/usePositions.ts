import { useApiMutation, useApiQuery } from "./apiHooks";

interface GetPositionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    positions: string[];
  };
  success: boolean;
}

interface PostPositionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberName: string;
    positionName: string;
  };
  success: boolean;
}

interface DeletePositionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberName: string;
    deletePositionName: string;
  };
  success: boolean;
}

export const useGetPositions = () => {
  return useApiQuery<GetPositionResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_POSITIONS_ENDPOINT,
  });
};

export const usePostPositions = () => {
  return useApiMutation<undefined, PostPositionResponse>({
    method: "POST",
    endpoint: "/api/v1/members/position", // 기본값 (호출 시 덮어씀)
    onSuccess: (data) => {
      alert(`포지션 ${data.result.positionName}이(가) 등록되었습니다.`);
    },
    onError: (error) => {
      alert(`포지션 등록에 실패했습니다: ${error.message}`);
    },
  });
};

export const useDeletePositions = () => {
  return useApiMutation<undefined, DeletePositionResponse>({
    method: "DELETE",
    endpoint: "/v1/members/position", // 기본값 (호출 시 덮어씀)
    onSuccess: (data) => {
      alert(`포지션 ${data.result.deletePositionName}이(가) 삭제되었습니다.`);
    },
    onError: (error) => {
      alert(`포지션 삭제에 실패했습니다: ${error.message}`);
    },
  });
};
