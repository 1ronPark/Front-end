import type { TalkCommentProps } from "../src/types/LightTalkProps";

export const dummyComments: TalkCommentProps[] = [
  {
    id: 1,
    userId: 1, //댓글 작성자
    talkCardId: 1,
    name: "김정민", //댓글 작성자 이름
    profile_image: "", //댓글 작성자 프로필 이미지
    role: "디자이너",
    univ: "가천대글로벌",
    content: "이 글 좋습니다", //댓글 내용
    createdAt: new Date("2025-07-30T13:00:00"), //댓글 작성 날짜
    currentUserId: 1, //현재 로그인 한 User Id
    num_hearts: 32,
    num_comments: 0,
  },
  {
    id: 2,
    userId: 2,
    talkCardId: 1,
    name: "이시연",
    role: "개발자",
    univ: "연세대",
    profile_image: "",
    content: "이 글 좋습니다",
    createdAt: new Date("2025-07-30T13:00:00"),
    currentUserId: 1,
    num_hearts: 32,
    num_comments: 0,
  },
  {
    id: 3,
    userId: 2,
    talkCardId: 2,
    name: "홍길동",
    role: "PM",
    univ: "고려대",
    profile_image: "",
    content: "이 글 좋습니다",
    createdAt: new Date("2025-07-30T13:00:00"),
    currentUserId: 1,
    num_hearts: 32,
    num_comments: 0,
  },
  {
    id: 4,
    userId: 2,
    talkCardId: 3,
    name: "페이커",
    role: "개발자",
    univ: "서울대",
    profile_image: "",
    content: "이 글 좋습니다",
    createdAt: new Date("2025-07-30T13:00:00"),
    currentUserId: 1,
    num_hearts: 32,
    num_comments: 0,
  },
];
