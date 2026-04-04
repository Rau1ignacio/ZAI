import { Link } from "react-router-dom";
import {
  comparisonFeatures,
  exclusiveBenefits,
  pricingPlans,
} from "../../data/siteContent";

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 space-y-3">
        <p className="section-title">Planes y precios</p>
        <h1 className="text-3xl font-semibold text-white">Freemium vs Premium</h1>
        <p className="text-slate-300">
          Escoge tu plan y desbloquea IA, score dinÃ¡mico y valor comercial del patrimonio
          segÃºn tu ritmo de crecimiento.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
              {plan.badge && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                  {plan.badge}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-white">{plan.price}</p>
            <p className="text-sm text-slate-300">{plan.description}</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>â€¢ {feature}</li>
              ))}
            </ul>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-xs font-semibold text-white"
            >
              Elegir plan
            </Link>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6">
        <p className="section-title">Beneficios exclusivos de Premium</p>
        <div className="grid gap-4 md:grid-cols-3">
          {exclusiveBenefits.map((benefit) => (
            <div key={benefit.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl">{benefit.icon}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{benefit.title}</h3>
              <p className="text-sm text-slate-300">{benefit.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6">
        <p className="section-title">Comparativa</p>
        <div className="mt-4 rounded-2xl border border-white/5 bg-slate-950/40 p-4">
          <div className="grid grid-cols-[2fr,0.6fr,0.6fr] text-xs uppercase tracking-[0.3em] text-slate-500">
            <span>CaracterÃ­stica</span>
            <span className="text-right">Freemium</span>
            <span className="text-right">Premium</span>
          </div>
          <div className="mt-3 space-y-3">
            {comparisonFeatures.map((comparison) => (
              <div
                key={comparison.feature}
                className="grid grid-cols-[2fr,0.6fr,0.6fr] text-sm text-slate-300"
              >
                <span>{comparison.feature}</span>
                <span className="text-right">{comparison.freemium ? "âœ”" : "â€”"}</span>
                <span className="text-right">{comparison.premium ? "âœ”" : "â€”"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

