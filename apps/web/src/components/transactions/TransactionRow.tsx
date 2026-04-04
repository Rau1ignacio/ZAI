import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Trash2, Edit2 } from "lucide-react";

interface TransactionRowProps {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  amount: number;
  date: string;
  time?: string;
  status: "pending" | "cleared";
  paymentMethod?: string;
  location?: string;
  format: (val: number) => string;
  categoryIcon?: string;
  onDelete?: (id: string) => void;
}

const categoryEmojis: Record<string, string> = {
  groceries: "🛒",
  groceries_supermarket: "🛒",
  groceries_market: "🛒",
  entertainment: "🎬",
  entertainment_movies: "🎬",
  entertainment_streaming: "📺",
  entertainment_games: "🎮",
  transport: "🚗",
  transport_uber: "🚖",
  transport_taxi: "🚕",
  transport_gas: "⛽",
  utilities: "⚡",
  utilities_electricity: "⚡",
  utilities_water: "💧",
  utilities_internet: "📡",
  dining: "🍽️",
  dining_restaurant: "🍽️",
  dining_coffee: "☕",
  shopping: "🛍️",
  shopping_clothes: "👕",
  shopping_electronics: "📱",
  salary: "💼",
  salary_income: "💼",
  salary_bonus: "🎁",
  transfer: "💳",
  transfer_bank: "🏦",
  transfer_person: "👤",
  default: "💸",
};

export default function TransactionRow({
  id,
  name,
  category,
  subcategory,
  amount,
  date,
  time,
  status,
  paymentMethod,
  location,
  format,
  onDelete,
}: TransactionRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpense = amount < 0;
  const isIncome = amount > 0;

  const categoryKey = `${category.toLowerCase()}_${subcategory?.toLowerCase().replace(/\s+/g, "_") || ""}`.replace(/__/g, "_").slice(0, -1);
  const emoji = categoryEmojis[categoryKey] || categoryEmojis[category.toLowerCase()] || categoryEmojis.default;

  const statusConfig = {
    cleared: {
      label: "✓ Confirmado",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
    },
    pending: {
      label: "⏳ Pendiente",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-300",
    },
  };

  const statusStyle = statusConfig[status];

  return (
    <>
      {/* Row */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer"
      >
        <motion.div
          whileHover={{ backgroundColor: "rgba(100, 116, 139, 0.1)" }}
          transition={{ duration: 0.15 }}
          className={`border rounded-xl transition-all ${
            isExpanded
              ? "border-emerald-500/30 bg-slate-800/30"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            {/* Left: Icon + Description */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {/* Category Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-xl bg-slate-800/50 groups flex-shrink-0 text-lg"
              >
                {emoji}
              </motion.div>

              {/* Description Block */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-50 truncate">{name}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {subcategory || category}
                  {paymentMethod && ` • ${paymentMethod}`}
                </p>
              </div>
            </div>

            {/* Right: Date + Amount + Status */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Date */}
              <div className="text-right hidden sm:block min-w-fit">
                <p className="text-sm text-slate-400">{date}</p>
                {time && <p className="text-xs text-slate-500">{time}</p>}
              </div>

              {/* Amount */}
              <div className="text-right min-w-fit">
                <p
                  className={`text-sm font-mono font-semibold ${
                    isExpense
                      ? "text-rose-400"
                      : isIncome
                      ? "text-emerald-400"
                      : "text-slate-50"
                  }`}
                >
                  {isExpense ? "-" : isIncome ? "+" : ""}
                  {format(Math.abs(amount))}
                </p>
              </div>

              {/* Status Badge */}
              <motion.div
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text} flex-shrink-0`}
              >
                {statusStyle.label}
              </motion.div>

              {/* Expand Icon */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-slate-500" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Expanded Detail View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="mx-1 mt-2 mb-4 p-6 rounded-xl bg-slate-800/20 border border-slate-700/30 space-y-4">
              {/* Detail Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {/* Full Name */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Nombre Completo
                  </p>
                  <p className="text-slate-50 mt-1">{name}</p>
                </div>

                {/* Category */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Categoría
                  </p>
                  <p className="text-slate-50 mt-1">
                    {category} {subcategory && `→ ${subcategory}`}
                  </p>
                </div>

                {/* Payment Method */}
                {paymentMethod && (
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Método de Pago
                    </p>
                    <p className="text-slate-50 mt-1">{paymentMethod}</p>
                  </div>
                )}

                {/* Amount */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Monto
                  </p>
                  <p
                    className={`text-lg font-mono font-bold mt-1 ${
                      isExpense
                        ? "text-rose-400"
                        : isIncome
                        ? "text-emerald-400"
                        : "text-slate-50"
                    }`}
                  >
                    {format(amount)}
                  </p>
                </div>

                {/* Date/Time */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Fecha y Hora
                  </p>
                  <p className="text-slate-50 mt-1">
                    {date} {time && `a las ${time}`}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Estado
                  </p>
                  <motion.div
                    className={`px-2 py-1 rounded-full border text-xs font-semibold inline-block mt-1 ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}
                  >
                    {statusStyle.label}
                  </motion.div>
                </div>

                {/* Location */}
                {location && (
                  <div className="md:col-span-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Ubicación
                    </p>
                    <p className="text-slate-50 mt-1">{location}</p>
                  </div>
                )}

                {/* Reference ID */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    ID Transacción
                  </p>
                  <p className="text-slate-50 mt-1 font-mono text-xs">#TXN-{id.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-start pt-4 border-t border-slate-700/30">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-emerald-500/30 hover:text-emerald-300 transition text-xs font-medium flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Editar
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition text-xs font-medium flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Duplicar
                </motion.button>

                {onDelete && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(id);
                    }}
                    className="ml-auto px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition text-xs font-medium flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
