import { useState } from 'react';
import DeleteIcon from '../../../../assets/icons/ic_delete.svg';

interface HistoryCardProps {
  history: {
    name: string;
    startDate: string;
  };
  onDelete: () => void;
  onChange: (updated: { name: string; startDate: string }) => void;
}

const HistoryCard = ({ history, onDelete, onChange }: HistoryCardProps) => {
  const [name, setName] = useState(history.name);
  const [startDate, setStartDate] = useState(history.startDate);
  const [dateError, setDateError] = useState(false);
  const isValidDateFormat = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

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
            placeholder="활동명을 입력하세요"
            value={name}
            onChange={(e) => {
              const newName = e.target.value;
              setName(newName);
              console.log('name changed:', newName);
              onChange({ name: newName, startDate });
            }}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
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
            placeholder='YYYY-MM-DD'
            value={startDate}
            onChange={(e) => {
              const newStartDate = e.target.value;
              setStartDate(newStartDate);

              const isValid = isValidDateFormat(newStartDate);
              setDateError(!isValid);

              if (isValid) {
                console.log('startDate changed:', newStartDate);
                onChange({ name, startDate: newStartDate });
              }
            }}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
          {dateError && (
            <p className="mt-1 text-sm text-[#5A5891]">날짜 형식은 YYYY-MM-DD이어야 합니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;