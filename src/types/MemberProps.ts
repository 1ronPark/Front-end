interface MemberType {
    memberId: number;
    name: string;
    nickname: string;
    gender: boolean;
    role: string;
    mbti: string;
    regions: string[];
    profileImageUrl: string;
}

// 전체 조회 목록용
export interface MemberListItem extends MemberType {
    // 목록에서 보여줄 기본 정보만 
    skills: string[]; // 2개씩 표시
    strengths: string[];
}

// 상세 조회
export interface MemberDetailData extends MemberType {
    // 상세에서만 보여줄 기본 정보 씀
    age: number;
    birth: string;
    career: string;
    school: string;
    skills: string[]; // 전체 다
    strengths: string[];
    portfolios: {
        name: string;
        fileUrl: string;
    }[];
    email: string;
    phoneNumber: string;
}

// 필터용
export interface MemberFilters {
    role?: string;
    mbti?: string;
    regions?: string[];
}