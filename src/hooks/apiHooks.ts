// src/hooks/apiHooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRequest } from '../utils/fetchRequest'; // 경로 수정 필요

// API가 반환할 데이터 타입 정의 (예시)
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

interface CreatePostPayload {
  title: string;
  content: string;
}

// =================================================================
// 1. 기존 checkAuth.ts를 대체하는 useUser 훅 (Query)
// =================================================================
const getMe = (): Promise<User> => {
  return fetchRequest({ method: 'GET', endpoint: '/api/v1/members/me' });
};

/*
 * 현재 로그인된 사용자 정보를 가져오는 커스텀 훅.
 * 앱 전체에서 사용자의 로그인 상태 및 정보를 관리합니다.
 */
export const useUser = () => {
  return useQuery<User, Error>({
    queryKey: ['user', 'me'], // 쿼리를 식별하는 고유 키
    queryFn: getMe,           // 데이터를 가져오는 함수
    retry: 1,                 // 인증 에러 시 불필요한 재시도를 줄입니다.
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 'fresh' 상태로 간주
  });
};

// =================================================================
// 2. 다른 GET 요청들을 위한 useQuery 훅 (예: 게시글 목록)
// =================================================================
const getPosts = (): Promise<Post[]> => {
  return fetchRequest({ method: 'GET', endpoint: '/api/v1/posts' });
};

export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};

// =================================================================
// 3. POST/PUT/DELETE 요청들을 위한 useMutation 훅 (예: 게시글 생성)
// =================================================================
const createPost = (newPost: CreatePostPayload): Promise<Post> => {
  return fetchRequest({
    method: 'POST',
    endpoint: '/api/v1/posts',
    body: newPost,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostPayload>({
    mutationFn: createPost,
    onSuccess: () => {
      // 뮤테이션 성공 시, 'posts' 쿼리를 무효화시켜
      // 게시글 목록을 자동으로 다시 불러오게 합니다.
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      // 뮤테이션 실패 시 에러 처리 (e.g., 토스트 알림)
      alert(`게시글 생성 실패: ${error.message}`);
    }
  });
};

// =================================================================
// 4. 로그아웃을 위한 useMutation 훅
// =================================================================
const logout = (): Promise<void> => {
  // 실제 로그아웃 엔드포인트로 수정해야 합니다.
  return fetchRequest({ method: 'POST', endpoint: '/api/v1/auth/logout' });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      // 로그아웃 성공 시 'user' 쿼리를 무효화하고 캐시에서 제거합니다.
      // 이렇게 하면 useUser 훅이 다시 실행되면서 로그인 상태가 false로 바뀝니다.
      queryClient.removeQueries({ queryKey: ['user', 'me'] });
    },
    onError: (error) => {
      alert(`로그아웃 실패: ${error.message}`);
    },
  });
};