// src/apis/useLikedStatus.ts
import { useApiQuery } from "../hooks/apiHooks";

interface LikedStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    liked: boolean;
  };
  success: boolean;
}

export const useLikedStatus = (itemId: number) => {
  return useApiQuery<LikedStatusResponse>({
    method: "GET",
    endpoint: `/api/v1/items/${itemId}/like`, // 예시 URL
  });
};
