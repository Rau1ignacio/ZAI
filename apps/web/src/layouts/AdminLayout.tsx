import { NavLink, Outlet } from "react-router-dom";
import TopbarAdmin from "../components/TopbarAdmin";

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
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-white text-white dark:text-white light:text-gray-900">
      <TopbarAdmin />
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 dark:border-white/10 light:border-gray-300 bg-slate-950/95 dark:bg-slate-950/95 light:bg-gray-100 px-5 py-8 lg:block">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-500 light:text-gray-600">Backoffice</p>
        <h2 className="mt-2 text-xl font-bold text-white dark:text-white light:text-gray-900">ZAI Admin</h2>
        <nav className="mt-8 space-y-2 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "block rounded-xl px-4 py-3 transition",
                  isActive ? "bg-white/10 dark:bg-white/10 light:bg-gray-200 text-white dark:text-white light:text-gray-900" : "text-slate-400 dark:text-slate-400 light:text-gray-600 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-gray-200 hover:text-white dark:hover:text-white light:hover:text-gray-900",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <main className="px-6 py-8 sm:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
