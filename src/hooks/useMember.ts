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
        endpoint: '/v1/members/search',
        params: buildMemberParams(filters),
    });
};

// 상세 조회
export const useMemberDetail = (memberId: number) => {
    return useApiQuery<MemberDetailResponse>({
        method: 'GET',
        endpoint: `/v1/members/${memberId}`,
    });
};

// 회원 좋아요 기능
export const useLikeMember = (memberId: number) => {
    return useApiMutation<undefined, void>({
        method: 'POST',
        endpoint: `/v1/members/${memberId}/like`,
        onSuccess: () => {
            alert('좋아요 등록 완료!');
        },
        onError: (error) => {
            alert(error.message || '좋아요 등록 실패');
        },  
    });
};

// 회원 좋아요 취소 기능
export const useUnLikeMember = (memberId: number) => {
    return useApiMutation<undefined, void>({
        method: 'DELETE',
        endpoint: `/v1/members/${memberId}/like`,
        onSuccess: () => {
            console.log("좋아요 취소 성공");
        },
        onError: (err) => {
            alert(err.message || "좋아요 취소 실패");
        },
    })
}