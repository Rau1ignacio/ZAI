import { useState } from "react";
import type { Transaction } from "../../types/finance";

interface TransactionFormProps {
  onSubmit: (data: Omit<Transaction, "id">) => void;
}

const CATEGORIES = {
  income: ["Salario", "Freelance", "Inversiones", "Otros Ingresos"],
  expense: ["Hogar", "Transporte", "Alimentación", "Entretenimiento", "Salud", "Educación", "Servicios", "Otros"],
};

const SUBCATEGORIES: Record<string, string[]> = {
  Hogar: ["Renta", "Servicios", "Mantenimiento", "Muebles"],
  Transporte: ["Gasolina", "Estacionamiento", "Transporte Público", "Mantenimiento"],
  Alimentación: ["Supermercado", "Restaurantes", "Cafés"],
  Salario: ["Sueldo Base", "Bonos"],
  Freelance: ["Proyectos", "Consultoría"],
};

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [name, setName] = useState("");

  const categories = CATEGORIES[type];
  const subcategories = SUBCATEGORIES[category] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !category) {
      alert("Por favor, completa todos los campos");
      return;
    }

    onSubmit({
      name,
      category,
      amount: type === "income" ? parseFloat(amount) : -parseFloat(amount),
      date,
      status: "cleared",
      type,
    });

    // Limpiar formulario
    setName("");
    setAmount("");
    setCategory("");
    setSubcategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-white">Agregar Transacción</h3>

      {/* Tipo */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="income"
            checked={type === "income"}
            onChange={(e) => {
              setType(e.target.value as "income");
              setCategory("");
              setSubcategory("");
            }}
            className="w-4 h-4"
          />
          <span className="text-green-400">Ingreso</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === "expense"}
            onChange={(e) => {
              setType(e.target.value as "income");
              setCategory("");
              setSubcategory("");
            }}
            className="w-4 h-4"
          />
          <span className="text-red-400">Egreso</span>
        </label>
      </div>

      {/* Fecha */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Descripción</label>
        <input
          type="text"
          placeholder="Ej: Compra en supermercado"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
        />
      </div>

      {/* Monto */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Monto</label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm text-slate-300 mb-2">Categoría</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("");
          }}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
        >
          <option value="">Seleccimar categoría</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategoría */}
      {subcategories.length > 0 && (
        <div>
          <label className="block text-sm text-slate-300 mb-2">Subcategoría (Opcional)</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="">Seleccionar subcategoría</option>
            {subcategories.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded transition"
      >
        Agregar {type === "income" ? "Ingreso" : "Egreso"}
      </button>
    </form>
  );
}
