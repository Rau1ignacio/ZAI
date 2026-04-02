import { useFinanceData } from "../../hooks/useFinanceData";
import TransactionForm from "../../components/forms/TransactionForm";
import { useNavigate } from "react-router-dom";

export default function AddTransactionPage() {
  const navigate = useNavigate();
  const { addTransaction } = useFinanceData();

  const handleSubmit = (data: any) => {
    addTransaction(data);
    alert("✅ Transacción agregada exitosamente");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-slate-400 hover:text-white mb-4 text-sm"
          >
            ← Volver al Dashboard
          </button>
          <h1 className="text-3xl font-bold">Agregar Transacción</h1>
          <p className="text-slate-400 mt-2">
            Registra tus ingresos y gastos aquí
          </p>
        </div>

        <TransactionForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
