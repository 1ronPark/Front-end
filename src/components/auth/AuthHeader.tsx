import { NavLink } from "react-router-dom";
import logo_lightup from "../../assets/logo_lightup.svg";
import ic_close from "../../assets/icons/ic_close.svg";

export const AuthHeader = () => {
  return (
    <header className="w-full h-[56px] px-6 flex justify-between items-center fixed top-0 left-0">
      <div className="flex items-center gap-8 cursor-pointer">
        <NavLink to="/">
        <img
          src={logo_lightup}
          alt="LightUp 로고"
          className="w-[74px] h-[24px]"
        />
        </NavLink>
      </div>
      <NavLink to="/">
      <button
        className="w-[18.67px] h-[18.67px] flex justify-center items-center cursor-pointer"
      >
        <img src={ic_close} alt="닫기" className="w-full h-full" />
      </button>
      </NavLink>
    </header>
  );
};
