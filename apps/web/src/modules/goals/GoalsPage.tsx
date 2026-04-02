import { goals } from "../../data/mock";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);

export default function GoalsPage() {
  return (
    <div className="space-y-8">
      {/* Contexto + propuesta de valor */}
      <div className="glass-panel p-6">
        <p className="section-title">Crecimiento</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          Metas con seguimiento diario
        </h3>
        <p className="mt-2 max-w-xl text-sm text-slate-300">
          ZAI divide tus objetivos en micro acciones y muestra el avance real
          cada semana.
        </p>
      </div>

      {/* Metas activas */}
      <div className="grid gap-6 lg:grid-cols-2">
        {goals.map((goal) => {
          const percent = Math.round((goal.current / goal.target) * 100);

          return (
            <div key={goal.id} className="glass-panel p-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-white">{goal.title}</p>
                <span className="text-xs text-slate-400">{goal.eta}</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-indigo-400/80"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>{formatCurrency(goal.current)}</span>
                <span>{formatCurrency(goal.target)}</span>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Ahorro automatico programado cada viernes.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
