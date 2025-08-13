import { useState } from "react";
import { Heart } from "lucide-react";
import { useLikeProject, useUnlikeProject } from "../../../hooks/useProject";

interface LikeButtonProps {
  itemId: number;
}

export const LikeButton = ({ itemId }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false); // 우선은 서버없이 관리 => 추후에 생긴다면 (initialLliked) 상태를 서버에서 props로 넘겨받아서 사용
  const likeProject = useLikeProject(itemId);
  const unlikeProject = useUnlikeProject(itemId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 막기

    if (liked) {
      unlikeProject.mutate({}, {
        onSuccess: () => setLiked(false),
      });
    } else {
      likeProject.mutate({}, {
        onSuccess: () => setLiked(true),
      });
    }
  };

  return (
    <Heart
      onClick={handleClick}
      className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
        liked ? "text-red-600" : "text-gray-600 hover:text-gray-900"
      }`}
    />
  );
};
