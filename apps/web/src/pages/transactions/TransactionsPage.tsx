// la ruta de esta pagina es wwww.zai.com/app/transactions

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { transactions as mockTransactions } from "../../data/mock";
import { useCurrency } from "../../hooks/useCurrency";
import { useTransactionFilter } from "../../hooks/useTransactionFilter";

import TransactionsHeader from "../../components/transactions/TransactionsHeader";
import TransactionsSummaryCards from "../../components/transactions/TransactionsSummaryCards";
import FilterBar from "../../components/transactions/FilterBar";
import TransactionList from "../../components/transactions/TransactionList";

export default function TransactionsPage() {
  const { convert, format } = useCurrency();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Use transaction filter hook
  const {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    dateRange,
    setDateRange,
    filteredTransactions,
    stats,
    incomeChange,
    expenseChange,
  } = useTransactionFilter({
    transactions: mockTransactions,
  });

  // Convert data for display
  const displayTransactions = useMemo(() => {
    return filteredTransactions.map((tx) => ({
      ...tx,
      amount: tx.amount,
    }));
  }, [filteredTransactions]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleDateRangeChange = (from: Date, to: Date) => {
    setDateRange({ from, to });
  };

  const handleTypeChange = (type: "all" | "income" | "expense") => {
    setSelectedType(type);
  };

  const handleShowAdvancedFilters = () => {
    setShowAdvancedFilters(true);
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedType !== "all") count++;
    // Add more as needed
    return count;
  }, [searchQuery, selectedType]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {/* Header */}
      <TransactionsHeader
        title="Movimientos recientes"
        description="Filtra por categoría, detecta gastos anomales y exporta tu historial cuando lo necesites."
      />

      {/* Summary Cards */}
      <TransactionsSummaryCards
        income={stats.income}
        expenses={stats.expenses}
        netFlow={stats.netFlow}
        incomeChange={incomeChange}
        expenseChange={expenseChange}
        format={format}
      />

      {/* Filter Bar (Sticky) */}
      <FilterBar
        onSearchChange={handleSearchChange}
        onDateRangeChange={handleDateRangeChange}
        onTypeChange={handleTypeChange}
        onShowAdvancedFilters={handleShowAdvancedFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-sm text-slate-400">
              Mostrando{" "}
              <span className="font-semibold text-slate-50">
                {displayTransactions.length}
              </span>{" "}
              transacciones
              {searchQuery && (
                <>
                  {" "}
                  para '<span className="text-emerald-400">{searchQuery}</span>'
                </>
              )}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                }}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition"
              >
                Limpiar filtros
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <TransactionList
            transactions={displayTransactions}
            format={format}
            groupByDate={true}
            isLoading={false}
            emptyMessage={
              displayTransactions.length === 0
                ? "No hay transacciones que coincidan con tus filtros"
                : "No hay transacciones"
            }
          />
        </motion.div>
      </div>

      {/* Advanced Filters Modal (Future) */}
      {showAdvancedFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAdvancedFilters(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-t-2xl md:rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-bold text-slate-50 mb-6">Filtros Avanzados</h2>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdvancedFilters(false)}
              className="w-full py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
            >
              Cerrar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
