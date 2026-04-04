export default function AuthPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Login / Registro</p>
        <h1 className="text-3xl font-semibold text-white">Accede o crea tu cuenta</h1>
        <p className="mt-2 text-sm text-slate-300">
          Email, Google o Apple. Tu cuenta se conecta al onboarding y la configuración inicial para alimentar
          la IA enseguida.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6 space-y-4">
          <p className="section-title">Iniciar sesión</p>
          <div className="space-y-3">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                type="button"
              >
                Continuar con {provider}
              </button>
            ))}
          </div>
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
                Contraseña
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
          </form>
        </div>

        <div className="glass-panel p-6 space-y-4">
          <p className="section-title">Crear cuenta</p>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-400" htmlFor="full-name">
                Nombre completo
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none"
                id="full-name"
                placeholder="Tu nombre"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400" htmlFor="signup-email">
                Email
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none"
                id="signup-email"
                placeholder="registro@zai.app"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400" htmlFor="signup-password">
                Contraseña segura
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none"
                id="signup-password"
                placeholder="Crea una contraseña"
                type="password"
              />
            </div>
            <button
              className="w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900"
              type="button"
            >
              Crear cuenta y comenzar onboarding
            </button>
          </form>
          <p className="text-xs text-slate-400">
            Al registrarte aceptas los términos de servicio y privacidad. Te llevaremos directo al
            onboarding inicial.
          </p>
        </div>
      </div>
    </div>
  );
}
