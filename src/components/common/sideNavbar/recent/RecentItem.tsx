import profileIcon from "../../../../assets/sideNavbar/profile.png";
import { useLikedStatus } from "../../../../hooks/useProjectQueries";
import { LikeButton } from "../../buttons/LikeButton";

type RecentItemProps = {
  itemId: number;
  imageUrl?: string | null;
  overline?: string;
  title?: string;
  onClick?: () => void;
  likedByCurrentUser?: boolean;
};

const RecentItem = ({
  itemId,
  imageUrl,
  overline = "Overline",
  title = "List item",
  onClick,
  likedByCurrentUser,
}: RecentItemProps) => {
  const { data } = useLikedStatus(itemId);
  const liked = likedByCurrentUser ?? !!data?.result?.liked;

  return (
    <div
      onClick={onClick}
      className="flex w-[300px] h-[72px] justify-center items-center py-2 px-6 gap-4 hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex w-[48px] h-[48px]">
        <img
          src={imageUrl || profileIcon}
          className="rounded-3xl  w-[48px] h-[48px] object-cover"
        />
      </div>
      <div className="flex flex-col justify-center items-start w-[155px]">
        <p className="label-medium text-[#49454E]">{overline}</p>
        <p className="body-large text-[#1D1B20]">{title}</p>
      </div>
      <LikeButton itemId={itemId} likedByCurrentUser={liked} />
    </div>
  );
};

export default RecentItem;
