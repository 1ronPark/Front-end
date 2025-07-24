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
  confirmText = "지원하기",
  cancelText = "닫기",
  onConfirm,
  onCancel,
}: BaseModalProps) => {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col bg-white rounded-2xl p-8 w-[384px] text-center shadow-lg gap-14">
        {/* 제목 영역 */}
        {title && (
          <h2 className="headline-large-emphasis mb-6">
            <span className="text-[#5A5891]">{title}</span>
            {description}
          </h2>
        )}

        {/* 설명 영역 or children */}
        <div className="flex flex-col p-4 gap-2">
          {/* 버튼 영역 */}
          <button
            type="button"
            onClick={onConfirm}
            className="w-full px-6 py-4 rounded-xl bg-[#5A5891] text-white title-medium-emphasis"
          >
            {confirmText}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-6 py-4 rounded-xl border border-[#CBC6D9] text-[#49454E] title-medium-emphasis"
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
