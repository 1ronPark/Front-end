import ReactDOM from "react-dom";

type BaseModalProps = {
  visible: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode; // 설명 대신 직접 커스텀 내용 넣고 싶을 때
};

const BaseModal = ({
  visible,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: BaseModalProps) => {
  if (!visible) return null;

  //디버깅용
  console.log(document.getElementById("modal-root"));

  return ReactDOM.createPortal(
    //sideNavbar & mainNavbar : z-50 / 말풍선 : z-30
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="absolute inset-0" onClick={onCancel}></div>
      <div
        className="flex flex-col bg-white rounded-2xl p-8 w-[384px] text-center shadow-lg gap-14 z-35"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="headline-large-emphasis">
          {title && <span className="text-[#6C63EF]">{title}</span>}
          {description && (
            <span className="text-[#1C1B21] break-keep whitespace-normal">
              {" "}
              {description}
            </span>
          )}
        </div>
        {/* 설명 영역 or children */}
        <div className="flex flex-col p-4 gap-2">
          {/* 버튼 영역 */}
          <button
            type="button"
            onClick={onConfirm}
            className="w-full px-6 py-4 rounded-xl bg-[#5A5891] text-white title-medium-emphasis
            hover:bg-[#413f7c] transition-colors duration-200 cursor-pointer"
          >
            {confirmText}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-6 py-4 rounded-xl border border-[#CBC6D9] text-[#49454E] title-medium-emphasis
            hover:bg-[#f7f4ff] transition-colors duration-200 cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default BaseModal;
