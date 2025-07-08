import { useState } from 'react';
import { Check, X } from 'lucide-react';

const ToggleSwitch = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
  <div
    className={`relative h-8 w-14 cursor-pointer rounded-full transition-colors ${isOn ? 'bg-[#68548E]' : 'bg-gray-300'}`}
    onClick={onToggle}
    role="switch"
    aria-checked={isOn}
    tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onToggle()}
  >
    <div
      className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 transform rounded-full bg-white shadow transition-transform ${isOn ? 'translate-x-7' : 'translate-x-1'}`}
    >
      {isOn ? (
        <Check className="m-auto h-full w-full p-1 text-[#68548E]" />
      ) : (
        <X className="m-auto h-full w-full p-1 text-[#68548E]" />
      )}
    </div>
  </div>
);

const Reception = () => {
  const [isReceivingOffers, setIsReceivingOffers] = useState(true);

  return (
    <div
      className="mb-16 flex items-center justify-between rounded-lg bg-[#F8F1FA] p-6 shadow"
    >
      {isReceivingOffers ? (
        <div>
          <h2 className="text-xl font-bold">
            현재 팀원 제안을 <span className="text-[#895EDB]">받는 중</span> 입니다.
          </h2>
          <p className="text-gray-500">프로필 등록을 통해 남들과 다른 차별성을 가져보세요!</p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">현재 팀원 제안을 <span className="text-[#FF5449]">받지 않는 중</span> 입니다.</h2>
          <p className="text-gray-500">팀원 제안을 받고, 프로젝트 경험을 통해 성장과 창업의 기회를 얻어보세요!</p>
        </div>
      )}
      <ToggleSwitch isOn={isReceivingOffers} onToggle={() => setIsReceivingOffers(!isReceivingOffers)} />
    </div>
  );
};

export default Reception;