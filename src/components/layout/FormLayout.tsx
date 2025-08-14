import { FormNavbar } from "../common/formNavbar/FormNavbar";
import { Outlet } from "react-router-dom";
import SideNavbar from "../common/sideNavbar/SideNavbar";
import { Footbar } from "../common/footbar/Footbar";
import { useAuthStore } from "../../store/useAuthStore";

export const FormLayout = () => {
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;

  return (
    <div className="relative flex min-h-screen w-full bg-white">
      <div className="flex flex-1 flex-col pr-[60px]">
        <FormNavbar isLoggedIn={isLoggedIn} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footbar />
      </div>
      <div className="fixed right-0 top-0 z-30 h-screen w-[60px] border-l bg-white shadow-md">
        <SideNavbar />
      </div>
    </div>
  );
};
