import { EllipsisVertical } from "lucide-react";
import CommentMenu from "./CommentMenu";
import profile1 from "../../../assets/icons/projectDetail/profileExam1.png";
import { useState } from "react";

export default function CommentItem() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full flex items-start justify-between gap-4 p-4 rounded-md bg-white">
      {/* 왼쪽: 프로필 이미지 */}
      <img
        src={profile1}
        alt="프로필 이미지"
        className="w-12 h-12 rounded-full mt-1 object-cover object-top"
      />

      {/* 가운데: 닉네임 + 내용 */}
      <div className="flex-1 p-2 flex flex-col">
        <span className="body-large-emphasis text-[#47464F] mb-1">히로</span>
        <p className="body-medium-emphasis mb-6 text-[#49454E] break-words">
          댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
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
        {menuOpen && <CommentMenu onClose={() => setMenuOpen(false)} />}
      </div>
    </div>
  );
}
