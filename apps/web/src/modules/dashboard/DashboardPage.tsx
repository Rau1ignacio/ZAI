import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  LineChart,
  PieChart,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useDashboardData } from "../../hooks/useBI";
import { useCurrency } from "../../hooks/useCurrency";
import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";

type DashboardWidgetId =
  | "cashflow"
  | "spending"
  | "netWorth"
  | "forecast"
  | "investments";

const DASHBOARD_WIDGET_OPTIONS: Array<{
  id: DashboardWidgetId;
  label: string;
  icon: typeof BarChart3;
}> = [
  { id: "cashflow", label: "Flujo de caja", icon: LineChart },
  { id: "spending", label: "Gastos por categoria", icon: PieChart },
  { id: "netWorth", label: "Patrimonio neto", icon: BarChart3 },
  { id: "forecast", label: "Prediccion financiera", icon: TrendingUp },
  { id: "investments", label: "Rendimiento inversiones", icon: LineChart },
];

const DEFAULT_WIDGETS: DashboardWidgetId[] = ["cashflow", "spending", "netWorth"];

export default function DashboardPage() {
  const { convert, format, updatedAt, isLoading: currencyLoading } = useCurrency();
  const { accounts, transactions, budgets, goals, debts, investments } =
    useMergedFinanceData();
  const {
    kpis,
    weeklyFlow,
    cashFlow,
    spending,
    budgetStatus,
    goalsStatus,
    netWorth,
    forecast,
    alerts,
    financialScore,
    isLoading: biLoading,
  } = useDashboardData(accounts, transactions, budgets, goals, debts, investments);

  const isLoading = currencyLoading || biLoading;
  const displayKPIs = Object.values(kpis).slice(0, 3);

  const [widgetToAdd, setWidgetToAdd] = useState<DashboardWidgetId>("cashflow");
  const [selectedWidgets, setSelectedWidgets] =
    useState<DashboardWidgetId[]>(DEFAULT_WIDGETS);

  const selectedWidgetOptions = useMemo(
    () =>
      selectedWidgets.map((id) =>
        DASHBOARD_WIDGET_OPTIONS.find((option) => option.id === id)
      ),
    [selectedWidgets]
  );

  const addWidget = () => {
    setSelectedWidgets((current) => [...current, widgetToAdd]);
  };

  const moveWidget = (index: number, direction: "up" | "down") => {
    setSelectedWidgets((current) => {
      const nextIndex = direction === "up" ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }

      const clone = [...current];
      [clone[index], clone[nextIndex]] = [clone[nextIndex], clone[index]];
      return clone;
    });
  };

  const removeWidget = (index: number) => {
    setSelectedWidgets((current) =>
      current.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const renderWidget = (widgetId: DashboardWidgetId) => {
    switch (widgetId) {
      case "cashflow":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Flujo neto 30 dias</p>
            <p
              className={`text-2xl font-semibold ${
                cashFlow.netFlow >= 0 ? "text-emerald-400" : "text-rose-500"
              }`}
            >
              {format.format(convert(cashFlow.netFlow))}
            </p>
            <div className="grid gap-2 text-xs sm:grid-cols-2">
              <p className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-slate-300">
                Ingresos:{" "}
                <span className="font-semibold text-emerald-400">
                  {format.format(convert(cashFlow.totalIncome))}
                </span>
              </p>
              <p className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-slate-300">
                Gastos:{" "}
                <span className="font-semibold text-rose-500">
                  {format.format(convert(cashFlow.totalExpenses))}
                </span>
              </p>
            </div>
          </div>
        );
      case "spending":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Top categorias de gasto</p>
            <div className="space-y-2">
              {spending.top5Categories.slice(0, 5).map((item) => (
                <div
                  key={item.category}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                >
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                    <span>{item.category}</span>
                    <span>{item.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${Math.min(100, item.percentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "netWorth":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Resumen patrimonial</p>
            <p className="text-2xl font-semibold text-slate-50">
              {format.format(convert(netWorth))}
            </p>
            <div className="grid gap-2 text-xs sm:grid-cols-2">
              <p className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-slate-300">
                Activos:{" "}
                <span className="font-semibold text-emerald-400">
                  {format.format(
                    convert(accounts.reduce((sum, account) => sum + account.balance, 0))
                  )}
                </span>
              </p>
              <p className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-slate-300">
                Pasivos:{" "}
                <span className="font-semibold text-rose-500">
                  {format.format(
                    convert(debts.reduce((sum, debt) => sum + debt.principal, 0))
                  )}
                </span>
              </p>
            </div>
          </div>
        );
      case "forecast":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Escenarios de proyeccion</p>
            <div className="space-y-2">
              {forecast.projections.slice(0, 3).map((projection) => (
                <div
                  key={`${projection.scenario}-${projection.period}`}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="capitalize">{projection.scenario}</span>
                    <span className="text-slate-400">{projection.confidence}% confianza</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-50">
                    {format.format(convert(projection.projectedBalance))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "investments":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Performance de inversiones</p>
            <div className="space-y-2">
              {investments.map((investment) => {
                const gain = investment.currentValue - investment.initialValue;
                const gainPercent = investment.initialValue
                  ? (gain / investment.initialValue) * 100
                  : 0;
                return (
                  <div
                    key={investment.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                  >
                    <p className="text-xs text-slate-300">{investment.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-50">
                        {format.format(convert(investment.currentValue))}
                      </p>
                      <p
                        className={`text-xs font-semibold ${
                          gain >= 0 ? "text-emerald-400" : "text-rose-500"
                        }`}
                      >
                        {gain >= 0 ? "+" : ""}
                        {gainPercent.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <header className="glass-panel border-slate-800 bg-slate-900/50 p-6 backdrop-blur-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-title">Dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-50">
              Control total con claridad
            </h1>
            <p className="text-sm text-slate-400">Score, flujo y alertas impulsadas por IA.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-500/70 hover:bg-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              type="button"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="ml-2">Ver score</span>
            </button>
            <Link
              to="/app/intelligence"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-50 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-emerald-500/10"
            >
              Ir a IA
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {!isLoading && (
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
              <ShieldCheck className="h-6 w-6 text-emerald-300" />
              <div>
                <p className="text-xs text-slate-400">Score financiero</p>
                <p className="text-2xl font-semibold text-slate-50">{financialScore}/100</p>
              </div>
            </div>
          )}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400">Cotizacion diaria</p>
            <p className="text-base font-semibold text-slate-50">
              {currencyLoading ? "Cargando..." : updatedAt ?? "Sin datos"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400">Cuentas conectadas</p>
            <p className="text-base font-semibold text-slate-50">{accounts.length}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <article className="glass-panel border-slate-800 bg-slate-900/50 p-6 backdrop-blur-lg">
          <header className="flex items-center justify-between">
            <div>
              <p className="section-title">Resumen inmediato</p>
              <h2 className="text-xl font-semibold text-slate-50">
                Flujo, alertas y momentum
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs uppercase text-slate-400">
              <Sparkles className="h-4 w-4" />
              Actualizado al instante
            </div>
          </header>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {displayKPIs.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-500/30"
              >
                <p className="text-xs text-slate-400">{kpi.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {isLoading ? "..." : format.format(convert(kpi.value))}
                </p>
                <p
                  className={`mt-1 text-xs ${
                    kpi.delta?.startsWith("+") ? "text-emerald-400" : "text-rose-500"
                  }`}
                >
                  {kpi.delta}
                </p>
                <p className="text-[11px] text-slate-400">{kpi.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-[0_0_25px_rgba(15,23,42,0.4)]">
            <p className="text-xs text-slate-400">Flujo semanal</p>
            <div className="mt-4 space-y-3 text-[11px] text-slate-400">
              {weeklyFlow.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="w-10 font-semibold text-slate-200">{day.day}</span>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-emerald-400"
                        style={{ width: `${Math.min(100, day.income)}%` }}
                      />
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-rose-500"
                        style={{ width: `${Math.min(100, day.expense)}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-12 text-right text-[10px] text-slate-500">
                    Ingreso · Gasto
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs text-slate-400">Alertas activas</p>
            <p className="text-sm text-slate-300">{alerts.length} eventos criticos monitoreados.</p>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr,0.5fr]">
        <article className="glass-panel border-slate-800 bg-slate-900/60 p-6">
          <header className="flex items-center justify-between">
            <p className="section-title">Ultimas transacciones</p>
            <Link
              to="/app/transactions"
              className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400 transition-all hover:text-emerald-300"
            >
              Ver todo
            </Link>
          </header>
          <div className="mt-6 space-y-4">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/30 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-500/30 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-50">{tx.name}</p>
                  <p className="text-xs text-slate-400">
                    {tx.category} · {tx.date}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-semibold ${
                      tx.amount >= 0 ? "text-emerald-400" : "text-rose-500"
                    }`}
                  >
                    {format.format(convert(tx.amount))}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {tx.status === "pending" ? "Pendiente" : "Confirmado"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
            <p className="section-title">Presupuestos</p>
            <div className="mt-4 space-y-4">
              {budgetStatus.map((budget) => (
                <div key={budget.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{budget.name}</span>
                    <span
                      className={
                        budget.status === "exceeded"
                          ? "text-rose-500"
                          : budget.status === "warning"
                            ? "text-amber-300"
                            : "text-emerald-400"
                      }
                    >
                      {budget.utilization}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className={`h-2 rounded-full ${
                        budget.status === "exceeded"
                          ? "bg-rose-500"
                          : budget.status === "warning"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(100, budget.utilization)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{format.format(convert(budget.spent))} usados</span>
                    <span>{format.format(convert(budget.limit))} limite</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
            <p className="section-title">Metas</p>
            <div className="mt-4 space-y-4">
              {goalsStatus.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{goal.title}</span>
                    <span className={goal.onTrack ? "text-emerald-400" : "text-amber-400"}>
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className={`h-2 rounded-full ${
                        goal.onTrack ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${Math.min(100, goal.progress)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {format.format(convert(goal.current))} /{" "}
                    {format.format(convert(goal.target))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="glass-panel border-slate-800 bg-slate-900/60 p-6 backdrop-blur-lg">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-title">Dashboards dinamicos</p>
            <h2 className="text-xl font-semibold text-slate-50">
              Agrega y ordena tus graficos
            </h2>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <select
              value={widgetToAdd}
              onChange={(event) => setWidgetToAdd(event.target.value as DashboardWidgetId)}
              className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none transition-all focus:border-emerald-500/60"
            >
              {DASHBOARD_WIDGET_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addWidget}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition-all hover:-translate-y-0.5 hover:border-emerald-500/70 hover:bg-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar grafico
            </button>
          </div>
        </header>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {selectedWidgetOptions.map((option, index) => {
            if (!option) {
              return null;
            }

            const Icon = option.icon;
            return (
              <article
                key={`${option.id}-${index}`}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-500/30"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-slate-50">{option.label}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveWidget(index, "up")}
                      disabled={index === 0}
                      className="rounded-lg border border-slate-700 bg-slate-900/70 p-2 text-slate-300 transition-all hover:border-emerald-500/30 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Subir grafico"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveWidget(index, "down")}
                      disabled={index === selectedWidgetOptions.length - 1}
                      className="rounded-lg border border-slate-700 bg-slate-900/70 p-2 text-slate-300 transition-all hover:border-emerald-500/30 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Bajar grafico"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeWidget(index)}
                      className="rounded-lg border border-slate-700 bg-slate-900/70 p-2 text-slate-300 transition-all hover:border-rose-500/40 hover:text-rose-400"
                      aria-label="Eliminar grafico"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {renderWidget(option.id)}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
