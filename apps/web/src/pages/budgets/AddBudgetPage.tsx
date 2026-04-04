import { useFinanceData } from "../../hooks/useFinanceData";
import BudgetForm from "../../components/forms/BudgetForm";
import { useNavigate } from "react-router-dom";

export default function AddBudgetPage() {
  const navigate = useNavigate();
  const { addBudget } = useFinanceData();

  const handleSubmit = (data: any) => {
    addBudget(data);
    alert("✅ Presupuesto creado exitosamente");
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
          <h1 className="text-3xl font-bold">Crear Presupuesto</h1>
          <p className="text-slate-400 mt-2">
            Define límites de gasto para tus categorías
          </p>
        </div>

        <BudgetForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
