import { useMemo } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BadgeDollarSign,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  adminLogs,
  adminMetrics,
  adminSubscriptions,
  adminUsers,
} from "../../data/siteContent";

const KPI_ICONS = [Users, RefreshCw, BadgeDollarSign, Activity];

function metricTone(value: string): "good" | "warning" {
  if (value.includes("%") || value.includes("K")) return "good";
  return "warning";
}

export default function AdminDashboardPage() {
  const activeUsers = useMemo(
    () => adminUsers.filter((user) => user.status.toLowerCase() === "activo").length,
    []
  );

  const premiumSubscriptions = useMemo(
    () =>
      adminSubscriptions.filter((subscription) =>
        subscription.plan.toLowerCase().includes("premium")
      ).length,
    []
  );

  const criticalLogs = useMemo(
    () => adminLogs.filter((log) => log.level.toLowerCase() === "error").length,
    []
  );

  return (
    <div className="space-y-6">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-500/5 to-rose-500/10 p-6">
          <p className="section-title">Backoffice</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Centro de control operativo</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Supervisa crecimiento, estabilidad y monetizacion de ZAI en una sola vista.
          </p>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4 md:p-6">
          {adminMetrics.map((metric, index) => {
            const Icon = KPI_ICONS[index] ?? Activity;
            const tone = metricTone(metric.value);

            return (
              <article key={metric.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{metric.label}</p>
                  <span className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-200">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold text-white">{metric.value}</p>
                <p
                  className={`mt-1 text-xs font-semibold ${
                    tone === "good" ? "text-emerald-300" : "text-amber-300"
                  }`}
                >
                  {metric.trend}
                </p>
                <p className="mt-2 text-xs text-slate-400">{metric.helper}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-12">
        <div className="glass-panel p-5 md:p-6 xl:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Salud del sistema</h2>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              Estable
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <SystemCard
              label="Usuarios activos"
              value={`${activeUsers}/${adminUsers.length}`}
              helper="Cuentas con sesion reciente"
              icon={<Users className="h-4 w-4" />}
            />
            <SystemCard
              label="Premium"
              value={`${premiumSubscriptions}/${adminSubscriptions.length}`}
              helper="Suscripciones de alto valor"
              icon={<BadgeDollarSign className="h-4 w-4" />}
            />
            <SystemCard
              label="Errores criticos"
              value={`${criticalLogs}`}
              helper="Logs nivel error"
              icon={<AlertTriangle className="h-4 w-4" />}
              warning={criticalLogs > 0}
            />
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Accion recomendada</p>
            <p className="mt-2 text-sm text-slate-100">
              Prioriza el monitoreo de webhooks de pagos y activa una alerta automatica para errores 5xx.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Ver detalle operativo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="glass-panel p-5 md:p-6 xl:col-span-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            <h2 className="text-lg font-semibold text-white">Actividad reciente</h2>
          </div>

          <div className="space-y-2">
            {adminLogs.slice(0, 4).map((log) => {
              const level = log.level.toLowerCase();
              const toneClass =
                level === "error"
                  ? "border-rose-400/30 bg-rose-500/10 text-rose-100"
                  : level === "warning"
                  ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
                  : "border-white/10 bg-white/5 text-slate-200";

              return (
                <div key={`${log.time}-${log.message}`} className={`rounded-lg border px-3 py-2 text-xs ${toneClass}`}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-semibold uppercase">{log.level}</span>
                    <span className="text-[11px] opacity-75">{log.time}</span>
                  </div>
                  <p>{log.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function SystemCard({
  label,
  value,
  helper,
  icon,
  warning = false,
}: {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs text-slate-400">{label}</p>
        <span
          className={`rounded-lg p-1.5 ${
            warning ? "bg-amber-500/20 text-amber-200" : "bg-cyan-500/10 text-cyan-200"
          }`}
        >
          {icon}
        </span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{helper}</p>
    </div>
  );
}


