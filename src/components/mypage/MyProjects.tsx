import { NavLink } from "react-router-dom";
import addIcon from "../../assets/icons/mypage/ic_project_addsvg.svg";
import MyProjectEmpty from "./project/MyProjectEmpty";
import MyProjectList from "./project/MyProjectList";
import type { Project } from "../../hooks/useMyProjects";

interface MyProjectProps {
  hasData: boolean;
  isLoading: boolean;
  projects: Project[];
}

const MyProjects = ({ hasData, isLoading, projects }: MyProjectProps) => {
  return (
    <div className="w-full flex justify-center overflow-y-auto">
      <div className="w-[960px] flex flex-col">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col justify-center gap-4">
            <p className="headline-small-emphasis">프로젝트 관리</p>
            <li className="title-medium text-[#47464F] ml-3">
              프로젝트를 시작으로 창업까지
            </li>
          </div>
          {hasData && (
            <NavLink
              to="/register-project"
              className="flex h-[48px] items-center justify-center gap-2 rounded-xl bg-[#E3E0F9] px-4 py-2.5 text-[#464559] hover:bg-[#d3cfed] label-large"
            >
              <img src={addIcon} alt="프로젝트 추가" />
              <span>프로젝트 등록하기</span>
            </NavLink>
          )}
        </div>
        {/* 구분선 */}
        <hr className="w-[960px] mt-4 border-t border-[#CBC4CF]" />
        <div className="w-[960px] mt-6 flex flex-col items-center gap-8">
          {isLoading ? (
            <div>로딩 중...</div> // 여기에 스피너나 스켈레톤 UI 컴포넌트를 사용할 수 있습니다.
          ) : hasData === false ? (
            <MyProjectEmpty />
          ) : (
            <MyProjectList projectList={projects} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
