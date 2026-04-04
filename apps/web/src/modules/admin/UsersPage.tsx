import { adminUsers } from "../../data/siteContent";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Gestión de usuarios</p>
        <h1 className="text-3xl font-semibold text-white">Ver, bloquear y editar perfiles</h1>
      </div>

      <div className="space-y-3">
        {adminUsers.map((user) => (
          <div key={user.email} className="glass-panel p-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <div className="text-xs text-slate-400 flex gap-3">
              <span>Plan: {user.plan}</span>
              <span>Status: {user.status}</span>
              <span>Último login: {user.lastLogin}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
