import { useMergedFinanceData } from "../../hooks/useMergedFinanceData";
import { useCurrency } from "../../hooks/useCurrency";

export default function AccountsPage() {
  const { accounts } = useMergedFinanceData();
  const { convert, format } = useCurrency();

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Cuentas</p>
        <h1 className="text-3xl font-semibold text-white">Bancos, tarjetas y efectivo sincronizados</h1>
        <p className="mt-2 text-sm text-slate-300">
          Controla cada cuenta con balances actualizados y prepárate para abrir conexiones API en la próxima etapa.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <div key={account.id} className="glass-panel p-5 space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{account.type}</p>
            <h2 className="text-lg font-semibold text-white">{account.name}</h2>
            <p className="text-2xl font-bold text-white">{format.format(convert(account.balance))}</p>
            <p className="text-xs text-slate-400">
              Última actualización: {account.lastUpdated.toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 space-y-3">
        <p className="section-title">Conexiones</p>
        <p className="text-sm text-slate-300">
          Pronto podrás activar Open Banking y sincronizar cuentas automáticamente. Mientras tanto,
          agrega cuentas manuales y asigna reglas de conciliación.
        </p>
      </div>
    </div>
  );
}
