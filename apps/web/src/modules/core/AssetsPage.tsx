import { assetCatalog } from "../../data/siteContent";
import { useCurrency } from "../../hooks/useCurrency";
import { useDashboardData } from "../../hooks/useBI";
import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";

export default function AssetsPage() {
  const { convert, format } = useCurrency();
  const {
    accounts,
    transactions,
    budgets,
    goals,
    debts,
    investments,
  } = useMergedFinanceData();

  const { netWorth } = useDashboardData(
    accounts,
    transactions,
    budgets,
    goals,
    debts,
    investments
  );

  const totalPurchase = assetCatalog.reduce(
    (sum, asset) => sum + asset.purchaseValue,
    0
  );
  const totalCurrent = assetCatalog.reduce(
    (sum, asset) => sum + asset.currentValue,
    0
  );

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Patrimonio</p>
        <h1 className="text-3xl font-semibold text-white">Valor de compra vs valor actual</h1>
        <p className="mt-2 text-sm text-slate-300">
          Cada activo muestra cuánto pagaste y cuánto podrías vender hoy. Los datos premium estiman evolución y escenarios.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs text-slate-500 uppercase tracking-[0.4em]">Valor de compra</p>
            <p className="text-2xl font-bold text-white">{format.format(convert(totalPurchase))}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs text-slate-500 uppercase tracking-[0.4em]">Valor actual</p>
            <p className="text-2xl font-bold text-white">{format.format(convert(totalCurrent))}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs text-slate-500 uppercase tracking-[0.4em]">Patrimonio neto</p>
            <p className="text-2xl font-bold text-white">
              {netWorth ? format.format(convert(netWorth.netWorth)) : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assetCatalog.map((asset) => {
          const change = asset.currentValue - asset.purchaseValue;
          const changeLabel = change >= 0 ? `+${((change / asset.purchaseValue) * 100).toFixed(1)}%` : `${((change / asset.purchaseValue) * 100).toFixed(1)}%`;
          return (
            <div key={asset.title} className="glass-panel p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{asset.title}</p>
              <p className="text-sm text-slate-300">{asset.items.join(" · ")}</p>
              <p className="text-lg font-semibold text-white">
                {format.format(convert(asset.currentValue))}
              </p>
              <p className="text-xs text-slate-400">Valor compra: {format.format(convert(asset.purchaseValue))}</p>
              <p className="text-xs text-emerald-300">{changeLabel} en valor actual</p>
              <p className="text-xs text-slate-400">{asset.premiumInsight}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
