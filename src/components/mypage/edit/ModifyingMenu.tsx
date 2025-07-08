import { Check} from 'lucide-react';
import Save from './Save'; // Save 컴포넌트 경로에 맞게 수정 필요


const ModifyingMenu = () => {
  const lastModifiedDate = "2025. 07. 03"; // 실제 데이터로 교체 필요
  const menuItems = [
    { label: "기본 정보", selected: false },
    { label: "희망 조건", selected: false },
    { label: "강점 • 자기소개서", selected: false },
    { label: "포트폴리오", selected: false },
    { label: "수상 • 수료 • 활동 이력", selected: false },
    { label: "제안 수신 여부", selected: true },
  ];

  return (
    <div className="flex flex-col gap-2 p-4 w-56">
      <Save />
      <div className="text-center text-sm text-gray-500">
        최종 수정일 : {lastModifiedDate}
      </div>
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-4 text-lg font-semibold">목록</h3>
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${item.selected ? 'bg-primary-100 text-primary-800' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {item.selected ? <Check size={18} className="text-primary-600" /> : <div className="w-[18px]" />}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModifyingMenu;
