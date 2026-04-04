import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { campaignDefinitions } from "../../data/siteContent";

export default function CampaignLandingPage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const campaign = useMemo(
    () =>
      campaignDefinitions.find((definition) => definition.slug === campaignId) ??
      campaignDefinitions[0],
    [campaignId]
  );

  return (
    <div className="space-y-8">
      <div className="glass-panel p-8">
        <p className="section-title">CampaÃ±a</p>
        <h1 className="text-3xl font-semibold text-white">{campaign.title}</h1>
        <p className="mt-2 text-slate-300">{campaign.description}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            to="/onboarding"
            className="rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-2 text-xs font-semibold text-white"
          >
            Empezar configuraciÃ³n
          </Link>
          <Link
            to="/login"
            className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold text-white/80"
          >
            Login / Registro
          </Link>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-[1.3fr,0.7fr]">
        <div className="glass-panel p-6 space-y-4">
          <p className="section-title">Enfoque</p>
          <h2 className="text-2xl font-semibold text-white">{campaign.focus}</h2>
          <div className="space-y-3 text-sm text-slate-300">
            {campaign.heroPoints.map((point) => (
              <p key={point}>â€¢ {point}</p>
            ))}
          </div>
        </div>
        <div className="glass-panel bg-gradient-to-br from-emerald-500/20 to-blue-500/20 p-6">
          <p className="section-title">Highlights</p>
          <div className="mt-4 space-y-2 text-sm text-slate-100">
            {campaign.highlights.map((highlight) => (
              <p key={highlight}>â€¢ {highlight}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {campaign.stats.map((stat) => (
          <div key={stat.label} className="glass-panel p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      <div className="glass-panel p-6 space-y-3">
        <p className="section-title">Acciones sugeridas</p>
        <ul className="list-disc space-y-2 pl-5 text-slate-300 text-sm">
          <li>Comparte este reporte con tu equipo o familia.</li>
          <li>Sigue las alertas para anticipar pagos crÃ­ticos.</li>
          <li>Activa los convenios recomendados para desbloquear beneficios.</li>
        </ul>
      </div>
    </div>
  );
}

