import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { budgets as mockBudgets, transactions as mockTransactions } from "../../data/mock";
import { useCurrency } from "../../hooks/useCurrency";
import { useFinanceData } from "../../hooks/useFinanceData";
import type { Budget } from "../../types/finance";

type BudgetStatus = "good" | "warning" | "excess";
type BudgetFrequency = "daily" | "weekly" | "monthly" | "annual";
type BudgetKind = "fixed" | "variable";

const FREQUENCY_LABEL: Record<BudgetFrequency, string> = {
  daily: "Diario",
  weekly: "Semanal",
  monthly: "Mensual",
  annual: "Anual",
};

const BUDGET_TYPE_LABEL: Record<BudgetKind, string> = {
  fixed: "Fijo",
  variable: "Variable",
};

const CATEGORY_OPTIONS = [
  "Comida",
  "Transporte",
  "Hogar",
  "Servicios",
  "Salud",
  "Educacion",
  "Entretenimiento",
  "Ahorro",
  "Otros",
];

const STATUS_UI: Record<
  BudgetStatus,
  { label: string; badge: string; bar: string; ring: string; icon: string }
> = {
  good: {
    label: "Bien",
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-400/30",
    bar: "from-emerald-400 to-emerald-500",
    ring: "hover:border-emerald-400/40",
    icon: "OK",
  },
  warning: {
    label: "Cuidado",
    badge: "text-amber-300 bg-amber-500/10 border-amber-400/30",
    bar: "from-amber-400 to-amber-500",
    ring: "hover:border-amber-400/40",
    icon: "WARN",
  },
  excess: {
    label: "Exceso",
    badge: "text-rose-300 bg-rose-500/10 border-rose-400/40",
    bar: "from-rose-400 to-rose-500",
    ring: "hover:border-rose-400/40",
    icon: "RISK",
  },
};

function getBudgetStatus(percent: number): BudgetStatus {
  if (percent > 100) return "excess";
  if (percent >= 80) return "warning";
  return "good";
}

function toMonthlyEquivalent(limit: number, frequency: BudgetFrequency): number {
  if (frequency === "daily") return limit * 30;
  if (frequency === "weekly") return limit * 4;
  if (frequency === "annual") return limit / 12;
  return limit;
}

function toPeriod(frequency: BudgetFrequency): Budget["period"] {
  if (frequency === "annual") return "annual";
  return frequency;
}

export default function BudgetsPage() {
  const { convert, format } = useCurrency();
  const { budgets, transactions, addBudget } = useFinanceData();

  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [frequency, setFrequency] = useState<BudgetFrequency>("monthly");
  const [budgetType, setBudgetType] = useState<BudgetKind>("variable");
  const [showCreate, setShowCreate] = useState(false);

  const availableBudgets = budgets.length > 0 ? budgets : mockBudgets;
  const availableTransactions = transactions.length > 0 ? transactions : mockTransactions;

  const normalizedBudgets = useMemo(() => {
    return availableBudgets.map((budget) => {
      const spent = Math.max(0, budget.spent ?? 0);
      const limitAmount = Math.max(1, budget.limit ?? 1);
      const usage = (spent / limitAmount) * 100;
      const status = getBudgetStatus(usage);
      return {
        ...budget,
        spent,
        limit: limitAmount,
        usage,
        status,
        frequency: (budget.frequency || budget.period || "monthly") as BudgetFrequency,
        budgetType: (budget.budgetType || "variable") as BudgetKind,
      };
    });
  }, [availableBudgets]);

  const totalIncome = useMemo(() => {
    return availableTransactions.reduce((sum, transaction) => {
      if (transaction.type === "income" || transaction.amount > 0) {
        return sum + Math.max(transaction.amount, 0);
      }
      return sum;
    }, 0);
  }, [availableTransactions]);

  const totalBudgeted = useMemo(
    () => normalizedBudgets.reduce((sum, budget) => sum + budget.limit, 0),
    [normalizedBudgets]
  );

  const totalSpent = useMemo(
    () => normalizedBudgets.reduce((sum, budget) => sum + budget.spent, 0),
    [normalizedBudgets]
  );

  const usagePercent = totalBudgeted === 0 ? 0 : (totalSpent / totalBudgeted) * 100;
  const budgetVsIncome = totalIncome === 0 ? 0 : (totalBudgeted / totalIncome) * 100;
  const availableMargin = totalIncome - totalSpent;
  const globalStatus = getBudgetStatus(usagePercent);

  const dashboardBars = [
    { label: "Ingresos", amount: totalIncome, color: "from-cyan-400 to-cyan-500" },
    { label: "Presupuestos", amount: totalBudgeted, color: "from-indigo-400 to-indigo-500" },
    { label: "Gasto real", amount: totalSpent, color: "from-rose-400 to-rose-500" },
  ];

  const chartMax = Math.max(...dashboardBars.map((item) => item.amount), 1);
  const sortedBudgets = [...normalizedBudgets].sort((a, b) => b.usage - a.usage);

  const insights = useMemo(() => {
    const insightRows: string[] = [];

    if (budgetVsIncome > 90) {
      insightRows.push("Tu presupuesto total consume mas del 90% de tus ingresos. Considera recortar categorias variables.");
    }

    const atRisk = sortedBudgets.filter((budget) => budget.usage >= 80);
    if (atRisk.length > 0) {
      insightRows.push(
        `${atRisk[0].name} esta en ${Math.round(atRisk[0].usage)}% de uso. Recomendacion: reducir 10%-15% hasta el cierre del periodo.`
      );
    }

    if (availableMargin < 0) {
      insightRows.push(
        `Ya superaste tus ingresos en ${format.format(convert(Math.abs(availableMargin)))}. Activa ajuste automatico de limites hoy.`
      );
    }

    if (insightRows.length === 0) {
      insightRows.push("Mantienes equilibrio financiero. Puedes mover 5%-8% a ahorro sin comprometer liquidez.");
    }

    return insightRows.slice(0, 3);
  }, [availableMargin, budgetVsIncome, sortedBudgets, convert, format]);

  const dynamicAlerts = useMemo(() => {
    const rows: Array<{ id: string; label: string; type: BudgetStatus }> = [];

    sortedBudgets.slice(0, 3).forEach((budget) => {
      if (budget.usage > 100) {
        rows.push({
          id: `${budget.id}-excess`,
          label: `${budget.name} excedio su limite por ${Math.round(budget.usage - 100)}%.`,
          type: "excess",
        });
      } else if (budget.usage >= 80) {
        rows.push({
          id: `${budget.id}-warning`,
          label: `${budget.name} esta cerca del limite (${Math.round(budget.usage)}%).`,
          type: "warning",
        });
      }
    });

    if (rows.length === 0) {
      rows.push({ id: "all-good", label: "Todos tus presupuestos estan en zona saludable.", type: "good" });
    }

    return rows;
  }, [sortedBudgets]);

  const monthlyEquivalent = toMonthlyEquivalent(Number(limit || 0), frequency);

  const handleCreateBudget = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedLimit = Number(limit);
    if (!name.trim() || !category || Number.isNaN(parsedLimit) || parsedLimit <= 0) {
      return;
    }

    addBudget({
      name: name.trim(),
      spent: 0,
      limit: parsedLimit,
      category,
      frequency,
      period: toPeriod(frequency),
      budgetType,
    });

    setName("");
    setLimit("");
    setCategory(CATEGORY_OPTIONS[0]);
    setFrequency("monthly");
    setBudgetType("variable");
    setShowCreate(false);
  };

  const heroStatus = STATUS_UI[globalStatus];

  return (
    <div className="space-y-6 pb-8">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-emerald-500/10 p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-title">Control de gastos</p>
              <h1 className="mt-3 text-3xl font-bold text-white">Presupuestos ZAI</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Entiende en segundos si estas gastando mas de lo que ganas y toma accion antes del cierre del periodo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${heroStatus.badge}`}>
                {heroStatus.icon} Estado global: {heroStatus.label}
              </span>
              <button
                type="button"
                onClick={() => setShowCreate((current) => !current)}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Plus className="h-4 w-4" />
                Nuevo presupuesto
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6">
          <KPIBlock label="Ingresos del periodo" value={format.format(convert(totalIncome))} tone="text-cyan-300" />
          <KPIBlock label="Total presupuestado" value={format.format(convert(totalBudgeted))} tone="text-indigo-300" />
          <KPIBlock label="Gasto real" value={format.format(convert(totalSpent))} tone="text-rose-300" />
          <KPIBlock label="Margen disponible" value={format.format(convert(availableMargin))} tone={availableMargin >= 0 ? "text-emerald-300" : "text-rose-300"} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-12">
        <div className="glass-panel p-5 md:p-6 xl:col-span-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mini dashboard</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Ingresos vs presupuestos vs gasto</h2>
            </div>
            <span className={`rounded-lg border px-3 py-1 text-xs font-semibold ${heroStatus.badge}`}>
              Uso total: {Math.round(usagePercent)}%
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {dashboardBars.map((bar) => {
              const height = Math.max(18, Math.round((bar.amount / chartMax) * 100));

              return (
                <div key={bar.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-400">{bar.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{format.format(convert(bar.amount))}</p>
                  <div className="mt-4 flex h-28 items-end rounded-lg bg-slate-900/70 p-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className={`w-full rounded-md bg-gradient-to-t ${bar.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-slate-400">Carga de presupuesto sobre ingresos</p>
              <p className="mt-2 text-2xl font-bold text-white">{Math.round(budgetVsIncome)}%</p>
              <p className="mt-1 text-xs text-slate-300">Objetivo recomendado: menos de 85%</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-slate-400">Semaforo financiero</p>
              <p className="mt-2 text-2xl font-bold text-white">{heroStatus.icon} {heroStatus.label}</p>
              <p className="mt-1 text-xs text-slate-300">Basado en uso del presupuesto acumulado.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 xl:col-span-4">
          <section className="glass-panel p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Creacion</p>
                <h2 className="mt-2 text-lg font-semibold text-white">Nuevo presupuesto</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCreate((current) => !current)}
                className="rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-200"
              >
                {showCreate ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {showCreate ? (
              <form className="space-y-3" onSubmit={handleCreateBudget}>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nombre del presupuesto"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/60"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="1"
                    value={limit}
                    onChange={(event) => setLimit(event.target.value)}
                    placeholder="Monto limite"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/60"
                  />
                  <select
                    value={frequency}
                    onChange={(event) => setFrequency(event.target.value as BudgetFrequency)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/60"
                  >
                    {Object.entries(FREQUENCY_LABEL).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/60"
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select
                    value={budgetType}
                    onChange={(event) => setBudgetType(event.target.value as BudgetKind)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/60"
                  >
                    {Object.entries(BUDGET_TYPE_LABEL).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100">
                  Equivalente mensual estimado: {format.format(convert(monthlyEquivalent || 0))}
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  <Plus className="h-4 w-4" />
                  Crear presupuesto
                </button>
              </form>
            ) : (
              <p className="text-sm text-slate-300">
                Abre el formulario para crear presupuestos por categoria y controlar gastos en tiempo real.
              </p>
            )}
          </section>

          <section className="glass-panel p-5 md:p-6">
            <div className="flex items-center gap-2 text-slate-100">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-semibold">Alertas dinamicas</h3>
            </div>
            <div className="mt-3 space-y-2">
              {dynamicAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-lg border px-3 py-2 text-xs ${STATUS_UI[alert.type].badge}`}
                >
                  {alert.label}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="glass-panel p-5 md:p-6">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Lista de presupuestos</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Control por categoria</h2>
          </div>
          <p className="text-xs text-slate-400">Ordenados por riesgo para priorizar accion.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedBudgets.map((budget) => {
            const statusView = STATUS_UI[budget.status];
            const safeUsage = Math.max(0, budget.usage);
            const progressWidth = Math.min(100, safeUsage);
            const overflow = safeUsage > 100 ? safeUsage - 100 : 0;

            return (
              <motion.article
                key={budget.id}
                whileHover={{ y: -4 }}
                className={`group rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition ${statusView.ring}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{budget.name}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {budget.category || "Sin categoria"} · {FREQUENCY_LABEL[budget.frequency]} · {BUDGET_TYPE_LABEL[budget.budgetType]}
                    </p>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${statusView.badge}`}>
                    {statusView.label}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-slate-400">Limite</p>
                    <p className="mt-1 font-semibold text-white">{format.format(convert(budget.limit))}</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-slate-400">Gastado</p>
                    <p className="mt-1 font-semibold text-white">{format.format(convert(budget.spent))}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Progreso</span>
                    <span className="font-semibold text-white">{Math.round(safeUsage)}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressWidth}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-2 rounded-full bg-gradient-to-r ${statusView.bar}`}
                    />
                  </div>

                  {overflow > 0 && (
                    <p className="mt-2 text-xs font-semibold text-rose-300">
                      Exceso: {Math.round(overflow)}% por encima del limite.
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="glass-panel p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyan-300" />
          <h2 className="text-xl font-semibold text-white">Inteligencia ZAI</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {insights.map((insight, index) => (
            <div key={`${insight}-${index}`} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Sugerencia {index + 1}</p>
              <p className="mt-2 text-sm text-slate-100">{insight}</p>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Aplicar ajuste
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300">
          <div className="flex flex-wrap items-center gap-2">
            {globalStatus === "good" ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Tus gastos estan alineados con tus ingresos.
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-amber-300" />
                Riesgo detectado: ajusta categorias variables para proteger tu margen.
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function KPIBlock({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-bold tabular-nums ${tone}`}>{value}</p>
    </div>
  );
}
