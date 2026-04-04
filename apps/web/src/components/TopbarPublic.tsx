import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/features", label: "Funciones" },
  { to: "/pricing", label: "Planes" },
  { to: "/about", label: "Nosotros" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contacto" },
];

export default function TopbarPublic() {
  const { resolvedTheme, setTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 light:border-slate-200 light:bg-white/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6" ref={menuRef}>
        <Link
          to="/"
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 dark:border-white/10 dark:bg-white/5 light:border-slate-200 light:bg-white"
        >
          <span className="rounded-md bg-gradient-to-br from-cyan-400 to-emerald-400 px-2 py-1 text-xs font-black tracking-wide text-slate-950">
            ZAI
          </span>
          <span className="hidden text-sm font-semibold text-slate-100 group-hover:text-cyan-100 dark:text-slate-100 light:text-slate-900 sm:block">
            Inteligencia financiera
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-100 dark:text-cyan-100 light:text-cyan-700"
                    : "text-slate-300 hover:bg-white/10 hover:text-white dark:text-slate-300 light:text-slate-600 light:hover:bg-slate-100 light:hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:text-white dark:border-white/10 dark:bg-white/5 light:border-slate-200 light:bg-white light:text-slate-700"
            aria-label={`Cambiar a tema ${resolvedTheme === "dark" ? "claro" : "oscuro"}`}
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            to="/auth/login"
            className="hidden rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-white dark:border-white/10 light:border-slate-200 light:text-slate-700 lg:inline-flex"
          >
            Iniciar sesion
          </Link>

          <Link
            to="/auth/register"
            className="hidden items-center gap-1 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 lg:inline-flex"
          >
            Empieza gratis
            <Sparkles className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-200 dark:border-white/10 dark:bg-white/5 light:border-slate-200 light:bg-white light:text-slate-700 lg:hidden"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-4 right-4 top-[4.25rem] z-50 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 light:border-slate-200 light:bg-white">
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-100 dark:text-cyan-100 light:text-cyan-700"
                        : "text-slate-200 hover:bg-white/10 dark:text-slate-200 light:text-slate-700 light:hover:bg-slate-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 dark:border-white/10 light:border-slate-200 light:text-slate-700"
              >
                Iniciar sesion
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Empieza gratis
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
