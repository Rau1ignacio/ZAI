import { Outlet } from "react-router-dom";
import TopbarAdmin from "../components/TopbarAdmin";
import AdminSidebar from "../components/AdminSidebar";
import { useAdminSidebarStore } from "../store/useAdminSidebarStore";

export default function AdminLayout() {
  const collapsed = useAdminSidebarStore((state) => state.collapsed);

  return (
    <div className="min-h-screen bg-slate-950 text-white dark:bg-slate-950 dark:text-white light:bg-white light:text-gray-900">
      <TopbarAdmin />
      <AdminSidebar />
      <div className={collapsed ? "lg:pl-[76px]" : "lg:pl-[280px]"}>
        <main className="px-6 py-8 sm:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
