import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/accounts", label: "Cuentas" },
  { to: "/app/transactions", label: "Transacciones" },
  { to: "/app/assets", label: "Patrimonio" },
  { to: "/app/budgets", label: "Presupuestos" },
  { to: "/app/goals", label: "Metas" },
  { to: "/app/intelligence", label: "Inteligencia" },
  { to: "/app/alerts", label: "Alertas" },
  { to: "/app/settings", label: "Configuración" },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-slate-950/95 px-6 py-8 lg:block">
      <div className="space-y-10">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">ZAI</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">Control total</h1>
          <p className="mt-2 text-sm text-slate-400">Tu panel financiero de confianza.</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center justify-between rounded-xl px-4 py-3 text-sm transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              <span>{item.label}</span>
              <span className="text-xs text-slate-500">→</span>
            </NavLink>
          ))}
        </nav>

        <div className="glass-panel p-4 text-xs text-slate-300">
          <p className="font-semibold">Seguridad activa</p>
          <p className="mt-1 text-slate-400">
            Sesión cifrada y monitoreo de movimientos sospechosos.
          </p>
        </div>
      </div>
    </aside>
  );
}
