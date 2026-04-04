import type { ReactNode } from "react";
import { Layers, Sparkles, Users } from "lucide-react";
import { adminCategories } from "../../data/siteContent";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-500/5 to-indigo-500/10 p-6">
          <p className="section-title">Categorias</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Taxonomia de gastos y asignacion</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Mantiene consistencia de clasificacion para dashboards, presupuestos y recomendaciones IA.
          </p>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
          <Kpi label="Categorias activas" value={`${adminCategories.length}`} icon={<Layers className="h-4 w-4" />} />
          <Kpi label="Cobertura equipos" value="3 squads" icon={<Users className="h-4 w-4" />} />
          <Kpi label="Calidad taxonomia" value="Alta" icon={<Sparkles className="h-4 w-4" />} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminCategories.map((category) => (
          <article
            key={category.name}
            className="glass-panel p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/30"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{category.name}</h2>
              <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-[11px] font-semibold text-cyan-100">
                Activa
              </span>
            </div>

            <p className="text-sm text-slate-300">{category.usage}</p>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.1em] text-slate-500">Equipos asignados</p>
              <p className="mt-1 text-sm text-slate-200">{category.assignedTeams}</p>
            </div>

            <div className="mt-3 flex gap-2 text-xs">
              <button
                type="button"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
              >
                Editar
              </button>
              <button
                type="button"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                Ver reglas
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function Kpi({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{label}</p>
        <span className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-200">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </article>
  );
}



