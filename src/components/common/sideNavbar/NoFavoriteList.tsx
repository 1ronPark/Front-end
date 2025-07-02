import noFavoriteIcon from "../../../assets/sideNavbar/heart_broken_Filled.svg";

const NoFavoriteList = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {/* 헤더 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="font-semibold text-2xl">알림</div>
      </div>
      {/* 활동 내역 없음 표시 */}
      <div className="flex flex-col items-center py-[128px] gap-6">
        <img src={noFavoriteIcon} />
        <p className="font-normal text-[16px] text-[#49454E]">
          관심 목록을 추가해 보세요
        </p>
      </div>
    </div>
  );
};

export default NoFavoriteList;
