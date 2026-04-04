import { motion } from "framer-motion";
import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
  color?: "emerald" | "cyan" | "rose" | "amber";
  onClick?: () => void;
}

const colorMap = {
  emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
  cyan: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 text-cyan-400",
  rose: "from-rose-500/10 to-rose-500/5 border-rose-500/20 text-rose-400",
  amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400",
};

const trendColors = {
  up: "text-emerald-400",
  down: "text-rose-400",
  neutral: "text-slate-400",
};

export default function KPICard({
  label,
  value,
  delta,
  trend,
  icon,
  color = "emerald",
  onClick,
}: KPICardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 text-left transition-all ${colorMap[color]}`}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {label}
          </p>
          {icon && <div className="text-2xl">{icon}</div>}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-slate-50"
        >
          {value}
        </motion.p>

        {delta && (
          <div className="flex items-center gap-1">
            {trend === "up" && <TrendingUp className={`w-4 h-4 ${trendColors[trend]}`} />}
            {trend === "down" && <TrendingDown className={`w-4 h-4 ${trendColors[trend]}`} />}
            <span className={`text-xs font-semibold ${trendColors[trend] || "text-slate-400"}`}>
              {delta}
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
