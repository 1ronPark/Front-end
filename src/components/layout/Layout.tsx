import { MainNavbar } from "../common/mainNavbar/MainNavbar";
import { Outlet, useLocation } from "react-router-dom";
import SideNavbar from "../common/sideNavbar/SideNavbar";
import { Footbar } from "../common/footbar/Footbar";
import { useEffect, useState } from "react";
import AlertModal from "../common/modals/AlertModal";
import ic_issuported from "../../assets/icons/ic_issupported.svg";
import { useUser } from "../../hooks/useUser";


export const Layout = () => {
  const location = useLocation();
  const isMemberDetailPage = location.pathname.includes("/members/");
  //라잇톡 디테일 페이지 진입 시
  const isLightTalkDetailPage = location.pathname.includes("/lightTalk/");

  // 지원을 받은 사용자가 진입 시
  const [showSupportAlert, setShowSupportAlert] = useState(false);
  const [isBlurring, setIsBlurring] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data: user, isSuccess } = useUser();
  const isLoggedIn = isSuccess && !!user;

  // 지원 받은 사용자 진입 시의 애니메이션 효과
  useEffect(()=>{
    if (showSupportAlert) {
      // 바로 블러 처리
      setIsBlurring(true);

      // 블러 후 모달 표시
      const timer = setTimeout(()=>{
        setShowModal(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [showSupportAlert]);

  return (
    <div
      className={`relative flex min-h-screen w-full 
    ${isLightTalkDetailPage ? "bg-[#EEE]" : "bg-[#FEFEFE]"}`}
    >
      <div className="flex flex-1 flex-col pr-[60px]">
        <MainNavbar
          isLoggedIn={isLoggedIn}
          userName={user?.name || ""}
          bgColor={isMemberDetailPage ? "#EEEEEE" : "white"}
        />
        <main className="flex-1 relative">
          {/* Outlet만 흐리게 */}
          <div 
            className={`h-full transition-[filter] duration-[2000ms] ease-[cubic-bezier(0.5,0.1,0.5,1)] ${
              isBlurring ? "blur-sm" : "blur-0"
            }`}
          >
            <Outlet />
          </div>

          {/* 지원자 알림 */}
          <AlertModal
            icon={ic_issuported}
            title="새롭게 지원한 분이 있어요"
            content="지원자를 확인하고 연락해볼까요?"
            subcontent="모든 지원내역은 알림에서 볼 수 있어요"
            primaryButtonText="지원자 보러가기"
            primaryButtonPath="/notification"
            isVisible={showModal}
            onClose={() => setShowSupportAlert(false)}
          />
          {/* 주디: 프로젝트 - 제안을 받은 사용자가 진입 시에 이대로 사용하시면 좋을 것 같습니다! */}
          {/* <AlertModal
            icon={ic_issuported}
            title="새로운 제안을 받았어요"
            content="프로젝트 리더에게 연락을 해보시겠어요?"
            subcontent="제안은 알림에서 계속 볼수 있어요"
            primaryButtonText="지원하고 연락해보기"
            primaryButtonPath="/notification"
            isVisible={showSupportAlert}
            onClose={() => setShowSupportAlert(false)}
          /> */}
        </main>
        <Footbar bgColor={isMemberDetailPage ? "#EEEEEE" : "white"} />
      </div>
      <div className="fixed right-0 top-0 z-30 h-screen w-[60px] border-l bg-white shadow-md">
        <SideNavbar />
      </div>
    </div>
  );
};
