import { Pencil, HeartCrack } from "lucide-react";
import FavoriteItem from "./FavoriteItem";
import { useProjectList } from "../../../../hooks/useProjectQueries";

const FavoriteList = () => {
  const { data, isLoading, isError } = useProjectList({
    page: 1,
    onlyLiked: true,
  });
  const items = data?.result?.items ?? [];

  return (
    <div className="w-[300px]">
      {/* 헤더 */}
      <div className="flex justify-between px-6 pt-6 pb-2">
        <div className="title-large text-[#47464F]">관심</div>
        <button className="flex justify-end items-center gap-1 py-1.5 pl-3 text-[#1D1B20] cursor-pointer">
          <Pencil className="w-[15px] h-[15px]" />
          <p className="label-large-emhasis">편집</p>
        </button>
        {/* <div className="title-large">관심</div> */}
      </div>
      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E] ">
        프로젝트
      </div>
      <div className="flex flex-col min-h-[72px] border-b border-[#CBC4CF] pb-4">
        {!isLoading && !isError && items.length === 0 && (
          <div className="flex w-full items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center w-full h-[300px]">
              <HeartCrack className="w-12 h-12 text-[#E4E1EC] mb-2" />
              <span className="title-medium text-[#47464F]">
                관심 목록을 추가해 보세요
              </span>
            </div>
          </div>
        )}
        {!isLoading &&
          !isError &&
          items.map((it) => (
            <FavoriteItem
              key={it.itemId}
              id={it.itemId}
              title={it.itemName}
              subtitle={it.memberName}
              imageUrl={it.itemImageUrl}
              liked={it.likedByCurrentUser}
            />
          ))}
      </div>

      {/* 
    관심표시한 멤버 목록은 우선 보류

      <div className="flex flex-col px-6 pt-6 pb-2 gap-2 title-small text-[#49454E]">
        멤버
      <div className="flex flex-col min-h-[72px] border-b border-[#CBC4CF]">
        {isLoading && (
          <div className="px-6 py-4 text-sm text-[#49454E]">불러오는 중…</div>
        )}
        {isError && (
          <div className="px-6 py-4 text-sm text-red-600">
            관심 목록을 불러오지 못했습니다.
          </div>
        )}
        {!isLoading && !isError && items.length === 0 && (
          <div className="px-6 py-4 text-sm text-[#49454E]">
            관심 표시한 멤버가 없습니다..
          </div>
        )}
      </div>
      */}
    </div>
  );
};

export default FavoriteList;
