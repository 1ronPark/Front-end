import { useState } from 'react';
import { MapPin, Briefcase, Wrench, FilePenLine, Check } from 'lucide-react';

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
      {isOn && <Check className="m-auto h-full w-full p-1 text-[#68548E]" />}
    </div>
  </div>
);

const MyProfileEdit = () => {
  const [isReceivingOffers, setIsReceivingOffers] = useState(true);

  return (
    <div className="p-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">프로필 관리</h1>
        <p className="text-gray-500">지원 후 수정한 프로필 내용(회원정보 제외)은 지원한 프로필에 반영 되지 않아요!</p>
      </div>

      <div
        className={`mb-10 flex items-center justify-between rounded-lg p-6 shadow transition-colors ${isReceivingOffers ? 'bg-[#FEF7FF]' : 'bg-white'}`}
      >
        {isReceivingOffers ? (
          <div>
            <h2 className="text-xl font-bold">현재 팀원 제안을 받는 중 입니다.</h2>
            <p className="text-gray-500">프로필 등록을 통해 남들과 다른 차별성을 가져보세요!</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">지금은 팀원 제안을 받지 않고 있어요.</h2>
            <p className="text-gray-500">언제든 다시 제안받기를 켤 수 있습니다.</p>
          </div>
        )}
        <ToggleSwitch isOn={isReceivingOffers} onToggle={() => setIsReceivingOffers(!isReceivingOffers)} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">프로필 관리</h2>
            <p className="text-sm text-gray-500">2025. 07. 03 최종 수정됨</p>
          </div>
          <button className="flex items-center gap-1 text-gray-500">
            <FilePenLine size={20} />
            <span>수정하기</span>
          </button>
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <h3 className="mb-6 text-2xl font-bold">기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너</h3>
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">위치</p>
                <p>가천대학교 글로벌 캠퍼스, 서울 강남구, 성남 전체</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Briefcase className="mt-1 h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">파트</p>
                <p>Design</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Wrench className="mt-1 h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">사용 가능 툴</p>
                <p>Figma, Adobe XD, Notion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileEdit;