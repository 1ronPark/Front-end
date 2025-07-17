import { useState } from "react";
import MypageSidebar from "../components/mypage/MypageSidebar";

import MyProfileEdit from "../components/mypage/MyProfileEdit";
import MyProjects from "../components/mypage/MyProjects";
import MyPageInfo from "../components/mypage/MyPageInfo";

export const MyProfile = () => {
  const [activeTab, setActiveTab] = useState<"info" | "edit" | "projects">(
    "info"
  );

  return (
    <div className="flex">
      <MypageSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === "info" && (
          <MyPageInfo
            //회원 정보에 필요한 props들
            name="홍길동"
            nickname="홍"
            phone="010-1234-5678"
            email="hong@hong.ac.kr"
            univ="길동대학교"
            mbti="INTJ"
            intro="나는 홍길동이다"
          />
        )}
        {activeTab === "edit" && <MyProfileEdit />}
        {/* 내 프로젝트가 존재하냐 안하냐에 따라서 나오는 컴포넌트가 달라짐 
        해당 부분은 hasData:boolean으로 결정 */}
        {activeTab === "projects" && <MyProjects hasData={true} />}
      </div>
    </div>
  );
};
