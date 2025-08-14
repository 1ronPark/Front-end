import { NavLink } from "react-router-dom";
import logo_lightup from "../../../assets/logo_lightup.svg";
import ic_loginbutton from "../../../assets/ic_loginbutton.svg";
import { useUser } from "../../../hooks/useUser";

type FormNavbarProps = {
  isLoggedIn: boolean;
};

export const FormNavbar = ({ isLoggedIn }: FormNavbarProps) => {
  const { data: user } = useUser();

  return (
    <div className="flex w-full items-center justify-between bg-white px-6 py-7">
      {/* 로고 */}
      <NavLink to="/">
        <img
          src={logo_lightup}
          alt="LightUp Logo"
          className="h-[28px] w-[86px]"
        />
      </NavLink>

      {/* 로그인/프로필 버튼 */}
      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-2 pr-3">
            <img
              src={user?.profileImageUrl}
              alt="myprofile"
              className="h-6 w-6 rounded-2xl"
            />
            <span className="title-medium text-[#6750A4]">{user?.name}</span>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center gap-1.5 rounded-[12px] bg-[#68548E] px-4 py-2.5 text-white"
          >
            <img src={ic_loginbutton} alt="login" className="h-4 w-4" />
            로그인
          </NavLink>
        )}
      </div>
    </div>
  );
};
