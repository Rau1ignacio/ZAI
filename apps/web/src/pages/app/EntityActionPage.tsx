import { useParams } from "react-router-dom";

export type EntityAction = "create" | "view" | "edit";

type EntityActionPageProps = {
  entity: string;
  action: EntityAction;
  description?: string;
};

export default function EntityActionPage({
  entity,
  action,
  description,
}: EntityActionPageProps) {
  const { id } = useParams<{ id?: string }>();

  const actionLabel =
    action === "create"
      ? "Crear"
      : action === "view"
      ? "Detalle"
      : "Editar";

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">/app/{entity.toLowerCase()}</p>
        <h1 className="text-3xl font-semibold text-white">
          {actionLabel} {entity}
        </h1>
        {description && <p className="text-sm text-slate-300">{description}</p>}
      </div>

      <div className="glass-panel p-6 text-sm text-slate-300">
        {action === "create" && (
          <p>Formulario para crear un nuevo {entity.toLowerCase()}.</p>
        )}
        {action === "view" && (
          <p>
            Mostrando detalle de {entity.toLowerCase()}{" "}
            <span className="text-white font-semibold">{id}</span>.
          </p>
        )}
        {action === "edit" && (
          <p>
            Editar {entity.toLowerCase()}{" "}
            <span className="text-white font-semibold">{id}</span>.
          </p>
        )}
      </div>
    </div>
  );
}
