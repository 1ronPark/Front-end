import menuIcon from "../../../assets//sideNavbar/menu2.svg";
import notificationIcon from "../../../assets/sideNavbar/notifications.svg";
import favoriteIcon from "../../../assets/sideNavbar/favorite.svg";
import lightModeIcon from "../../../assets/sideNavbar/light_mode.svg";
import menuOpenIcon from "../../../assets/sideNavbar/menu_open.svg";
import { useState } from "react";
import NotificationPanel from "./notification/NotificationPanel";
import FavoritePanel from "./favorite/FavoritePanel";

const SideNavbar = () => {
  const [activePanel, setActivePanel] = useState<
    "notification" | "favorite" | null
  >(null);

  const [lastPanel, setLastPanel] = useState<
    "notification" | "favorite" | null
  >(null);

  const togglePanel = (panel: "notification" | "favorite") => {
    setLastPanel(panel); //마지막에 열었던 패널 기록
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const handleMenuClick = () => {
    if (activePanel) {
      setActivePanel(null); //패널 닫기
    } else if (lastPanel) {
      setActivePanel(lastPanel); //마지막 패널 다시 열기
    }
  };

  return (
    <>
      <div
        className="fixed right-0 w-[65px] h-screen py-6 bg-[#FFF]
    flex flex-col items-center gap-6 border-l border-l-[#CBC4CF] box-border"
      >
        {/* 메뉴 버튼 */}
        <button
          className="w-[56px] h-[56px] flex justify-center items-center py-1 gap-[10px]"
          onClick={handleMenuClick}
        >
          {activePanel === null ? (
            //패널이 없으면 메뉴 아이콘에 화살표있는 버전
            <img src={menuOpenIcon} className="px-[3px]  py-1.5" />
          ) : (
            //패널이 있으면 메뉴 아이콘에 화살표 없는 버전
            <img src={menuIcon} className="px-[3px]  py-1.5" />
          )}
        </button>

        {/* 알림 & 관심 버튼 */}
        <div className="flex flex-col h-[960px] items-center justify-between">
          <div className="flex flex-col items-start gap-6 ">
            {/* 알림 버튼 */}

            <button
              onClick={() => togglePanel("notification")}
              className="flex flex-col justify-center items-center py-1.5 gap-1"
            >
              <div
                className={`flex flex-col items-center justify-center w-[56px] h-[32px] py-1 gap-2.5 rounded-2xl
                  ${
                    activePanel === "notification"
                      ? "bg-[#E9DEF8]"
                      : "hover:bg-[#E9DEF8]"
                  }
                  `}
              >
                <img
                  src={notificationIcon}
                  className="flex justify-center items-center py-1 gap-[10px]"
                />
              </div>
              <p className="label-medium text-[#68548E]">알림</p>
            </button>
            {/* 관심 버튼 */}
            <button
              onClick={() => togglePanel("favorite")}
              className="flex flex-col justify-center items-center py-1.5 gap-1"
            >
              <div
                className={`flex flex-col items-center justify-center w-[56px] h-[32px] py-1 gap-2.5 rounded-2xl hover:bg-[#E9DEF8]
                  ${
                    activePanel === "favorite"
                      ? "bg-[#E9DEF8]"
                      : "hover:bg-[#E9DEF8]"
                  }`}
              >
                <img
                  src={favoriteIcon}
                  className="flex justify-center items-center py-1 gap-[10px]"
                />
              </div>
              <p className="label-medium text-[#68548E]">관심</p>
            </button>
          </div>
          {/* 다크/라이트모드 */}
          <div className="flex w-[48px] h-[48px] items-center justify-center gap-2.5">
            <div className="flex justify-center items-center p-2 border border-solid border-[#CBC4CF] rounded-[100px]">
              <img src={lightModeIcon} />
            </div>
          </div>
        </div>
      </div>
      {activePanel === "notification" && <NotificationPanel />}
      {activePanel === "favorite" && <FavoritePanel />}
    </>
  );
};

export default SideNavbar;
