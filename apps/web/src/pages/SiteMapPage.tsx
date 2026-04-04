import { Link } from "react-router-dom";
import { siteMapSections } from "../data/siteContent";

export default function SiteMapPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Mapa de páginas</p>
        <h1 className="text-3xl font-semibold text-white">Explora cada experiencia ZAI</h1>
        <p className="mt-2 text-sm text-slate-300">
          Todos los caminos están conectados. Navega por marketing, onboarding, core, panel admin y páginas extra.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(siteMapSections).map(([section, pages]) => (
          <div key={section} className="glass-panel p-5 space-y-3">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-500">{section}</p>
            <div className="space-y-2">
              {pages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="block rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-emerald-400/60 hover:text-white"
                >
                  <p className="font-semibold">{page.title}</p>
                  <p className="text-xs text-slate-400">{page.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
