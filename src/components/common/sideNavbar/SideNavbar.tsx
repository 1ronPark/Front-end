import menuIcon from "../../../assets//sideNavbar/menu2.svg";
import notificationIcon from "../../../assets/sideNavbar/notifications.svg";
import favoriteIcon from "../../../assets/sideNavbar/favorite.svg";
import lightModeIcon from "../../../assets/sideNavbar/light_mode.svg";
import menuOpenIcon from "../../../assets/sideNavbar/menu_open.svg";
import historyIcon from "../../../assets/sideNavbar/history.svg";
import { useState } from "react";
import BasePanel from "./BasePanel";
import NotificationList from "./notification/NotificationList";
import FavoriteList from "./favorite/FavoriteList";
import NoNotificationList from "./notification/NoNotificationList";
import NoFavoriteList from "./favorite/NoFavoriteList";
import RecentList from "./recent/RecentList";
import NoRecentList from "./recent/NoRecentList";

type Panel = "notification" | "favorite" | "recent";

const SideNavbar = () => {
  const [activePanel, setActivePanel] = useState<Panel | null>(null);
  const [lastPanel, setLastPanel] = useState<Panel | null>("notification");

  const togglePanel = (panel: Panel) => {
    setActivePanel((prev) => {
      if (prev === panel) return null; // 같은 버튼 → 닫기
      setLastPanel(panel); // 다른 버튼 → 스위치
      return panel;
    });
  };

  const handleMenuClick = () => {
    setActivePanel((prev) => (prev ? null : lastPanel ?? "notification"));
  };

  return (
    <div>
      <div
        className="fixed right-0 w-[65px] h-screen py-6 bg-[#EEE]
             flex flex-col items-center gap-6 border-l border-l-[#CBC4CF]
             box-border z-[60]" 

        // {`fixed right-0 w-[65px] h-screen py-6  flex flex-col items-center gap-6 border-l border-l-[#CBC4CF] box-border
        //   ${activePanel ? "bg-[#FFF]" : "bg-[#EEE]"}
        //   `}
      >
        {/* 메뉴 버튼 */}
        <button
          className="w-[56px] h-[56px] flex justify-center items-center py-1 gap-[10px] rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={handleMenuClick}
        >
          {activePanel === null ? (
            //열린 패널이 없으면 메뉴 아이콘에 화살표있는 버전
            <img
              src={menuOpenIcon}
              className="px-[3px]  py-1.5 opacity-[0.58]"
            />
          ) : (
            //열린 패널이 있으면 메뉴 아이콘에 화살표 없는 버전
            <img src={menuIcon} className="px-[3px]  py-1.5" />
          )}
        </button>

        {/* 알림 & 관심 & 최근 본 버튼*/}
        <div className="flex flex-col h-[960px] items-center justify-between">
          <div className="flex flex-col items-start gap-6 ">
            {/* 알림 버튼 */}

            <div className="flex flex-col justify-center items-center py-1.5 gap-1">
              <button
                onClick={() => togglePanel("notification")}
                className={`flex flex-col items-center justify-center w-[56px] h-[32px] py-1 gap-2.5 rounded-2xl hover:cursor-pointer
                  ${
                    activePanel === "notification"
                      ? "bg-[#E3E0F9]"
                      : "hover:bg-gray-200 opacity-[0.58]"
                  }
                  `}
              >
                <img
                  src={notificationIcon}
                  className="flex justify-center items-center py-1 gap-[10px]"
                />
              </button>
              <p
                className={`label-medium 
                ${
                  activePanel === "notification"
                    ? "text-[#68548E]"
                    : " opacity-[0.58]"
                }`}
              >
                알림
              </p>
            </div>
            {/* 관심 버튼 */}
            <div className="flex flex-col justify-center items-center py-1.5 gap-1">
              <button
                onClick={() => togglePanel("favorite")}
                className={`flex flex-col items-center justify-center w-[56px] h-[32px] py-1 gap-2.5 rounded-2xl hover:cursor-pointer
                  ${
                    activePanel === "favorite"
                      ? "bg-[#E3E0F9]"
                      : "hover:bg-gray-200 opacity-[0.58]"
                  }`}
              >
                <img
                  src={favoriteIcon}
                  className="flex justify-center items-center py-1 gap-[10px]"
                />
              </button>
              <p
                className={`label-medium 
                ${
                  activePanel === "favorite"
                    ? "text-[#68548E]"
                    : " opacity-[0.58]"
                }`}
              >
                관심
              </p>
            </div>
            {/* 최근 본 버튼 */}
            <div className="flex flex-col justify-center items-center py-1.5 gap-1">
              <button
                onClick={() => togglePanel("recent")}
                className={`flex flex-col items-center justify-center w-[56px] h-[32px] py-1 gap-2.5 rounded-2xl hover:cursor-pointer
                  ${
                    activePanel === "recent"
                      ? "bg-[#E3E0F9]"
                      : "hover:bg-gray-200 opacity-[0.58]"
                  }`}
              >
                <img
                  src={historyIcon}
                  className="flex justify-center items-center py-1 gap-[10px]"
                />
              </button>
              <p
                className={`label-medium 
                ${
                  activePanel === "recent"
                    ? "text-[#68548E]"
                    : " opacity-[0.58]"
                }`}
              >
                최근 본
              </p>
            </div>
          </div>
          {/* 다크/라이트모드 */}
          <div className="flex w-[48px] h-[48px] items-center justify-center gap-2.5">
            <div className="flex justify-center items-center p-2 border border-solid border-[#CBC4CF] rounded-[100px]">
              <img src={lightModeIcon} />
            </div>
          </div>
        </div>
      </div>


      {/*어두운 배경 부드럽게 + 바깥클릭 시 닫기 */}
<div
  onClick={() => activePanel && setActivePanel(null)}
  className={`fixed inset-0 right-[65px] z-30 bg-black
    transition-opacity duration-200 ease-out
    ${activePanel ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
  aria-hidden
/>
      <BasePanel
        isActive={activePanel !== null}
        hasData={
          activePanel === "notification"
            ? true // 알림 data 있음
            : activePanel === "favorite"
            ? true // 관심 data 있음
            : activePanel === "recent"
            ? true // 최근 data 있음
            : false
        }
        list={
          activePanel === "notification" ? (
            <NotificationList />
          ) : activePanel === "favorite" ? (
            <FavoriteList />
          ) : activePanel === "recent" ? (
            <RecentList />
          ) : null
        }
        empty={
          activePanel === "notification" ? (
            <NoNotificationList />
          ) : activePanel === "favorite" ? (
            <NoFavoriteList />
          ) : activePanel === "recent" ? (
            <NoRecentList />
          ) : null
        }
        panelKey={activePanel ?? "none"} // "notification" | "favorite" | "recent" | "none"
      />
    </div>
  );
};

export default SideNavbar;
