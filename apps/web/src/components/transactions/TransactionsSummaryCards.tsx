import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TransactionsSummaryCardsProps {
  income: number;
  expenses: number;
  netFlow: number;
  incomeChange: number;
  expenseChange: number;
  format: (val: number) => string;
}

export default function TransactionsSummaryCards({
  income,
  expenses,
  netFlow,
  incomeChange,
  expenseChange,
  format,
}: TransactionsSummaryCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Income Card */}
      <motion.div
        variants={itemVariants}
        className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/30 transition group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Ingresos
            </p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">
              {format(income)}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <p className="text-xs text-slate-300">
                <span className="text-emerald-400 font-semibold">
                  +{incomeChange.toFixed(1)}%
                </span>{" "}
                vs. mes pasado
              </p>
            </div>
          </div>
          <div className="text-4xl opacity-20 group-hover:opacity-30 transition">
            💰
          </div>
        </div>
      </motion.div>

      {/* Expenses Card */}
      <motion.div
        variants={itemVariants}
        className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-rose-500/30 transition group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Gastos
            </p>
            <p className="text-3xl font-bold text-rose-400 mt-2">
              {format(-expenses)}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              <p className="text-xs text-slate-300">
                <span className="text-rose-400 font-semibold">
                  {expenseChange.toFixed(1)}%
                </span>{" "}
                vs. mes pasado
              </p>
            </div>
          </div>
          <div className="text-4xl opacity-20 group-hover:opacity-30 transition">
            💸
          </div>
        </div>
      </motion.div>

      {/* Net Flow Card */}
      <motion.div
        variants={itemVariants}
        className={`bg-slate-900/50 border rounded-2xl p-6 transition group cursor-pointer ${
          netFlow >= 0
            ? "border-cyan-500/30 hover:border-cyan-500/50"
            : "border-amber-500/30 hover:border-amber-500/50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Flujo Neto
            </p>
            <p
              className={`text-3xl font-bold mt-2 ${
                netFlow >= 0 ? "text-cyan-400" : "text-amber-400"
              }`}
            >
              {format(netFlow)}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  netFlow >= 0 ? "bg-cyan-400" : "bg-amber-400"
                }`}
              />
              <p className="text-xs text-slate-300">
                {netFlow >= 0
                  ? `Ahorros: ${((netFlow / income) * 100).toFixed(0)}%`
                  : "Déficit"}
              </p>
            </div>
          </div>
          <div className="text-4xl opacity-20 group-hover:opacity-30 transition">
            📊
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
