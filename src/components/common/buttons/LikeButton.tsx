import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLikeProject, useUnlikeProject,  } from "../../../hooks/useProjectMutation";

interface LikeButtonProps {
  itemId: number;
  likedByCurrentUser?: boolean; 
}



export const LikeButton = ({ itemId, likedByCurrentUser = false }: LikeButtonProps) => {
  const [liked, setLiked] = useState(!!likedByCurrentUser);
  // 서버에서 받은 초기값이 바뀌면 동기화 (리스트 → 상세 이동 등)
  useEffect(() => setLiked(!!likedByCurrentUser), [likedByCurrentUser]);

  const likeProject = useLikeProject(itemId);
  const unlikeProject = useUnlikeProject(itemId);
  const loading = likeProject.isPending || unlikeProject.isPending;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return; // 중복 클릭 방지

    // 낙관적 토글
    const prev = liked;
    setLiked(!prev);

    const revertOnError = () => setLiked(prev);

    if (prev) {
      unlikeProject.mutate(undefined, { onError: revertOnError });
    } else {
      likeProject.mutate(undefined, { onError: revertOnError });
    }
    // 필요 시 onSuccess/onSettled에서 react-query invalidateQueries 호출
  };

  return (
    <Heart
    type="button"
      onClick={handleClick}
      className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
        liked ? "fill-[#5A5891] stroke-[#5A5891]" : "text-gray-600 hover:text-gray-900"
      }`}
    />
  );
};
