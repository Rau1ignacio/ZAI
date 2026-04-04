import { useMemo, useState } from "react";
import { Search, ShieldCheck, Terminal } from "lucide-react";
import { adminLogs } from "../../data/siteContent";

type LogLevel = "all" | "info" | "warning" | "error";

export default function LogsPage() {
  const [level, setLevel] = useState<LogLevel>("all");
  const [query, setQuery] = useState("");

  const filteredLogs = useMemo(() => {
    return adminLogs.filter((log) => {
      const levelMatch = level === "all" || log.level.toLowerCase() === level;
      const queryMatch =
        query.trim().length === 0 ||
        log.message.toLowerCase().includes(query.toLowerCase()) ||
        log.time.toLowerCase().includes(query.toLowerCase());
      return levelMatch && queryMatch;
    });
  }, [level, query]);

  const stats = useMemo(() => {
    const info = adminLogs.filter((log) => log.level.toLowerCase() === "info").length;
    const warning = adminLogs.filter((log) => log.level.toLowerCase() === "warning").length;
    const error = adminLogs.filter((log) => log.level.toLowerCase() === "error").length;
    return { info, warning, error };
  }, []);

  return (
    <div className="space-y-6">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-500/5 to-rose-500/10 p-6">
          <p className="section-title">Observabilidad</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Logs y seguridad operativa</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Filtra eventos por severidad para responder incidentes, auditorias y anomalias de plataforma.
          </p>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
          <LogStat label="Info" value={stats.info} tone="info" />
          <LogStat label="Warning" value={stats.warning} tone="warning" />
          <LogStat label="Error" value={stats.error} tone="error" />
        </div>
      </section>

      <section className="glass-panel p-5 md:p-6">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por mensaje o timestamp"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["all", "info", "warning", "error"] as LogLevel[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLevel(option)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  level === option
                    ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              No hay resultados para el filtro aplicado.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const severity = log.level.toLowerCase();
              const toneClass =
                severity === "error"
                  ? "border-rose-400/30 bg-rose-500/10 text-rose-100"
                  : severity === "warning"
                  ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
                  : "border-white/10 bg-white/5 text-slate-200";

              return (
                <article key={`${log.time}-${log.message}`} className={`rounded-xl border px-4 py-3 ${toneClass}`}>
                  <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.1em]">
                    <span>{log.level}</span>
                    <span className="opacity-80">{log.time}</span>
                  </div>
                  <p className="text-sm">{log.message}</p>
                </article>
              );
            })
          )}
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/70 p-4">
          <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Auditoria
          </p>
          <p className="text-sm text-slate-200">
            La plataforma mantiene trazabilidad completa de eventos de seguridad y actividad critica para cumplimiento.
          </p>
        </div>
      </section>
    </div>
  );
}

function LogStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "info" | "warning" | "error";
}) {
  const className =
    tone === "error"
      ? "border-rose-400/30 bg-rose-500/10 text-rose-100"
      : tone === "warning"
      ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
      : "border-cyan-400/30 bg-cyan-500/10 text-cyan-100";

  return (
    <article className={`rounded-xl border p-4 ${className}`}>
      <p className="text-xs uppercase tracking-[0.15em]">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-1 flex items-center gap-1 text-xs opacity-90">
        <Terminal className="h-3.5 w-3.5" />
        Eventos en ventana reciente
      </p>
    </article>
  );
}
