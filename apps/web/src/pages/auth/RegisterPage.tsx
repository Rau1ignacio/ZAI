import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-4">
        <p className="section-title">Crear cuenta</p>
        <h1 className="text-3xl font-semibold text-white">Controla tu dinero con un solo login</h1>
        <form className="space-y-4 text-sm text-slate-300">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Nombre</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              type="text"
              placeholder="Nombre"/>
          </div>
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
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Crear cuenta
          </button>
        </form>
        <div className="text-xs text-slate-400">
          ¿Ya tienes cuenta? <Link to="/login" className="text-white">Ingresar</Link>
        </div>
      </div>
    </div>
  );
}
