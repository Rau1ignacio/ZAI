import { adminAnalytics } from "../../data/siteContent";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Analytics de uso</p>
        <h1 className="text-3xl font-semibold text-white">Qué funciones usan más los usuarios</h1>
      </div>

      <div className="space-y-3">
        {adminAnalytics.map((row) => (
          <div key={row.feature} className="glass-panel p-5 flex items-center justify-between text-sm text-slate-300">
            <div>
              <p className="text-base font-semibold text-white">{row.feature}</p>
              <p className="text-xs text-slate-500">{row.usage}</p>
            </div>
            <p className="text-xs text-slate-400">{row.trend}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
