import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar fija para escritorio */}
      <Sidebar />
      <div className="lg:pl-72">
        <Topbar />
        <main className="px-6 pb-16 pt-6 sm:px-10">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
