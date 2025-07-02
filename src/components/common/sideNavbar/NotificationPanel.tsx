import NotificationList from "./NotificationList";

const NotificationPanel = () => {
  return (
    <div
      className="fixed right-[97px] w-[400px] h-screen flex flex-col bg-[#FFF] overflow-auto
    shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_1px_3px_1px_rgba(0,0,0,0.15)]"
    >
      {/* 헤더 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="font-semibold text-2xl">알림</div>
        <div className="text-sm">이번 주</div>
      </div>

      {/* 이번 주 */}
      <div className="flex flex-col justify-center items-center min-h-[72px] border-b border-[#CBC4CF]">
        <NotificationList />
      </div>
      {/* 이번 달 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 text-sm">
        이번 달
      </div>
      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <NotificationList />
      </div>

      {/* 이전 활동 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 text-sm">
        이전 활동
      </div>

      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <NotificationList />
      </div>
    </div>
  );
};

export default NotificationPanel;
