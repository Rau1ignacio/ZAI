import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Gift,
  LayoutDashboard,
  ShieldAlert,
  Tags,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useAdminSidebarStore } from "../store/useAdminSidebarStore";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
};

const OVERVIEW_ITEMS: NavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/logs", label: "Logs", icon: ClipboardList, badge: "3" },
];

const MANAGEMENT_ITEMS: NavItem[] = [
  { to: "/admin/users", label: "Usuarios", icon: Users },
  { to: "/admin/categories", label: "Categorias", icon: Tags },
  { to: "/admin/benefits", label: "Beneficios", icon: Gift },
  { to: "/admin/subscriptions", label: "Suscripciones", icon: Wallet },
];

export default function AdminSidebar() {
  const collapsed = useAdminSidebarStore((state) => state.collapsed);
  const mobileOpen = useAdminSidebarStore((state) => state.mobileOpen);
  const toggleCollapsed = useAdminSidebarStore((state) => state.toggleCollapsed);
  const closeMobile = useAdminSidebarStore((state) => state.closeMobile);

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 lg:block ${
          collapsed ? "w-[76px]" : "w-[280px]"
        }`}
      >
        <AdminSidebarContent
          collapsed={collapsed}
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
        <AdminSidebarContent
          collapsed={false}
          onToggle={closeMobile}
          onNavigate={closeMobile}
          mobileMode
        />
      </aside>
    </>
  );
}

function AdminSidebarContent({
  collapsed,
  onToggle,
  onNavigate,
  mobileMode = false,
}: {
  collapsed: boolean;
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
              <p className="truncate text-xs font-semibold text-slate-100">Backoffice</p>
              <p className="text-[11px] text-slate-400">Control operativo</p>
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
          aria-label={mobileMode ? "Cerrar sidebar admin" : collapsed ? "Expandir sidebar admin" : "Colapsar sidebar admin"}
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
          <p className={sectionLabelClass}>Monitoreo</p>
          {OVERVIEW_ITEMS.map((item) => (
            <AdminSidebarItem
              key={item.to}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        <div className="space-y-2">
          <p className={sectionLabelClass}>Gestion</p>
          {MANAGEMENT_ITEMS.map((item) => (
            <AdminSidebarItem
              key={item.to}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-rose-200">
            <ShieldAlert className="h-4 w-4" />
          </span>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-slate-100">Sistema estable</p>
              <p className="text-xs text-slate-400">Sin alertas criticas nuevas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminSidebarItem({
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
