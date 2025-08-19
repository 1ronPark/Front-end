import { useMemo, useState } from "react";
import { useCreateComment } from "../../../hooks/useProjectComment";
import { RefreshCw } from "lucide-react";
import { useProjectDetailCtx } from "../../../types/ProjectDetailContext";
import CommentItem from "./CommentItem";
import defalutProfile from "../../../assets/ic_myprofile.svg";

type Props = {
  onRefresh: () => Promise<unknown>;      // useQuery의 refetch
  isRefreshing?: boolean;             // 버튼 스피너용
};

const CommentSection = ({ onRefresh, isRefreshing }: Props) => {
  const { itemId, itemComments, commentCount } = useProjectDetailCtx();
  const [comment, setComment] = useState("");
  const [latest, setLatest] = useState(true);

  const comments = useMemo(() => {
    const arr = [...(itemComments ?? [])];
    arr.sort((a, b) => {
      const ta = new Date(a.updatedAt).getTime();
      const tb = new Date(b.updatedAt).getTime();
      return latest ? tb - ta : ta - tb;
    });
    return arr;
  }, [itemComments, latest]);

  const createComment = useCreateComment(itemId);

  const onSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = comment.trim();
    if (!content || createComment.isPending) return;

    createComment.mutate(
      { content },
      {
        onSuccess: async () => {
          setComment("");
          setLatest(true);
          // ✅ 상세 refetch만 정확히
          await onRefresh();
        },
      }
    );
  };

  const handleRefreshLatest = async () => {
    setLatest(true);
    await onRefresh();   // ✅ 키 생각 NO
  };

  return (
    <div className="w-full flex flex-col gap-4 px-4">
      <p className="title-medium-emphasis text-[#1D1B20]">
        댓글 {commentCount}개
      </p>

      {/* 댓글 입력 박스 */} 
      <form onSubmit={onSubmitComment} className="w-full flex items-start gap-4 p-4 rounded-xl bg-[rgba(29,27,32,0.08)]"> 
        {/* 프로필 */} 
        <img src={defalutProfile} alt="프로필 이미지" className="w-12 h-12 rounded-full mt-1 object-cover object-top" />
        {/* textarea + 버튼 수직 정렬 */} 
        <div className="flex flex-col w-full gap-2"> <input value={comment} onChange={(e) => setComment(e.target.value)} className="w-full body-medium p-3 rounded-md text-sm placeholder:text-gray-400 focus:outline-none" 
        placeholder={`댓글은 기획에 대한 피드백 혹은 질문만 가능합니다.\n
        감상평 외 정치관련 / 욕설 / 비방 목적의 댓글은 즉시 차단 조치 됩니다.`} /> 
        <div className="flex justify-end"> <button type="submit" disabled={!comment.trim() || createComment.isPending} 
        className="px-[16px] py-[10px] bg-[#E9dEF8] text-[#4B4358] label-large rounded-lg hover:bg-[#D8C6E9] active:bg-[#C7B0D9] cursor-pointer">
           남기기 </button> </div> </div> </form>

      <div className="flex justify-start">
        <button type="button" onClick={handleRefreshLatest}
          className="flex items-center justify-center gap-2 w-[120px] h-[40px] bg-white text-[#49454E] label-large text-sm rounded-md border border-[#CBC4CF] hover:bg-[#F2ECF4] active:bg-[#EDE6EE] cursor-pointer">
           <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          최신순
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {comments.map((c) => (
          <CommentItem
            key={c.itemCommentId}
            itemCommentId={c.itemCommentId}
            authorName={c.authorName}
            authorProfileImageURL={c.authorProfileImageURL}
            content={c.content}
            updatedAt={c.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
