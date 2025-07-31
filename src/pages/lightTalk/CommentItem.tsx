import { EllipsisVertical, Heart, MessageSquareText } from "lucide-react";
import type { TalkCommentProps } from "../../types/LightTalkProps";
import { useState } from "react";
import CommentMenuModal from "./talkModal/CommentMenuModal";

interface CommentItemProps {
  comment: TalkCommentProps;
  replies: TalkCommentProps[];
  onReply: (text: string, parentId: number) => void;
}

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}일 전`;
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};

const CommentItem = ({ comment, replies, onReply }: CommentItemProps) => {
  const isMyPost = comment.currentUserId === comment.userId;
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTimeout(() => setOpenMenu(true), 0);
  };

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    onReply(replyText.trim(), comment.id);
    setReplyText("");
    setIsReplying(false);
    setShowReplies(true);
  };

  return (
    <div className="relative w-[640px] flex flex-col px-8 pt-4 gap-4 bg-[#FEFEFE]">
      <div className="h-12 w-12 absolute top-0 right-2 flex justify-center items-center">
        <button
          className="flex h-8 w-8 flex-col justify-center items-center rounded-[100px] hover:bg-[rgba(73,69,79,0.08)]"
          onClick={handleMenuClick}
        >
          <EllipsisVertical className="w-5 h-5" />
        </button>
      </div>
      {openMenu && (
        <CommentMenuModal
          isMyPost={isMyPost}
          onClose={() => setOpenMenu(false)}
        />
      )}

      <div className="flex items-start gap-4">
        {/* 프로필 */}
        <div className="flex w-12 h-12 justify-center items-center">
          <img
            src={comment.profile_image || ""}
            alt="profile"
            className="w-10 h-10 rounded-full bg-gray-200 object-cover"
          />
        </div>

        {/* 본문 */}
        <div className="w-full flex flex-col items-start gap-2 mb-2">
          <div className="flex items-center gap-2">
            <p className="text-[#1C1B21] label-large-emphasis">
              {comment.name}
            </p>
            <p className="text-[#1C1B21] body-medium-emphasis opacity-[0.58]">
              {comment.role}
            </p>
            <p className="text-[#47464F] body-medium opacity-[0.58]">
              {comment.univ}
            </p>
            <p className="text-[#47464F] body-medium opacity-[0.58]">
              {getTimeAgo(new Date(comment.createdAt))}
            </p>
          </div>

          <p className="body-medium whitespace-pre-line text-[#1C1B21]">
            {comment.content.trim()}
          </p>

          {/* 하단 버튼들 */}
          <div className="flex items-center py-2 gap-4">
            <button
              className="flex px-3 py-1.5 items-center gap-1 opacity-[0.58] 
            rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              <p className="label-large-emphasis">{comment.num_hearts}</p>
            </button>
            <button
              className="flex px-3 py-1.5 items-center gap-1 opacity-[0.58] 
            rounded-xl hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsReplying((prev) => !prev)}
            >
              <MessageSquareText className="w-4 h-4" />

              <p className="label-large-emphasis">답글</p>
            </button>
          </div>

          {/* 대댓글 입력창 */}
          {isReplying && (
            <div className="w-full mt-2 flex flex-col gap-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md resize-none text-sm"
                placeholder="답글을 입력하세요"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitReply}
                  className="px-3 py-1 text-sm bg-[#3F2E63] text-white rounded hover:bg-[#2c1f4b]"
                >
                  등록
                </button>
              </div>
            </div>
          )}

          {/* 답글 보기 버튼 */}
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies((prev) => !prev)}
              className="text-sm text-gray-500 ml-2 hover:underline"
            >
              {showReplies
                ? `── 답글 숨기기`
                : `── 답글 보기 (${replies.length}개)`}
            </button>
          )}

          {/* 대댓글 목록 */}
          {showReplies && (
            <div className="ml-8 mt-2 flex flex-col gap-2">
              {replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-2">
                  <img
                    src={reply.profile_image || ""}
                    alt="reply-profile"
                    className="w-8 h-8 rounded-full object-cover bg-gray-200"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-[#1C1B21] label-large-emphasis">
                        {reply.name}
                      </p>
                      <span className="body-medium-emphasis text-[#1C1B21] opacity-[0.58]">
                        {reply.role}
                      </span>
                      <span className="body-medium text-[#47464F] opacity-[0.58]">
                        {reply.univ}
                      </span>
                      <span className="body-medium text-[#47464F] opacity-[0.58]">
                        {getTimeAgo(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C8C5D0]" />
    </div>
  );
};

export default CommentItem;
