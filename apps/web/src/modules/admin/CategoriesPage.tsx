import { adminCategories } from "../../data/siteContent";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Categorías</p>
        <h1 className="text-3xl font-semibold text-white">Crear o editar categorías de gastos</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {adminCategories.map((category) => (
          <div key={category.name} className="glass-panel p-5 space-y-2">
            <h2 className="text-lg font-semibold text-white">{category.name}</h2>
            <p className="text-sm text-slate-300">{category.usage}</p>
            <p className="text-xs text-slate-500">Equipos: {category.assignedTeams}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
