import { ChevronUp, EllipsisVertical } from "lucide-react";
import logo from "../../../assets/icons/mypage/project_sample_logo.png";
import groupIcon from "../../../assets/icons/mypage/ic_group_search.svg";
import type { CategoryType } from "../../../types/ProjectDetailProps";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectEditDeleteModal from "../../common/modals/ProjectEditDeleteModal";

export interface MyProjectCardProps {
  itemId: number;
  categories: CategoryType[];
  title: string;
  sub_title: string;
  itemImageUrl: string; // 프로젝트 썸네일 이미지 URL
  status: "모집중" | "모집마감";
  hasTeammate?: boolean;
  current_project?: boolean; //현재 참여하고 있는 프로젝트
  applied_project?: boolean; //지원한 프로젝트인지 여부 이건 current_project가 true이면 false여야 함
}

const MyprojectCard = ({
  itemId,
  categories,
  title,
  sub_title,
  itemImageUrl,
  status,
}: MyProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ...

  const navigate = useNavigate();

  return (
    <div className="relative w-[960px] flex justify-center items-center rounded-xl bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:bg-[rgba(29,27,32,0.08)] mb-2">
      <button
        className="w-[56px] h-[56px] absolute flex flex-col justify-center items-center text-black 
        rounded-[100px] top-0 right-0 hover:bg-[rgba(73,69,79,0.08)]"
        onClick={() => setIsModalOpen(true)}
      >
        <EllipsisVertical />
      </button>
      <div className="w-[960px]  flex flex-col justify-center items-center p-4 gap-2.5 shrink-0">
        <div className="w-[888px] flex justify-center items-center gap-8">
          <img
            src= {itemImageUrl || logo} // 프로젝트 썸네일 이미지
            alt="프로젝트 썸네일"
            className="w-[80px] h-[80px] flex justify-center items-center shrink-0 aspect-square rounded-xl"
          />
          <div className="w-full flex flex-col justify-center items-start gap-2">
            <p className="label-medium text-[#1C1B21]">
              {categories.join(", ")}
              {/* 카테고리 배열이 ,로 구별되어 문자열로 변함 */}
            </p>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-6">
                <p className="title-large-emphasis text-[#1C1B21]">{title}</p>
                <p className="title-medium text-[#1C1B21]">{sub_title}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => navigate(`/projects/${itemId}`)}
                  className="flex justify-center items-center gap-1 px-3 py-1.5 relative top-[30px] rounded-xl hover:bg-[rgba(73,69,79,0.08)] cursor-pointer"
                >
                  <ChevronUp className="w-5 h-5 text-[#6C63FF]" />
                  <p className="label-large text-[#6C63FF]">보러가기</p>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-[14px] text-[#16134A] h-[24px]">
              {status === "모집중" && (
                <>
                  <img
                    src={groupIcon}
                    className="w-[24px] h-[24px] aspect-square"
                  />
                  <p className="title-small opacity-[0.64]">팀원 모집중</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProjectEditDeleteModal
          onClose={() => setIsModalOpen(false)}
          onShareClick={() => {
            // 공유하기 클릭 핸들러
            console.log("공유하기 클릭됨");
            setIsModalOpen(false); // 모달 닫기
            }}
          // 필요하면 project id 등 props 전달
        />)}
    </div>
  );
};

export default MyprojectCard;
