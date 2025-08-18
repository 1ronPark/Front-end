import { Plus } from "lucide-react";
import PortfolioCard from "../../../common/cards/portfolio/PortfolioCard";
import githubIcon from "../../../../assets/GitHub.svg";
import { useState, useEffect } from "react";
import PortfolioModal from "../../modal/PortfolioModal";
import { useRegisterProjectStore } from "../../../../store/registerProjectStore";
import { useEditProjectStore } from "../../../../store/editProjectStore";
import type { PortfolioItemData } from "../../modal/PortfolioModal"; // PortfolioItemData 임포트

const Detail = () => {
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemData[]>([]); // 포트폴리오 항목 상태
  const registerStore = useRegisterProjectStore();
  const editStore = useEditProjectStore();
  const isEditMode = editStore.isEditMode;
  const description = isEditMode ? editStore.description : registerStore.description;
  const maxLength = 3000;

  const handleConfirmPortfolio = (data: PortfolioItemData) => {
    setPortfolioItems((prevItems) => [...prevItems, data]);
    // type에 따라 각각 저장 (추가)
    if (data.type === 'file') {
      if (isEditMode) {
        editStore.setField('itemPlanFile', data.file);
      } else {
        registerStore.setField('itemPlanFile', data.file);
      }      // 파일 첨부 → itemPlanFile
    }
    if (data.type === 'github') {
      if (isEditMode) {
        editStore.setField('extraLink1', data.url);
      } else {
        registerStore.setField('extraLink1', data.url);
      }         // github → extraLink1
    }
    if (data.type === 'blog') {
      if (isEditMode) {
        editStore.setField('extraLink2', data.url);
      } else {
        registerStore.setField('extraLink2', data.url);
      }         // blog → extraLink2
    }
  };

  useEffect(() => {
  // 1. 파일은 itemPlanFile로, 링크는 각각 extraLink1/extraLink2로
  let planFileSet = false;
  portfolioItems.forEach(item => {
    if (item.type === 'file' && !planFileSet) {
      if (isEditMode) {
        editStore.setField('itemPlanFile', item.file);
      } else {
        registerStore.setField('itemPlanFile', item.file);
      } // 파일 첨부는 딱 한 번만
      planFileSet = true;
    }
    if (item.type === 'github') {
      if (isEditMode) {
        editStore.setField('extraLink1', item.url);
      } else {
        registerStore.setField('extraLink1', item.url);
      } // github 링크
    }
    if (item.type === 'blog') {
      if (isEditMode) {
        editStore.setField('extraLink2', item.url);
      } else {
        registerStore.setField('extraLink2', item.url);
      } // blog 링크
    }
  });

  // 파일/링크가 빠졌을 경우 초기화
  if (!portfolioItems.some(item => item.type === 'file')) {
    if (isEditMode) {
      editStore.setField('itemPlanFile', null);
    } else {
      registerStore.setField('itemPlanFile', null);
    }
  }
  if (!portfolioItems.some(item => item.type === 'github')) {
    if (isEditMode) {
      editStore.setField('extraLink1', '');
    } else {
      registerStore.setField('extraLink1', '');
    }
  }
  if (!portfolioItems.some(item => item.type === 'blog')) {
    if (isEditMode) {
      editStore.setField('extraLink2', '');
    } else {
      registerStore.setField('extraLink2', '');
    }
  }
}, [isEditMode]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">프로젝트 상세</h2>
        <hr className="my-4 border-[#EAE9EA]" />
        </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <p className="text-sm font-semibold">프로젝트 기획서, 링크</p>
          <p className="text-lg font-semibold text-orange-500">*</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* 기존 더미 카드 제거 */}
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={index} // 고유한 key 필요
              title={item.type === 'file' ? item.file.name : item.url} // 파일 이름 또는 URL
              imageUrl={githubIcon} // displayUrl 사용
              onDelete={() => {
                setPortfolioItems((prevItems) =>
                  prevItems.filter((_, i) => i !== index),
                );
              }
            }
            />
          ))}
          {/* 포트폴리오 추가 카드 */}
          {portfolioItems.length < 3 && (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:scale-105">
              <button
                onClick={() => setPortfolioModal(true)}
                className="flex w-full h-full flex-col items-center justify-center gap-2 text-gray-500 hover:cursor-pointer"
              >
                <Plus size={48} />
              </button>
            </div>
          )}
        </div>
        {portfolioModal && (
          <PortfolioModal
            onClose={() => setPortfolioModal(false)}
            onConfirm={handleConfirmPortfolio} // onConfirm prop 전달
          />
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
              onChange={(e) => {
                if (isEditMode) {
                  editStore.setField('description', e.target.value);
                } else {
                  registerStore.setField('description', e.target.value);
                }
              }}
              maxLength={maxLength}
            ></textarea>
          </div>
    </div>
  );
};

export default Detail;