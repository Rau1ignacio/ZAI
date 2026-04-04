import type { ReactNode } from "react";
import { CreditCard, DollarSign, ShieldCheck, Users } from "lucide-react";
import { adminSubscriptions } from "../../data/siteContent";

function monthlyMRREstimate(plan: string): number {
  if (plan.toLowerCase() === "premium") return 14;
  return 0;
}

export default function SubscriptionsPage() {
  const premiumCount = adminSubscriptions.filter((item) => item.plan.toLowerCase() === "premium").length;
  const monthlyEstimate = adminSubscriptions.reduce(
    (sum, item) => sum + monthlyMRREstimate(item.plan),
    0
  );

  return (
    <div className="space-y-6">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-500/5 to-emerald-500/10 p-6">
          <p className="section-title">Pagos y Suscripciones</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Monetizacion y estado de facturacion</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Visualiza cuentas premium, ciclo de cobro y riesgos de churn para acciones comerciales.
          </p>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
          <SubKpi label="Suscripciones" value={`${adminSubscriptions.length}`} icon={<Users className="h-4 w-4" />} />
          <SubKpi label="Premium" value={`${premiumCount}`} icon={<CreditCard className="h-4 w-4" />} />
          <SubKpi label="MRR estimado" value={`$${monthlyEstimate}`} icon={<DollarSign className="h-4 w-4" />} />
        </div>
      </section>

      <section className="space-y-3">
        {adminSubscriptions.map((subscription) => {
          const isPremium = subscription.plan.toLowerCase() === "premium";
          const atRisk = subscription.status.toLowerCase().includes("pendiente");

          return (
            <article key={subscription.user} className="glass-panel p-5 transition hover:border-cyan-400/30">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{subscription.user}</p>
                  <p className="mt-1 text-sm text-slate-300">Facturacion: {subscription.billing}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`rounded-full px-2 py-1 font-semibold ${
                      isPremium ? "bg-cyan-500/15 text-cyan-100" : "bg-slate-500/20 text-slate-300"
                    }`}
                  >
                    {subscription.plan}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 font-semibold ${
                      atRisk ? "bg-amber-500/15 text-amber-200" : "bg-emerald-500/15 text-emerald-200"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  Gestionar cobro
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Ver historial
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="glass-panel p-4 text-sm text-slate-300">
        <p className="flex items-center gap-2 font-medium text-slate-100">
          <ShieldCheck className="h-4 w-4 text-cyan-300" />
          Alerta comercial
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Detecta cuentas con estado pendiente para activar retencion antes de expiracion.
        </p>
      </section>
    </div>
  );
}

function SubKpi({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
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



