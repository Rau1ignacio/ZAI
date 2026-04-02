export default function AuthPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
      {/* Mensaje de seguridad y confianza */}
      <div className="glass-panel p-8">
        <p className="section-title">Acceso seguro</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          Bienvenido de vuelta
        </h3>
        <p className="mt-2 max-w-xl text-sm text-slate-300">
          Protegemos tu informacion con cifrado de extremo a extremo y
          monitoreo continuo de riesgos.
        </p>
      </div>

      {/* Formulario de acceso MVP */}
      <div className="glass-panel p-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-slate-400" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none"
              id="email"
              placeholder="tucorreo@zai.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-slate-400" htmlFor="password">
              Contrasena
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none"
              id="password"
              placeholder="********"
              type="password"
            />
          </div>
          <button
            className="w-full rounded-xl bg-emerald-400/80 px-4 py-2 text-sm font-semibold text-slate-900"
            type="button"
          >
            Entrar
          </button>
          <p className="text-center text-xs text-slate-500">
            Acceso protegido por doble factor.
          </p>
        </form>
      </div>
    </div>
  );
}
