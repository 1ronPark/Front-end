import { type MemberDetailData, type MemberFiltersParams, type MemberListItem } from "../types/MemberProps";
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
interface MemberLikeResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {};
    success: boolean;
}

export const useMembers = (filters?: MemberFiltersParams) => {
    return useApiQuery<MemberListResponse>({
        method: 'GET',
        endpoint: '/api/v1/members/search',
        params: filters,
    });
};

// 상세 조회
export const useMemberDetail = (memberId: number) => {
    return useApiQuery<MemberDetailResponse>({
        method: 'GET',
        endpoint: `/api/v1/members/${memberId}`,
    });
};

// 회원 좋아요 기능
export const useLikeMember = (memberId: number) => {
    return useApiMutation<undefined, MemberLikeResponse>({
        method: 'POST',
        endpoint: `/api/v1/members/${memberId}/like`,
    });
};

// 회원 좋아요 취소 기능
export const useUnLikeMember = (memberId: number) => {
    return useApiMutation<undefined, MemberLikeResponse>({
        method: 'DELETE',
        endpoint: `/api/v1/members/${memberId}/like`
    })
}
