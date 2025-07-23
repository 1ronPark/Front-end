{/*회원 정보 type*/}
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
  gender?: "남" | "여";
  age?: number;
  skills?: string[];
  strengths?: string[];
}