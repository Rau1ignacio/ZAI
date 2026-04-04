import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  CreditCard,
  Gem,
  Home,
  Landmark,
  Settings,
  Sparkles,
  Target,
  Wallet,
  X,
} from "lucide-react";
import { useSidebarStore } from "../store/useSidebarStore";
import { useUserStore } from "../store/useUserStore";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
};

const CORE_ITEMS: NavItem[] = [
  { to: "/app/dashboard", label: "Dashboard", icon: Home },
  { to: "/app/transactions", label: "Transacciones", icon: ArrowLeftRight },
  { to: "/app/budgets", label: "Presupuestos", icon: CreditCard },
  { to: "/app/goals", label: "Metas", icon: Target },
  { to: "/app/alerts", label: "Alertas", icon: Bell, badge: "3" },
];

const FINANCE_ITEMS: NavItem[] = [
  { to: "/app/accounts", label: "Cuentas", icon: Landmark },
  { to: "/app/assets", label: "Patrimonio", icon: Wallet },
  { to: "/app/investments", label: "Inversiones", icon: BarChart3 },
  { to: "/app/debts", label: "Deudas", icon: AlertTriangle },
  { to: "/app/intelligence", label: "Inteligencia", icon: Sparkles },
];

const SECONDARY_ITEMS: NavItem[] = [
  { to: "/app/settings", label: "Configuracion", icon: Settings },
  { to: "/help", label: "Ayuda", icon: HelpCircle },
];

export default function Sidebar() {
  const userPlan = useUserStore((state) => state.plan);
  const collapsed = useSidebarStore((state) => state.collapsed);
  const mobileOpen = useSidebarStore((state) => state.mobileOpen);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);
  const closeMobile = useSidebarStore((state) => state.closeMobile);

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 lg:block ${
          collapsed ? "w-[76px]" : "w-[280px]"
        }`}
      >
        <SidebarContent
          collapsed={collapsed}
          userPlan={userPlan}
          onToggle={toggleCollapsed}
          onNavigate={undefined}
        />
      </aside>

      <div
        className={`fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-[60] w-[280px] border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <SidebarContent
          collapsed={false}
          userPlan={userPlan}
          onToggle={closeMobile}
          onNavigate={closeMobile}
          mobileMode
        />
      </aside>
    </>
  );
}

function SidebarContent({
  collapsed,
  userPlan,
  onToggle,
  onNavigate,
  mobileMode = false,
}: {
  collapsed: boolean;
  userPlan: "starter" | "pro";
  onToggle: () => void;
  onNavigate?: () => void;
  mobileMode?: boolean;
}) {
  const sectionLabelClass = `px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 transition-all duration-200 ${
    collapsed ? "opacity-0" : "opacity-100"
  }`;

  return (
    <div className="flex h-full flex-col p-3">
      <div
        className={`mb-4 ${collapsed && !mobileMode ? "flex flex-col items-center gap-2" : "flex items-center justify-between gap-2"}`}
      >
        {(!collapsed || mobileMode) && (
          <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-2">
            <div className="rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 px-2 py-1 text-xs font-black tracking-wide text-slate-950">
              ZAI
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-100">Personal Finance</p>
              <p className="text-[11px] text-slate-400">Control financiero</p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-200 ${
            collapsed && !mobileMode ? "w-full" : "w-8"
          }`}
          title={mobileMode ? "Cerrar" : collapsed ? "Expandir" : "Colapsar"}
          aria-label={mobileMode ? "Cerrar sidebar" : collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {mobileMode ? (
            <X className="h-4 w-4" />
          ) : collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto pr-1">
        <div className="space-y-2">
          <p className={sectionLabelClass}>Principal</p>
          {CORE_ITEMS.map((item) => (
            <SidebarItem key={item.to} item={item} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
        </div>

        <div className="space-y-2">
          <p className={sectionLabelClass}>Finanzas</p>
          {FINANCE_ITEMS.map((item) => (
            <SidebarItem key={item.to} item={item} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
        </div>

        <div className="space-y-2">
          <p className={sectionLabelClass}>Sistema</p>
          {SECONDARY_ITEMS.map((item) => (
            <SidebarItem key={item.to} item={item} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
        </div>
      </nav>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-200">
            <Gem className="h-4 w-4" />
          </span>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-slate-100">Plan {userPlan === "pro" ? "Pro" : "Starter"}</p>
              <p className="text-xs text-slate-400">Escala tus analisis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        [
          "group relative flex h-11 items-center rounded-xl border px-3 transition-all duration-200",
          collapsed ? "justify-center" : "justify-between",
          isActive
            ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
            : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white hover:translate-x-0.5",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute left-0 top-2 h-7 w-[2px] rounded-r bg-cyan-300" />}
          <span className="flex items-center gap-3 overflow-hidden">
            <Icon className="h-4 w-4 shrink-0" />
            <span
              className={`truncate text-sm font-medium transition-all duration-200 ${
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              {item.label}
            </span>
          </span>

          {!collapsed && item.badge && (
            <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {item.badge}
            </span>
          )}

          {collapsed && item.badge && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
          )}
        </>
      )}
    </NavLink>
  );
}



