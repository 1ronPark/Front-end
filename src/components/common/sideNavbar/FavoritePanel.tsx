import BasePanel from "./BasePanel";
import FavoriteList from "./FavoriteList";
import NoFavoriteList from "./NoFavoriteList";

const FavoritePanel = () => {
  const hasFavorite = false;

  return (
    <BasePanel>{hasFavorite ? <FavoriteList /> : <NoFavoriteList />}</BasePanel>
  );
};

export default FavoritePanel;
