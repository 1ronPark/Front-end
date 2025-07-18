import projectEmptyIcon from "../../../assets/icons/mypage/project_empty.png";

const MyProjectEmpty = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      {/* 프로젝트가 없는 이미지 섹션 */}
      <div className="flex flex-col items-center px-2.5 ">
        <img src={projectEmptyIcon} />
        {/* 밑에 문구 */}
        <span className="title-medium ">
          현재 진행 중인 프로젝트가 없습니다.
        </span>
      </div>
      {/* 밑에 버튼들 */}
      <div className="flex flex-col items-start gap-4">
        <button
          className="w-[240px] h-[40px] flex flex-col justify-center items-center 
        rounded-xl bg-[#5A5891] hover:cursor-pointer"
        >
          <p className="text-[#FFF] label-large">둘러보러가기</p>
        </button>
        <button
          className="w-[240px] h-[40px] flex flex-col justify-center items-center 
        rounded-xl border border-[#C8C5D0] border-solid hover:cursor-pointer"
        >
          <p className="text-[#47464F] label-large">등록하러가기</p>
        </button>
      </div>
    </div>
  );
};

export default MyProjectEmpty;
