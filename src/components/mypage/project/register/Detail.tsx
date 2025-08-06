import { Plus } from "lucide-react";
import { useState } from "react";
import PortfolioModal from "../../modal/PortfolioModal";
import { useRegisterProjectStore } from "../../../../store/registerProjectStore";

const Detail = () => {
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  const { description, setField } = useRegisterProjectStore();
  const maxLength = 3000;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">프로젝트 상세</h2>
        <hr className="my-4 border-[#EAE9EA]" />

      <div className="space-y-4">
        <div className="flex items-center">
          <p className="text-sm font-semibold">프로젝트 기획서, 링크</p>
          <p className="text-lg font-semibold text-orange-500">*</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setPortfolioModal(true)}
              className="flex w-full h-60 flex-col rounded-lg items-center justify-center gap-2 border-1 border-dashed border-gray-300 text-gray-500 shadow hover:scale-105 hover:cursor-pointer"
            >
              <Plus size={48} />
            </button>
          </div>
        </div>
        {portfolioModal && (
          <PortfolioModal onClose={() => setPortfolioModal(false)} />
        )}
      </div>

      {/* 자기소개 영역 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-sm font-semibold">설명</h3>
                <h3 className="text-sm font-semibold text-orange-500">*</h3>
              </div>
              <span className="text-sm text-gray-500">
                <span className = "text-[#6C63FF]">{description?.length ?? 0}</span> / {maxLength}
              </span>
            </div>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-primary-500 focus:outline-none text-sm"
              rows={1}
              placeholder="프로젝트에 대해 자세한 설명을 해주세요."
              value={description}
              onChange={(e) =>
                setField('description', e.target.value)
              }
              maxLength={maxLength}
            ></textarea>
          </div>
    </div>
  );
};

export default Detail;
