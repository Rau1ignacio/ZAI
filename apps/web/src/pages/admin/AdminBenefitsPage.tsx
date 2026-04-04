import type { ReactNode } from "react";
import { Gift, Rocket, Sparkles, Wallet } from "lucide-react";
import { adminPromotions } from "../../data/siteContent";

export default function AdminBenefitsPage() {
  const active = adminPromotions.filter((item) => item.status.toLowerCase() === "activo").length;

  return (
    <div className="space-y-6">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-500/5 to-emerald-500/10 p-6">
          <p className="section-title">Beneficios Admin</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Programas, promociones y afiliados</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Controla rendimiento de incentivos y alianzas para crecimiento y monetizacion.
          </p>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
          <BenefitKpi label="Campanas" value={`${adminPromotions.length}`} icon={<Gift className="h-4 w-4" />} />
          <BenefitKpi label="Activas" value={`${active}`} icon={<Rocket className="h-4 w-4" />} />
          <BenefitKpi label="Canales" value="2" icon={<Wallet className="h-4 w-4" />} />
        </div>
      </section>

      <section className="space-y-3">
        {adminPromotions.map((promotion) => {
          const isActive = promotion.status.toLowerCase() === "activo";

          return (
            <article key={promotion.title} className="glass-panel p-5 transition hover:border-cyan-400/30">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{promotion.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{promotion.reward}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-white/10 px-2 py-1 text-slate-300">{promotion.channel}</span>
                  <span
                    className={`rounded-full px-2 py-1 font-semibold ${
                      isActive ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"
                    }`}
                  >
                    {promotion.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  Editar campana
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Ver rendimiento
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="glass-panel p-4 text-sm text-slate-300">
        <p className="flex items-center gap-2 font-medium text-slate-100">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Recomendacion IA
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Prioriza beneficios en canales con mayor activacion para aumentar conversion premium.
        </p>
      </section>
    </div>
  );
}

function BenefitKpi({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
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



