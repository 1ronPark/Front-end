import { useApiQuery } from "./apiHooks";

interface GetRegionSidoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    regions: {
      siDo: string; // 시/도
    }[];
  };
  success: boolean;
}

interface GetRegionSigunguResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    siGunGu: string[];
  };
  success: boolean;
}

export const useGetRegionsSido = () => {
  return useApiQuery<GetRegionSidoResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_REGION_SIDO_ENDPOINT,
  });
};

export const useGetRegionSigungu = (siDo?: string) => {
  const baseEndpoint =
    import.meta.env.VITE_API_GET_SIGUNGU_ENDPOINT ?? "/api/v1/regions/sigungu";

  return useApiQuery<GetRegionSigunguResponse>({
    method: "GET",
    endpoint: siDo
      ? `${baseEndpoint}?siDo=${encodeURIComponent(siDo)}`
      : baseEndpoint,
    enabled: !!siDo, // siDo 값이 있을 때만 요청
  });
};
