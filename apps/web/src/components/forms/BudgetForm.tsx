import { useState } from "react";
import type { Budget } from "../../types/finance";

interface BudgetFormProps {
  onSubmit: (data: Omit<Budget, "id">) => void;
}

const BUDGET_CATEGORIES = [
  "Hogar",
  "Transporte",
  "Alimentación",
  "Entretenimiento",
  "Salud",
  "Educación",
  "Servicios",
  "Otros",
];

const PERIODS = ["monthly", "quarterly", "yearly"] as const;

export default function BudgetForm({ onSubmit }: BudgetFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [currency, setCurrency] = useState("COP");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !limit) {
      alert("Por favor, completa todos los campos");
      return;
    }

    onSubmit({
      name,
      category,
      limit: parseFloat(limit),
      spent: 0,
      period,
      currency,
    });

    // Limpiar formulario
    setName("");
    setCategory("");
    setLimit("");
    setPeriod("monthly");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-white">Agregar Presupuesto</h3>

      {/* Nombre */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Nombre del Presupuesto</label>
        <input
          type="text"
          placeholder="Ej: Presupuesto de Alimentación"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
        >
          <option value="">Seleccionar categoría</option>
          {BUDGET_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Límite */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Límite</label>
        <input
          type="number"
          placeholder="0.00"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
        />
      </div>

      {/* Período */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Período</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as typeof period)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
        >
          <option value="monthly">Mensual</option>
          <option value="quarterly">Trimestral</option>
          <option value="yearly">Anual</option>
        </select>
      </div>

      {/* Moneda */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Moneda</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
        >
          <option value="COP">COP (Pesos Colombianos)</option>
          <option value="USD">USD (Dólares)</option>
          <option value="EUR">EUR (Euros)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 rounded transition"
      >
        Crear Presupuesto
      </button>
    </form>
  );
}
