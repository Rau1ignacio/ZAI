// la ruta de esta pagina es wwww.zai.com/app/dashboard

import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ShieldCheck,
  Sparkles,
  Edit2,
  Save,
  X,
  Dashboard,
  ArrowDownUp,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDashboardData } from "../../hooks/useBI";
import { useCurrency } from "../../hooks/useCurrency";
import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";
import KPICard from "../../components/dashboard/KPICard";
import SortableWidget from "../../components/dashboard/SortableWidget";
import MiniTransactionTable from "../../components/dashboard/MiniTransactionTable";
import AddWidgetModal from "../../components/dashboard/AddWidgetModal";
import { DashboardWidgetId } from "../../types/dashboard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DEFAULT_WIDGETS: DashboardWidgetId[] = ["cashflow", "spending", "netWorth"];
const STORAGE_KEY = "zai-dashboard-layout";

export default function DashboardPage() {
  const { convert, format, updatedAt, isLoading: currencyLoading } = useCurrency();
  const { accounts, transactions, budgets, goals, debts, investments } = useMergedFinanceData();
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

  // States
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<DashboardWidgetId[]>(DEFAULT_WIDGETS);
  const [showAddModal, setShowAddModal] = useState(false);

  // DND Kit Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = selectedWidgets.indexOf(active.id as DashboardWidgetId);
      const newIndex = selectedWidgets.indexOf(over.id as DashboardWidgetId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newWidgets = arrayMove(selectedWidgets, oldIndex, newIndex);
        setSelectedWidgets(newWidgets);
        // Auto-save when dragging
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newWidgets));
      }
    }
  };

  // Load saved layout
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSelectedWidgets(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading dashboard layout:", e);
      }
    }
  }, []);

  // Save layout
  const saveLayout = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedWidgets));
    setIsEditing(false);
  };

  const addWidget = (widgetId: DashboardWidgetId) => {
    if (!selectedWidgets.includes(widgetId)) {
      setSelectedWidgets((prev) => [...prev, widgetId]);
      setShowAddModal(false);
    }
  };

  const removeWidget = (index: number) => {
    setSelectedWidgets((prev) => prev.filter((_, i) => i !== index));
  };

  const moveWidget = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= selectedWidgets.length) return;

    const widgets = [...selectedWidgets];
    [widgets[index], widgets[newIndex]] = [widgets[newIndex], widgets[index]];
    setSelectedWidgets(widgets);
  };

  const renderWidgetContent = (widgetId: DashboardWidgetId) => {
    if (isLoading) {
      return <Skeleton count={3} height={20} />;
    }

    switch (widgetId) {
      case "cashflow":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Flujo neto últimos 30 días</p>
            <p
              className={`text-3xl font-bold ${
                cashFlow.netFlow >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {format.format(convert(cashFlow.netFlow))}
            </p>
            <div className="grid gap-2 grid-cols-2">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400">Ingresos</p>
                <p className="text-lg font-bold text-emerald-400">
                  {format.format(convert(cashFlow.totalIncome))}
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400">Gastos</p>
                <p className="text-lg font-bold text-rose-400">
                  {format.format(convert(cashFlow.totalExpenses))}
                </p>
              </div>
            </div>
          </div>
        );

      case "spending":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Top categorías de gasto</p>
            <div className="space-y-2">
              {spending.top5Categories.slice(0, 5).map((item) => (
                <motion.div
                  key={item.category}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 truncate">{item.category}</span>
                    <span className="text-slate-400 font-semibold">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, item.percentage)}%` }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "netWorth":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Patrimonio neto (Activos - Pasivos)</p>
            <p className="text-3xl font-bold text-slate-50">
              {format.format(convert(netWorth))}
            </p>
            <div className="grid gap-2 grid-cols-2 text-xs">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-slate-400">Activos</p>
                <p className="font-bold text-emerald-400 mt-1">
                  {format.format(
                    convert(accounts.reduce((sum, acc) => sum + acc.balance, 0))
                  )}
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-slate-400">Pasivos</p>
                <p className="font-bold text-rose-400 mt-1">
                  {format.format(convert(debts.reduce((sum, d) => sum + d.principal, 0)))}
                </p>
              </div>
            </div>
          </div>
        );

      case "forecast":
        return (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Proyecciones financieras</p>
            <div className="space-y-2">
              {forecast.projections.slice(0, 3).map((proj) => (
                <div key={`${proj.scenario}-${proj.period}`} className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-300">{proj.scenario}</span>
                    <span className="text-cyan-400">+{proj.confidence}% confianza</span>
                  </div>
                  <p className="text-lg font-bold text-slate-50">
                    {format.format(convert(proj.projectedBalance))}
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
              {investments.slice(0, 3).map((inv) => {
                const gain = inv.currentValue - inv.initialValue;
                const gainPercent = ((gain / inv.initialValue) * 100).toFixed(1);
                return (
                  <div key={inv.id} className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">{inv.name}</p>
                    <div className="flex justify-between items-end mt-2">
                      <p className="text-lg font-bold text-slate-50">
                        {format.format(convert(inv.currentValue))}
                      </p>
                      <p
                        className={`text-sm font-bold ${
                          parseFloat(gainPercent) >= 0
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {parseFloat(gainPercent) >= 0 ? "+" : ""}{gainPercent}%
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
    <div className="w-full">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 mb-8"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Dashboard
              </p>
              <h1 className="text-3xl font-bold text-slate-50 mt-1">Control Total</h1>
            </div>

            <div className="flex items-center gap-3">
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => saveLayout()}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-emerald-600 transition"
                >
                  <Save className="w-4 h-4" />
                  Guardar
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${
                  isEditing
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-emerald-500/50"
                }`}
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? "Cancelar" : "Editar"}
              </motion.button>
            </div>
          </div>

          {isEditing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-slate-400 mt-4 bg-slate-800/50 border border-slate-700 rounded-lg p-3 inline-block"
            >
              💡 Modo edición: Arrastra widgets para reordenar, haz click en ✕ para eliminar
            </motion.p>
          )}
        </div>
      </motion.header>

      {/* KPI Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            label="Balance Total"
            value={format.format(convert(netWorth))}
            trend="up"
            delta="+12.5% vs mes pasado"
            icon="💰"
            color="emerald"
          />
          <KPICard
            label="Ingresos Este Mes"
            value={format.format(convert(cashFlow.totalIncome))}
            trend="up"
            delta="+8.2% vs mes pasado"
            icon="📈"
            color="cyan"
          />
          <KPICard
            label="Score Financiero"
            value={`${financialScore}/100`}
            trend="up"
            delta="Excelente"
            icon="🎯"
            color="amber"
          />
        </div>
      </section>

      {/* Widgets Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={selectedWidgets} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              <AnimatePresence mode="popLayout">
                {selectedWidgets.map((widgetId, index) => {
                  const option = {
                    cashflow: { label: "Flujo de Caja", icon: "📊" },
                    spending: { label: "Gastos por Categoría", icon: "💰" },
                    netWorth: { label: "Patrimonio Neto", icon: "🏦" },
                    forecast: { label: "Predicciones", icon: "🔮" },
                    investments: { label: "Inversiones", icon: "📈" },
                  }[widgetId];

                  return (
                    <SortableWidget
                      key={`${widgetId}-${index}`}
                      id={widgetId}
                      title={option?.label || "Widget"}
                      icon={option?.icon || "📊"}
                      isEditing={isEditing}
                      isLoading={isLoading}
                      onDelete={() => removeWidget(index)}
                      index={index}
                    >
                      {renderWidgetContent(widgetId)}
                    </SortableWidget>
                  );
                })}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>

        {/* Add Widget Button */}
        {isEditing && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowAddModal(true)}
            className="mt-8 w-full p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/50 transition text-center group"
          >
            <Plus className="w-8 h-8 text-slate-400 group-hover:text-emerald-400 mx-auto mb-2 transition" />
            <p className="text-slate-400 group-hover:text-emerald-400 font-semibold transition">
              Agregar Widget
            </p>
          </motion.button>
        )}
      </section>

      {/* Latest Transactions */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-50 flex items-center gap-2">
              <ArrowDownUp className="w-5 h-5 text-emerald-400" />
              Últimas Transacciones
            </h2>
            <Link
              to="/app/transactions"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition"
            >
              Ver todo →
            </Link>
          </div>

          <MiniTransactionTable
            transactions={transactions}
            maxRows={8}
            format={(val) => format.format(convert(val))}
          />
        </motion.div>
      </section>

      {/* Add Widget Modal */}
      <AddWidgetModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addWidget}
        addedWidgets={selectedWidgets}
      />
    </div>
  );
}
