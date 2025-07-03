const NotificationList = () => {
  return (
    <>
      {/* 헤더 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="title-large">알림</div>
      </div>
      {/* 이번 주 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        이번 주
      </div>
      <div className="flex flex-col justify-center items-center min-h-[72px] border-b border-[#CBC4CF]">
        <div>알림 리스트</div>
        <div>알림 리스트</div>
        <div>알림 리스트</div>
      </div>

      {/* 이번 달 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        이번 달
      </div>
      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <div>알림 리스트</div>
        <div>알림 리스트</div>
        <div>알림 리스트</div>
      </div>

      {/* 이전 활동 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        이전 활동
      </div>

      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <div>알림 리스트</div>
        <div>알림 리스트</div>
        <div>알림 리스트</div>
      </div>
    </>
  );
};

export default NotificationList;
