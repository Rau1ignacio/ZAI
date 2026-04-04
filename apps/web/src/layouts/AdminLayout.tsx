import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Usuarios" },
  { to: "/admin/logs", label: "Logs" },
  { to: "/admin/categories", label: "Categorías" },
  { to: "/admin/benefits", label: "Beneficios" },
  { to: "/admin/subscriptions", label: "Suscripciones" },
  { to: "/admin/analytics", label: "Analytics" },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-slate-950/95 px-5 py-8 lg:block">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Backoffice</p>
        <h2 className="mt-2 text-xl font-bold">ZAI Admin</h2>
        <nav className="mt-8 space-y-2 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "block rounded-xl px-4 py-3 transition",
                  isActive ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-6 py-5 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Admin</p>
              <h1 className="text-2xl font-semibold text-white">Backoffice ZAI</h1>
            </div>
            <p className="text-xs text-slate-400">Control total de usuarios, pagos y analíticas.</p>
          </div>
        </header>
        <main className="px-6 py-8 sm:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
