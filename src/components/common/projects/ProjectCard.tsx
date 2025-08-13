import { useNavigate } from "react-router-dom";
import { LikeButton } from "../../common/buttons/LikeButton";
import { Eye, MessageSquareText } from "lucide-react";
import defaultImage from "../../../assets/icons/project/project_defaultImage.png"; // 기본 이미지
import Avatar from "../../../assets/ic_myprofile.svg";
import { getRelativeDate } from "../../../utils/date"; // 날짜를 상대적인 형식으로 표시하는 유틸리티 함수
import type { ProjectListItem } from "../../../hooks/useProjectQueries";
import { useState, useEffect } from "react";

const ProjectCard = ({
<<<<<<< HEAD
  itemId: id,
  memberName: name,
 introduce: sub_title = "프로젝트 소개가 없습니다.",
  itemImageUrl: ImageUrl = defaultImage, // 이미지가 없을 경우 기본 이미지, 에러일 경우 확인 위해 흑백 이미지
  updatedAt: date,
  school = "학교 정보 없음",
  viewCount,
  commentCount,
  likedByCurrentUser,
}: ProjectListItem) => {
=======
  id,
  name,
  sub_title,
  date,
  school,
}: ProjectCardWithUserProps) => {
>>>>>>> 5de7cb27eafcc94f2f929724632e454fee1f9a8f
  const navigate = useNavigate();

    // 이미지 src와 에러 여부 상태
  const [imgSrc, setImgSrc] = useState(ImageUrl || defaultImage);
  const [imgBroken, setImgBroken] = useState(false);

  // props가 바뀔 때마다 상태 초기화
  useEffect(() => {
    setImgSrc(ImageUrl || defaultImage);
    setImgBroken(false);
  }, [ImageUrl]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // 기본 이미지도 실패하면 무한 onError 방지
    if ((e.currentTarget as HTMLImageElement).src.includes(defaultImage)) return;
    setImgSrc(defaultImage);
    setImgBroken(true); // 실패 시에만 흑백 처리
  };

  return (
    <div
      onClick={() => navigate(`/projects/${id}`)}
      className="w-full h-[260px] border border-[#CBC4CF] rounded-lg overflow-hidden flex flex-col cursor-pointer"
    >
      {/* 썸네일 이미지 */}
      <img
        src={imgSrc}
        onError={handleImgError}
        alt="Project Thumbnail"
        className={`w-full h-[130px] object-cover object-center block ${
          imgBroken ? "grayscale" : "" // 흑백 처리
        }`}
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
            <LikeButton itemId={id} likedByCurrentUser={likedByCurrentUser} />
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
              <span className="text-xs label-medium text-[#49454E]">
                {viewCount}
              </span>
            </div>

            {/* 댓글 수 */}
            <div className="flex items-center gap-1">
              <MessageSquareText className="w-5 h-m text-[#49454E]" />
              <span className="text-xs label-medium text-[#49454E]">
                {commentCount}
              </span>
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
