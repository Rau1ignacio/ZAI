import { motion } from "framer-motion";
import TransactionRow from "./TransactionRow";

interface Transaction {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  amount: number;
  date: string;
  time?: string;
  status: "cleared" | "pending";
  paymentMethod?: string;
  location?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  format: (val: number) => string;
  groupByDate?: boolean;
  isLoading?: boolean;
  onDeleteTransaction?: (id: string) => void;
  emptyMessage?: string;
}

export default function TransactionList({
  transactions,
  format,
  groupByDate = true,
  isLoading = false,
  onDeleteTransaction,
  emptyMessage = "No hay transacciones para mostrar",
}: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="h-20 bg-slate-800/30 border border-slate-700/30 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-6"
      >
        <div className="text-5xl mb-4 opacity-20">📭</div>
        <h3 className="text-lg font-semibold text-slate-50 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-sm text-slate-400 text-center max-w-sm">
          Intenta ajustar tus filtros o verifica que haya transacciones disponibles
        </p>
      </motion.div>
    );
  }

  // Group by date label (Hoy, Ayer, etc.)
  const groupedMap = new Map<string, Transaction[]>();

  transactions.forEach((tx) => {
    // Extract date label (first part of the date string before comma)
    const dateLabel = tx.date.split(",")[0];
    if (!groupedMap.has(dateLabel)) {
      groupedMap.set(dateLabel, []);
    }
    groupedMap.get(dateLabel)!.push(tx);
  });

  // Order: Hoy, Ayer, then others
  const dateOrder = new Map([
    ["Hoy", 0],
    ["Ayer", 1],
  ]);

  const grouped = Array.from(groupedMap.entries()).sort((a, b) => {
    const orderA = dateOrder.get(a[0]) ?? 999;
    const orderB = dateOrder.get(b[0]) ?? 999;
    return orderA - orderB;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.05 }}
      className="space-y-6"
    >
      {grouped.map(([dateLabel, dateTransactions], groupIdx) => {
        // Calculate summary for this date group
        const income = dateTransactions
          .filter((tx) => tx.amount > 0)
          .reduce((sum, tx) => sum + tx.amount, 0);

        const expenses = Math.abs(
          dateTransactions
            .filter((tx) => tx.amount < 0)
            .reduce((sum, tx) => sum + tx.amount, 0)
        );

        return (
          <div key={dateLabel}>
            {/* Date Group Header */}
            <motion.div
              className="flex items-center justify-between mb-3 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: groupIdx * 0.05 }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {dateLabel} ({dateTransactions.length})
              </h3>

              {/* Day Summary */}
              <div className="flex items-center gap-3 text-xs">
                {income > 0 && (
                  <div className="text-slate-500">
                    <span className="text-emerald-400 font-semibold">
                      +{format(income)}
                    </span>
                  </div>
                )}
                {expenses > 0 && (
                  <div className="text-slate-500">
                    <span className="text-rose-400 font-semibold">
                      -{format(expenses)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Transactions for this date */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05, delay: groupIdx * 0.05 }}
            >
              {dateTransactions.map((tx, txIdx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: txIdx * 0.05 }}
                >
                  <TransactionRow
                    {...tx}
                    format={format}
                    onDelete={onDeleteTransaction}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
