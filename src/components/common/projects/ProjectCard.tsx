import { useNavigate } from "react-router-dom";
import { LikeButton } from "../../common/buttons/LikeButton";
import { Eye, MessageSquareText } from "lucide-react";
import mediaImage from "../../../assets/icons/project/Media.png";
import Avatar from "../../../assets/ic_myprofile.svg";
import { getRelativeDate } from "../../../utils/date"; // 날짜를 상대적인 형식으로 표시하는 유틸리티 함수
import type { ProjectCardWithUserProps } from "../../../types/ProjectCardWithUser";


const ProjectCard = ({
  id,
  name,
  sub_title,
  date,
  school,
}: ProjectCardWithUserProps) => {
  const navigate = useNavigate();

  
  return (
    <div
      onClick={() => navigate(`/projects/${id}`)}
      className="w-full h-[260px] border border-[#CBC4CF] rounded-lg overflow-hidden flex flex-col cursor-pointer"
    >
      {/* 썸네일 이미지 */}
      <img
        src={mediaImage}
        alt="Project Thumbnail"
        className="w-full h-[130px] object-cover object-center block"
      />
      <div className="text-sm scale-[0.95]">
        <div className="px-2 py-1 flex flex-col">
          {/* 유저 + 좋아요 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={Avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm title-medium">{name}</span>
              </div>
            </div>
            <LikeButton itemId={id} />
          </div>

          {/* 프로젝트 소개 및 위치 */}
          <div className="flex flex-col mt-2">
            <span className="title-medium-emphasis truncate">{sub_title}</span>
            <span className="body-medium text-gray-500">{school}</span>
          </div>

          {/*gap-6에서 수정*/}
          {/* 조회수 */}
          <div className="flex items-center mt-4 justify-end gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-5 h-5 text-[#49454E]" />
              <span className="text-xs label-medium text-[#49454E]">13</span>
            </div>

            {/* 댓글 수 */}
            <div className="flex items-center gap-1">
              <MessageSquareText className="w-5 h-m text-[#49454E]" />
              <span className="text-xs label-medium text-[#49454E]">5</span>
            </div>

            {/* 날짜 */}
            <span className="text-xs label-medium text-[#49454E]">
              {getRelativeDate(date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
