import { type MemberDetailData, type MemberFilters, type MemberListItem } from "../types/MemberProps";
import { useApiQuery } from "./apiHooks";

// 전체 응답 정의
interface MemberListResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: MemberListItem[];
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

// 필터링 백엔드가 해주는지에 대한 여부에 따라 달라짐
export const useMembers = (filters?: MemberFilters) => {
    return useApiQuery<MemberListResponse>({
        method: 'GET',
        endpoint: '/api/v1/members', // 임시
        // 필터링, 페이징 등 쿼리 파라미터
    });
};

export const useMemberDetail = (memberId: number) => {
    return useApiQuery<MemberDetailResponse>({
        method: 'GET',
        endpoint: `api/v1/members/${memberId}`,
    });
};