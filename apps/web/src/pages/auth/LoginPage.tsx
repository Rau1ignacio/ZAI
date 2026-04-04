import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-4">
        <p className="section-title">Login</p>
        <h1 className="text-3xl font-semibold text-white">Iniciar sesión</h1>
        <form className="space-y-4 text-sm text-slate-300">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Email</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              type="email"
              placeholder="hola@zai.app"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Contraseña</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              type="password"
              placeholder="********"
            />
          </div>
          <button
            type="button"
            className="w-full rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Continuar
          </button>
        </form>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <Link to="/forgot-password" className="text-emerald-300">
            ¿Olvidaste tu contraseña?
          </Link>
          <span>·</span>
          <Link to="/register" className="text-white">
            Crear cuenta nueva
          </Link>
        </div>
      </div>
    </div>
  );
}
