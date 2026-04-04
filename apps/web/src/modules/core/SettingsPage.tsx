export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Configuración</p>
        <h1 className="text-3xl font-semibold text-white">Perfil, seguridad y suscripción</h1>
        <p className="mt-2 text-sm text-slate-300">
          Ajusta nombre, correo, seguridad, preferencias de notificación y plan. Control total sin salir de la app.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-panel p-5 space-y-3">
          <h2 className="text-lg font-semibold text-white">Perfil</h2>
          <p className="text-sm text-slate-300">Nombre: Daniel G.</p>
          <p className="text-sm text-slate-300">Email: daniel@zai.app</p>
          <p className="text-sm text-slate-300">Rol: Usuario Premium</p>
        </div>
        <div className="glass-panel p-5 space-y-3">
          <h2 className="text-lg font-semibold text-white">Seguridad</h2>
          <p className="text-sm text-slate-300">2FA activado con Google Authenticator.</p>
          <p className="text-sm text-slate-300">Cifrado AES-256 en reposo y TLS 1.3 en tránsito.</p>
          <p className="text-sm text-slate-300">Alertas por dispositivo desconocido.</p>
        </div>
        <div className="glass-panel p-5 space-y-3">
          <h2 className="text-lg font-semibold text-white">Suscripción</h2>
          <p className="text-sm text-slate-300">$14 / mes · renovable automáticamente</p>
          <p className="text-sm text-slate-300">Método: tarjeta terminada en 1234</p>
          <p className="text-xs text-slate-400">Cancelar en cualquier momento sin penalizaciones.</p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-3">
        <p className="section-title">Preferencias</p>
        <div className="grid gap-3 md:grid-cols-2 text-sm text-slate-300">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-500">Tema</p>
            <p className="text-white">Modo oscuro automático</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-500">Notificaciones</p>
            <p className="text-white">Solo alertas críticas y recomendaciones semanales</p>
          </div>
        </div>
      </div>
    </div>
  );
}
