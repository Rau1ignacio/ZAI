import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { monetizationBenefits } from "../../data/siteContent";

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function BenefitDetailPage() {
  const { id } = useParams<{ id?: string }>();
  const benefit = useMemo(() => {
    return (
      monetizationBenefits.find((item) => slugify(item.title) === id) ?? monetizationBenefits[0]
    );
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-2">
        <p className="section-title">Beneficios</p>
        <h1 className="text-3xl font-semibold text-white">{benefit.title}</h1>
        <p className="text-sm text-slate-300">{benefit.detail}</p>
        <p className="text-xs text-emerald-300">Icono: {benefit.icon}</p>
      </div>
      <div className="glass-panel p-6 text-sm text-slate-300">
        <p>
          Cada beneficio se adapta a tu score financiero, flujo y membresía. Mantente conectado para
          recibir ofertas, cashback y convenios con partners aprobados.
        </p>
      </div>
    </div>
  );
}
