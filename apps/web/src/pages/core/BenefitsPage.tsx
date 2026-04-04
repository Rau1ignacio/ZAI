import { monetizationBenefits } from "../../data/siteContent";

export default function BenefitsPage() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Beneficios</p>
        <h1 className="text-3xl font-semibold text-white">Monetización para usuarios y aliados</h1>
        <p className="mt-2 text-sm text-slate-300">
          Comprende cashback, descuentos y convenios. Cada beneficio tiene seguimiento, métricas y expiración controlada.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {monetizationBenefits.map((benefit) => (
          <div key={benefit.title} className="glass-panel p-5 space-y-2">
            <p className="text-2xl">{benefit.icon}</p>
            <h2 className="text-lg font-semibold text-white">{benefit.title}</h2>
            <p className="text-sm text-slate-300">{benefit.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
