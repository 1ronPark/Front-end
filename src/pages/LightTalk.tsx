import { CircleUser } from "lucide-react";
import cachedIcon from "../assets/icons/ic_cached.svg";
import TalkBox from "./lightTalk/TalkBox";
import { useState } from "react";
import slashUserIcon from "../assets/icons/lightTalk/ic_slash_user.svg";
import sampleProfile from "../assets/icons/mypage/sample_profile.png";
import TalkCard from "./lightTalk/TalkCard";

export const LightTalk = () => {
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
      <TalkCard
        name="강혜준"
        role="디자이너"
        createAt={new Date("2025-07-18T13:00:00")}
        content={`2개월 걸리던 개발을 2주에 끝낸 스타트업 개발자 이야기
        MVP는 빨리 나왔는데, 다음 기능 추가가 왜 이렇게 느릴까요?
        저도 똑같았어요.
        버그 하나 고치면 둘이 생기고, 코드 통합에만 일주일.
        4주간 시스템을 바꿨더니: 
        - 개발 기간: 2개월 → 2주 
        - 버그: 주 20개 → 2개 
        - 매일 야근 → 6시 칼퇴
        비결? 읽기 좋은 코드 시스템

![uploaded-image](${sampleProfile})
![uploaded-image](${sampleProfile})
![uploaded-image](${sampleProfile})
![uploaded-image](${sampleProfile})
![uploaded-image](${sampleProfile})

`}
        num_hearts={32}
        num_comments={32}
      />
    </div>
  );
};
