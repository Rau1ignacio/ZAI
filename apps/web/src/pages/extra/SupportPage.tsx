import { supportChannels } from "../../data/siteContent";

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Soporte</p>
        <h1 className="text-3xl font-semibold text-white">FAQ, chat y tickets</h1>
        <p className="mt-2 text-sm text-slate-300">
          Responde dudas en segundos con operaciones guiadas y equipo humano respaldando cada respuesta.
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
