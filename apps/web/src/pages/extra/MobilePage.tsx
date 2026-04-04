export default function MobilePage() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">App móvil</p>
        <h1 className="text-3xl font-semibold text-white">La lógica del dashboard en tu bolsillo</h1>
        <p className="mt-2 text-sm text-slate-300">
          UX simplificada, focos ultra rápidos para registrar gastos, ver tu score y reaccionar ante alertas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel p-5 space-y-3">
          <h2 className="text-lg font-semibold text-white">Registrar gastos rápido</h2>
          <p className="text-sm text-slate-300">
            Widget flotante permite agregar una transacción con categoría, cuenta y nota en segundos.
          </p>
        </div>
        <div className="glass-panel p-5 space-y-3">
          <h2 className="text-lg font-semibold text-white">Dashboard instantáneo</h2>
          <p className="text-sm text-slate-300">
            Muestra flujo, score y alertas con un swipe. Cero scroll infinito.
          </p>
        </div>
      </div>

      <div className="glass-panel p-6">
        <p className="section-title">Accesos rápidos</p>
        <div className="grid gap-3 md:grid-cols-3">
          {["Registrar gasto", "Ver score", "Enviar ticket"].map((label) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{label}</p>
              <p className="text-lg font-semibold text-white">{label.split(" ")[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
