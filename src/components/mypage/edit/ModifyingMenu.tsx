import { Check } from 'lucide-react';
import Save from './Save'; // Save 컴포넌트 경로에 맞게 수정 필요

interface ModifyingMenuProps {
  activeSection: string;
}

const ModifyingMenu = ({ activeSection }: ModifyingMenuProps) => {
  const lastModifiedDate = '2025. 07. 03'; // 실제 데이터로 교체 필요
  const menuItems = [
    { id: 'basic-info', label: '기본 정보' },
    { id: 'desired-conditions', label: '희망 조건' },
    { id: 'strengths', label: '강점 • 자기소개서' },
    { id: 'portfolio', label: '포트폴리오' },
    { id: 'history', label: '수상 • 수료 • 활동 이력' },
    { id: 'reception-status', label: '제안 수신 여부' },
  ];

  const handleMenuClick = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <Save />
      <div className="text-center text-sm text-gray-500">최종 수정일 : {lastModifiedDate}</div>
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-4 text-lg font-semibold">목록</h3>
        <div className="flex flex-col gap-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${activeSection === item.id ? 'bg-primary-100 text-primary-800 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {activeSection === item.id ? <Check size={18} className="text-primary-600" /> : <div className="w-[18px]" />}
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModifyingMenu;
