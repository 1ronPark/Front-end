import FavoriteList from "./FavoriteList";

const FavoritePanel = () => {
  return (
    <div
      className="fixed right-[97px] w-[400px] h-screen flex flex-col bg-[#FFF] overflow-auto
    shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_1px_3px_1px_rgba(0,0,0,0.15)]"
    >
      {/* 헤더 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="font-semibold text-2xl">관심</div>
        <div className="text-sm">최근 본</div>
      </div>

      {/* 최근 본*/}
      <div className="flex flex-col justify-center items-center min-h-[72px] border-b border-[#CBC4CF]">
        <FavoriteList />
      </div>
      {/* 관심그룹 1*/}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 text-sm">
        관심그룹 1
      </div>
      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <FavoriteList />
      </div>

      {/* 관심그루 2*/}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 text-sm">
        관심그룹 2
      </div>

      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <FavoriteList />
      </div>
    </div>
  );
};

export default FavoritePanel;
