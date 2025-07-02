import menuIcon from "../../../assets//sideNavbar/menu2.svg";
import notificationIcon from "../../../assets/sideNavbar/notifications.svg";
import favoriteIcon from "../../../assets/sideNavbar/favorite.svg";
import lightModeIcon from "../../../assets/sideNavbar/light_mode.svg";
import { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import FavoritePanel from "./FavoritePanel";

const SideNavbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);

  const toggleNotification = () => {
    if (isFavoriteOpen === true) {
      setIsFavoriteOpen(false);
    }
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleFavorite = () => {
    if (isNotificationOpen === true) {
      setIsNotificationOpen(false);
    }
    setIsFavoriteOpen(!isFavoriteOpen);
  };

  return (
    <>
      <div
        className="fixed right-0 w-[97px] h-screen py-6 bg-[#FFF]
    flex flex-col items-center gap-6 text-[#68548E] text-xs text-center not-italic border-l border-l-[#CBC4CF] box-border"
      >
        {/* 메뉴 버튼 */}
        <div className="w-[56px] h-[56px] flex justify-center items-center py-1 gap-[10px]">
          <img src={menuIcon} className="px-[3px]  py-1.5" />
        </div>

        {/* 알림 & 관심 버튼 */}
        <div className="flex flex-col h-[960px] items-center justify-between">
          <div className="flex flex-col items-start gap-6 ">
            {/* 알림 버튼 */}

            <button
              onClick={toggleNotification}
              className="flex flex-col justify-center items-center py-1.5 gap-1"
            >
              <div
                className={`flex flex-col items-center justify-center w-[56px] h-[32px] py-1 gap-2.5 rounded-2xl hover:bg-[#E9DEF8]
                  ${isNotificationOpen && "bg-[#E9DEF8]"}`}
              >
                <img
                  src={notificationIcon}
                  className="flex justify-center items-center py-1 gap-[10px]"
                />
              </div>
              <span>알림</span>
            </button>
            {/* 관심 버튼 */}
            <button
              onClick={toggleFavorite}
              className="flex flex-col justify-center items-center py-1.5 gap-1"
            >
              <div
                className={`flex flex-col items-center justify-center w-[56px] h-[32px] py-1 gap-2.5 rounded-2xl hover:bg-[#E9DEF8]
                ${isFavoriteOpen && "bg-[#E9DEF8]"}`}
              >
                <img
                  src={favoriteIcon}
                  className="flex justify-center items-center py-1 gap-[10px]"
                />
              </div>
              <span>관심</span>
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
      {isNotificationOpen && <NotificationPanel />}
      {isFavoriteOpen && <FavoritePanel />}
    </>
  );
};

export default SideNavbar;
