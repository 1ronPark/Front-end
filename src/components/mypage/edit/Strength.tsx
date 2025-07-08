import { useState } from 'react';

const Strength = () => {
  const [introduction, setIntroduction] = useState('');
  const maxLength = 3000;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setIntroduction(e.target.value);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">강점 • 자기소개서</h2>
        <hr className="my-4" />
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-8">
        <div>
          <h3 className="text-lg font-semibold">자기소개</h3>
        </div>
        <div>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-4 text-gray-700 focus:border-primary-500 focus:outline-none"
            rows={10}
            placeholder="자기 소개를 입력해 주세요"
            value={introduction}
            onChange={handleInputChange}
          ></textarea>
          <div className="text-right text-sm text-gray-500">
            {introduction.length}/{maxLength}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strength;
