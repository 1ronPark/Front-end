// import { useState } from 'react';  
import { useProfileStore } from '../../../store/useProfileStore';
import HistoryCard from '../../common/cards/historys/HistoryCard';

const History = () => {
  const histories = useProfileStore(state => state.histories);
  const setHistories = useProfileStore(state => state.setHistories);

  const addHistory = () => {
    setHistories([...histories, { name: '', startDate: '', hasEndDate: true, endDate: '' }]);
  };

  const handleHistoryChange = (index: number, updated: { name: string; startDate: string }) => {
    setHistories(histories.map((item, i) => (i === index ? { ...item, ...updated } : item)));
  };


  const handleDelete = (index: number) => {
    setHistories(histories.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">수상 • 활동 이력</h2>
        <hr className="my-4 border-[#EAE9EA]" />
      </div>

      <div className="space-y-4">
        {histories.map((history, index) => (
          <HistoryCard
            key={index}
            history={history}
            onDelete={() => handleDelete(index)}
            onChange={(updated) => handleHistoryChange(index, updated)}
          />
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
