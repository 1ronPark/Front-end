import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRequest } from "./fetchRequest";

// 댓글 작성 api 훅
type CreateResponse<T = unknown> = {
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


export const useCreateComment = (itemId: number) => {
  const qc = useQueryClient();

  return useMutation<CreateResponse<CommentCreated>, Error, { content: string }>({
    mutationFn: (body) =>
      fetchRequest<CreateResponse<CommentCreated>, { content: string }>({
        method: "POST",
        endpoint: `/v1/items/${itemId}/comments`,
        body,
      }),
    onSuccess: () => {
      // 상세 쿼리만 콕 찝어서 갱신
      // useApiQuery의 queryKey = [method, endpoint, queryString] 규칙을 따름
      qc.invalidateQueries({ queryKey: ["GET", `/v1/items/${itemId}`, ""] });
    },
  });
};


// 댓글 삭제 api 훅
type DeleteResponse<T = unknown> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  success: boolean;
};

export const useDeleteComment = (itemId: number) => {
  const qc = useQueryClient();

  return useMutation<DeleteResponse, Error, { commentId: number }>({
    mutationFn: ({ commentId }) =>
      fetchRequest<DeleteResponse>({
        method: "DELETE",
        endpoint: `/v1/items/comments/${commentId}`, // '/v1/...'만 (BASE는 /api)
      }),
    onSuccess: () => {
      // 상세만 부분 무효화 (전체 무효화 금지)
      qc.invalidateQueries({ queryKey: ["GET", `/v1/items/${itemId}`, ""] });
    },
  });
};