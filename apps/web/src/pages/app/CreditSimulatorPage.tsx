export default function CreditSimulatorPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-3">
        <p className="section-title">Simulador</p>
        <h1 className="text-3xl font-semibold text-white">Qué pasaría si... </h1>
        <p className="text-sm text-slate-300">
          Ajusta pagos extra, gastos o ingresos y observa cómo cambia tu score y flujo en tiempo real.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Acción</p>
          <p className="mt-2 text-lg font-semibold text-white">Destinar $500.000 a deuda</p>
          <p className="text-sm text-slate-300">Reduce el plazo y mejora el score.</p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Resultado</p>
          <p className="mt-2 text-lg font-semibold text-white">Score +3 pts</p>
          <p className="text-sm text-slate-300">Cashflow más estable y menor costo de interés.</p>
        </div>
      </div>
    </div>
  );
}
