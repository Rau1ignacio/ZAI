export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Seguridad</p>
        <h1 className="text-3xl font-semibold text-white">Confianza cifrada para cada movimiento</h1>
        <p className="mt-2 text-sm text-slate-300">
          Apoyamos cada sesión con 2FA, cifrado de extremo a extremo y monitorización de actividad sospechosa.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "2FA y biometría",
            detail: "SMS/Push, biometría y llaves FIDO garantizan solo un acceso autorizado.",
          },
          {
            title: "Cifrado extremo a extremo",
            detail: "Tus datos salen de cada dispositivo cifrados y se almacenan en infraestructura certificada.",
          },
          {
            title: "Monitoreo continuo",
            detail: "Alertas automáticas ante patrones inusuales y bloqueo temporal inmediato.",
          },
        ].map((item) => (
          <div key={item.title} className="glass-panel p-5 space-y-2">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="text-sm text-slate-300">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
