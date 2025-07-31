import SupportImage from "../../../../assets/icons/projectDetail/SupportImage.png";

type AppliedSuccessModalProps = {
  isVisible: boolean;
  title: string;
  onClose: () => void;
};

const AppliedSuccessModal = ({
  isVisible,
  title,
  onClose,
}: AppliedSuccessModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      {/* 바깥 클릭 시 닫기 방지 */}
      <div
        className="flex flex-col items-center justify-center gap-[64px] w-[384px] bg-white p-8 rounded-2xl shadow-xl text-center
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4 px-6">
          <img
            src={SupportImage}
            alt="지원 완료"
            className="w-[240px] h-[190px]"
          />
          <h2 className="headline-large-emphasis">
            {title} 프로젝트에
            <br />
            지원했어요
          </h2>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-4 rounded-2xl bg-[#5A5891] text-white title-medium-emphasis 
          hover:bg-[#413f7c] transition-colors duration-200 cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AppliedSuccessModal;
