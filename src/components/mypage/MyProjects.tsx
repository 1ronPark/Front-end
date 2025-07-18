import addIcon from "../../assets/icons/mypage/ic_project_addsvg.svg";
import MyProjectEmpty from "./project/MyProjectEmpty";
import MyProjectList from "./project/MyProjectList";

interface MyProjectProps {
  hasData: boolean; //데이터가 있으면 true
}

const MyProjects = ({ hasData }: MyProjectProps) => {
  return (
    <div className="flex-1 justify-center overflow-y-auto mx-[100px]">
      <div className="w-[960px] flex justify-between items-center ">
        <div className="flex flex-col justify-center gap-4">
          <p className="headline-small-emphasis">프로젝트 관리</p>
          <li className="title-medium text-[#47464F] ml-3">
            프로젝트를 시작으로 창업까지
          </li>
        </div>
        {hasData && (
          <div
            className="flex h-[48px] justify-center items-center text-[#47464F] gap-1 
          hover:cursor-pointer"
          >
            <button
              className="flex px-4 py-2.5 justify-center items-center gap-2
            rounded-xl bg-[#E3E0F9] hover:bg-[#d3cfed] cursor-pointer"
            >
              <img src={addIcon} />
              <p className="label-large text-[#464559]">프로젝트 등록하기</p>
            </button>
          </div>
        )}
      </div>
      {/* 구분선 */}
      <hr className="w-[960px] mt-4 border-t border-[#CBC4CF]" />
      <div className="w-[960px] mt-6 flex flex-col items-center gap-8">
        {hasData === false ? <MyProjectEmpty /> : <MyProjectList />}
      </div>
    </div>
  );
};

export default MyProjects;
