import { type MemberDetailData, type MemberFiltersParams, type MemberListItem } from "../types/MemberProps";
import { buildMemberParams } from "../utils/buildMemberParams";
import { useApiMutation, useApiQuery } from "./apiHooks";

// 전체 응답 정의
interface MemberListResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        members: MemberListItem[];
        numOfTotalResults: number;
    };
    success: boolean;
}

// 상세 응답 정의
interface MemberDetailResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: MemberDetailData;
    success: boolean;
} 

// 좋아요 응답 정의
// interface MemberLikeResponse {
//     isSuccess: boolean;
//     code: string;
//     message: string;
//     result: {
//         liked: boolean;
//     };
//     success: boolean;
// }

export const useMembers = (filters?: MemberFiltersParams) => {
    return useApiQuery<MemberListResponse>({
        method: 'GET',
        endpoint: import.meta.env.VITE_API_MEMBERS_SEARCH_ENDPOINT,
        params: buildMemberParams(filters),
    });
};

// 상세 조회
export const useMemberDetail = (memberId: number) => {
    const endpoint = import.meta.env.VITE_API_MEMBER_DETAIL_ENDPOINT.replace(':id', String(memberId));

    return useApiQuery<MemberDetailResponse>({
        method: 'GET',
        endpoint,
    });
};

// 회원 좋아요 기능
export const useLikeMember = (memberId: number) => {
  const endpoint = import.meta.env.VITE_API_MEMBER_LIKE_ENDPOINT.replace(':id', String(memberId));

    return useApiMutation<undefined, void>({
        method: 'POST',
        endpoint,
        onSuccess: () => {
            console.log('좋아요 등록 완료!');
        },
        onError: (error) => {
            console.error(error.message || '좋아요 등록 실패');
        },  
    });
};

// 회원 좋아요 취소 기능
export const useUnLikeMember = (memberId: number) => {
  const endpoint = import.meta.env.VITE_API_MEMBER_LIKE_ENDPOINT.replace(':id', String(memberId));

    return useApiMutation<undefined, void>({
        method: 'DELETE',
        endpoint,
        onSuccess: () => {
            console.log("좋아요 취소 성공");
        },
        onError: (err) => {
            console.error(err.message || "좋아요 취소 실패");
        },
    })
}