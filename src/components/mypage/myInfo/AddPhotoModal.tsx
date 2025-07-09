import { X } from "lucide-react";

interface AddPhotoProps {
  onClose: () => void;
}

const AddPhotoModal = ({ onClose }: AddPhotoProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
      {/* 바깥 클릭 시 닫기 */}
      <div className="absolute inset-0 " onClick={onClose}></div>
      {/* 모달 박스 */}
      <div
        className="relative z-10 w-[520px] h-auto bg-[#FFF] flex flex-col py-8 rounded-xl gap-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 부분 */}
        <div className="flex justify-between items-center px-8">
          <p className="headline-small-emphasis">프로필 사진 등록</p>
          <button
            onClick={onClose}
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <X className="w-[32px] h-[32px]" />
          </button>
        </div>
        {/* 파일 선택 부분 */}
        <div className="flex flex-col justify-center items-center px-8 gap-6">
          <input
            type="text"
            placeholder="등록할 사진을 찾아주세요. (최대4MB)"
          />
        </div>
        {/* 적용 부분 */}
        <div className="w-[520px] h-[56px] px-8 flex justify-end items-center gap-3">
          <button
            className="w-[123px] h-[56px] flex justify-center items-center rounded-xl
          bg-[#68548E] title-medium text-[#FFF]"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhotoModal;
