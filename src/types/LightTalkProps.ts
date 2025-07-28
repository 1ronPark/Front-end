export interface TalkCardProps {
  id: number;
  name: string; //이름
  profile_image: string;
  // role?: "디자이너" | "PM" | "Web" | "Android" | "ios" | "Server" | "마케팅";
  role: string; //역할 위에 내용으로 정해진 파트를 할지 그냥 string으로 할지 고민중
  univ: string; //학교 이름
  // content: string; //글내용
  text: string; //글내용
  images: string[]; //이미지 리스트
  createAt: Date; //글이 작성된 날짜
  num_hearts: number; //좋아요 갯수
  num_comments: number; //댓글 갯수
}
