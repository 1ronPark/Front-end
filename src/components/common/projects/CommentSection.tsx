import profile1 from "/assets/icons/projectDetail/profileExam1.png";
import profile2 from "/assets/icons/projectDetail/profileExam2.png";
import {RefreshCw} from "lucide-react";

const CommentSection = () => {
  return (
    <section>
      {/* 댓글 작성 */}
      <div className="flex flex-col justify-center items-start mb-4">
        <p className="title-medium-emphasis text-[#1D1B20]">댓글 12개</p>
      </div>
      {/* 댓글 작성창 */}
      <div className="w-full h-[128px] border-3 border-[rgba(29,27,32,0.08)] pd-4 flex justify-end items-end rounded-xl">
        <div className="flex justify-center items-center gap-8">
          <img
            src={profile1}
            alt="프로필 이미지"
            className="w-12 h-12 rounded-full"
          />
          <textarea
            className="flex flex-col justify-center items-start "
            placeholder="댓글은 기획에 대한 피드백 혹은 질문만 가능합니다.
감상평 외 정치관련 / 욕설 / 비방 목적의 댓글은 즉시 차단 조치 됩니다."
          ></textarea>
        </div>
        {/* 댓글 작성 버튼 */}
        <div className="flex justify-end items-end w-full h-full">
        <button className="w-[100px] h-[40px] bg-[#E9dEF8] text-[#4B4358] label-large text-sm rounded-lg ml-4">
          남기기
        </button>
        </div>
      </div>
      {/* 최신순 버튼*/}
      <div className="flex justify-center items-center pl-2 pr-4 py-2.5 gap-2">
        <button className="w-[96px] h-[48px] bg-[#E9dEF8] text-[#4B4358] label-large text-sm rounded-xm border-2 border-[#CBC4CF]">
            <RefreshCw className="w-4 h-4 mr-2" />
          최신순
        </button>
        </div>
    </section>
  );
};

export default CommentSection;
