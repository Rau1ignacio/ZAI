import { Link, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Landing" },
  { to: "/features", label: "Funciones" },
  { to: "/pricing", label: "Planes" },
  { to: "/about", label: "Sobre nosotros" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contacto" },
];

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 px-6 py-4 backdrop-blur sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">ZAI</p>
            <h1 className="text-lg font-semibold text-white">Controla tu dinero con claridad</h1>
          </div>
          <nav className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 sm:flex">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-slate-950/80 px-6 py-6 text-xs text-slate-400 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>ZAI · IA financiera para emprendedores y familias.</p>
          <div className="flex gap-3">
            <Link to="/terms" className="hover:text-white">
              Términos
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacidad
            </Link>
            <Link to="/help" className="hover:text-white">
              Ayuda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
