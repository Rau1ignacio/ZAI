import { motion } from "framer-motion";

interface TransactionsHeaderProps {
  title?: string;
  description?: string;
}

export default function TransactionsHeader({
  title = "Movimientos recientes",
  description = "Filtra por categoría, detecta gastos anomales y exporta tu historial cuando lo necesites.",
}: TransactionsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
            📋 Historial Completo
          </p>
          <h1 className="text-4xl font-bold text-slate-50 mb-3">{title}</h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {description}
          </p>

          {/* Quick Help Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20"
          >
            <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
            <p className="text-xs text-slate-300">
              Usa los filtros para encontrar cualquier transacción en segundos. 
              Haz click en cualquier fila para ver más detalles.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
