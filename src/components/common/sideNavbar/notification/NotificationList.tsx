import NoticeItem from "./NoticeItem";
import { useNotificationList } from "../../../../hooks/useNotification";
import { isThisWeek, isThisMonth, parseISO } from "date-fns";

const NotificationList = () => {
  const { data, isLoading, isError } = useNotificationList({ page: 0 });
  const notifications =
    (data?.result.notificationList ?? []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const thisWeekNotifications = notifications.filter((item) =>
    isThisWeek(parseISO(item.createdAt))
  );

  const thisMonthNotifications = notifications.filter(
    (item) => isThisMonth(parseISO(item.createdAt)) && !isThisWeek(parseISO(item.createdAt))
  );

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
      <div className="flex flex-col justify-center items-center gap-2 max-h-[720px] overflow-y-auto border-b border-[#CBC4CF] py-2">
        {thisWeekNotifications.map((item) => (
          <div className="w-full" key={item.notificationId}>
            <NoticeItem {...item} />
          </div>
        ))}
        {thisWeekNotifications.length === 0 && <div className="text-sm text-gray-400">알림 없음</div>}
      </div>

      {/* 이번 달 */}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        이번 달
      </div>
      <div className="flex flex-col justify-center items-center gap-2 max-h-[720px] overflow-y-auto border-b border-[#CBC4CF] py-2">
        {thisMonthNotifications.map((item) => (
          <div className="w-full" key={item.notificationId}>
            <NoticeItem {...item} />
          </div>
        ))}
        {thisMonthNotifications.length === 0 && <div className="text-sm text-gray-400">알림 없음</div>}
      </div>
    </div>
  );
};

export default NotificationList;