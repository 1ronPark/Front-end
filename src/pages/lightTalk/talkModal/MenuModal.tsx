import { Pencil, Upload } from "lucide-react";

interface MenuModalProps {
  isMyPost: boolean;
  onClose: () => void;
}

const MenuModal = ({ isMyPost, onClose }: MenuModalProps) => {
  return (
    <div className="absolute top-10 right-4 h-auto w-[212px] bg-[#FFF] rounded-[12px] shadow-sm">
      <div className="flex flex-col py-2">
        <div className="h-[48px] px-3 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <div className="flex justify-center items-center w-6 h-6">
            <Upload className="w-5 h-5 text-[#1C1B21]" />
          </div>
          <span className="body-large text-[#1C1B21]">공유하기</span>
        </div>
        {isMyPost && (
          <div className="h-[48px] px-3 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
            <div className="flex justify-center items-center w-6 h-6">
              <Pencil className="w-5 h-5 text-[#1C1B21]" />
            </div>
            <span className="body-large text-[#1C1B21]">수정하기</span>
          </div>
        )}

        <div
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
          onClick={onClose}
        >
          닫기
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
