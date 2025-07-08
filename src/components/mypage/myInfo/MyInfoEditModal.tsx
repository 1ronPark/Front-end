interface EditModalProps {
  onClose: () => void;
}

const MyInfoEditModal = ({ onClose }: EditModalProps) => {
  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center">
      {/* 바깥 영역 클릭 시 닫기 */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 모달 콘텐츠 */}
      <div
        className="relative z-10 w-[520px] bg-[#FFF] rounded-lg shadow-lg p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <div className="flex justify-between items-center">
          <h2 className="headline-small-emphasis">회원정보 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 수정 폼 영역 - 임시로 예시 */}
        <div className="flex flex-col gap-3">
          <label>
            이름
            <input
              type="text"
              className="w-full border px-3 py-1 rounded"
              placeholder="예: 홍길동"
            />
          </label>
          {/* 필요한 필드들 추가 */}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            취소
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoEditModal;
