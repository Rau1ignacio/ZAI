import { transactions } from "../../data/mock";
import { useCurrency } from "../../hooks/useCurrency";

export default function TransactionsPage() {
  const { convert, format } = useCurrency();

  return (
    <div className="space-y-8">
      {/* Contexto rapido del modulo */}
      <div className="glass-panel p-6">
        <p className="section-title">Movimientos recientes</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          Control total de tus transacciones
        </h3>
        <p className="mt-2 max-w-xl text-sm text-slate-300">
          Filtra por categoria, detecta gastos anomales y exporta tu historial
          cuando lo necesites.
        </p>
      </div>

      {/* Tabla simple para MVP */}
      <div className="glass-panel overflow-hidden">
        <div className="grid grid-cols-4 gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span>Detalle</span>
          <span>Categoria</span>
          <span>Fecha</span>
          <span className="text-right">Monto</span>
        </div>
        <div className="divide-y divide-white/5">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-4 gap-4 px-6 py-4 text-sm text-slate-200"
            >
              <div>
                <p className="font-semibold text-white">{tx.name}</p>
                <p className="text-xs text-slate-400">
                  {tx.status === "pending" ? "Pendiente" : "Confirmado"}
                </p>
              </div>
              <span className="text-slate-300">{tx.category}</span>
              <span className="text-slate-400">{tx.date}</span>
              <span className="text-right font-semibold text-white">
                {format.format(convert(tx.amount))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
