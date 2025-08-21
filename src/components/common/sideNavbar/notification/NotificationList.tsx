import NoticeItem from "./NoticeItem";
import { useNotificationList } from "../../../../hooks/useNotification";

const NotificationList = () => {
  const { data, isLoading, isError } = useNotificationList({ page: 0 });
  const notifications = data?.result.notificationList ?? [];

  if (isLoading) return <div className="px-6 pt-6 pb-2">불러오는 중...</div>;
  if (isError) return <div className="px-6 pt-6 pb-2">오류가 발생했어요.</div>;
  if (notifications.length === 0) return <div className="px-6 pt-6 pb-2">알림 없음</div>;

  return (
    <div className="w-[300px]">
      {/* 헤더 */}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="title-large">알림</div>
      </div>

      {/* 이번 주 */}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        이번 주
      </div>
      <div className="flex flex-col justify-center items-center min-h-[72px] border-b border-[#CBC4CF]">
        {notifications.map((item) => (
          <NoticeItem key={item.notificationId} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
