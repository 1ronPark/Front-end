import BasePanel from "./BasePanel";
import NoNotificationList from "./NoNotificationList";
import NotificationList from "./NotificationList";

const NotificationPanel = () => {
  const hasNotification = true;
  return (
    <BasePanel>
      {hasNotification ? <NotificationList /> : <NoNotificationList />}
    </BasePanel>
  );
};

export default NotificationPanel;
