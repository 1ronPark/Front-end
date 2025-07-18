import { User, IdCard, Code } from "lucide-react";

interface Props {
  currentTab: "info" | "edit" | "projects";
  setCurrentTab: (tab: "info" | "edit" | "projects") => void;
}

const TABS = [
  { id: "info" as const, label: "회원 정보", Icon: User },
  { id: "edit" as const, label: "프로필", Icon: IdCard },
  { id: "projects" as const, label: "프로젝트", Icon: Code },
];

const MypageSidebar = ({ currentTab, setCurrentTab }: Props) => {
  const getButtonClass = (tabId: "info" | "edit" | "projects") =>
    currentTab === tabId
      ? "flex items-center gap-3 rounded-full bg-[#E9DEF8] px-4 py-2 text-md font-semibold text-primary-800"
      : "flex items-center gap-3 rounded-full px-4 py-2 text-md text-gray-600 hover:bg-gray-100";

  return (
    <div className="h-full w-[176px] rounded-r-2xl p-4">
      <div className="flex flex-col gap-2">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={getButtonClass(id)}
            onClick={() => setCurrentTab(id)}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MypageSidebar;
