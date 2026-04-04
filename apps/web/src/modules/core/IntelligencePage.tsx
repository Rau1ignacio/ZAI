import { intelligenceInsights } from "../../data/siteContent";
import { useDashboardData } from "../../hooks/useBI";
import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";
import { useCurrency } from "../../hooks/useCurrency";
import { Brain, Sparkles } from "lucide-react";

export default function IntelligencePage() {
  const { accounts, transactions, budgets, goals, debts, investments } = useMergedFinanceData();
  const { convert, format } = useCurrency();
  const { recommendations, financialScore } = useDashboardData(
    accounts,
    transactions,
    budgets,
    goals,
    debts,
    investments
  );

  return (
    <main className="space-y-8">
      <header className="glass-panel border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-title">Inteligencia</p>
            <h1 className="text-3xl font-semibold text-slate-50">Insights automáticos y recomendaciones IA</h1>
            <p className="text-sm text-slate-400">
              Score dinámico, análisis de flujo y simulaciones “qué pasaría si” con respaldo del motor BI.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-emerald-300">
            <Brain className="h-6 w-6" />
            Score financiero: <span className="text-2xl text-slate-50">{financialScore}/100</span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="text-xs text-slate-400">Cashflow sugerido</p>
            <p className="text-2xl font-semibold text-slate-50">{format.format(convert(120_000))}</p>
            <p className="text-[11px] text-slate-500">Reducir gastos 20% en movilidad</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="text-xs text-slate-400">Impacto IA</p>
            <p className="text-2xl font-semibold text-emerald-400">+2 pts</p>
            <p className="text-[11px] text-slate-500">Simulación “qué pasaría si”</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="text-xs text-slate-400">Recomendaciones</p>
            <p className="text-2xl font-semibold text-emerald-300">{recommendations.length}</p>
            <p className="text-[11px] text-slate-500">IA lista para ejecutar acciones</p>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="section-title">Insights destacados</p>
          <Sparkles className="h-5 w-5 text-emerald-300" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {intelligenceInsights.map((insight) => (
            <article
              key={insight.title}
              className="glass-panel border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-emerald-500/40 hover:-translate-y-0.5"
            >
              <h2 className="text-lg font-semibold text-slate-50">{insight.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{insight.detail}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                {insight.tip}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <p className="section-title">Recomendaciones activas</p>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            con IA proactiva
          </span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recommendations.slice(0, 4).map((recommendation) => (
            <article
              key={recommendation.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 transition-all hover:border-emerald-500/40 hover:-translate-y-0.5"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                {recommendation.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-50">{recommendation.title}</h3>
              <p className="text-sm text-slate-300">{recommendation.description}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>Impacto {recommendation.impact}</span>
                <button className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-50 transition-all hover:border-emerald-500/60 hover:bg-emerald-500/10">
                  Activar plan
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
