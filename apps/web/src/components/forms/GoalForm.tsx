import { useState } from "react";
import type { Goal } from "../../types/finance";

interface GoalFormProps {
  onSubmit: (data: Omit<Goal, "id">) => void;
}

const GOAL_CATEGORIES = ["Viaje", "Vehículo", "Casa", "Educación", "Ahorro", "Inversiones", "Otros"];
const PRIORITIES = ["low", "medium", "high"] as const;

export default function GoalForm({ onSubmit }: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("0");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [eta, setEta] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target || !eta) {
      alert("Por favor, completa todos los campos");
      return;
    }

    onSubmit({
      title,
      target: parseFloat(target),
      current: parseFloat(current),
      category: category || "Otros",
      priority,
      eta,
    });

    // Limpiar formulario
    setTitle("");
    setTarget("");
    setCurrent("0");
    setCategory("");
    setPriority("medium");
    setEta("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-white">Agregar Meta</h3>

      {/* Título */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Título de la Meta</label>
        <input
          type="text"
          placeholder="Ej: Fondo de Emergencia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
        />
      </div>

      {/* Monto Actual */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Monto Actual</label>
        <input
          type="number"
          placeholder="0.00"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
        />
      </div>

      {/* Monto Objetivo */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Monto Objetivo</label>
        <input
          type="number"
          placeholder="0.00"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
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
          {GOAL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Prioridad */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Prioridad</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as typeof priority)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      {/* Fecha Estimada */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Fecha Estimada de Logro</label>
        <input
          type="date"
          value={eta}
          onChange={(e) => setEta(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 rounded transition"
      >
        Crear Meta
      </button>
    </form>
  );
}
