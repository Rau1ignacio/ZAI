import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Search, ShieldCheck, UserCheck, UserX, Users } from "lucide-react";
import { adminUsers } from "../../data/siteContent";

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "activo" | "bloqueado">("all");

  const filteredUsers = useMemo(() => {
    return adminUsers.filter((user) => {
      const status = user.status.toLowerCase();
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "activo" && status === "activo") ||
        (statusFilter === "bloqueado" && status !== "activo");

      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.plan.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  const activeCount = adminUsers.filter((user) => user.status.toLowerCase() === "activo").length;
  const blockedCount = adminUsers.length - activeCount;
  const premiumCount = adminUsers.filter((user) => user.plan.toLowerCase() === "premium").length;

  return (
    <div className="space-y-6">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-500/5 to-emerald-500/10 p-6">
          <p className="section-title">Gestion de usuarios</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Operaciones de cuentas y acceso</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Supervisa estado de usuarios, actividad y elegibilidad premium desde una sola vista.
          </p>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
          <StatCard label="Total" value={`${adminUsers.length}`} icon={<Users className="h-4 w-4" />} />
          <StatCard label="Activos" value={`${activeCount}`} icon={<UserCheck className="h-4 w-4" />} positive />
          <StatCard label="Bloqueados" value={`${blockedCount}`} icon={<UserX className="h-4 w-4" />} warning />
        </div>
      </section>

      <section className="glass-panel p-5 md:p-6">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, email o plan"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60"
            />
          </div>

          <div className="flex gap-2">
            {([
              ["all", "Todos"],
              ["activo", "Activos"],
              ["bloqueado", "Bloqueados"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  statusFilter === value
                    ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredUsers.map((user) => {
            const isActive = user.status.toLowerCase() === "activo";
            const isPremium = user.plan.toLowerCase() === "premium";

            return (
              <article
                key={user.email}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`rounded-full px-2 py-1 font-semibold ${
                        isPremium ? "bg-cyan-500/15 text-cyan-100" : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {user.plan}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 font-semibold ${
                        isActive ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200"
                      }`}
                    >
                      {user.status}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-slate-300">{user.lastLogin}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300">
          <p className="flex items-center gap-2 font-medium text-slate-100">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Indicador operativo
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {premiumCount} usuarios premium activos para seguimiento de soporte prioritario.
          </p>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  positive = false,
  warning = false,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  positive?: boolean;
  warning?: boolean;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{label}</p>
        <span
          className={`rounded-lg p-1.5 ${
            warning
              ? "bg-rose-500/15 text-rose-200"
              : positive
              ? "bg-emerald-500/15 text-emerald-200"
              : "bg-cyan-500/10 text-cyan-200"
          }`}
        >
          {icon}
        </span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </article>
  );
}


