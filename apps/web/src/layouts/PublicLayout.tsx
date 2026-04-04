import { Outlet, Link } from "react-router-dom";
import TopbarPublic from "../components/TopbarPublic";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-white text-slate-100 dark:text-slate-100 light:text-gray-900">
      <TopbarPublic />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 dark:border-white/5 light:border-gray-300 bg-slate-950/80 dark:bg-slate-950/80 light:bg-gray-100 px-6 py-6 text-xs text-slate-400 dark:text-slate-400 light:text-gray-600 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>ZAI · IA financiera para emprendedores y familias.</p>
          <div className="flex gap-3">
            <Link to="/terms" className="hover:text-white">
              Términos
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacidad
            </Link>
            <Link to="/help" className="hover:text-white">
              Ayuda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
