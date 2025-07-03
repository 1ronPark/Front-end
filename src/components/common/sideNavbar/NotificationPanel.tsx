import BasePanel from "./BasePanel";
import NoNotificationList from "./NoNotificationList";
import NotificationList from "./NotificationList";

const NotificationPanel = () => {
  const hasNotification = true;
  return (
    <BasePanel
      hasData={hasNotification}
      list={<NotificationList />}
      empty={<NoNotificationList />}
    />
  );
};

export default NotificationPanel;
