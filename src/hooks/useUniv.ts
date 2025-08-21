import { useApiQuery } from "./apiHooks";

export interface School {
  schoolId: number;
  schoolName: string;
}

interface GetUnivResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    schoolList: School[];
  };
  success: boolean;
}

export const useGetUniv = () => {
  return useApiQuery<GetUnivResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_UNIV_ENDPOINT,
    enabled: true, // 필요에 따라 활성화 여부 조정
  });
};
