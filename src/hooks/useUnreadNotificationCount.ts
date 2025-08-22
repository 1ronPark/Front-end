// src/hooks/useUnreadNotificationCount.ts

import { useNotificationList } from "./useNotification";

export const useUnreadNotificationCount = () => {
  const { data } = useNotificationList({ page: 0 });
  const notifications = data?.result.notificationList ?? [];
  return notifications.filter((item) => !item.isRead).length;
};