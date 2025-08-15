import { useApiMutation, useApiQuery } from "./apiHooks";

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

interface PostRegionRegionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    regions: {
      siDo: string; // 시/도
      siGunGu: string; // 시/군/구
    }[];
  };
  success: boolean;
}

export type MemberRegion = { siDo: string; siGunGu: string };

type PostRegionsBody = { memberRegions: MemberRegion[] };

// interface DeleteRegionByIdResponse {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: { memberRegionId: number };
//   success: boolean;
// }

export const useGetRegionsSido = () => {
  return useApiQuery<GetRegionSidoResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_REGION_SIDO_ENDPOINT,
  });
};

export const useGetRegionSigungu = (siDo?: string) => {
  const baseEndpoint =
    import.meta.env.VITE_API_GET_SIGUNGU_ENDPOINT ;

  return useApiQuery<GetRegionSigunguResponse>({
    method: "GET",
    endpoint: siDo
      ? `${baseEndpoint}?siDo=${encodeURIComponent(siDo)}`
      : baseEndpoint,
    enabled: !!siDo, // siDo 값이 있을 때만 요청
  });
};

export const usePostRegion = () => {
  return useApiMutation<PostRegionsBody, PostRegionRegionResponse>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_POST_REGION_ENDPOINT, // 기본값 (호출 시 덮어씀)
    onSuccess: (data) => {
      alert(
        `지역 ${data.result.regions
          .map((r) => `${r.siDo} ${r.siGunGu}`)
          .join(", ")}이(가) 등록되었습니다.`
      );
    },
    onError: (error) => {
      alert(`지역 등록에 실패했습니다: ${error.message}`);
    },
  });
};

// ✅ 삭제: path parameter로 memberRegionId 전달
export const useDeleteRegionById = () =>
  useApiMutation<undefined, { result: { memberRegionId: number } }>({
    method: "DELETE",
    endpoint: import.meta.env.VITE_API_REGION_ENDPOINT, // 호출할 때 /{id} 로 덮어씀
  });
