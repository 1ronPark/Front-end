// 추후에 로직 설정이 필요.
// 만약 프로젝트 소유자가 지원을 거절하면 자동으로 서버에서도 나한테 주는 지원했던 프로젝트 정보에서 없어질 것인지 아닌지 확정 필요.
// 지금 당장에서 안보이게 하고싶어도 localStorage에 숨기는 itemId를 설정하고 처리할 순 있지만, 옵션 등으로 숨김 보임 처리 등이 필요.

import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";

interface MenuModalProps {
  onClose: () => void;
  onShareClick: () => void; // ✅ 공유 버튼 클릭 핸들러 추가
}

const MenuModal = ({ onClose}: MenuModalProps) => {
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
        {/* 수정하기 버튼 => 만약 내가 쓴 글이면 */}
        {/* 삭제버튼 */}
        {(
          <button
            onClick={() => alert("아직 지원하지 않는 기능입니다.")}
            className="h-[48px] px-3 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex justify-center items-center w-6 h-6">
              <Trash2 className="w-5 h-5 text-[#BA1A1A]" />
            </div>
            <span className="body-large text-[#BA1A1A]">삭제하기</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuModal;
