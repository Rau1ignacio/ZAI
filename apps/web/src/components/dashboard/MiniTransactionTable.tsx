import { motion } from "framer-motion";
import { format as formatDate } from "date-fns";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  status: "pending" | "confirmed";
}

interface MiniTransactionTableProps {
  transactions: Transaction[];
  maxRows?: number;
  format: (value: number) => string;
}

const categoryIcons: Record<string, string> = {
  groceries: "🛒",
  entertainment: "🎬",
  transport: "🚗",
  utilities: "⚡",
  salary: "💼",
  investment: "📈",
  dining: "🍽️",
  shopping: "🛍️",
  default: "💸",
};

export default function MiniTransactionTable({
  transactions,
  maxRows = 5,
  format,
}: MiniTransactionTableProps) {
  const displayTransactions = transactions.slice(0, maxRows);
  const hasMore = transactions.length > maxRows;

  return (
    <div className="space-y-3">
      {displayTransactions.map((tx, idx) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ x: 4 }}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="text-lg flex-shrink-0">
              {categoryIcons[tx.category.toLowerCase()] || categoryIcons.default}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-50 truncate">{tx.name}</p>
              <p className="text-xs text-slate-400">
                {tx.category} · {tx.date}
              </p>
            </div>
          </div>

          <div className="text-right ml-2 flex-shrink-0">
            <p
              className={`text-sm font-semibold font-mono ${
                tx.amount >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {tx.amount >= 0 ? "+" : ""}{format(tx.amount)}
            </p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                tx.status === "pending"
                  ? "bg-amber-500/10 text-amber-400"
                  : "bg-emerald-500/10 text-emerald-400"
              }`}
            >
              {tx.status === "pending" ? "Pendiente" : "Confirmado"}
            </span>
          </div>
        </motion.div>
      ))}

      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-2"
        >
          <p className="text-xs text-slate-500">
            +{transactions.length - maxRows} transacciones más
          </p>
        </motion.div>
      )}
    </div>
  );
}
