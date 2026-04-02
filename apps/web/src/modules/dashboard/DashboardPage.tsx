import { budgets, goals, kpis, transactions, weeklyFlow } from "../../data/mock";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);

export default function DashboardPage() {
  return (
    <div className="space-y-10">
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
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">{kpi.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {kpi.value}
                </p>
                <p className="mt-2 text-xs text-emerald-300">{kpi.delta}</p>
                <p className="text-[11px] text-slate-500">{kpi.detail}</p>
              </div>
            ))}
          </div>
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
                    style={{ width: `${day.income}%` }}
                  />
                  <div
                    className="h-2 flex-1 rounded-full bg-rose-400/60"
                    style={{ width: `${day.expense}%` }}
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
            {transactions.map((tx) => (
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
                  {formatCurrency(tx.amount)}
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
              {budgets.map((budget) => {
                const percent = Math.min(
                  100,
                  Math.round((budget.spent / budget.limit) * 100)
                );

                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{budget.name}</span>
                      <span className="text-slate-400">{percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-emerald-400/80"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{formatCurrency(budget.spent)} usado</span>
                      <span>{formatCurrency(budget.limit)} limite</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel p-6">
            <p className="section-title">Metas</p>
            <div className="mt-6 space-y-5">
              {goals.map((goal) => {
                const percent = Math.round((goal.current / goal.target) * 100);

                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{goal.title}</span>
                      <span className="text-slate-400">{goal.eta}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-indigo-400/80"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{formatCurrency(goal.current)}</span>
                      <span>{formatCurrency(goal.target)}</span>
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
