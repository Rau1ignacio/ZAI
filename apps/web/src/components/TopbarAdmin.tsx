import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { useUserStore } from "../store/useUserStore";
import { useAdminSidebarStore } from "../store/useAdminSidebarStore";

const ROUTE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard Admin",
  "/admin/users": "Usuarios",
  "/admin/logs": "Logs",
  "/admin/categories": "Categorias",
  "/admin/benefits": "Beneficios",
  "/admin/subscriptions": "Suscripciones",
  "/admin/analytics": "Analytics",
};

const ADMIN_LINKS = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Usuarios" },
  { to: "/admin/analytics", label: "Analytics" },
  { to: "/admin/logs", label: "Logs" },
];

function resolveAdminSearchRoute(query: string): string {
  const value = query.toLowerCase();

  if (value.includes("usuario")) return "/admin/users";
  if (value.includes("log")) return "/admin/logs";
  if (value.includes("categoria")) return "/admin/categories";
  if (value.includes("beneficio")) return "/admin/benefits";
  if (value.includes("suscripcion") || value.includes("pago")) return "/admin/subscriptions";
  if (value.includes("analyt") || value.includes("metrica")) return "/admin/analytics";

  return "/admin/dashboard";
}

export default function TopbarAdmin() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = ROUTE_TITLES[pathname] ?? "ZAI Admin";
  const userName = useUserStore((state) => state.name);
  const openAdminMobileSidebar = useAdminSidebarStore((state) => state.openMobile);
  const { resolvedTheme, setTheme } = useThemeStore();

  const [searchValue, setSearchValue] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const notifications = useMemo(
    () => [
      {
        id: "admin-risk-1",
        title: "3 eventos criticos en logs",
        detail: "Revisar errores 5xx en integracion bancaria.",
        tone: "warning",
      },
      {
        id: "admin-risk-2",
        title: "Sincronizacion completada",
        detail: "Usuarios y categorias actualizados hace 2 min.",
        tone: "good",
      },
    ],
    []
  );

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const isSearchShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isSearchShortcut) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;

    navigate(resolveAdminSearchRoute(trimmed));
    setSearchValue("");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 light:border-slate-200 light:bg-white/90">
      <div className="h-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex h-full max-w-screen-2xl items-center gap-3">
          <button
            type="button"
            onClick={openAdminMobileSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-200 lg:hidden"
            aria-label="Abrir navegacion admin"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link
            to="/admin/dashboard"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 transition hover:border-cyan-400/50 hover:bg-cyan-400/10"
          >
            <span className="rounded-md bg-gradient-to-br from-cyan-400 to-emerald-400 px-2 py-1 text-xs font-black tracking-wide text-slate-950">
              ZAI
            </span>
            <span className="hidden text-sm font-semibold text-slate-100 sm:block">Admin</span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {ADMIN_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-100"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="relative hidden flex-1 md:flex md:max-w-xl lg:max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              ref={searchRef}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Buscar usuarios, logs, categorias..."
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-20 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:bg-slate-900"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-slate-400">
              Ctrl K
            </span>
          </form>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
              aria-label={`Cambiar a tema ${resolvedTheme === "dark" ? "claro" : "oscuro"}`}
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen((current) => !current)}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
                aria-label="Notificaciones admin"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  1
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl">
                  <p className="mb-2 text-sm font-semibold text-slate-100">Notificaciones de sistema</p>
                  <div className="space-y-2">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-xl border px-3 py-2 text-xs ${
                          item.tone === "warning"
                            ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
                            : "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                        }`}
                      >
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 opacity-80">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((current) => !current)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 text-slate-200 transition hover:border-cyan-400/50"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-100">
                  {userName.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden text-xs font-semibold sm:block">{userName}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm font-semibold text-slate-100">{userName}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Permisos de administrador
                    </p>
                  </div>

                  <div className="mt-3 space-y-1 text-sm">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-slate-200 transition hover:bg-white/10"
                    >
                      Panel admin
                    </Link>
                    <Link
                      to="/admin/users"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-slate-200 transition hover:bg-white/10"
                    >
                      Gestion de usuarios
                    </Link>
                    <Link
                      to="/auth/login"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-rose-300 transition hover:bg-rose-500/10"
                    >
                      Cerrar sesion
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
