{
  /*회원 정보 type*/
}

export interface MyInfoProps {
  id: number;
  name: string;
  nickname?: string;
  age?: number;
  gender?: boolean; // 성별
  brith?: string;
  role: string;
  mbti: string;
  email: string;
  school: string;
  phoneNumber: string;
  selfIntroduce: string;
  profileImageUrl: string;
  location: string;
  career?: string;
  blog?: string;
  skills?: string[];
  strengths?: string[];
}
