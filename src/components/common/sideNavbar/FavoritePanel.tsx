import FavoriteList from "./FavoriteList";
import NoFavoriteList from "./NoFavoriteList";

const FavoritePanel = () => {
  return (
    <div
      className="fixed right-[97px] w-[400px] h-screen flex flex-col bg-[#FFF] overflow-auto
    shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_1px_3px_1px_rgba(0,0,0,0.15)]"
    >
      {/* 관심 목록이 있으면 이걸 사용 */}
      <FavoriteList />
      {/* 관심 목록이 없으면 이걸 사용 */}
      {/* <NoFavoriteList /> */}
    </div>
  );
};

export default FavoritePanel;
