import { useSearchParams } from "react-router-dom";
import MypageSidebar from "../components/mypage/MypageSidebar";

import MyProfileEdit from "../components/mypage/MyProfileEdit";
import MyProjects from "../components/mypage/MyProjects";
import MyPageInfo from "../components/mypage/MyPageInfo";

export const MyProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get("tab") ?? "info") as
    | "info"
    | "edit"
    | "projects";

  const setCurrentTab = (tab: "info" | "edit" | "projects") => {
    setSearchParams({ tab });
  };

  return (
    <div className="flex">
      <MypageSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex-1 p-6">
        {currentTab === "info" && (
          <MyPageInfo
            //회원 정보에 필요한 props들
            id={0} //쪼: 우선 임시로 지정해두었습니다!
            name="홍길동"
            nickname="홍"
            phoneNumber="010-1234-5678"
            email="hong@hong.ac.kr"
            school="길동대학교"
            mbti="INTJ"
            intro="나는 홍길동이다"
            location="서울특별시"
            role="Web"
          />
        )}
        {currentTab === "edit" && <MyProfileEdit />}
        {currentTab === "projects" && <MyProjects hasData={true} />}
      </div>
    </div>
  );
};
