import { useState } from "react";
import MypageSidebar from "../components/mypage/MypageSidebar";
import MyInfo from "../components/mypage/myInfo/MyInfo";
import MyProfileEdit from "../components/mypage/MyProfileEdit";
import MyProjects from "../components/mypage/MyProjects";

export const MyProfile = () => {
  const [activeTab, setActiveTab] = useState<"info" | "edit" | "projects">(
    "info"
  );

  return (
    <div className="flex">
      <MypageSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === "info" && (
          <MyInfo
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
        {activeTab === "projects" && <MyProjects />}
      </div>
    </div>
  );
};
