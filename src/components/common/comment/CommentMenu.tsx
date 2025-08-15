interface CommentMenuProps {
  onClose: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export default function CommentMenu({ onClose, onDelete, isDeleting }: CommentMenuProps) {
  return (
    <div className="absolute right-0 mt-2 w-[120px] rounded-lg border border-gray-200 bg-white shadow-lg z-50">
      <button
        onClick={() => {
          console.log("신고하기");
          onClose();
        }}
        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer"
      >
        🚨 신고하기
      </button>
      <button
        onClick={() => {
          onDelete?.();  //삭제 실행
          onClose();
        }}
        disabled={isDeleting}
        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer disabled:opacity-60"
      >
        🗑 {isDeleting ? "삭제 중..." : "삭제하기"}
      </button>
    </div>
  );
}
