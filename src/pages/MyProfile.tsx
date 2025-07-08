import { useState } from 'react';
import MypageSidebar from '../components/mypage/MypageSidebar';
import MyInfo from '../components/mypage/MyInfo';
import MyProfileEdit from '../components/mypage/MyProfileEdit';
import MyProjects from '../components/mypage/MyProjects';

export const MyProfile = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'edit' | 'projects'>('info');

  return (
    <div className="flex">
      <MypageSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === 'info' && <MyInfo />}
        {activeTab === 'edit' && <MyProfileEdit />}
        {activeTab === 'projects' && <MyProjects />}
      </div>
    </div>
  );
};