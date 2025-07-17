import addIcon from "../../assets/icons/mypage/ic_project_addsvg.svg";
import MyProjectEmpty from "./project/MyProjectEmpty";
import MyProjectList from "./project/MyProjectList";

interface MyProjectProps {
  hasData: boolean; //데이터가 있으면 true
}

const MyProjects = ({ hasData }: MyProjectProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 mx-[100px]">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="headline-small-emphasis">프로젝트 관리</p>
        </div>
        {hasData && (
          <div
            className="flex justify-center items-center text-[#47464F] gap-1 
          hover:cursor-pointer"
          >
            <img src={addIcon} />
            <p className="">나만의 기획 등록하기</p>
          </div>
        )}
      </div>
      {/* 구분선 */}
      <hr className="mt-4 border-t border-[#CBC4CF]" />
      <div className="mt-6 flex flex-col items-center gap-8">
        {hasData === false ? <MyProjectEmpty /> : <MyProjectList />}
      </div>
    </div>
  );
};

export default MyProjects;
