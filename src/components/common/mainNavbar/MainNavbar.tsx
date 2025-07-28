import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo_lightup from "../../../assets/logo_lightup.svg";
import ic_loginbutton from "../../../assets/ic_loginbutton.svg";
import ic_myprofile from "../../../assets/ic_myprofile.svg";
import { Plus } from "lucide-react";
import ic_search from "../../../assets/ic_search.svg";
import ic_mainnavbar_idcard from "../../../assets/icons/ic_mainnavbar_idcard.svg";
import ic_mainnavbar_profile from "../../../assets/icons/ic_mainnavbar_profile.svg";
import ic_mainnavbar_project from "../../../assets/icons/ic_mainnavbar_project.svg";
import ic_mainnavbar_logout from "../../../assets/icons/ic_mainnavbar_logout.svg";

import { useEffect, useRef, useState } from "react";
import SearchModal from "../modals/SearchModal";

type MainNavbarProps = {
  isLoggedIn: boolean;
  userName: string;
  bgColor?: string;
};

export const MainNavbar = ({
  isLoggedIn,
  userName,
  bgColor = "white",
}: MainNavbarProps) => {
  const MainNavItems = [
    { label: "라잇톡", to: "/lightTalk" },
    { label: "프로젝트", to: "/projects" },
    { label: "팀원 찾아보기", to: "/members" },
  ];

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  //라잇톡일 때 배경색 다르게 하기 위한 변수
  const location = useLocation();
  //라잇톡이 눌러졌을 때
  const isLightTalk = location.pathname.startsWith("/lightTalk");

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`flex w-full 
        bg-[${bgColor}]
        ${isLightTalk && "bg-[#EEE]"}
        px-6 justify-between items-center`}
    >
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
                ${isActive ? "text-[#5A5891]" : "text-[#47464F]"}`
            }
          >
            {({ isActive }) => (
              <>
                {label}
                {isActive && (
                  <span className="absolute bottom-[-15px] w-full h-[3px] bg-[#5A5891] rounded-tl-[100px] rounded-tr-[100px]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* 검색, 프로젝트 생성, 로그인버튼 */}
      <div className="flex items-center gap-2 md:gap-5 label-large text-[#47464F]">
        <img
          src={ic_search}
          alt="Search"
          className="w-4.5 h-4.5 text-[#47464F] mr-[23px] cursor-pointer"
          onClick={() => setIsSearchModalOpen(true)}
        />
        <NavLink
          to="/register-project"
          className="flex items-center gap-3 border border-[#C8C5D0] px-4 py-2.5 rounded-[100px] text-[#47464F]"
        >
          <Plus className="w-3 h-3" />
          프로젝트 등록
        </NavLink>

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => {
                console.log("드롭다운 클릭됨");
                setIsDropdownOpen((prev) => !prev);
              }}
              className="flex items-center gap-2 px-6 py-4 bg-transparent cursor-pointer"
            >
              <img src={ic_myprofile} alt="myprofile" className="w-6 h-6" />
              <span className="text-[#6750A4] title-medium">{userName}</span>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 w-[200px] rounded-[12px] bg-[#FEFEFE] z-50 shadow-[0_1px_3px_1px_rgba(0,0,0,0.15),0_1px_2px_0px_rgba(0,0,0,0.3)]">
                <ul className="flex flex-col text-sm text-[#1C1B1F] font-medium divide-y divide-[#C8C5D0]">
                  <li
                    className="flex items-center gap-3.5 px-3.5 py-4 cursor-pointer body-large"
                    onClick={() => {
                      navigate("/myprofile?tab=info"); // 회원정보
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src={ic_mainnavbar_idcard} alt="회원정보" />
                    회원정보
                  </li>
                  <li
                    className="flex items-center gap-3.5 px-3.5 py-4 cursor-pointer body-large"
                    onClick={() => {
                      navigate("/myprofile?tab=edit"); // 프로필 관리
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src={ic_mainnavbar_profile} alt="프로필 관리" />
                    프로필 관리
                  </li>
                  <li
                    className="flex items-center gap-3.5 px-3.5 py-4 cursor-pointer body-large"
                    onClick={() => {
                      navigate("/myprofile?tab=projects"); // 프로젝트 관리
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src={ic_mainnavbar_project} alt="프로젝트 관리" />
                    프로젝트 관리
                  </li>
                  <li className="flex items-center gap-3.5 px-3.5 py-4 cursor-pointer body-large">
                    <img src={ic_mainnavbar_logout} alt="로그아웃" />
                    로그아웃
                  </li>
                </ul>
              </div>
            )}
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
      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </div>
  );
};
