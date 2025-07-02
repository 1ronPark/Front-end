const FavoriteList = () => {
  return (
    <>
      {/* 헤더 */}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2">
        <div className="font-semibold text-2xl">관심</div>
      </div>

      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 text-sm">
        최근 본
      </div>
      <div className="flex flex-col justify-center items-center min-h-[72px] border-b border-[#CBC4CF]">
        <div>관심 리스트</div>
        <div>관심 리스트</div>
        <div>관심 리스트</div>
      </div>
      {/* 관심그룹 1*/}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 text-sm">
        관심그룹 1
      </div>
      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <div>관심 리스트</div>
        <div>관심 리스트</div>
        <div>관심 리스트</div>
      </div>

      {/* 관심그루 2*/}
      <div className="w-[400px] flex flex-col px-6 pt-6 pb-2 gap-2 text-sm">
        관심그룹 2
      </div>

      <div className="flex flex-col items-center justify-center min-h-[72px] border-b border-[#CBC4CF]">
        <div>관심 리스트</div>
        <div>관심 리스트</div>
        <div>관심 리스트</div>
      </div>
    </>
  );
};

export default FavoriteList;
