import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/90 shadow-2xl backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Acceso</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">ZAI · Controla tu dinero</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
