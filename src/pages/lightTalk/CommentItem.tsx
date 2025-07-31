import { EllipsisVertical, Heart, MessageSquareText } from "lucide-react";
import type { TalkCommentProps } from "../../types/LightTalkProps";
import { useState } from "react";
import CommentMenuModal from "./talkModal/CommentMenuModal";

interface CommentItemProps {
  comment: TalkCommentProps;
  onReplyClick: () => void;
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

const CommentItem = ({ comment, onReplyClick }: CommentItemProps) => {
  // 내 게시물인지 여부
  const isMyPost = comment.currentUserId === comment.userId;

  //카드 메뉴 모달 열기
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  //메뉴 모달 열기
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 버블링 방지
    setTimeout(() => {
      setOpenMenu(true); // 비동기로 열기
    }, 0);
  };

  return (
    <div className="relative w-[640px] flex items-start px-8 pt-4 gap-4 bg-[#FEFEFE]">
      <div className="h-12 w-12 absolute top-0 right-2 flex justify-center items-center">
        <button
          className="flex h-8 w-8 flex-col justify-center items-center rounded-[100px] hover:bg-[rgba(73,69,79,0.08)]"
          onClick={handleMenuClick}
        >
          <EllipsisVertical className="w-5 h-5 " />
        </button>
      </div>
      {openMenu && (
        <CommentMenuModal
          isMyPost={isMyPost}
          onClose={() => setOpenMenu(false)}
        />
      )}
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
        {/* 이름, 역할, 학교, 시간 */}
        <div className="flex items-center gap-2">
          <p className="text-[#1C1B21] label-large-emphasis">{comment.name}</p>
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

        {/* 텍스트 내용 */}
        <p className="body-medium whitespace-pre-line text-[#1C1B21]">
          {comment.content.trim()}
        </p>

        {/* 하단 버튼들 */}
        <div className="flex items-center py-2 gap-4">
          <div className="flex px-3 py-1.5 items-center gap-1 opacity-[0.58] rounded-xl hover:bg-gray-100">
            <Heart className="w-4 h-4" />
            <p className="label-large-emphasis">{comment.num_hearts}</p>
          </div>
          <div className="flex px-3 py-1.5 items-center gap-1 opacity-[0.58] rounded-xl hover:bg-gray-100">
            <button onClick={onReplyClick}>
              <MessageSquareText className="w-4 h-4" />
            </button>
            <p className="label-large-emphasis">답글</p>
          </div>
        </div>
      </div>

      {/* 카드 하단 구분선 */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C8C5D0]" />
    </div>
  );
};

export default CommentItem;
