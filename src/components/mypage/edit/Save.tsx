// components/mypage/edit/Save.tsx
import { Folder } from "lucide-react";

export default function Save({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-center py-6">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#5A5891] px-15 py-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#4A477C] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Folder size={20} />
        <span>프로필 저장</span>
      </button>
    </div>
  );
}
