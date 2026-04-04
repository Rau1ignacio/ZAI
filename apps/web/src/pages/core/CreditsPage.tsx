import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";
import { useCurrency } from "../../hooks/useCurrency";

export default function CreditsPage() {
  const { debts } = useMergedFinanceData();
  const { convert, format } = useCurrency();

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Créditos y deudas</p>
        <h1 className="text-3xl font-semibold text-white">Simula pagos y monitorea cada cuota</h1>
        <p className="mt-2 text-sm text-slate-300">
          Muestra intereses, plazos y score de riesgo. El simulador recomienda pagos extra para reducir meses.
        </p>
      </div>

      <div className="space-y-4">
        {debts.map((debt) => {
          const remainingYears = Math.ceil(debt.remainingMonths / 12);
          return (
            <div key={debt.id} className="glass-panel p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{debt.name}</h2>
                  <p className="text-xs text-slate-400">{debt.interestRate}% interés · {remainingYears} años restantes</p>
                </div>
                <p className="text-sm text-emerald-300">Estado: activo</p>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3 text-xs text-slate-300">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Principal</p>
                  <p className="text-sm text-white">{format.format(convert(debt.principal))}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Cuota mensual</p>
                  <p className="text-sm text-white">{format.format(convert(debt.monthlyPayment))}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Pagos restantes</p>
                  <p className="text-sm text-white">{debt.remainingMonths}</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Simulador</p>
                <p>
                  Paga 1 cuota extra al mes y reduces {Math.floor(debt.remainingMonths / 12)} meses del plan.
                  Recomendamos reservar un 10% de tus ingresos para ese pago.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
