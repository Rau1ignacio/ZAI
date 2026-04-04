import { Link } from "react-router-dom";

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-4">
        <p className="section-title">Resetear contraseña</p>
        <h1 className="text-3xl font-semibold text-white">Elige una nueva clave</h1>
        <form className="space-y-4 text-sm text-slate-300">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Nueva contraseña</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Confirmar contraseña</label>
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
            Actualizar cuenta
          </button>
        </form>
        <div className="text-xs text-slate-400">
          ¿Volver al login? <Link to="/login" className="text-white">Entrar ahora</Link>
        </div>
      </div>
    </div>
  );
}
