import { Link } from "react-router-dom";
import { kpis } from "../../data/mock";
import {
  comparisonFeatures,
  exclusiveBenefits,
  marketingBenefits,
  marketingSteps,
  marketingTestimonials,
  pricingPlans,
} from "../../data/siteContent";

const problemStatements = [
  "El flujo se ve bien en teorÃ­a, pero el dÃ­a a dÃ­a se sale del presupuesto.",
  "No sabes quÃ© deuda atacar primero ni cuÃ¡nto te cuesta realmente cada crÃ©dito.",
  "La educaciÃ³n financiera llega tarde o es demasiado tÃ©cnica para tu rutina.",
];

const solutionStatements = [
  "IA que detecta y te sugiere recortar gastos inmediatamente.",
  "Score dinÃ¡mico y simuladores que te preparan para renegociar deudas.",
  "Comparte dashboards, planifica metas y aprende con contenidos dinÃ¡micos.",
];

export default function MarketingHomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="glass-panel p-8 space-y-6">
          <p className="uppercase text-xs tracking-[0.4em] text-slate-400">ZAI</p>
          <h1 className="text-4xl font-semibold text-white">
            Controla tu dinero. Crece con claridad.
          </h1>
          <p className="text-slate-300">
            ZAI combina IA, datos y educaciÃ³n financiera para darte recomendaciones
            proactivas, paneles de flujo y planes de acciÃ³n sin ruido.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/onboarding"
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              RegÃ­strate
            </Link>
            <Link
              to="/pages"
              className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/80"
            >
              Explorar pÃ¡ginas
            </Link>
          </div>
        </div>
        <div className="glass-panel p-6 space-y-6">
          <p className="section-title">Dashboards preview</p>
          <div className="space-y-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">{kpi.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">${kpi.value.toLocaleString()}</p>
                <p
                  className={`text-xs ${
                    kpi.delta?.startsWith("+") ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {kpi.delta}
                </p>
                <p className="text-[11px] text-slate-500">{kpi.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6 space-y-4">
          <p className="section-title">Problema</p>
          <div className="space-y-2 text-sm text-slate-300">
            {problemStatements.map((statement) => (
              <p key={statement}>â€¢ {statement}</p>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6 space-y-4">
          <p className="section-title">SoluciÃ³n ZAI</p>
          <div className="space-y-2 text-sm text-slate-300">
            {solutionStatements.map((statement) => (
              <p key={statement}>â€¢ {statement}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="section-title">Beneficios principales</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {marketingBenefits.map((benefit) => (
            <div key={benefit.title} className="glass-panel p-5">
              <p className="text-2xl">{benefit.icon}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{benefit.title}</h3>
              <p className="text-sm text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <p className="section-title">CÃ³mo funciona</p>
        <div className="grid gap-4 md:grid-cols-3">
          {marketingSteps.map((step) => (
            <div key={step.title} className="glass-panel p-5">
              <p className="text-xs text-slate-500">{step.title}</p>
              <p className="mt-2 text-sm text-slate-300">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <p className="section-title">Testimonios y social proof</p>
        <div className="grid gap-4 md:grid-cols-3">
          {marketingTestimonials.map((testimonial) => (
            <div key={testimonial.author} className="glass-panel p-6 space-y-3">
              <p className="text-sm text-slate-200">â€œ{testimonial.quote}â€</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {testimonial.label}
              </p>
              <p className="text-sm font-semibold text-white">{testimonial.author}</p>
              <p className="text-xs text-slate-400">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <p className="section-title">Planes y precios</p>
        <div className="grid gap-4 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-panel p-6 ${plan.accent ? `bg-gradient-to-br ${plan.accent}` : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                {plan.badge && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-3xl font-bold">{plan.price}</p>
              <p className="mt-1 text-sm text-slate-200">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>â€¢ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="glass-panel p-6">
          <p className="section-title">Comparativa Freemium vs Premium</p>
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
      </section>

      <section className="space-y-6">
        <p className="section-title">Bonus: Diferencial brutal</p>
        <div className="grid gap-4 md:grid-cols-3">
          {exclusiveBenefits.map((benefit) => (
            <div key={benefit.title} className="glass-panel p-5">
              <p className="text-2xl">{benefit.icon}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{benefit.title}</h3>
              <p className="text-sm text-slate-400">{benefit.detail}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-6 text-sm text-slate-200">
          <p className="font-semibold text-white">Â¿Listo para probar?</p>
          <p className="mt-2">
            Registra tus cuentas, llena la configuraciÃ³n inicial y deja que la IA prepare el
            plan perfecto para ti.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              to="/pricing"
              className="rounded-2xl border border-white/20 px-5 py-2 text-xs font-semibold text-white"
            >
              Ver planes
            </Link>
            <Link
              to="/onboarding"
              className="rounded-2xl bg-white px-5 py-2 text-xs font-semibold text-slate-900"
            >
              Empezar onboarding
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

