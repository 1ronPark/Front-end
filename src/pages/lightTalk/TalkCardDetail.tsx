import { useNavigate, useParams } from "react-router-dom";
import { dummyLightTalkCard } from "../../../mockData/dummyLightTalkCard";
import { dummyComments } from "../../../mockData/dummyLightTalkComment";
import CommentItem from "./CommentItem";
import { useState } from "react";
import {
  ChevronLeft,
  EllipsisVertical,
  Heart,
  MessageSquareText,
  Upload,
} from "lucide-react";
import MenuModal from "./talkModal/MenuModal";
import ShareModal from "./talkModal/ShareModal";
import CommentInput from "./CommentInput";

//시간 계산하는 함수
const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // 초 단위

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}일 전`;

  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`; // 날짜 표시
};

const TalkCardDetail = () => {
  const { lightTalkId } = useParams<{ lightTalkId: string }>();
  const cardId = parseInt(lightTalkId || "0", 10); // 문자열을 숫자로 변환
  const navigate = useNavigate();

  //카드 메뉴 모달 열기
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  //공유 모달 열기
  const [openShareModal, setOpenShareModal] = useState(false);

  //해당 디테일 카드
  const card = dummyLightTalkCard.find((item) => item.id === cardId);

  //해당 카드에 관련된 댓글
  const relatedComments = dummyComments.filter(
    (comment) => comment.talkCardId === cardId
  );

  // 하트 개수
  const [countHeart, setCountHeart] = useState<number>(card?.num_hearts ?? 0);
  //하트를 눌렀는지 여부 체크
  const [isHeart, setIsHeart] = useState<boolean>(false);

  // 내 게시물인지 여부
  const isMyPost = card?.currentUserId === card?.id;

  const [comments, setComments] = useState(relatedComments);

  console.log("파라미터 id (string):", lightTalkId);
  console.log("변환된 cardId (number):", cardId);
  console.log("전체 카드 리스트:", dummyLightTalkCard);
  console.log("찾은 카드:", card);

  const handleReply = (text: string, parentId: number) => {
    const newComment = {
      id: comments.length + 1,
      userId: 999,
      talkCardId: cardId,
      name: "댓글작성자",
      profile_image: "",
      role: "개발자",
      univ: "테스트대학",
      content: text,
      createdAt: new Date(),
      currentUserId: 999,
      num_hearts: 0,
      num_comments: 0,
      parentId,
    };

    setComments((prev) => [...prev, newComment]);
  };

  //메뉴 모달 열기
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 버블링 방지
    setTimeout(() => {
      setOpenMenu(true); // 비동기로 열기
    }, 0);
  };

  // 공유 모달 열기 함수
  const handleShareClick = () => {
    setOpenShareModal(true);
    setOpenMenu(false); // 메뉴는 닫기
  };

  //토글형 좋아요 => 한번누르면 올라가고 한번 더 누르면 내려감
  const handleHeartClick = () => {
    if (isHeart) {
      setCountHeart(countHeart - 1);
    } else {
      setCountHeart(countHeart + 1);
    }
    setIsHeart(!isHeart); // 상태 반전
  };

  if (!card)
    return <div className="text-center py-12">존재하지 않는 카드입니다.</div>;

  return (
    <div className="h-auto flex flex-col items-center justify-center gap-4">
      {/* 뒤로가기 버튼 */}
      <div className="w-full max-w-[640px] px-4 pt-4">
        <button
          onClick={() => navigate(-1)} // history 뒤로가기
          className="flex items-center gap-2 text-[#47464F] hover:text-black cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      {/* 게시글 카드 */}
      <div className=" flex flex-col bg-white gap-4 rounded-t-[28px]">
        <div className="relative flex flex-col w-[640px] px-8 pt-4 gap-4 rounded-t-[28px] bg-white">
          {/* 상단 정보 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={card.profile_image || ""}
                alt="profile"
                className="w-10 h-10 rounded-full bg-gray-200 object-cover"
              />
              <div className="flex gap-2 items-center">
                <p className="label-large-emphasis">{card.name}</p>
                <span className="body-medium-emphasis text-[#1C1B21] opacity-[0.58]">
                  {card.role}
                </span>
                <span className="body-medium text-[#47464F] opacity-[0.58]">
                  {card.univ}
                </span>
                <span className="body-medium text-[#47464F] opacity-[0.58]">
                  {getTimeAgo(card.createAt)}
                </span>
              </div>
            </div>
            {/* 버튼 */}
            <div className="h-12 w-12 absolute top-3 right-3 flex justify-center items-center">
              <button
                className="flex h-8 w-8 flex-col justify-center items-center rounded-[100px] hover:bg-[rgba(73,69,79,0.08)]"
                onClick={handleMenuClick}
              >
                <EllipsisVertical className="w-5 h-5 opacity-[0.58]" />
              </button>
            </div>
            {openMenu && (
              <MenuModal
                isMyPost={isMyPost}
                onClose={() => setOpenMenu(false)}
                onShareClick={handleShareClick}
              />
            )}
            {/* 공유 모달 */}
            {openShareModal && (
              <ShareModal onClose={() => setOpenShareModal(false)} />
            )}
          </div>
          {/* 글 내용 */}
          <div>
            <p className="body-medium whitespace-pre-line text-[#1C1B21]">
              {card.text.trim()}
            </p>
          </div>
          {/* 게시글의 사진들 */}
          {card.images.length > 0 && (
            <div className="w-[512px] overflow-x-auto mt-2">
              <div className="flex gap-2 w-max pr-2">
                {card.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`uploaded-${idx}`}
                    className="w-[240px] h-[240px] rounded-md object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          )}
          {/* 밑에 버튼들 */}
          <div className="flex items-center py-2 gap-4 ">
            {/* 하트버튼 */}
            <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58] rounded-xl hover:bg-gray-100">
              <button
                className="hover:cursor-pointer"
                onClick={handleHeartClick}
              >
                <Heart />
              </button>
              <p className="label-large-emphasis">{countHeart}</p>
            </div>
            {/* 댓글 버튼 */}
            <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58] rounded-xl hover:bg-gray-100">
              <button className="hover:cursor-pointer">
                <MessageSquareText />
              </button>
              <p className="label-large-emphasis">{card.num_comments}</p>
            </div>
            {/* 공유버튼 */}
            <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58] rounded-xl hover:bg-gray-100">
              <button
                className="hover:cursor-pointer"
                onClick={handleShareClick}
              >
                <Upload />
              </button>
            </div>
          </div>
          {/* 구분선 */}
          <div className="absolute right-0 bottom-0 w-full h-[1px]  flex flex-col justify-center items-start bg-[#C8C5D0] " />
        </div>

        {/* 댓글 입력창 - 여기 위에 위치 */}
        <div className="flex justify-center">
          <CommentInput
            //유저정보 받아오면 수정해야됨. 밑에 받아오는 정보 전부
            profileImage={card.profile_image} // ← 현재 로그인 유저 이미지
            onSubmit={(text) => {
              const newComment = {
                id: comments.length + 1,
                userId: 999,
                talkCardId: cardId,
                name: "현재 댓글 작성자",
                profile_image: "/path/to/user.png",
                role: "개발자",
                univ: "테스트대",
                content: text,
                createdAt: new Date(),
                currentUserId: 999,
                num_hearts: 0,
                num_comments: 0,
              };
              setComments((prev) => [...prev, newComment]);
            }}
          />
        </div>
        {/* 댓글 목록 */}
        <div className="flex flex-col w-[640px] gap-4">
          {comments.filter((c) => !c.parentId).length === 0 ? (
            <div className="text-center text-lg text-gray-400">
              댓글이 없습니다.
            </div>
          ) : (
            comments
              .filter((comment) => !comment.parentId) // ✅ 최상위 댓글만 필터링
              .map((comment) => {
                const replies = comments.filter(
                  (c) => c.parentId === comment.id
                );
                return (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    replies={replies}
                    onReply={handleReply}
                  />
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkCardDetail;
