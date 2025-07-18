
import profile2 from "../../../assets/icons/projectDetail/profileExam2.png";
import { RefreshCw } from "lucide-react";
import CommentItem from "./CommentItem";

const CommentSection = () => {
  return (
    <div className="w-full flex flex-col gap-4 px-4">
      {/* 댓글 수 */}
      <p className="title-medium-emphasis text-[#1D1B20]">댓글 12개</p>

      {/* 댓글 입력 박스 */}
      <div className="w-full flex items-start gap-4 p-4 rounded-xl bg-[rgba(29,27,32,0.08)]">
        {/* 프로필 */}
        <img
          src={profile2}
          alt="프로필 이미지"
          className="w-12 h-12 rounded-full mt-1 object-cover object-top"
        />

        {/* textarea + 버튼 수직 정렬 */}
        <div className="flex flex-col w-full gap-2">
          <textarea
            className="w-full body-medium p-3 rounded-md  text-sm placeholder:text-gray-400  focus:outline-none"
            placeholder={`댓글은 기획에 대한 피드백 혹은 질문만 가능합니다.\n감상평 외 정치관련 / 욕설 / 비방 목적의 댓글은 즉시 차단 조치 됩니다.`}
          />
          <div className="flex justify-end">
            <button className="px-[16px] py-[10px] bg-[#E9dEF8] text-[#4B4358] label-large rounded-lg hover:bg-[#D8C6E9] active:bg-[#C7B0D9] cursor-pointer">
              남기기
            </button>
          </div>
        </div>
      </div>

      {/* 최신순 버튼 */}
      <div className="flex justify-start">
        <button className="flex items-center justify-center gap-2 w-[96px] h-[48px] bg-white text-[#49454E] label-large text-sm rounded-md border-[1px] border-[#CBC4CF] hover:bg-[#F2ECF4] active:bg-[#EDE6EE] curosor-pointer">
          <RefreshCw className="w-4 h-4" />
          최신순
        </button>
      </div>

      <CommentItem />
    </div>
  );
};

export default CommentSection;
