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
    <div className="flex-1 overflow-y-auto p-6 mx-[100px]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">프로필 관리</h1>
        <p className="text-gray-500">지원 후 수정한 프로필 내용(회원정보 제외)은 지원한 프로필에 반영 되지 않아요!</p>
      </div>
      <hr className="mb-16 border-t border-[#CBC4CF]" />

      <div
        className={`mb-16 flex items-center justify-between rounded-lg p-6 shadow transition-colors ${isReceivingOffers ? 'bg-[#FEF7FF]' : 'bg-white'}`}
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
            <h2 className="text-xl font-bold">현재 팀원 제안을 받지 않는 중 입니다.</h2>
            <p className="text-gray-500">언제든 다시 제안받기를 켤 수 있습니다.</p>
          </div>
        )}
        <ToggleSwitch isOn={isReceivingOffers} onToggle={() => setIsReceivingOffers(!isReceivingOffers)} />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">2025. 07. 03 최종 수정됨</p>
          </div>
          <button className="flex items-center gap-1 text-gray-500">
            <FilePenLine size={15} />
            <span className="text-sm hover:underline">수정하기</span>
          </button>
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <h3 className="mb-5 text-2xl font-bold">기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너</h3>
          <hr className="mb-5 border-t border-[#CBC4CF]" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">위치</p>
              <p className="ml-10">가천대학교 글로벌 캠퍼스, 서울 강남구, 성남 전체</p>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">파트</p>
              <p className="ml-10">Design</p>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">사용 가능 툴</p>
              <p className="ml-10">Figma, Adobe XD, Notion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileEdit;