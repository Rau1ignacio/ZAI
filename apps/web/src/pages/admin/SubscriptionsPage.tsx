import { adminSubscriptions } from "../../data/siteContent";

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Pagos / Suscripciones</p>
        <h1 className="text-3xl font-semibold text-white">Usuarios premium y facturación</h1>
      </div>

      <div className="space-y-3">
        {adminSubscriptions.map((subscription) => (
          <div key={subscription.user} className="glass-panel p-5 flex flex-col gap-2">
            <p className="text-lg font-semibold text-white">{subscription.user}</p>
            <p className="text-sm text-slate-300">
              Plan: {subscription.plan} · Facturación: {subscription.billing}
            </p>
            <p className="text-xs text-slate-400">Status: {subscription.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
