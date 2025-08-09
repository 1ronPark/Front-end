import type { TalkCardProps } from "../../types/LightTalkProps";
import TalkCard from "./TalkCard";

interface TalkListProps {
  cards: TalkCardProps[];
  school: string; // 현재 선택된 학교
  myschool: string; // 내 학교
  currentUserId: number; // 현재 로그인 한 유저 ID
}

const TalkList = ({ cards, school, myschool, currentUserId }: TalkListProps) => {
  // school가 주어진 경우, 해당 학교 카드만 필터링
  const filteredCards =
    school === "다른학교"
      ? // school가 다른학교면 내 학교가 아닌 학교들 필터링
        cards.filter((card) => card.school !== myschool)
      : //school가 다른학교가 아니면 내 학교만 필터링
        cards.filter((card) => card.school === myschool);

  return (
    <div className="flex flex-col">
      {filteredCards.length > 0 && (
        <div className="flex flex-col rounded-t-[28px] overflow-hidden">
          {filteredCards.map((card, index) => {
            const isFirst = index === 0;
            const isLast = index === filteredCards.length - 1;

            const borderRadiusClass = isFirst
              ? "rounded-t-[28px]"
              : isLast
              ? "rounded-b-[28px]"
              : "rounded-none";

            const borderTop = isFirst ? "border-none" : "";

            return (
              <div
                key={card.id}
                className={`${borderTop} ${borderRadiusClass} bg-[#FEFEFE]`}
              >
                <TalkCard {...card} currentUserId={currentUserId} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TalkList;
