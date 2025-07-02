import { MainNavbar } from "../common/mainNavbar/MainNavbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="w-full min-h-screen bg-white flex flex-col">
            <MainNavbar />
            <div className="flex-1 w-full">
                <Outlet />
            </div>
        </div>
    );
};