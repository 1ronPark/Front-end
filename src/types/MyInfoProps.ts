{
  /*회원 정보 type*/
}

export interface MyInfoProps {
  id: number;
  name: string;
  nickname?: string;
  phone: string;
  email: string;
  univ: string;
  location: string;
  mbti: string;
  role: string;
  intro?: string;
  blog?: string;
  gender?: string; // 성별
  age?: number;
  skills?: string[];
  strengths?: string[];
  profileImage?: string; // 프로필 이미지 URL
}
