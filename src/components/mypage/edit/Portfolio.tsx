import { Plus } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import githubIcon from "../../../assets/GitHub.svg";
import { useState } from "react";
import PortfolioModal from "../modal/PortfolioModal";

const Portfolio = () => {
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">포트폴리오</h2>
        <hr className="my-4 border-[#EAE9EA]" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <PortfolioCard title="일론박님의 Github" imageUrl={githubIcon} />

        {/* 포트폴리오 추가 카드 */}
        <div className="flex h-63 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
          <button
            onClick={() => setPortfolioModal(true)}
            className="flex w-full h-full flex-col items-center justify-center gap-2 text-gray-500 hover:cursor-pointer"
          >
            <Plus size={48} />
          </button>
        </div>
      </div>

      {portfolioModal && (
        <PortfolioModal onClose={() => setPortfolioModal(false)} />
      )}
    </div>
  );
};

export default Portfolio;
