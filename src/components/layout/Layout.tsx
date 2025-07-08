import { MainNavbar } from "../common/mainNavbar/MainNavbar";
import { Outlet } from "react-router-dom";
import SideNavbar from "../common/sideNavbar/SideNavbar";
import { Footbar } from "../common/footbar/Footbar";

export const Layout = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <MainNavbar isLoggedIn={false} userName="홍길동" />
      <SideNavbar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};
