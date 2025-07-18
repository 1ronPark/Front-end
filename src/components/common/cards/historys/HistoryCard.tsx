import React from 'react';
import DeleteIcon from '../../../../assets/icons/ic_delete.svg';

interface HistoryCardProps {
  onDelete: () => void;
}

const HistoryCard = ({ onDelete }: HistoryCardProps) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-md">
      <div className="mb-4 flex justify-end">
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
        >
          <img src={DeleteIcon} alt="지우기" className="h-5 w-5" />
          <span>지우기</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              활동명
            </label>
            <label className="mb-2 block text-sm font-semibold text-orange-500">
              *
            </label>
          </div>
          <input
            type="text"
            placeholder="활동 명을 입력해 주세요."
            className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              일시
            </label>
            <label className="mb-2 block text-sm font-semibold text-orange-500">
              *
            </label>
          </div>
          <input
            type="text"
            placeholder="YYYY / MM"
            className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
