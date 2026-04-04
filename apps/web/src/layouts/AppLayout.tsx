import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopbarClient from "../components/TopbarClient";
import MobileNav from "../components/MobileNav";
import { useSidebarStore } from "../store/useSidebarStore";

export default function AppLayout() {
  const collapsed = useSidebarStore((state) => state.collapsed);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 light:bg-white light:text-gray-900">
      <Sidebar />
      <div className={collapsed ? "lg:pl-[76px]" : "lg:pl-[280px]"}>
        <TopbarClient />
        <main className="px-6 pb-16 pt-6 sm:px-10">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
