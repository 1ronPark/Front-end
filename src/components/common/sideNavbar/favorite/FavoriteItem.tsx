import profileIcon from "../../../../assets/sideNavbar/profile.png";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../../buttons/LikeButton";


type FavoriteItemProps = {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  liked?: boolean;
  // onToggleLike?: () => void;  // ← 원하면 나중에 연결
};

const FavoriteItem = ({
  id,
  title,
  subtitle,
  imageUrl,
  liked = true,
}: FavoriteItemProps) => {
  const nav = useNavigate();
  const goDetail = () => nav(`/projects/${id}`);

  return (
    <div className="flex w-[300px] h-[72px] justify-center items-center py-2 px-6 gap-4 hover:bg-gray-200  cursor-pointer"
    onClick={goDetail}>
      <div className="flex w-[48px] h-[48px]">
                <img
          src={imageUrl || profileIcon}
          alt={title}
          className="w-12 h-12 object-cover rounded"
        />
      </div>
      <div className="flex flex-col justify-center items-start w-[155px]">
        <p className="label-medium text-[#49454E]">{subtitle}</p>
        <p className="body-large text-[#1D1B20]">{title}</p>
      </div>
<LikeButton itemId={id} likedByCurrentUser={liked} />
    </div>
  );
};

export default FavoriteItem;
