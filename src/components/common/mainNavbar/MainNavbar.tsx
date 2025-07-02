import { NavLink } from 'react-router-dom';
import logo_lightup from '../../../assets/logo_lightup.svg';
import ic_loginbutton from '../../../assets/ic_loginbutton.svg';
import ic_myprofile from  '../../../assets/ic_myprofile.svg';
import { SearchInput } from './SearchInput';

type MainNavbarProps = {
    isLoggedIn: boolean;
    userName: string;
};


export const MainNavbar = ({ isLoggedIn, userName }:MainNavbarProps) => {
    
    const MainNavItems = [
        // 임시 루트
        { label: "프로젝트", to: "/projects" },
        { label: "팀원 찾아보기", to: "/members" },
        { label: "라잇톡", to: "/lighttalk" },
        { label: "내 프로필", to: "/myprofile" },
    ];
    return (
        <div className="flex w-full bg-white px-8 py-4 justify-between items-center">
            {/* 로고 + 메뉴 + 검색창 */}
            <div className="flex items-center gap-10">
                <img
                    src={logo_lightup}
                    alt="LightUp Logo"
                    className="w-[74px] h-[24px] mr-[8px]"
                />
                {MainNavItems.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative flex flex-col items-center title-medium transition-colors duration-200
                                
                                ${isActive ? "text-[#6750A4]" : "text-[#49454E]"}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {label}
                                    {isActive && (
                                        <span className="absolute bottom-[-9px] w-[56px] h-[3px] bg-[#68548E] rounded-tl-[100px] rounded-tr-[100px]" />
                                    )}
                                </>
                            )}
                        </NavLink>
                ))}
                <SearchInput />
            </div>

            {/* 버튼들 */}
            <div className="flex items-center gap-4 label-large"> 
                {/* 임시 경로 - 수정 필요!!! */}
                <NavLink to="/register-profile" className="border border-[#CBC4CF] px-4 py-2.5 rounded-[12px]">
                    프로필 등록
                </NavLink>
                <NavLink to="/register-project" className="border border-[#CBC4CF] px-4 py-2.5 rounded-[12px]">
                    프로젝트 등록
                </NavLink>

                { isLoggedIn
                    ? 
                        <div className="flex items-center gap-2 px-6 py-4 bg-white">
                            <img src={ic_myprofile} alt="myprofile" className="w-6 h-6" />
                            <span className="text-[#6750A4] title-medium">{userName}</span>
                        </div>
                    : 
                    <NavLink
                        to="/login"
                        className="bg-[#68548E] text-white px-4 py-2.5 rounded-[12px] flex items-center gap-1.5"
                    >
                        <img src={ic_loginbutton} alt="login" className="w-4 h-4" />
                        로그인
                    </NavLink>
                }
            </div>
        </div>
    );
};
