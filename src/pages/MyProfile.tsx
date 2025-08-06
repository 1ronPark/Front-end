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
          <MyPageInfo/>
        )}
        {currentTab === "edit" && <MyProfileEdit />}
        {currentTab === "projects" && <MyProjects hasData={false} />}
      </div>
    </div>
  );
};
