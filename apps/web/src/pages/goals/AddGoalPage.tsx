import { useFinanceData } from "../../hooks/useFinanceData";
import GoalForm from "../../components/forms/GoalForm";
import { useNavigate } from "react-router-dom";

export default function AddGoalPage() {
  const navigate = useNavigate();
  const { addGoal } = useFinanceData();

  const handleSubmit = (data: any) => {
    addGoal(data);
    alert("✅ Meta agregada exitosamente");
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
          <h1 className="text-3xl font-bold">Nueva Meta</h1>
          <p className="text-slate-400 mt-2">
            Define un objetivo financiero y haz seguimiento
          </p>
        </div>

        <GoalForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
