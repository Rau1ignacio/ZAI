import { onboardingBlocks } from "../../data/siteContent";

export default function OnboardingPage() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Onboarding</p>
        <h1 className="text-3xl font-semibold text-white">Configuración inicial</h1>
        <p className="mt-2 text-sm text-slate-300">
          Define ingresos, gastos estimados, objetivos y nivel de riesgo para que la IA configure
          tus recomendaciones y simulaciones con contexto real.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {onboardingBlocks.map((block) => (
          <div key={block.title} className="glass-panel p-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{block.title}</p>
            <p className="text-sm text-slate-200">{block.detail}</p>
            <p className="text-xs text-slate-400">{block.helper}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6">
        <p className="section-title">Inputs clave</p>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Ingresos</p>
            <p className="text-2xl font-semibold text-white">$4.800.000</p>
            <p className="text-xs text-slate-400">Nómina + freelance + dividendos</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Gastos estimados</p>
            <p className="text-2xl font-semibold text-white">$3.210.000</p>
            <p className="text-xs text-slate-400">Hogar, movilidad, suscripciones</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Objetivos</p>
            <p className="text-2xl font-semibold text-white">4</p>
            <p className="text-xs text-slate-400">Viajar, casa, auto, fondo de emergencia</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Nivel de riesgo</p>
            <p className="text-2xl font-semibold text-white">Moderado</p>
            <p className="text-xs text-slate-400">Preferido por IA para sugerencias</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Estos datos alimentan los modelos de IA, calibran los dashboards y generan alertas inteligentes
          que te acompañan en cada paso.
        </p>
      </div>
    </div>
  );
}
