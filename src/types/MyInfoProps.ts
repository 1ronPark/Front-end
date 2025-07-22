{
  /*회원 정보 type*/
}
export interface MyInfoProps {
  id: number;
  name?: string;
  nickname: string; // 닉네임
  phone: string; // 전화번호
  email: string; // 이메일 주소
  univ: string; // 학교 이름
  location?: string; // 지역
  mbti: string;
  role?: "디자이너" | "PM" | "Web" | "Android" | "ios" | "Server"; //design, pm, web, server, android 등등
  intro?: string; // 자기소개
  blog?: string; // 블로그 URL
  gender?: "남" | "여";
  age?: number;
  tags?: string[]; // 관심사 태그 배열
  profileImage?: string; // URL 형식의 프로필 이미지
}
