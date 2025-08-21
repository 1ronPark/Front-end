import profileIcon from "../../../../assets/sideNavbar/profile.png";

interface NoticeItemProps {
  notificationId: number;
  message: string;
  notificationType: string;
  isRead: boolean;
  referenceId: number;
}

const NoticeItem = ({
  message,
  notificationType,
  isRead,
}: NoticeItemProps) => {
  return (
    <div className="flex w-[300px] h-[72px] justify-center items-center py-2 px-6 gap-4 hover:bg-gray-200 cursor-pointer">
      <div className="flex w-[48px] h-[48px]">
        <img src={profileIcon} className="rounded-3xl" />
      </div>
      <div className="flex flex-col justify-center items-start w-[155px]">
        <p className="label-medium text-[#49454E]">{notificationType}</p>
        <p className="body-large text-[#1D1B20]">{message}</p>
      </div>
      <div className="label-small text-[#49454E]">{isRead ? "읽음" : "안읽음"}</div>
    </div>
  );
};

export default NoticeItem;
