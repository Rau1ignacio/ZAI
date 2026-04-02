import { useDashboardData } from "../../hooks/useBI";
import { useCurrency } from "../../hooks/useCurrency";
import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { convert, format, updatedAt, isLoading: currencyLoading } = useCurrency();

  // Obtener datos mergeados (mock + localStorage)
  const { accounts, transactions, budgets, goals, debts, investments } = useMergedFinanceData();

  // Usar motor BI para obtener todos los datos
  const {
    kpis,
    weeklyFlow,
    budgetStatus,
    goalsStatus,
    alerts,
    financialScore,
    isLoading: biLoading,
  } = useDashboardData(accounts, transactions, budgets, goals, debts, investments);

  const isLoading = currencyLoading || biLoading;

  // Mapear KPIs al formato esperado
  const displayKPIs = Object.values(kpis).slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Score Financiero Badge */}
      {!isLoading && (
        <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Score Financiero</p>
              <p className="text-3xl font-bold text-white">{financialScore}/100</p>
            </div>
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 border-r-emerald-400"
                style={{
                  transform: `rotate(${(financialScore / 100) * 360}deg)`,
                }}
              />
              <div className="absolute inset-1 rounded-full bg-slate-900/40 flex items-center justify-center">
                <span className="text-white font-semibold">{financialScore}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones de Acciones Rápidas - Separados por Funcionalidad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/add-transaction"
          className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
        >
          <span className="text-2xl block mb-2">💰</span>
          Agregar Transacción
        </Link>
        
        <Link
          to="/add-budget"
          className="bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
        >
          <span className="text-2xl block mb-2">📊</span>
          Crear Presupuesto
        </Link>
        
        <Link
          to="/add-goal"
          className="bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
        >
          <span className="text-2xl block mb-2">🎯</span>
          Nueva Meta
        </Link>
      </div>

      {/* Alertas críticas */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg p-4 border ${
                alert.priority === "critical"
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-amber-500/10 border-amber-500/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    alert.priority === "critical" ? "bg-red-500" : "bg-amber-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{alert.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resumen general + flujo semanal */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="glass-panel p-8">
          <p className="section-title">Resumen inmediato</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">
            Tu dinero esta trabajando para ti hoy.
          </h3>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            ZAI detecta patrones, proyecta tu cashflow y sugiere acciones
            concretas para mantenerte en control.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {displayKPIs.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">{kpi.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {isLoading ? "..." : format.format(convert(kpi.value))}
                </p>
                <p
                  className={`mt-2 text-xs ${
                    kpi.delta?.startsWith("+") ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {kpi.delta}
                </p>
                <p className="text-[11px] text-slate-500">{kpi.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500">
            {currencyLoading
              ? "Actualizando cotizacion diaria..."
              : `Cotizacion diaria: ${updatedAt ?? "Sin datos"}`}
          </p>
        </div>

        <div className="glass-panel p-6">
          <p className="section-title">Flujo semanal</p>
          <div className="mt-6 space-y-4">
            {weeklyFlow.map((day) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{day.day}</span>
                  <span>Ingreso vs gasto</span>
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-2 flex-1 rounded-full bg-emerald-400/70"
                    style={{ width: `${Math.min(100, day.income)}%` }}
                  />
                  <div
                    className="h-2 flex-1 rounded-full bg-rose-400/60"
                    style={{ width: `${Math.min(100, day.expense)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">
            Ingresos promedio 18% sobre gastos en los ultimos 7 dias.
          </p>
        </div>
      </section>

      {/* Transacciones y paneles laterales */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <p className="section-title">Ultimas transacciones</p>
            <button className="text-xs text-slate-400" type="button">
              Ver todo
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{tx.name}</p>
                  <p className="text-xs text-slate-400">
                    {tx.category} · {tx.date}
                  </p>
                </div>
                <div className="text-right text-sm font-semibold text-white">
                  {format.format(convert(tx.amount))}
                  <p
                    className={`text-xs ${
                      tx.status === "pending"
                        ? "text-amber-300"
                        : "text-emerald-300"
                    }`}
                  >
                    {tx.status === "pending" ? "Pendiente" : "Confirmado"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <p className="section-title">Presupuestos activos</p>
            <div className="mt-6 space-y-5">
              {budgetStatus.map((budget) => {
                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{budget.name}</span>
                      <span
                        className={`${
                          budget.status === "exceeded"
                            ? "text-rose-300"
                            : budget.status === "warning"
                            ? "text-amber-300"
                            : "text-emerald-300"
                        }`}
                      >
                        {budget.utilization}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className={`h-2 rounded-full ${
                          budget.status === "exceeded"
                            ? "bg-rose-400/80"
                            : budget.status === "warning"
                            ? "bg-amber-400/80"
                            : "bg-emerald-400/80"
                        }`}
                        style={{ width: `${Math.min(100, budget.utilization)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{format.format(convert(budget.spent))} usado</span>
                      <span>{format.format(convert(budget.limit))} limite</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel p-6">
            <p className="section-title">Metas</p>
            <div className="mt-6 space-y-5">
              {goalsStatus.map((goal) => {
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{goal.title}</span>
                      <span className={`${goal.onTrack ? "text-emerald-300" : "text-amber-300"}`}>
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className={`h-2 rounded-full ${
                          goal.onTrack ? "bg-indigo-400/80" : "bg-amber-400/80"
                        }`}
                        style={{ width: `${Math.min(100, goal.progress)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{format.format(convert(goal.current))}</span>
                      <span>{format.format(convert(goal.target))}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
