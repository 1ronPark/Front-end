import { MainNavbar } from "../common/mainNavbar/MainNavbar";
import { Outlet, useLocation } from "react-router-dom";
import SideNavbar from "../common/sideNavbar/SideNavbar";
import { Footbar } from "../common/footbar/Footbar";

export const Layout = () => {
  const location = useLocation();
  const isMemberDetailPage = location.pathname.includes("/members/");
  
  return (
    <div className="relative flex min-h-screen w-full bg-white">
      <div className="flex flex-1 flex-col pr-[60px]">
        <MainNavbar isLoggedIn={false} userName="홍길동" bgColor={isMemberDetailPage ? "#EDE6EE" : "white"} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footbar bgColor={isMemberDetailPage ? "#EDE6EE" : "white"} />
      </div>
      <div className="fixed right-0 top-0 z-30 h-screen w-[60px] border-l bg-white shadow-md">
        <SideNavbar />
      </div>
    </div>
  );
};
