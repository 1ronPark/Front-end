import { useState } from 'react';
import HistoryCard from '../../common/cards/historys/HistoryCard';

interface HistoryItem {
  id: number;
  activity: string;
  date: string;
}

const History = () => {
  const [histories, setHistories] = useState<HistoryItem[]>([
    { id: 1, activity: '', date: '' },
  ]);

  const addHistory = () => {
    setHistories([...histories, { id: Date.now(), activity: '', date: '' }]);
  };

  const deleteHistory = (id: number) => {
    setHistories(histories.filter(h => h.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">수상 • 활동 이력</h2>
        <hr className="my-4 border-[#EAE9EA]" />
      </div>

      <div className="space-y-4">
        {histories.map(history => (
          <HistoryCard key={history.id} onDelete={() => deleteHistory(history.id)} />
        ))}
      </div>

      <button
        onClick={addHistory}
        className="w-full rounded-lg border-2 border-dashed border-gray-300 py-4 text-center text-gray-500 hover:bg-gray-50"
      >
        + 수상 및 활동 추가하기
      </button>
    </div>
  );
};

export default History;
