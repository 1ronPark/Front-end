import { useApiMutation } from "./apiHooks";

// 댓글 생성 api 훅
type BaseResponse<T = unknown> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  success: boolean;
};

type CommentCreated = {
  itemCommentId: number;
  authorName: string;
  authorProfileImageURL: string;
  content: string;
  updatedAt: string;
};

export const useCreateComment = (itemId: number) =>
  useApiMutation<{ content: string }, BaseResponse<CommentCreated>>({
    method: "POST",
    endpoint: `/v1/items/${itemId}/comments`, // ⚠️ '/v1/...'만 (BASE가 /api)
  });