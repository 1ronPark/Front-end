import { useApiQuery } from "./apiHooks";

interface GetProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    profileTitle: string;
    name: string;
    nickname: string;
    age: number;
    gender: boolean; // true=남자, false=여자 (추측)
    mbti: string;
    school: string;
    profileImageUrl: string;
    email: string;
    skills: {
      id: number;
      name: string;
      skillType: string; // 필요한 경우 enum 확장
    }[];
    strengths: {
      id: number;
      name: string;
      strengthType: string; // 필요한 경우 enum 확장
    }[];
    regions: {
      id: number;
      siDo: string; // 시/도
      siGunGu: string; // 시/군/구
    }[];
    positions: string[];
    portfolios: {
      id: number;
      name: string;
      fileUrl: string;
    }[];
    selfIntroduce: string;
    activities: {
      name: string;
      startDate: string; // YYYY-MM-DD
      hasEndDate: boolean;
      endDate?: string; // hasEndDate가 true일 때만 존재
    }[];
  };
  success: boolean;
}

export const useGetProfile = () => {
  return useApiQuery<GetProfileResponse>({
    method: "GET",
    endpoint: "/v1/members/me/profile",
  });
};

// export const usePutProfileEdit = ()
