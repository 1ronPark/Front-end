//import FavoriteItem from "../favorite/FavoriteItem";
import NoticeItem from "../notification/NoticeItem";

const RecentList = () => {
  return (
    <div className="w-[300px]">
      {/* 헤더 */}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="title-large">최근 본</div>
      </div>
      {/*맴버*/}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        맴버
      </div>
      <div className="flex flex-col justify-center items-center min-h-[72px] border-b border-[#CBC4CF]">
       {/*} <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem /> */}
      </div>
      {/*프로젝트*/}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        프로젝트
      </div>
      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <NoticeItem />
        <NoticeItem />
        <NoticeItem />
      </div>
    </div>
  );
};

export default RecentList;
