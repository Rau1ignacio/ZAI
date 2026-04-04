import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-4">
        <p className="section-title">Recuperar contraseña</p>
        <h1 className="text-3xl font-semibold text-white">Te enviamos un enlace</h1>
        <p className="text-sm text-slate-300">
          Ingresa el correo que usas con ZAI y te enviaremos un link para resetear tu contraseña.
        </p>
        <form className="space-y-4 text-sm text-slate-300">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Email</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              type="email"
              placeholder="hola@zai.app"
            />
          </div>
          <button
            type="button"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Enviar enlace
          </button>
        </form>
        <div className="text-xs text-slate-400">
          ¿Ya recuerdas tu contraseña? <Link to="/login" className="text-white">Regresa al login</Link>
        </div>
      </div>
    </div>
  );
}
