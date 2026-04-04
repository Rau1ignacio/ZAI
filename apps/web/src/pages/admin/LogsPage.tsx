import { adminLogs } from "../../data/siteContent";

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Logs</p>
        <h1 className="text-3xl font-semibold text-white">Errores, actividad y seguridad</h1>
      </div>

      <div className="space-y-3">
        {adminLogs.map((log) => (
          <div key={`${log.time}-${log.message}`} className="glass-panel p-5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{log.time}</span>
              <span>{log.level.toUpperCase()}</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
