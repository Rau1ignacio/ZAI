import { useDashboardData } from "../../hooks/useBI";
import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";
import { AlertTriangle, Bell, Flame } from "lucide-react";

export default function AlertsPage() {
  const { accounts, transactions, budgets, goals, debts, investments } = useMergedFinanceData();
  const { alerts } = useDashboardData(accounts, transactions, budgets, goals, debts, investments);

  const categories = [
    { label: "Gastos altos", icon: <Flame className="h-5 w-5 text-rose-400" /> },
    { label: "Pagos pendientes", icon: <Bell className="h-5 w-5 text-amber-300" /> },
    { label: "Presupuesto excedido", icon: <AlertTriangle className="h-5 w-5 text-emerald-300" /> },
  ];

  return (
    <main className="space-y-8">
      <header className="glass-panel border-slate-800 bg-slate-900/50 p-6 backdrop-blur-lg">
        <p className="section-title">Alertas</p>
        <h1 className="text-3xl font-semibold text-slate-50">Mantente alerta sin perder la calma</h1>
        <p className="text-sm text-slate-400">
          ZAI agrupa cada señal con prioridad y pasos de acción para que reacciones rápido.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.label}
            className="glass-panel border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-emerald-500/40 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              {category.icon}
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{category.label}</p>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Priorizamos los avisos relevantes con contexto automático.
            </p>
            <p className="mt-2 text-xs font-semibold text-emerald-300">Prioridad automática</p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <div className="glass-panel border border-rose-500/30 bg-rose-500/10 p-4 text-xs uppercase tracking-[0.3em] text-rose-200">
          <p>Las alertas críticas se muestran con acciones recomendadas en un solo clic.</p>
        </div>
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className="glass-panel border-l-4 border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-emerald-500/40 hover:-translate-y-0.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{alert.type}</p>
              <span
                className={`text-[11px] font-semibold ${
                  alert.priority === "critical"
                    ? "text-rose-400"
                    : alert.priority === "high"
                    ? "text-amber-300"
                    : "text-emerald-300"
                }`}
              >
                {alert.priority.toUpperCase()}
              </span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-slate-50">{alert.title}</h2>
            <p className="text-sm text-slate-300">{alert.message}</p>
            <p className="mt-3 text-[11px] text-slate-500">{alert.timestamp.toLocaleTimeString()}</p>
            <div className="mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              <Flame className="h-4 w-4 text-rose-400" />
              Acciones recomendadas
            </div>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              <button className="rounded-2xl border border-white/10 bg-emerald-500/10 px-3 py-2 text-[11px] font-semibold text-emerald-300 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:-translate-y-0.5">
                Revisar pasos
              </button>
              <button className="rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-[11px] font-semibold text-slate-50 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10">
                Marcar leído
              </button>
              <button className="rounded-2xl border border-white/10 bg-rose-500/10 px-3 py-2 text-[11px] font-semibold text-rose-300 transition-all hover:border-rose-500/40 hover:bg-rose-500/20">
                Agregar regla
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
