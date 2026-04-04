import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, X, Calendar, Filter } from "lucide-react";
import { addDays, startOfMonth, endOfMonth, format as formatDate } from "date-fns";

interface FilterBarProps {
  onSearchChange: (query: string) => void;
  onDateRangeChange: (from: Date, to: Date) => void;
  onTypeChange: (type: "all" | "income" | "expense") => void;
  onShowAdvancedFilters: () => void;
  activeFiltersCount: number;
}

type DatePreset = "today" | "last7" | "last30" | "thisMonth" | "all";

export default function FilterBar({
  onSearchChange,
  onDateRangeChange,
  onTypeChange,
  onShowAdvancedFilters,
  activeFiltersCount,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all");
  const [datePreset, setDatePreset] = useState<DatePreset>("last30");

  // Handle search with debounce
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearchChange(value);
    },
    [onSearchChange]
  );

  // Handle type filter
  const handleTypeChange = (type: "all" | "income" | "expense") => {
    setSelectedType(type);
    onTypeChange(type);
  };

  // Handle date preset
  const handleDatePreset = (preset: DatePreset) => {
    setDatePreset(preset);
    const today = new Date();
    let from: Date;
    let to = today;

    switch (preset) {
      case "today":
        from = today;
        break;
      case "last7":
        from = addDays(today, -7);
        break;
      case "last30":
        from = addDays(today, -30);
        break;
      case "thisMonth":
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case "all":
        from = addDays(today, -365);
        break;
      default:
        from = addDays(today, -30);
    }

    onDateRangeChange(from, to);
  };

  const presets: Array<{ key: DatePreset; label: string }> = [
    { key: "today", label: "Hoy" },
    { key: "last7", label: "Últimos 7 días" },
    { key: "last30", label: "Últimos 30 días" },
    { key: "thisMonth", label: "Este mes" },
    { key: "all", label: "Todo" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky top-20 z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 mb-6"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
        {/* Row 1: Search + Type Filter */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* Search Box */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar transacciones..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-slate-50 placeholder-slate-500 hover:border-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  onSearchChange("");
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-slate-500 hover:text-slate-400" />
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 flex-shrink-0">
            {(["all", "income", "expense"] as const).map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeChange(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedType === type
                    ? type === "all"
                      ? "bg-slate-700 text-slate-50 border border-slate-600"
                      : type === "income"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600"
                }`}
              >
                {type === "all" ? "Todo" : type === "income" ? "Ingresos" : "Gastos"}
              </motion.button>
            ))}
          </div>

          {/* Advanced Filters Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShowAdvancedFilters}
            className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400 transition flex items-center gap-2 flex-shrink-0"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Row 2: Date Presets */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {presets.map((preset, idx) => (
            <motion.button
              key={preset.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDatePreset(preset.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition ${
                datePreset === preset.key
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-slate-800/30 text-slate-400 border border-slate-700/50 hover:border-slate-600"
              }`}
            >
              {preset.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
