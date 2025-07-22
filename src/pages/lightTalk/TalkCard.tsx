import { Heart, MessageSquareText, Upload } from "lucide-react";
import sampleProfile from "../../assets/icons/mypage/sample_profile.png";

interface TalkCardProps {
  name: string; //이름
  role?: "디자이너" | "PM" | "Web" | "Android" | "ios" | "Server"; //역할
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

const TalkCard = ({
  name,
  role,
  content,
  createAt,
  num_hearts,
  num_comments,
}: TalkCardProps) => {
  return (
    <div className="w-[640px] flex items-start px-8 pt-4 gap-4 bg-[#FEFEFE] rounded-t-[28px]">
      <div className="flex w-12 h-12 justify-center items-center ">
        <img src={sampleProfile} className="rounded-[240px]" />
      </div>
      <div className="w-[343px]  flex flex-col items-start gap-2">
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
          {/* 2개월 걸리던 개발을 2주에 끝낸 스타트업 개발자 이야기
          <br />
          MVP는 빨리 나왔는데, 다음 기능 추가가 왜 이렇게 느릴까요?
          <br />
          저도똑같았어요.
          <br />
          버그 하나 고치면 둘이 생기고, 코드 통합에만 일주일.
          <br />
          4주간 시스템을 바꿨더니: <br />
          - 개발 기간: 2개월 → 2주 <br />
          - 버그: 주 20개 → 2개 <br />
          - 매일 야근 → 6시 칼퇴 <br />
          비결? "읽기 좋은 코드 시스템" <br /> */}
          {content}
        </p>
        <div className="flex items-center py-2 gap-4 ">
          {/* 하트버튼 */}
          <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58]">
            <button className="hover:cursor-pointer">
              <Heart />
            </button>
            <p className="label-large-emphasis">{num_hearts}</p>
          </div>
          {/* 댓글 버튼 */}
          <div className="flex px-3 py-1.5 justify-center items-center gap-1 opacity-[0.58]">
            <button className="hover:cursor-pointer">
              {" "}
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
    </div>
  );
};

export default TalkCard;
