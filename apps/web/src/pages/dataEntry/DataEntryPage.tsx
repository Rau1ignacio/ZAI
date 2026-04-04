import { useState } from "react";
import { useFinanceData } from "../../hooks/useFinanceData";
import TransactionForm from "../../components/forms/TransactionForm";
import BudgetForm from "../../components/forms/BudgetForm";
import GoalForm from "../../components/forms/GoalForm";
import { useCurrency } from "../../hooks/useCurrency";

export default function DataEntryPage() {
  const { format } = useCurrency();
  const { transactions, budgets, goals, addTransaction, addBudget, addGoal, deleteTransaction, deleteBudget, deleteGoal } =
    useFinanceData();

  const [activeTab, setActiveTab] = useState<"transactions" | "budgets" | "goals">("transactions");

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Centro de Datos</h1>
          <p className="text-slate-400">Administra tus ingresos, egresos, presupuestos y metas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms Column */}
          <div className="space-y-6">
            <TransactionForm onSubmit={addTransaction} />
            <BudgetForm onSubmit={addBudget} />
            <GoalForm onSubmit={addGoal} />
          </div>

          {/* Data Display Column */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-700">
              <button
                onClick={() => setActiveTab("transactions")}
                className={`pb-3 px-4 font-semibold transition ${
                  activeTab === "transactions"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Transacciones ({transactions.length})
              </button>
              <button
                onClick={() => setActiveTab("budgets")}
                className={`pb-3 px-4 font-semibold transition ${
                  activeTab === "budgets"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Presupuestos ({budgets.length})
              </button>
              <button
                onClick={() => setActiveTab("goals")}
                className={`pb-3 px-4 font-semibold transition ${
                  activeTab === "goals"
                    ? "text-emerald-400 border-b-2 border-emerald-400"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Metas ({goals.length})
              </button>
            </div>

            {/* Transacciones */}
            {activeTab === "transactions" && (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p>No hay transacciones aún</p>
                  </div>
                ) : (
                  transactions.map((tx) => (
                    <div key={tx.id} className="bg-slate-800/50 p-4 rounded border border-slate-700 flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-semibold">{tx.name}</p>
                        <p className="text-sm text-slate-400">
                          {tx.category} • {tx.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                          {tx.amount > 0 ? "+" : ""}{format(tx.amount)}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="ml-4 text-red-400 hover:text-red-300 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Presupuestos */}
            {activeTab === "budgets" && (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {budgets.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p>No hay presupuestos aún</p>
                  </div>
                ) : (
                  budgets.map((budget) => (
                    <div key={budget.id} className="bg-slate-800/50 p-4 rounded border border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{budget.name}</p>
                          <p className="text-sm text-slate-400">{budget.category}</p>
                        </div>
                        <button
                          onClick={() => deleteBudget(budget.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-slate-400">
                          {format(budget.spent)} / {format(budget.limit)}
                        </span>
                        <span className="text-slate-400">{budget.period === "monthly" ? "Mensual" : budget.period === "quarterly" ? "Trimestral" : "Anual"}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition ${
                            (budget.spent / budget.limit) * 100 > 80
                              ? "bg-red-500"
                              : (budget.spent / budget.limit) * 100 > 50
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${Math.min(((budget.spent / budget.limit) * 100), 100)}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Metas */}
            {activeTab === "goals" && (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {goals.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p>No hay metas aún</p>
                  </div>
                ) : (
                  goals.map((goal) => {
                    const progress = (goal.current / goal.target) * 100;
                    return (
                      <div key={goal.id} className="bg-slate-800/50 p-4 rounded border border-slate-700">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{goal.title}</p>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  goal.priority === "high"
                                    ? "bg-red-500/20 text-red-400"
                                    : goal.priority === "medium"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-blue-500/20 text-blue-400"
                                }`}
                              >
                                {goal.priority === "high"
                                  ? "Alta"
                                  : goal.priority === "medium"
                                    ? "Media"
                                    : "Baja"}
                              </span>
                            </div>
                            <p className="text-sm text-slate-400">{goal.category}</p>
                          </div>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="text-slate-400">
                            {format(goal.current)} / {format(goal.target)}
                          </span>
                          <span className="text-slate-400">ETA: {goal.eta}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-emerald-500 transition"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{Math.round(progress)}% completado</p>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
            <p className="text-slate-400 text-sm">Total Ingresos</p>
            <p className="text-2xl font-bold text-green-400">
              {format(transactions.filter((t) => t.amount > 0).reduce((a, b) => a + b.amount, 0))}
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
            <p className="text-slate-400 text-sm">Total Egresos</p>
            <p className="text-2xl font-bold text-red-400">
              {format(transactions.filter((t) => t.amount < 0).reduce((a, b) => a + b.amount, 0))}
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
            <p className="text-slate-400 text-sm">Balance</p>
            <p className="text-2xl font-bold text-blue-400">{format(transactions.reduce((a, b) => a + b.amount, 0))}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
            <p className="text-slate-400 text-sm">Progreso Metas</p>
            <p className="text-2xl font-bold text-emerald-400">
              {goals.length > 0 ? Math.round((goals.reduce((a, b) => a + b.current, 0) / goals.reduce((a, b) => a + b.target, 1)) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
