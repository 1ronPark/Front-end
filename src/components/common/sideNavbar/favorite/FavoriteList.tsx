import FavoriteItem from "./FavoriteItem";

const FavoriteList = () => {
  return (
    <div className="w-[300px]">
      {/* 헤더 */}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="title-large text-[#1D1B20]">관심</div>
        {/* <div className="title-large">관심</div> */}
      </div>

      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        최근 본
      </div>
      <div className="flex flex-col justify-center items-center min-h-[72px] border-b border-[#CBC4CF]">
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
      </div>
      {/* 관심그룹 1*/}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        관심그룹 1
      </div>
      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
      </div>

      {/* 관심그루 2*/}
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        관심그룹 2
      </div>

      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
      </div>
    </div>
  );
};

export default FavoriteList;
