import { supportChannels } from "../../data/siteContent";

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Centro de ayuda</p>
        <h1 className="text-3xl font-semibold text-white">Equipo listo para ayudarte</h1>
        <p className="mt-2 text-sm text-slate-300">
          Usa chat, tickets o nuestras guías para configurar, reportar o preguntar.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {supportChannels.map((channel) => (
          <div key={channel.title} className="glass-panel p-5 space-y-2">
            <h2 className="text-lg font-semibold text-white">{channel.title}</h2>
            <p className="text-sm text-slate-300">{channel.detail}</p>
            <p className="text-xs text-slate-500">{channel.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
