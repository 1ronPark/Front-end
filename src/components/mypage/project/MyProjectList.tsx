import MyprojectCard from "./MyprojectCard";

const MyProjectList = () => {
  return (
    <div>
      {/* 내가 참여중인 프로젝트 */}
      <MyprojectCard
        status={"참여중"}
        title={
          "Lightup(라이텁) - 대학생들을 위한 프로젝트 연계형 창업 도모 서비스"
        }
        PM_name={"박종인"}
        univ={"한양대학교 ERICA"}
        location={"안산"}
      />

      {/* 내 프로젝트 */}
    </div>
  );
};

export default MyProjectList;
