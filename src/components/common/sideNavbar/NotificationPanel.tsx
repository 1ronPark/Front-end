import NoNotificationList from "./NoNotificationList";
import NotificationList from "./NotificationList";

const NotificationPanel = () => {
  return (
    <div
      className="fixed right-[97px] w-[400px] h-screen flex flex-col bg-[#FFF] overflow-auto
    shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_1px_3px_1px_rgba(0,0,0,0.15)]"
    >
      {/* 알림 목록이 있으면 이걸 사용 */}
      {/* <NotificationList /> */}
      {/* 알림 목록이 없으면 이걸 사용 */}
      <NoNotificationList />
    </div>
  );
};

export default NotificationPanel;
