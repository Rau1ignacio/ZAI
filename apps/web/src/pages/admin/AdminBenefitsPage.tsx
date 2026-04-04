import { adminPromotions } from "../../data/siteContent";

export default function AdminBenefitsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Beneficios admin</p>
        <h1 className="text-3xl font-semibold text-white">Promociones y afiliados</h1>
      </div>

      <div className="space-y-3">
        {adminPromotions.map((promotion) => (
          <div key={promotion.title} className="glass-panel p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{promotion.channel}</span>
              <span>{promotion.status}</span>
            </div>
            <h2 className="text-lg font-semibold text-white">{promotion.title}</h2>
            <p className="text-sm text-slate-300">{promotion.reward}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
