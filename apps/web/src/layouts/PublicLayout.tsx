import { Outlet } from "react-router-dom";
import TopbarPublic from "../components/TopbarPublic";
import FooterPublic from "../components/FooterPublic";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 light:bg-white light:text-gray-900">
      <TopbarPublic />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Outlet />
      </main>

      <FooterPublic />
    </div>
  );
}
