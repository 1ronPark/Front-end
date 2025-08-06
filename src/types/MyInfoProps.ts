{
  /*회원 정보 type*/
}

export interface MyInfoProps {
  id: number;
  name: string;
  nickname?: string;
  phoneNumber: string;
  email: string;
  brith?: string;
  profileImageUrl?: string; // 프로필 이미지 URL
  school: string;
  location: string;
  mbti: string;
  role: string;
  intro: string; // 한 줄 소개
  career?: string;
  blog?: string;
  gender?: boolean; // 성별
  age?: number;
  skills?: string[];
  strengths?: string[];
}
