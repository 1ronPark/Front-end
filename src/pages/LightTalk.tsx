import { CircleUser } from "lucide-react";
import cachedIcon from "../assets/icons/ic_cached.svg";
import TalkBox from "./lightTalk/TalkBox";
import { useState } from "react";
import slashUserIcon from "../assets/icons/lightTalk/ic_slash_user.svg";
import sampleProfile from "../assets/icons/mypage/sample_profile.png";
import TalkList from "./lightTalk/TalkList";
import type { TalkCardProps } from "../types/LightTalkProps";
import { dummyLightTalkCard } from "../../mockData/dummyLightTalkCard";

export const LightTalk = () => {
  const talkCards: TalkCardProps[] = dummyLightTalkCard;
  //test용으로 로그인 한 유저를 더미데이터의 id:1로 설정.
  const myProps: TalkCardProps = talkCards[0];

  const [univType, setUnivType] = useState<"우리학교" | "다른학교">("우리학교");
  const [isClicked, setIsClicked] = useState(false);

  const toggleUnivType = () => {
    setUnivType((prev) => (prev === "우리학교" ? "다른학교" : "우리학교"));
    setIsClicked(true);
    // 200ms 후 scale 초기화
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-4 gap-4 ">
      <div className="w-[640px] flex justify-center items-center">
        <button
          className={`flex justify-center items-center px-4 py-2 gap-2 rounded-[100px] shadow-lg bg-[#FCF8FF]
          transition-transform duration-200 cursor-pointer
          ${isClicked ? "scale-105" : "scale-100"} hover:bg-[#F0ECF4]`}
          onClick={toggleUnivType}
        >
          {univType === "다른학교" ? (
            <img
              src={slashUserIcon}
              className="w-5 h-5 aspect-square text-[#47464F]"
            />
          ) : (
            <CircleUser className="w-5 h-5 aspect-square text-[#47464F]" />
          )}
          <span className="text-[#47464F] label-large">{univType}</span>
          <img
            src={cachedIcon}
            className="w-6 h-6 aspect-square opacity-[0.38]"
          />
        </button>
      </div>
      {/* 해당 톡박스에 해당하는 유저 이미지와 ID를 props로 넣어줌 */}
      <TalkBox profileImage={sampleProfile} />
      <TalkList cards={talkCards} />
    </div>
  );
};
