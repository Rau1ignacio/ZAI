import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/app/dashboard", label: "Inicio" },
  { to: "/app/transactions", label: "Movs" },
  { to: "/app/assets", label: "Patrimonio" },
  { to: "/app/budgets", label: "Presup" },
  { to: "/app/goals", label: "Metas" },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-white/10 bg-slate-950/95 py-3 lg:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            ["text-xs font-semibold", isActive ? "text-white" : "text-slate-500"].join(" ")
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
