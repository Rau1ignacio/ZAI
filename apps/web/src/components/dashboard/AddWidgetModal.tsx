import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { DashboardWidgetId, DASHBOARD_WIDGET_OPTIONS } from "../../types/dashboard";

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (widgetId: DashboardWidgetId) => void;
  addedWidgets: DashboardWidgetId[];
}

const widgetDescriptions: Record<DashboardWidgetId, { desc: string; icon: string }> = {
  cashflow: {
    desc: "Visualiza ingresos vs gastos en 30 días",
    icon: "📊",
  },
  spending: {
    desc: "Desglose de gastos por categoría",
    icon: "💰",
  },
  netWorth: {
    desc: "Balance total (activos - pasivos)",
    icon: "🏦",
  },
  forecast: {
    desc: "Proyecciones financieras impulsadas por IA",
    icon: "🔮",
  },
  investments: {
    desc: "Performance de tu portafolio",
    icon: "📈",
  },
};

export default function AddWidgetModal({
  isOpen,
  onClose,
  onAdd,
  addedWidgets,
}: AddWidgetModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-slate-50">Agregar Widget</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Elige gráficos para personalizar tu dashboard
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-slate-800 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid sm:grid-cols-2 gap-4">
                  {DASHBOARD_WIDGET_OPTIONS.map((option) => {
                    const isAdded = addedWidgets.includes(option.id);
                    const info = widgetDescriptions[option.id];

                    return (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onAdd(option.id);
                        }}
                        className={`p-4 rounded-xl border transition-all ${
                          isAdded
                            ? "border-emerald-500/30 bg-emerald-500/5 cursor-not-allowed opacity-50"
                            : "border-slate-700 bg-slate-900/50 hover:border-emerald-500/50 hover:bg-slate-900"
                        }`}
                        disabled={isAdded}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-2xl">{info.icon}</span>
                          {isAdded ? (
                            <span className="px-2 py-1 rounded text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                              Agregado
                            </span>
                          ) : (
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.div>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-slate-50 text-left">
                          {option.label}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 text-left">
                          {info.desc}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800 flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
                >
                  Cerrar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
