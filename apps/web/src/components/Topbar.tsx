import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/transactions": "Transacciones",
  "/budgets": "Presupuestos",
  "/goals": "Metas",
  "/auth": "Acceso",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const title = routeTitles[pathname] ?? "ZAI";
  const userName = useUserStore((state) => state.name);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-6 py-5 backdrop-blur sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-title">Panel</p>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="glass-panel px-4 py-2 text-xs font-semibold text-white/80"
            type="button"
          >
            Sincronizar bancos
          </button>
          <Link
            className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-100"
            to="/auth"
          >
            {userName}
          </Link>
        </div>
      </div>
    </header>
  );
}
