import { useEffect, useRef } from "react";
import { Pencil, Siren, Trash2, Upload } from "lucide-react";

interface MenuModalProps {
  isMyPost: boolean;
  onClose: () => void;
  onShareClick: () => void; // ✅ 공유 버튼 클릭 핸들러 추가
}

const MenuModal = ({ isMyPost, onClose, onShareClick }: MenuModalProps) => {
  // 바깥 클릭시 모달을 사라지게하는 ref
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // 모달 외부 클릭 시 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute top-10 right-4 h-auto w-[212px] bg-[#FFF] rounded-[12px] shadow-sm z-50"
    >
      <div className="flex flex-col py-2">
        {/* 공유하기 버튼 */}
        <button
          className="h-[48px] px-3 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
          onClick={onShareClick}
        >
          <div className="flex justify-center items-center w-6 h-6">
            <Upload className="w-5 h-5 text-[#1C1B21]" />
          </div>
          <span className="body-large text-[#1C1B21]">공유하기</span>
        </button>

        <div className="flex flex-col justify-center items-start py-2 ">
          <div className="w-full  h-[1px] bg-[#C8C5D0]"></div>
        </div>
        {/* 수정하기 버튼 => 만약 내가 쓴 글이면 */}
        {isMyPost && (
          <button className="h-[48px] px-3 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
            <div className="flex justify-center items-center w-6 h-6">
              <Pencil className="w-5 h-5 text-[#1C1B21]" />
            </div>
            <span className="body-large text-[#1C1B21]">수정하기</span>
          </button>
        )}
        {isMyPost && (
          <div className="flex flex-col justify-center items-start py-2 ">
            <div className="w-full  h-[1px] bg-[#C8C5D0]"></div>
          </div>
        )}
        {/* 삭제버튼 */}
        {isMyPost && (
          <button className="h-[48px] px-3 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
            <div className="flex justify-center items-center w-6 h-6">
              <Trash2 className="w-5 h-5 text-[#BA1A1A]" />
            </div>
            <span className="body-large text-[#BA1A1A]">삭제하기</span>
          </button>
        )}
        {/* 신고버튼 */}
        {!isMyPost && (
          <button className="h-[48px] px-3 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
            <div className="flex justify-center items-center w-6 h-6">
              <Siren className="w-5 h-5 text-[#BA1A1A]" />
            </div>
            <span className="body-large text-[#BA1A1A]">신고하기</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuModal;
