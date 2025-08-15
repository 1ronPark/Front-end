import noNotificationIcon from "../../../../assets/sideNavbar/no_sim_Filled.svg";

const NoRecentList = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {/* 헤더 */}
      <div className="w-[300px] flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="title-large">최근 본</div>
      </div>
      {/* 활동 내역 없음 표시 */}
      <div className="flex flex-col items-center py-[128px] gap-6">
        <img src={noNotificationIcon} />
        <p className="title-medium text-[#49454E]">최근 본 내용이 없어요</p>
      </div>
    </div>
  );
};

export default NoRecentList;
