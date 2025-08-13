import { Plus } from "lucide-react";
import PortfolioCard from "../../common/cards/portfolio/PortfolioCard";
import githubIcon from "../../../assets/GitHub.svg";
import { useState } from "react";
import type { ChangeEvent } from "react";
import PortfolioModal from "../modal/PortfolioModal";

const Portfolio = () => {
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  const [introText, setIntroText] = useState("");
  const maxLength = 3000;

  // 임시 로직
  const handleConfirm = () => {
    // TODO: 새 포트폴리오 아이템 저장 로직 (상태에 추가 or API 호출)
    console.log("confirmed");
    setPortfolioModal(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">자기소개 • 포트폴리오</h2>
        <hr className="my-4 border-[#EAE9EA]" />
        </div>
          {/* 자기소개 영역 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">자기소개</h3>
                <h3 className="text-lg font-semibold text-orange-500">*</h3>
              </div>
              <span className="text-sm text-gray-500">
                <span className = "text-[#6C63FF]">{introText.length}</span> / {maxLength}
              </span>
            </div>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-4 text-gray-700 focus:border-primary-500 focus:outline-none"
              rows={5}
              placeholder="포트폴리오가 없어도 자신을 어필할 수 있어요."
              value={introText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setIntroText(e.target.value)
              }
              maxLength={maxLength}
            ></textarea>
          </div>

      <hr className="y-2 border-[#EAE9EA]" />
      <div className="space-y-4">
          <h3 className="text-lg font-semibold">포트폴리오 파일, 링크</h3>
        <div className="grid grid-cols-3 gap-4">
          <PortfolioCard title="홍길동님의 Github" imageUrl={githubIcon} />
          {/* 포트폴리오 추가 카드 */}
          <div className="flex h-63 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:scale-105">
            <button
              onClick={() => setPortfolioModal(true)}
              className="flex w-full h-full flex-col items-center justify-center gap-2 text-gray-500 hover:cursor-pointer"
            >
              <Plus size={48} />
            </button>
          </div>
        </div>
        {portfolioModal && (
          <PortfolioModal 
            onClose={() => setPortfolioModal(false)}
            onConfirm={handleConfirm} />
        )}
      </div>
    </div>
  );
};

export default Portfolio;
