import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo_lightup from "../../../assets/logo_lightup.svg";
import ic_loginbutton from "../../../assets/ic_loginbutton.svg";
import ic_myprofile from "../../../assets/ic_myprofile.svg";
import { Plus } from 'lucide-react';
import ic_search from "../../../assets/ic_search.svg";
import { useState } from "react";
import SearchModal from "../modals/SearchModal";

type MainNavbarProps = {
  isLoggedIn: boolean;
  userName: string;
  bgColor?: string;
};

export const MainNavbar = ({ isLoggedIn, userName, bgColor = "white" }: MainNavbarProps) => {
  const MainNavItems = [
    { label: "프로젝트", to: "/projects" },
    { label: "파트너 찾아보기", to: "/members" },
    { label: "라잇톡", to: "/lighttalk" },
  ];

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className={`flex w-full bg-[${bgColor}] px-6 py-3.5 justify-between items-center`}>
      {/* 로고 */}
      <Link to="/">
        <img
          src={logo_lightup}
          alt="LightUp Logo"
          className="w-[86px] h-[28px]"
        />
      </Link>
      
      {/* 프로젝트/팀원 찾아보기/라잇톡 탭 */}
      <div className="flex items-center gap-10">
        {MainNavItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center title-small transition-colors duration-200               
                ${
                  isActive ? "text-[#5A5891]" : "text-[#47464F]"
                }`
            }
          >
            {({ isActive }) => (
              <>
                {label}
                {isActive && (
                  <span className="absolute bottom-[-11px] w-full h-[3px] bg-[#5A5891] rounded-tl-[100px] rounded-tr-[100px]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* 검색, 프로젝트 생성, 로그인버튼 */}
      <div className="flex items-center gap-5 label-large text-[#47464F]">
        <img
          src={ic_search}
          alt="Search"
          className="w-4.5 h-4.5 text-[#47464F] mr-[23px] cursor-pointer"
          onClick={()=>setIsSearchModalOpen(true)}
        />
        <NavLink
          to="/register-project"
          className="flex items-center gap-3 border border-[#C8C5D0] px-4 py-2.5 rounded-[100px] text-[#47464F]"
        >
          <Plus className="w-3 h-3"/>
          프로젝트 등록
        </NavLink>

        {isLoggedIn ? (
          <div className="flex items-center gap-2 px-6 py-4 bg-white">
            <img src={ic_myprofile} alt="myprofile" className="w-6 h-6" />
            <span className="text-[#6750A4] title-medium">{userName}</span>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="bg-[#5A5891] text-white px-4 py-2.5 rounded-[12px] flex items-center gap-1.5"
          >
            <img src={ic_loginbutton} alt="login" className="w-4 h-4" />
            로그인
          </NavLink>
        )}
      </div>
      {isSearchModalOpen && <SearchModal onClose={()=>setIsSearchModalOpen(false)} />}
    </div>
  );
};
