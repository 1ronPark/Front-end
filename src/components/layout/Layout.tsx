import { MainNavbar } from "../common/mainNavbar/MainNavbar";
import { Outlet, useLocation } from "react-router-dom";
import SideNavbar from "../common/sideNavbar/SideNavbar";
import { Footbar } from "../common/footbar/Footbar";
import { useState } from "react";
import SupportAlert from "../common/modals/SupportAlert";

export const Layout = () => {
  const location = useLocation();
  const isMemberDetailPage = location.pathname.includes("/members/");

  // 지원을 받은 사용자가 진입 시
  const [showSupportAlert, setShowSupportAlert] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full bg-[#EEE]">
      <div className="flex flex-1 flex-col pr-[60px]">
        <MainNavbar
          isLoggedIn={true}
          userName="홍길동"
          bgColor={isMemberDetailPage ? "#EEEEEE" : "white"}
        />
        <main className="flex-1 relative">
          {/* Outlet만 흐리게 */}
          <div className={showSupportAlert ? "h-full backdrop-blur-sm" : ""}>
            <Outlet />
          </div>

          {/* 알림 모달은 Outlet 위에 */}
          <SupportAlert
            isVisible={showSupportAlert}
            onClose={() => setShowSupportAlert(false)}
          />
        </main>
        <Footbar bgColor={isMemberDetailPage ? "#EEEEEE" : "white"} />
      </div>
      <div className="fixed right-0 top-0 z-30 h-screen w-[60px] border-l bg-white shadow-md">
        <SideNavbar />
      </div>
    </div>
  );
};
