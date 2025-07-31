import {
  EllipsisVertical,
  Heart,
  MessageSquareText,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import MenuModal from "./talkModal/MenuModal";
import ShareModal from "./talkModal/ShareModal";
import { useLocation, useNavigate } from "react-router-dom";
import type { TalkCardProps } from "../../types/LightTalkProps";

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

const TalkCard = ({
  id,
  name,
  role,
  profile_image,
  text,
  images,
  createAt,
  num_hearts,
  num_comments,
  currentUserId,
}: TalkCardProps) => {
  //해당 카드 detail로 이동하기 위한 변수
  const navigate = useNavigate();
  const location = useLocation();

  //해당 카드를 클릭하면 디테일 페이지로 이동
  const handleCardClick = () => {
    const targetPath = `/lightTalk/${id}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  // 내 게시물인지 여부
  const isMyPost = currentUserId === id;
  // 하트 개수
  const [countHeart, setCountHeart] = useState<number>(num_hearts ?? 0);
  //하트를 눌렀는지 여부 체크
  const [isHeart, setIsHeart] = useState<boolean>(false);
  //카드 메뉴 모달 열기
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  //공유 모달 열기
  const [openShareModal, setOpenShareModal] = useState(false);

  //토글형 좋아요 => 한번누르면 올라가고 한번 더 누르면 내려감
  const handleHeartClick = () => {
    if (isHeart) {
      setCountHeart(countHeart - 1);
    } else {
      setCountHeart(countHeart + 1);
    }
    setIsHeart(!isHeart); // 상태 반전
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

  useEffect(() => {
    // console.log("하트 변화");
  }, [countHeart]);

  // const { images, text } = extractImagesAndText(content);

  return (
    <div
      className="relative w-[640px] flex items-start px-8 pt-4  gap-4 bg-[#FEFEFE]
    rounded-t-[28px]"
      onClick={handleCardClick}
    >
      <div className="h-12 w-12 absolute top-0 right-2 flex justify-center items-center">
        <button
          className="flex h-8 w-8 flex-col justify-center items-center rounded-[100px] hover:bg-[rgba(73,69,79,0.08)]"
          onClick={handleMenuClick}
        >
          <EllipsisVertical className="w-5 h-5 " />
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

      <div className="flex w-12 h-12 justify-center items-center ">
        <img src={profile_image} className="rounded-[240px]" />
      </div>
      <div className="w-full flex flex-col items-start gap-2 mb-2">
        {/* 내 정보 컨텐츠 */}
        <div className="flex items-center gap-2">
          <p className="text-[#1C1B21] label-large-emphasis">{name}</p>
          <p className="text-[#1C1B21] body-medium-emphasis opacity-[0.58]">
            {role}
          </p>
          <p className="text-[#47464F] body-medium opacity-[0.58]">
            {getTimeAgo(createAt)}
          </p>
        </div>
        {/* 글내용 */}
        <p className="h-auto body-medium text-[#1C1B21]">
          <p className="body-medium whitespace-pre-line text-[#1C1B21]">
            {text.trim()}
          </p>

          {/* 이미지 슬라이드 */}
          {images?.length > 0 && (
            <div className="w-[512px] overflow-x-auto mt-2">
              <div className="flex gap-2 w-max pr-2">
                {images?.map((src, idx) => (
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
        </p>
        <div className="flex items-center py-2 gap-4 ">
          {/* 하트버튼 */}
          <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58] rounded-xl hover:bg-gray-100">
            <button className="hover:cursor-pointer" onClick={handleHeartClick}>
              <Heart />
            </button>
            <p className="label-large-emphasis">{countHeart}</p>
          </div>
          {/* 댓글 버튼 */}
          <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58] rounded-xl hover:bg-gray-100">
            <button className="hover:cursor-pointer">
              <MessageSquareText />
            </button>
            <p className="label-large-emphasis">{num_comments}</p>
          </div>
          {/* 공유버튼 */}
          <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58] rounded-xl hover:bg-gray-100">
            <button className="hover:cursor-pointer" onClick={handleShareClick}>
              <Upload />
            </button>
          </div>
        </div>
      </div>
      {/* 카드 밑 구분선 */}
      <div className="absolute right-0 bottom-0 w-full h-[1px]  flex flex-col justify-center items-start bg-[#C8C5D0] " />
    </div>
  );
};

export default TalkCard;
