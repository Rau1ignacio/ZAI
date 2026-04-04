import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopbarNav from "../components/TopbarNav";
import MobileNav from "../components/MobileNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="lg:pl-72">
        <TopbarNav />
        <main className="px-6 pb-16 pt-6 sm:px-10">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
