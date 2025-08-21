import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  useLikeProject,
  useUnlikeProject,
} from "../../../hooks/useProjectMutation";
import { useMyProjects } from "../../../hooks/useMyProjects";

interface LikeButtonProps {
  itemId: number;
  likedByCurrentUser?: boolean;
}

export const LikeButton = ({
  itemId,
  likedByCurrentUser = false,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState(!!likedByCurrentUser);
  // 서버에서 받은 초기값이 바뀌면 동기화 (리스트 → 상세 이동 등)
  useEffect(() => setLiked(!!likedByCurrentUser), [likedByCurrentUser]);
  // 내가 올린 프로젝트 목록 가져오기
  const { createdProjects, isLoading: myLoading } = useMyProjects();

  // 내가 올린 프로젝트 id 집합
  const myProjectIdSet = useMemo(
    () => new Set((createdProjects ?? []).map((p) => p.itemId)),
    [createdProjects]
  );
  const isMine = myProjectIdSet.has(itemId);
  const likeProject = useLikeProject(itemId);
  const unlikeProject = useUnlikeProject(itemId);
  const loading = likeProject.isPending || unlikeProject.isPending;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return; // 중복 클릭 방지

    if (isMine) {
      window.alert("내가 등록한 프로젝트에는 관심을 표시할 수 없어요.");
      return;
    }
    // 낙관적 토글
    const prev = liked;
    setLiked(!prev);

    const revertOnError = () => setLiked(prev);

    if (prev) {
      unlikeProject.mutate({ body: undefined }, { onError: revertOnError });
    } else {
      likeProject.mutate({ body: undefined }, { onError: revertOnError });
    }
    // 필요 시 onSuccess/onSettled에서 react-query invalidateQueries 호출
  };

  return (
    <Heart
      type="button"
      onClick={handleClick}
      aria-disabled={isMine || myLoading}
      className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
        liked
          ? "fill-[#5A5891] stroke-[#5A5891]"
          : "text-gray-600 hover:text-gray-900"
      }`}
    />
  );
};
