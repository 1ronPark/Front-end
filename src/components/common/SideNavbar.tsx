import menuIcon from "../../assets//sideNavbar/menu.svg";
import notificationIcon from "../../assets/sideNavbar/notifications.svg";
import favoriteIcon from "../../assets/sideNavbar/favorite.svg";
import lightModeIcon from "../../assets/sideNavbar/light_mode.svg";

const SideNavbar = () => {
  return (
    <div
      className="absolute top-0 right-0 w-[96px] h-screen pt-6 pb-6 bg-[#FFF]
    flex flex-col items-center gap-6 text-[#68548E] text-xs text-center not-italic border border-l-[#CBC4CF]"
    >
      {/* <div className="absolute left-0 top-0 w-[2px] h-full bg-[#CBC4CF]" /> */}
      {/* 메뉴 버튼 */}
      <div className="w-[56px] h-[56px] flex justify-center items-center py-1 gap-[10px]">
        <img src={menuIcon} className="px-[3px]  py-1.5" />
      </div>

      {/* 알림 & 관심 버튼 */}
      <div className="flex flex-col h-[960px] items-center justify-between">
        <div className="flex flex-col items-start gap-6 ">
          {/* 알림 버튼 */}
          <div className="flex flex-col justify-center items-center p-1.5 gap-1">
            <img
              src={notificationIcon}
              className="flex justify-center items-center py-1 gap-[10px]"
            />
            <span>알림</span>
          </div>
          {/* 관심 버튼 */}
          <div className="flex flex-col justify-center items-center p-1.5 gap-1">
            <img
              src={favoriteIcon}
              className="flex justify-center items-center py-1 gap-[10px]"
            />
            <span>관심</span>
          </div>
        </div>
      </div>
      {/* 라이트 모트 */}
      <div className="flex w-[48px] h-[48px] justify-center items-center">
        <div className="flex justify-center items-center p-2 border border-solid border-[#CBC4CF] rounded-[100px]">
          <img src={lightModeIcon} />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
