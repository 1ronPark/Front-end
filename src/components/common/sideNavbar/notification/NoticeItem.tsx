import { useNavigate } from "react-router-dom";
import { useState } from "react";
import profileIcon from "../../../../assets/sideNavbar/profile.png";
import { usePatchNotification } from "../../../../hooks/useNotification";

interface NoticeItemProps {
  notificationId: number;
  message: string;
  notificationType: string;
  isRead: boolean;
  referenceId: number;
}

const NoticeItem = ({
  notificationId,
  message,
  notificationType,
  isRead,
  referenceId,
}: NoticeItemProps) => {
  const navigate = useNavigate();
  const [read, setRead] = useState(isRead);
  const { mutate: patchNotification } = usePatchNotification();

  const handleClick = () => {
    patchNotification({
      endpoint: `/api/v1/notification/${notificationId}`,
    });
    setRead(true);
    navigate(`/projects/${referenceId}`);
  };

  return (
    <div
      className="flex w-[300px] h-[72px] justify-center items-center py-2 px-6 gap-4 hover:bg-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex w-[48px] h-[48px]">
        <img src={profileIcon} className="rounded-3xl" />
      </div>
      <div className="flex flex-col justify-center items-start max-w-[160px] break-words">
        <p className="label-medium text-[#49454E]">{notificationType}</p>
        <p className="body-large text-[#1D1B20]">{message}</p>
      </div>
      <div className="text-[11px] text-[#9E9E9E] ml-auto whitespace-nowrap min-w-[40px] text-right">
        {read ? "읽음" : "안읽음"}
      </div>
    </div>
  );
};

export default NoticeItem;
