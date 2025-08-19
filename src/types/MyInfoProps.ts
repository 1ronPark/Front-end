{
  /*회원 정보 type*/
}

export interface MyInfoProps {
  id: number;
  name: string;
  nickname?: string;
  phoneNumber: string;
  email: string;
  school: string;
  location: string;
  mbti?: string;
  role: string;
  gender?: boolean; // 성별
  age?: number;
  skills?: string[];
  strengths?: string[];
  brith?: string;
  profileImageUrl?: string | null; // 프로필 이미지 URL
  selfIntroduce?: string;
  career?: string;
  blog?: string;
}
