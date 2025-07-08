import { useState } from 'react';

const History = () => {
  const [historyText, setHistoryText] = useState('');
  const maxLength = 3000;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setHistoryText(e.target.value);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">수상 • 수료 • 활동 이력</h2>
        <hr className="my-4" />
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-8">
        <div>
          <h3 className="text-lg font-semibold">이력</h3>
        </div>
        <div>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-4 text-gray-700 focus:border-primary-500 focus:outline-none"
            rows={10}
            placeholder="자신이 수상한 내역, 프로그램 수료내용, 각종 활동 내용을 입력해 주세요. 예시: OO동아리: 디자인파트 운영진 / OO해커톤: 우수상"
            value={historyText}
            onChange={handleInputChange}
          ></textarea>
          <div className="text-right text-sm text-gray-500">
            {historyText.length}/{maxLength}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
