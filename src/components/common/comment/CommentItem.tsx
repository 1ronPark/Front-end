import { EllipsisVertical } from "lucide-react";
import CommentMenu from "./CommentMenu";
import defaultProfile from "../../../assets/ic_myprofile.svg";
import { useState } from "react";
import { useProjectDetailCtx } from "../../../types/ProjectDetailContext"; // ✅ 추가
import { useDeleteComment } from "../../../hooks/useProjectComment"; // ✅ 추가

type CommentItemProps = {
  itemCommentId: number; // 댓글 ID
  authorName: string;
  authorProfileImageURL?: string;
  content: string;
  updatedAt: string; // ISO
};

export default function CommentItem({
  itemCommentId,
  authorName,
  authorProfileImageURL,
  content,
  updatedAt,
}: CommentItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemId } = useProjectDetailCtx();
  const deleteMutation = useDeleteComment(itemId);
  // 프로필 이미지가 없을 경우 기본 이미지 사용
  const profileFallback = authorProfileImageURL || defaultProfile;

  const timeStamp = (() => {
    const date = new Date(updatedAt);
    return isNaN(date.getTime()) ? "" : date.toLocaleString();
  })();

  const handleDelete = () => {
    if (deleteMutation.isPending) return;
    if (!confirm("댓글을 삭제할까요?")) return;
    deleteMutation.mutate({ commentId: itemCommentId });
  };

  return (
    <div className="w-full flex items-start justify-between gap-4 p-4 rounded-md bg-white">
      {/* 왼쪽: 프로필 이미지 */}
      <img
        src={authorProfileImageURL || profileFallback}
        alt="프로필 이미지"
        className="w-12 h-12 rounded-full mt-1 object-cover object-top"
      />

      {/* 가운데: 닉네임 + 내용 */}
      <div className="flex-1 p-2 flex flex-col">
        <span className="body-large-emphasis text-[#47464F] mb-1">
          {authorName}
        </span>
        {timeStamp && <span className="text-xs text-[#8A8A8A]">{timeStamp}</span>}
        <p className="body-medium-emphasis mb-6 text-[#49454E] break-words">
          {content}
        </p>
      </div>

      {/* 오른쪽: 더보기 버튼 */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-500 hover:text-black cursor-pointer"
        >
          <EllipsisVertical className="w-5 h-5" />
        </button>
        {menuOpen && (
          <CommentMenu
            onClose={() => setMenuOpen(false)}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}
