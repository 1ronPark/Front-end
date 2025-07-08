import { Plus } from 'lucide-react';
import PortfolioCard from './PortfolioCard';

const Portfolio = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">포트폴리오</h2>
        <hr className="my-4" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <PortfolioCard title="일론박님의 Github" imageUrl="https://via.placeholder.com/300x160" />

        {/* 포트폴리오 추가 카드 */}
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
          <button className="flex flex-col items-center justify-center gap-2 text-gray-500">
            <Plus size={48} />
            <span>포트폴리오 추가</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
