import { budgets } from "../../data/mock";
import { useCurrency } from "../../hooks/useCurrency";

export default function BudgetsPage() {
  const { convert, format } = useCurrency();

  return (
    <div className="space-y-8">
      {/* Encabezado de la vista */}
      <div className="glass-panel p-6">
        <p className="section-title">Planificacion</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          Presupuestos inteligentes
        </h3>
        <p className="mt-2 max-w-xl text-sm text-slate-300">
          Ajusta limites segun tu comportamiento real y recibe alertas antes de
          sobrepasar el tope.
        </p>
      </div>

      {/* Tarjetas de presupuesto */}
      <div className="grid gap-6 lg:grid-cols-2">
        {budgets.map((budget) => {
          const percent = Math.min(
            100,
            Math.round((budget.spent / budget.limit) * 100)
          );

          return (
            <div key={budget.id} className="glass-panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">
                    {budget.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {format.format(convert(budget.spent))} de{" "}
                    {format.format(convert(budget.limit))}
                  </p>
                </div>
                <span className="text-sm text-emerald-300">{percent}%</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-emerald-400/80"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Proxima revision automatica en 5 dias.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
