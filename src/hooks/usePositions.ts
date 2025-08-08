import { useApiQuery } from "./apiHooks";

interface GetPositionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    positions: string[];
  };
  success: boolean;
}

export const useGetPositions = () => {
  return useApiQuery<GetPositionResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_POSITIONS_ENDPOINT,
  });
};
