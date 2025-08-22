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
  createdAt: string;
}

const NoticeItem = ({
  notificationId,
  message,
  isRead,
  referenceId,
  createdAt,
}: NoticeItemProps) => {
  const navigate = useNavigate();
  const [read, setRead] = useState(isRead);
  const { mutate: patchNotification } = usePatchNotification();

  const handleClick = () => {
    patchNotification({
      endpoint: `${import.meta.env.VITE_API_NOTIFICATION_LIST_ENDPOINT}/${notificationId}`,
    });
    setRead(true);
    navigate(`/projects/${referenceId}`);
  };

  return (
    <div
      className="flex w-[280px] h-[72px] justify-center items-center py-2 gap-4 hover:bg-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex w-[40px] h-[40px]">
        <img src={profileIcon} className="rounded-3xl" />
      </div>
      <div className="flex flex-col justify-center items-start max-w-[140px] break-words">

        <p className="body-medium text-[#1D1B20]">{message}</p>
        <p className="label-medium text-[#9E9E9E]">
          {(() => {
            const date = new Date(createdAt);
            date.setHours(date.getHours() + 9);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hour = date.getHours();
            const minute = String(date.getMinutes()).padStart(2, "0");
            const isAM = hour < 12;
            const displayHour = String(hour % 12 || 12).padStart(2, "0");
            const period = isAM ? "오전" : "오후";

            return `${year}. ${month}. ${day}. ${period} ${displayHour}:${minute}`;
          })()}
        </p>
      </div>
      <div
        className={`text-[11px] whitespace-nowrap min-w-[40px] text-right ${
          read ? "text-[#9E9E9E]" : "text-[#D32F2F] font-semibold"
        }`}
      >
        {read ? "읽음" : "안읽음"}
      </div>
    </div>
  );
};

export default NoticeItem;