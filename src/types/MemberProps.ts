export interface MemberType {
    name: string;
    nickname: string;
    age: number;
    gender: boolean;
    birth: string;
    role: string;
    mbti: string;
    career: string;
    school: string;
    skills: string[];
    strengths: string[];
    regions: string[];
    portfolios: {
        name: string;
        fileUrl: string;
    }[];
}

export interface MemberCardProps {
    isSuccess: boolean; // hooks에서 isSUccess랑 얘네 관리하는 듯
    code: string;
    message: string;
    result: MemberType;
}