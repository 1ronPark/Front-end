import type { TalkCommentProps } from "../src/types/LightTalkProps";

export const dummyComments: TalkCommentProps[] = [
  {
    id: 1,
    userId: 1, //댓글 작성자
    userName: "김정민", //댓글 작성자 이름
    profile_image: "", //댓글 작성자 프로필 이미지
    content: "이 글 좋습니다", //댓글 내용
    createdAt: new Date(), //댓글 작성 날짜
    currentUserId: 1, //현재 로그인 한 User Id
  },
  {
    id: 2,
    userId: 2,
    userName: "이시연",
    profile_image: "",
    content: "이 글 좋습니다",
    createdAt: new Date(),
    currentUserId: 1,
  },
];
