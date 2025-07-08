import IcPerson from '../../assets/icons/mypage/ic_person.svg';
import IcIdCard from '../../assets/icons/mypage/ic_id_card.svg';
import IcCode from '../../assets/icons/mypage/ic_code.svg';

interface Props {
  activeTab: 'info' | 'edit' | 'projects';
  setActiveTab: (tab: 'info' | 'edit' | 'projects') => void;
}

const MypageSidebar = ({ activeTab, setActiveTab }: Props) => {
  const getButtonClass = (tab: 'info' | 'edit' | 'projects') =>
    activeTab === tab
      ? 'flex items-center gap-3 rounded-full bg-[#E9DEF8] px-4 py-2 text-md font-semibold text-primary-800'
      : 'flex items-center gap-3 rounded-full px-4 py-2 text-md text-gray-600 hover:bg-gray-100';

  return (
    <div className="h-full w-55 rounded-r-2x p-4">
      <div className="flex flex-col gap-2">
        <button className={getButtonClass('info')} onClick={() => setActiveTab('info')}>
          <img src={IcPerson} alt="회원 정보 아이콘" />
          <span>회원 정보</span>
        </button>
        <button className={getButtonClass('edit')} onClick={() => setActiveTab('edit')}>
          <img src={IcIdCard} alt="프로필 아이콘" />
          <span>프로필</span>
        </button>
        <button className={getButtonClass('projects')} onClick={() => setActiveTab('projects')}>
          <img src={IcCode} alt="프로젝트 아이콘" />
          <span>프로젝트</span>
        </button>
      </div>
    </div>
  );
};

export default MypageSidebar;
