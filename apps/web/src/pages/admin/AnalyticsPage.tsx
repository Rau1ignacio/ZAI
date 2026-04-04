import { useMemo } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight, BarChart3, Gauge, Sparkles } from "lucide-react";
import { adminAnalytics, adminMetrics } from "../../data/siteContent";

function trendToNumber(trend: string): number {
  if (trend.includes("down") || trend.includes("-")) return -4;
  if (trend.includes("up") || trend.includes("+")) return 8;
  return 3;
}

export default function AnalyticsPage() {
  const featureRows = useMemo(() => {
    return adminAnalytics.map((row, index) => {
      const base = 35 + index * 12;
      const score = Math.min(98, Math.max(22, base + trendToNumber(row.trend)));
      return { ...row, score };
    });
  }, []);

  const topFeature = featureRows[0];
  const avgAdoption = Math.round(
    featureRows.reduce((sum, row) => sum + row.score, 0) / (featureRows.length || 1)
  );

  return (
    <div className="space-y-6">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-500/5 to-emerald-500/10 p-6">
          <p className="section-title">Analytics Admin</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Adopcion y uso de funcionalidades</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Evalua engagement por modulo para decidir roadmap, activaciones y mejoras de producto.
          </p>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
          <AnalyticsKPI
            label="Feature lider"
            value={topFeature?.feature ?? "Dashboard"}
            helper={topFeature?.usage ?? "Sin datos"}
            icon={<Sparkles className="h-4 w-4" />}
          />
          <AnalyticsKPI
            label="Adopcion promedio"
            value={`${avgAdoption}%`}
            helper="Usuarios activos por feature"
            icon={<Gauge className="h-4 w-4" />}
          />
          <AnalyticsKPI
            label="MRR signal"
            value={adminMetrics.find((item) => item.label === "MRR")?.value ?? "$0"}
            helper="Relacion con uso premium"
            icon={<BarChart3 className="h-4 w-4" />}
          />
        </div>
      </section>

      <section className="glass-panel p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Performance por feature</h2>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Exportar reporte
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {featureRows.map((row) => (
            <article key={row.feature} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{row.feature}</p>
                  <p className="text-xs text-slate-400">{row.usage}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                    row.score >= 70
                      ? "bg-emerald-500/15 text-emerald-200"
                      : row.score >= 50
                      ? "bg-amber-500/15 text-amber-200"
                      : "bg-rose-500/15 text-rose-200"
                  }`}
                >
                  {row.score}%
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/10">
                <div
                  className={`h-2 rounded-full ${
                    row.score >= 70
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                      : row.score >= 50
                      ? "bg-gradient-to-r from-amber-400 to-amber-500"
                      : "bg-gradient-to-r from-rose-400 to-rose-500"
                  }`}
                  style={{ width: `${row.score}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">Tendencia reportada: {row.trend}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function AnalyticsKPI({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{label}</p>
        <span className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-200">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{helper}</p>
    </article>
  );
}


