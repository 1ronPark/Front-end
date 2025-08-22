// components/mypage/edit/Save.tsx
import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Save({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center py-6">
      <button
        onClick={() => {
          onClick();
          navigate("/myprofile?tab=edit");
        }}
        disabled={disabled}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#5A5891] px-15 py-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#4A477C] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Folder size={20} />
        <span>프로필 저장</span>
      </button>
    </div>
  );
}
