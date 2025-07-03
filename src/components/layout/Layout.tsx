import { MainNavbar } from "../common/mainNavbar/MainNavbar";
import { Outlet } from "react-router-dom";
import { Footbar } from "../common/footbar/Footbar";
import SideNavbar from "../common/sideNavbar/SideNavbar";

export const Layout = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <MainNavbar isLoggedIn={false} userName="홍길동" />
      <SideNavbar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      {/*footbar 여백 설정*/}
      <div className="h-[30px]" />
      <Footbar />
      <div className="h-[150px]" />
    </div>
  );
};
