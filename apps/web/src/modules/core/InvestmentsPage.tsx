import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";
import { useCurrency } from "../../hooks/useCurrency";

export default function InvestmentsPage() {
  const { convert, format } = useCurrency();
  const { investments } = useMergedFinanceData();

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Inversiones</p>
        <h1 className="text-3xl font-semibold text-white">Portafolio, rentabilidad y riesgo</h1>
        <p className="mt-2 text-sm text-slate-300">
          Controla acciones, ETFs y cripto desde un solo panel. Analiza ROI, dividends y recomendaciones de IA.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {investments.map((investment) => {
          const roi = ((investment.currentValue - investment.initialValue) / investment.initialValue) * 100;
          return (
            <div key={investment.id} className="glass-panel p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{investment.type}</p>
              <h2 className="text-xl font-semibold text-white">{investment.name}</h2>
              <p className="text-sm text-slate-300">
                Compra {investment.purchaseDate.toLocaleDateString()} · Retorno esperado {investment.expectedReturn}%
              </p>
              <p className="text-2xl font-bold text-white">{format.format(convert(investment.currentValue))}</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>ROI {roi.toFixed(1)}%</span>
                <span>Riesgo {investment.type === "crypto" ? "Alto" : "Medio"}</span>
              </div>
              <p className="text-xs text-slate-400">
                Recomendación IA: reequilibrar cuando la volatilidad supere 12%.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
