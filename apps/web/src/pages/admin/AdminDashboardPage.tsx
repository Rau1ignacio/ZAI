import { adminMetrics } from "../../data/siteContent";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Panel admin</p>
        <h1 className="text-3xl font-semibold text-white">Usuarios, retención y MRR</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {adminMetrics.map((metric) => (
          <div key={metric.label} className="glass-panel p-5 space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{metric.label}</p>
            <p className="text-3xl font-bold text-white">{metric.value}</p>
            <p className="text-xs text-emerald-300">{metric.trend}</p>
            <p className="text-xs text-slate-400">{metric.helper}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
