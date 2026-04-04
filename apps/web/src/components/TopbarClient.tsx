import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Menu,
  Moon,
  Plus,
  Search,
  Sparkles,
  Sun,
  Target,
  Wallet,
  X,
} from "lucide-react";
import { useCurrencyStore } from "../store/useCurrencyStore";
import { useThemeStore } from "../store/useThemeStore";
import { useUserStore } from "../store/useUserStore";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { useSidebarStore } from "../store/useSidebarStore";

const ROUTE_TITLES: Record<string, string> = {
  "/app/dashboard": "Dashboard",
  "/app/accounts": "Cuentas",
  "/app/transactions": "Transacciones",
  "/app/assets": "Patrimonio",
  "/app/budgets": "Presupuestos",
  "/app/goals": "Metas",
  "/app/intelligence": "Inteligencia",
  "/app/alerts": "Alertas",
  "/app/settings": "Configuracion",
};

const QUICK_NAV = [
  { label: "Dashboard", to: "/app/dashboard" },
  { label: "Presupuestos", to: "/app/budgets" },
  { label: "Alertas", to: "/app/alerts" },
];

const QUICK_ACTIONS = [
  {
    label: "Nueva transaccion",
    detail: "Registra ingreso o gasto",
    to: "/app/transactions/create",
    icon: Wallet,
  },
  {
    label: "Nuevo presupuesto",
    detail: "Define limite por categoria",
    to: "/app/budgets",
    icon: CreditCard,
  },
  {
    label: "Nueva meta",
    detail: "Crea un objetivo de ahorro",
    to: "/app/goals/create",
    icon: Target,
  },
];

function resolveSearchRoute(query: string): string {
  const value = query.toLowerCase();

  if (value.includes("presupuesto")) return "/app/budgets";
  if (value.includes("alerta")) return "/app/alerts";
  if (value.includes("meta")) return "/app/goals";
  if (value.includes("cuenta")) return "/app/accounts";
  if (value.includes("transaccion") || value.includes("gasto") || value.includes("ingreso")) {
    return "/app/transactions";
  }

  return "/app/intelligence";
}

export default function TopbarClient() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = ROUTE_TITLES[pathname] ?? "ZAI";
  const userName = useUserStore((state) => state.name);
  const userPlan = useUserStore((state) => state.plan);
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const openMobileSidebar = useSidebarStore((state) => state.openMobile);
  const { resolvedTheme, setTheme } = useThemeStore();
  const { data } = useExchangeRates();

  const [searchValue, setSearchValue] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const quickActionsRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const desktopSearchRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchRef = useRef<HTMLInputElement | null>(null);

  const notifications = useMemo(() => {
    return [
      {
        id: "risk-1",
        title: "Presupuesto Transporte en 89%",
        detail: "Revisa el ritmo de gasto de esta semana.",
        tone: "warning",
      },
      {
        id: "risk-2",
        title: "Ingreso detectado",
        detail: "Nomina acreditada hoy. Ajusta tus metas.",
        tone: "good",
      },
      {
        id: "risk-3",
        title: `Contexto activo: ${title}`,
        detail: "Tienes recomendaciones nuevas disponibles.",
        tone: "neutral",
      },
    ];
  }, [title]);

  const criticalNotifications = notifications.filter((item) => item.tone !== "good").length;

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const isSearchShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isSearchShortcut) {
        event.preventDefault();
        if (window.innerWidth < 768) {
          setMobileSearchOpen(true);
          return;
        }
        desktopSearchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setQuickActionsOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (quickActionsRef.current && !quickActionsRef.current.contains(target)) {
        setQuickActionsOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen) {
      const timeoutId = window.setTimeout(() => mobileSearchRef.current?.focus(), 100);
      return () => window.clearTimeout(timeoutId);
    }
    return undefined;
  }, [mobileSearchOpen]);

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "ZU";

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = searchValue.trim();
    if (!trimmed) return;

    navigate(resolveSearchRoute(trimmed));
    setSearchValue("");
    setMobileSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="h-16 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto flex h-full max-w-screen-2xl items-center gap-3">
                                  
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden flex-1 md:flex md:max-w-xl lg:max-w-2xl"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                ref={desktopSearchRef}
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Buscar transacciones, presupuestos, insights..."
                className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-20 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:bg-slate-900"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-slate-400">
                Ctrl K
              </span>
            </form>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-200 md:hidden"
                aria-label="Abrir buscador"
              >
                <Search className="h-4 w-4" />
              </button>

              <div className="relative" ref={quickActionsRef}>
                <button
                  type="button"
                  onClick={() => setQuickActionsOpen((current) => !current)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-400/20"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Nuevo</span>
                </button>

                {quickActionsOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl">
                    {QUICK_ACTIONS.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Link
                          key={action.to}
                          to={action.to}
                          onClick={() => setQuickActionsOpen(false)}
                          className="flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-white/10"
                        >
                          <span className="mt-0.5 rounded-lg border border-white/10 bg-white/5 p-2 text-cyan-300">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-slate-100">{action.label}</span>
                            <span className="block text-xs text-slate-400">{action.detail}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="relative" ref={notificationsRef}>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen((current) => !current)}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
                  aria-label="Notificaciones"
                >
                  <Bell className="h-4 w-4" />
                  {criticalNotifications > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                      {criticalNotifications}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-100">Notificaciones</p>
                      <button type="button" className="text-xs text-cyan-300 hover:text-cyan-200">
                        Marcar todo
                      </button>
                    </div>
                    <div className="space-y-2">
                      {notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`rounded-xl border px-3 py-2 text-xs ${
                            item.tone === "warning"
                              ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
                              : item.tone === "good"
                              ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                              : "border-white/10 bg-white/5 text-slate-200"
                          }`}
                        >
                          <p className="font-semibold">{item.title}</p>
                          <p className="mt-1 text-[11px] opacity-80">{item.detail}</p>
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
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-xs font-bold text-slate-950">
                    {initials}
                  </span>
                  <span className="hidden text-xs font-semibold sm:block">{userName}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-sm font-semibold text-slate-100">{userName}</p>
                      <p className="mt-1 text-xs text-slate-400">Plan {userPlan}</p>
                      <p className="mt-1 text-xs text-slate-500">Tasa USD: {data?.rates?.USD ? data.rates.USD.toFixed(2) : "-"}</p>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-400/50"
                      >
                        {resolvedTheme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                        {resolvedTheme === "dark" ? "Modo claro" : "Modo oscuro"}
                      </button>

                      <select
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value as typeof currency)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 outline-none transition focus:border-cyan-400/60"
                      >
                        <option value="CLP">CLP</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>

                    <div className="mt-3 space-y-1 text-sm">
                      <Link
                        to="/app/settings"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-slate-200 transition hover:bg-white/10"
                      >
                        Mi cuenta
                      </Link>
                      <Link
                        to="/app/settings/security"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-slate-200 transition hover:bg-white/10"
                      >
                        Seguridad
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

      {mobileSearchOpen && (
        <div className="fixed inset-x-0 top-14 z-50 border-b border-white/10 bg-slate-950/95 p-4 backdrop-blur-xl md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              ref={mobileSearchRef}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Buscar en ZAI"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-11 text-sm text-slate-100 outline-none focus:border-cyan-400/60"
            />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-300"
              aria-label="Cerrar buscador"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {QUICK_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileSearchOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center text-xs font-semibold text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1 text-[11px] text-slate-400">
            <Sparkles className="h-3 w-3" />
            Tip: usa palabras como transaccion, presupuesto o alerta.
          </p>
        </div>
      )}
    </>
  );
}
