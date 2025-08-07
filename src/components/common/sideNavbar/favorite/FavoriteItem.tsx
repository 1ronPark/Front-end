import profileIcon from "../../../../assets/sideNavbar/profile.png";
import heartIcon from "../../../../assets/sideNavbar/heart.svg";

const FavoriteItem = () => {
  return (
    <div className="flex w-[300px] h-[72px] justify-center items-center py-2 px-6 gap-4 hover:scale-105 cursor-pointer">
      <div className="flex w-[48px] h-[48px]">
        <img src={profileIcon} />
      </div>
      <div className="flex flex-col justify-center items-start w-[155px]">
        <p className="label-medium text-[#49454E]">Overline</p>
        <p className="body-large text-[#1D1B20]">List item</p>
      </div>
      <button className="flex justify-center items-center p-2">
        <img src={heartIcon} />
      </button>
    </div>
  );
};

export default FavoriteItem;
