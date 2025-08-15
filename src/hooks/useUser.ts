import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchRequest } from "./fetchRequest";

// API가 반환할 데이터 타입 정의 (예시)
export interface User {
  intro: string;
  location: string;
  id: number;
  name: string;
  nickname: string;
  age: number;
  gender: boolean;
  birth: string;
  role: string;
  mbti: string;
  email: string;
  school: string;
  phoneNumber: string;
  career: string | null;
  profileImageUrl: string | null;
}

// =================================================================
// 1. 기존 checkAuth.ts를 대체하는 useUser 훅 (Query)
// =================================================================
const getMe = async (): Promise<User> => {
  // fetchRequest에 제네릭 타입을 명시하여 타입 안정성을 높입니다.
  const response = await fetchRequest<{ result: User }>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_PROFILE_ENDPOINT,
  });
  // 서버 응답 구조가 예상과 다를 경우를 대비한 방어 코드
  if (!response || !response.result) {
    throw new Error("API 응답에서 유효한 사용자 정보를 받지 못했습니다.");
  }
  return response.result;
};

/*
 * 현재 로그인된 사용자 정보를 가져오는 커스텀 훅.
 * 앱 전체에서 사용자의 로그인 상태 및 정보를 관리합니다.
 */

export const useUser = () => {
  const token = useAuthStore((state) => state.token);
  const setUser = useUserStore((state) => state.setUser);

  const queryResult = useQuery<User, Error>({
    queryKey: ["user", "me"], // 쿼리를 식별하는 고유 키
    queryFn: getMe, // 데이터를 가져오는 함수
    retry: 1, // 인증 에러 시 불필요한 재시도를 줄입니다.
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 'fresh' 상태로 간주
    enabled: !!token, // 토큰이 있을 때만 실행
  });

  // onSuccess 콜백 대신 useEffect를 사용하여 부수 효과를 관리합니다.
  // 이 방식은 React의 렌더링 흐름과 더 잘 맞고, 불필요한 재실행을 방지합니다.
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      // useUserStore의 setUser 메서드를 사용하여 상태를 업데이트합니다.
      // 쿼리 결과에서 사용자 정보를 가져와 상태에 저장합니다.
      console.log("사용자 정보 업데이트:", queryResult.data);
      const storeUser = {
        memberId: queryResult.data.id,
        name: queryResult.data.name,
        nickname: queryResult.data.nickname,
        email: queryResult.data.email,
        profileImage: queryResult.data.profileImageUrl || "", // 프로필 이미지가 없을 경우 빈 문자열로 처리
      };
      setUser(storeUser);
    }
  }, [queryResult.isSuccess, queryResult.data, setUser]);

  return queryResult;
};
