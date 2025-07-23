import {
  EllipsisVertical,
  Heart,
  MessageSquareText,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";

interface TalkCardProps {
  id: number;
  name: string; //이름
  profile_image: string;
  // role?: "디자이너" | "PM" | "Web" | "Android" | "ios" | "Server";
  role: string;
  univ: string;
  content: string; //글내용
  createAt: Date; //글이 작성된 날짜
  num_hearts: number; //좋아요 갯수
  num_comments: number; //댓글 갯수
}

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // 초 단위

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}일 전`;

  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`; // 날짜 표시
};

// 이미지와 텍스트 분리 함수
const extractImagesAndText = (content: string) => {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images = [...content.matchAll(imageRegex)].map((match) => match[1]);
  const text = content.replace(imageRegex, ""); // 이미지 마크업 제거한 텍스트
  return { images, text };
};

const TalkCard = ({
  name,
  role,
  profile_image,
  content,
  createAt,
  num_hearts,
  num_comments,
}: TalkCardProps) => {
  const [countHeart, setCountHeart] = useState<number>(num_hearts);
  //하트를 눌렀는지 여부 체크
  const [isHeart, setIsHeart] = useState<boolean>(false);

  const handleHeartClick = () => {
    if (!isHeart) {
      setCountHeart(countHeart + 1);
      setIsHeart(!isHeart);
    }
    return;
  };

  useEffect(() => {
    console.log("하트 변화");
  }, [countHeart]);

  const { images, text } = extractImagesAndText(content);

  return (
    <div
      className="relative w-[640px] flex items-start px-8 pt-4  gap-4 bg-[#FEFEFE]
    "
    >
      <div className="h-12 w-12 absolute top-0 right-8 flex justify-center items-center">
        <button className="flex h-8 w-8 flex-col justify-center items-center rounded-[100px] hover:bg-[rgba(73,69,79,0.08)]">
          <EllipsisVertical className="w-5 h-5 " />
        </button>
      </div>
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
            {getTimeAgo(new Date(createAt))}
          </p>
        </div>
        {/* 글내용 */}
        <p className="h-auto body-medium text-[#1C1B21]">
          <p className="body-medium whitespace-pre-line text-[#1C1B21]">
            {text.trim()}
          </p>

          {/* 이미지 슬라이드 */}
          {images.length > 0 && (
            <div className="w-[512px] overflow-x-auto mt-2">
              <div className="flex gap-2 w-max pr-2">
                {images.map((src, idx) => (
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
          <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58]">
            <button className="hover:cursor-pointer" onClick={handleHeartClick}>
              <Heart />
            </button>
            <p className="label-large-emphasis">{countHeart}</p>
          </div>
          {/* 댓글 버튼 */}
          <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58] rounded-xl">
            <button className="hover:cursor-pointer">
              <MessageSquareText />
            </button>
            <p className="label-large-emphasis">{num_comments}</p>
          </div>
          {/* 공유버튼 */}
          <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58]">
            <button className="hover:cursor-pointer">
              <Upload />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-full h-[1px]  flex flex-col justify-center items-start bg-[#C8C5D0] " />
    </div>
  );
};

export default TalkCard;
