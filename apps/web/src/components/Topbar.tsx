import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("zai-theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("zai-theme", theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-6 py-5 backdrop-blur sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-title">Panel</p>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              className="glass-panel flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white/80"
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              Tema: {theme === "system" ? "Sistema" : theme === "light" ? "Claro" : "Oscuro"}
              <span className="text-xs text-slate-500">▾</span>
            </button>
            <div
              className={`absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-slate-950/95 shadow-lg transition-all duration-200 ${
                menuOpen
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              {(["system", "light", "dark"] as const).map((option) => (
                <button
                  key={option}
                  className={`flex w-full items-center justify-between px-4 py-2 text-xs transition ${
                    theme === option
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                  type="button"
                  onClick={() => {
                    setTheme(option);
                    setMenuOpen(false);
                  }}
                >
                  {option === "system"
                    ? "Sistema"
                    : option === "light"
                    ? "Claro"
                    : "Oscuro"}
                  {theme === option ? "✓" : ""}
                </button>
              ))}
            </div>
          </div>
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
