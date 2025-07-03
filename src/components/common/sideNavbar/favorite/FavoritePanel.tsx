import BasePanel from "../BasePanel";
import FavoriteList from "./FavoriteList";
import NoFavoriteList from "./NoFavoriteList";

const FavoritePanel = () => {
  const hasFavorite = true;

  return (
    <BasePanel
      hasData={hasFavorite}
      list={<FavoriteList />}
      empty={<NoFavoriteList />}
    />
  );
};

export default FavoritePanel;
