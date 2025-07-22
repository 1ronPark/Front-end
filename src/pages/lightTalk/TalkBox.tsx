import { Image } from "lucide-react";
import sampleImg from "../../assets/icons/mypage/sample_profile.png";

//내 정보 props
interface LightTalkProps {
  id?: number;
  profileImage: string; //내 프로필이미지
  univ?: string; //나의 대학
  role?: "디자이너" | "PM" | "Web" | "Android" | "ios" | "Server"; //내 역할
}

const TalkBox = ({ profileImage }: LightTalkProps) => {
  return (
    <div
      className="w-[640px] flex flex-col justify-center 
      py-4 gap-2 rounded-[28px] shadow-xs bg-[#FEFEFE]"
    >
      <div className="flex items-start gap-2 px-8">
        {/* 프로필 사진 */}
        <div className="w-[48px] h-[48px]">
          {profileImage ? (
            <img src={profileImage} className="rounded-[240px]" />
          ) : (
            <img src={sampleImg} className="rounded-[240px]" />
          )}
        </div>
        {/* 입력 창 */}
        <div className="w-full h-auto flex flex-col justify-center items-start">
          <textarea
            className="w-full flex items-center pl-4 py-1 outline-none focus:ring-0 focus:outline-none resize-none"
            placeholder="번뜩이는 아이디어가 있나요?"
          />
        </div>
      </div>
      {/* 버튼들 */}
      <div className="flex justify-between items-center pl-[96px] pr-[32px]">
        <button className="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-[rgba(73,69,79,0.08)] hover:cursor-pointer">
          <Image className="text-[#47464F]" />
        </button>
        <div className="flex h-[48px] justify-center items-center">
          <button
            className="flex justify-center items-center px-3 py-1.5
            rounded-xl border border-solid border-[#C8C5D0] hover:cursor-pointer hover:bg-[rgba(73,69,79,0.08)]"
          >
            <span>게시하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalkBox;
