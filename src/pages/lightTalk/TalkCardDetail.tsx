import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TalkCard from "./TalkCard";
import type {
  TalkCardProps,
  TalkCommentProps,
} from "../../types/LightTalkProps";
import { dummyLightTalkCard } from "../../../mockData/dummyLightTalkCard";
import { dummyComments } from "../../../mockData/dummyLightTalkComment";

const TalkCardDetail = () => {
  const { lightTalkId } = useParams();
  const navigate = useNavigate();

  const talkCards: TalkCardProps[] = dummyLightTalkCard;
  const currentUserId = 1; // 현재 로그인한 사용자 ID

  const [cardData, setCardData] = useState<TalkCardProps | undefined>(
    undefined
  );
  const [comments, setComments] = useState<TalkCommentProps[]>(dummyComments);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const target = talkCards.find((item) => item.id === Number(lightTalkId));
    setCardData(target);
  }, [lightTalkId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newItem: TalkCommentProps = {
      id: comments.length + 1,
      userId: currentUserId,
      userName: "현재 사용자", // 실제 로그인 유저 이름으로 교체
      profile_image: "", // 유저 프로필 이미지 URL
      content: newComment,
      createdAt: new Date(),
      currentUserId,
    };

    setComments([newItem, ...comments]);
    setNewComment("");
  };

  return (
    <div className="h-full flex flex-col items-center pt-4  bg-[#EEE]">
      {/* 뒤로가기 버튼 */}
      <div className="w-[640px] flex px-4 justify-between mb-4">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* 카드 본문 */}
      {cardData ? (
        <div className="w-[640px] rounded-[28px] bg-[#FEFEFE]">
          <TalkCard {...cardData} currentUserId={currentUserId} />
        </div>
      ) : (
        <p>해당하는 게시물을 찾을 수 없습니다.</p>
      )}

      {/* 댓글 입력창 */}
      <div className="w-[640px] bg-white p-4 zshadow-sm">
        <textarea
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#C8C5D0]"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleAddComment}
            className="px-4 py-1 bg-[#3F2E63] text-white rounded hover:bg-[#2c1f4b]"
          >
            등록
          </button>
        </div>
      </div>

      {/* 댓글 리스트 */}
      <div className="w-[640px] flex flex-col pb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 shadow-sm flex gap-4">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
              {comment.profile_image ? (
                <img
                  src={comment.profile_image}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="profile"
                />
              ) : (
                <div className="text-gray-600 text-sm">👤</div>
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-sm">
                {comment.userName}
                {comment.userId === currentUserId && (
                  <span className="ml-2 text-xs text-violet-600">(나)</span>
                )}
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalkCardDetail;
