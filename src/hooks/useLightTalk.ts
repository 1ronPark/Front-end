import { useApiQuery } from "./apiHooks";

interface GetLightTalkResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    posts: [
      {
        postId: number;
        authorName: string;
        positionName: [
          {
            positionName: string;
          }
        ];
        schoolName: string;
        authorProfileImageURL: string;
        content: string;
        postImages: [
          {
            postImageURL: string;
          }
        ];
        createdAt: Date;
        postCommentCount: number;
        postLikeCount: number;
        likedByCurrentUser: boolean;
      }
    ];
  };
  success: true;
}

export const useGetLightTalk = () => {
  return useApiQuery<GetLightTalkResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_LIGHTTALK_ENDPOINT,
    enabled: true, // 필요에 따라 활성화 여부 조정
  });
};
