import type { TalkCardProps } from "../../types/LightTalkProps";
import TalkCard from "./TalkCard";

interface TalkCardGroup {
  univ: string;
  cards: TalkCardProps[];
}

interface TalkCardListProps {
  cards: TalkCardProps[];
}

const TalkList = ({ cards }: TalkCardListProps) => {
  // univ 기준으로 그룹핑
  const grouped = cards.reduce<Record<string, TalkCardProps[]>>((acc, card) => {
    if (!acc[card.univ]) acc[card.univ] = [];
    acc[card.univ].push(card);
    return acc;
  }, {});

  const groupedArray: TalkCardGroup[] = Object.entries(grouped).map(
    ([univ, cards]) => ({ univ, cards })
  );

  return (
    <div className="flex flex-col">
      {groupedArray.map(({ univ, cards }) => (
        <div
          key={univ}
          className="flex flex-col border border-[#E0E0E0] rounded-[28px] overflow-hidden"
        >
          {/* 대학 이름 표시 (필요 시 주석 해제) */}
          {/* <div className="text-[#49454F] font-semibold text-sm mb-2 px-8">
            {univ}
          </div> */}

          {cards.map((card, index) => {
            const isFirst = index === 0;
            const isLast = index === cards.length - 1;

            const borderRadiusClass = isFirst
              ? "rounded-t-[28px]"
              : isLast
              ? "rounded-b-[28px]"
              : "rounded-none";

            const borderTop = isFirst ? "" : "border-t border-[#E0E0E0]";

            return (
              <div
                key={card.id}
                className={`${borderTop} ${borderRadiusClass} rounded-[28px] bg-[#FEFEFE]`}
              >
                <TalkCard {...card} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TalkList;
