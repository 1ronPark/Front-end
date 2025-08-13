{
  /*회원 정보 type*/
}

export interface MyInfoProps {
  id: number;
  name: string;
  nickname?: string;
  phoneNumber: string;
  mbti?:string;
  gender?: boolean;
  age?: number;
  role: string;
  email: string;
  brith?: string;
  profileImageUrl?: string; // 프로필 이미지 URL
  school: string;
  selfIntroduce: string;
  location: string;
  career?: string;
  blog?: string;
  skills?: string[];
  strengths?: string[];
}
