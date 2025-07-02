import { NavLink } from 'react-router-dom';
import logo_lightup from '../../../assets/logo_lightup.svg';
import ic_loginbutton from '../../../assets/ic_loginbutton.svg';
import { SearchInput } from './SearchInput';

export const MainNavbar = () => {
    
    const MainNavItems = [
        // 임시 루트
        { label: "프로젝트", to: "/projects" },
        { label: "팀원 찾아보기", to: "/members" },
        { label: "라잇톡", to: "/lighttalk" },
        { label: "내 프로필", to: "/myprofile" },
    ];
    return (
        <div className="flex w-full bg-white px-8 py-2 justify-between items-center">
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
                            className={({ isActive }: { isActive: boolean}) =>
                                `text-base leading-6 font-base tracking-[0.15px] transition-colors duration-200 ${
                                    isActive ? "text-[#6750A4]" : "text-[#49454E]"
                                }`
                            }
                        >
                            {({ isActive }) => (
                            <>
                                {label}
                                {isActive && (
                                <span className="absolute bottom-[-6px] w-[40px] h-[4px] bg-[#6750A4] rounded-full" />
                                )}
                            </>
                            )}
                        </NavLink>
                    
                ))}
                <SearchInput />
            </div>

            {/* 버튼들 */}
            <div className="flex items-center gap-4"> 
                <NavLink to="/register-profile" className="border border-[#CBC4CF] px-4 py-2.5 rounded-[12px] text-sm">
                    프로필 등록
                </NavLink>
                <NavLink to="/register-project" className="border border-[#CBC4CF] px-4 py-2.5 rounded-[12px] text-sm">
                    프로젝트 등록
                </NavLink>
                <NavLink
                    to="/login"
                    className="bg-[#68548E] text-white px-4 py-2.5 rounded-[12px] flex items-center gap-1.5 text-sm"
                >
                    <img src={ic_loginbutton} alt="login" className="w-4 h-4" />
                    로그인
                </NavLink>
            </div>
        </div>
    );
};
