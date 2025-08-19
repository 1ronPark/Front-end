import { useApiMutation, useApiQuery } from "./apiHooks";

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

interface PostProgileImageResponse {
  isSuccess: true;
  code: string;
  message: string;
  result: {
    profileImageUrl: string;
  };
  success: boolean;
}

interface PutProfileEditRequest {
  nickname: string;
  mbti: string;
  email: string;
  phoneNumber: string;
  profileTitle: string;
}
// 커스텀 훅: 프로필 정보를 가져오는 함수
export const useGetProfile = () => {
  return useApiQuery<GetProfileResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_PROFILE_ENDPOINT,
  });
};

// 커스텀 훅: 프로필 정보를 변경하는 함수
export const usePutProfileEdit = () => {
  return useApiMutation<PutProfileEditRequest, { isSuccess: boolean }>({
    method: "PUT",
    endpoint: import.meta.env.VITE_API_PUT_MYINFO_EDIT_ENDPOINT,
    onSuccess: () => {
      // 성공 시 추가 작업이 필요하면 여기에 작성
      alert("프로필 정보가 성공적으로 변경되었습니다.");
    },
    onError: () => {
      // 에러 처리 로직
      alert("프로필 정보 변경에 실패했습니다.");
    },
  });
};

// 커스텀 훅: 프로필 사진을 변경하는 함수
export const usePostProfileImage = () => {
  return useApiMutation<FormData, PostProgileImageResponse>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_POST_PROFILE_IMAGE_CHANGE_ENDPOINT,

    onSuccess: () => {
      // 성공 시 추가 작업이 필요하면 여기에 작성
      alert("프로필 사진 변경 성공:");
    },
    onError: () => {
      // 에러 처리 로직
      alert("프로필 사진 변경 실패:");
    },
  });
};
