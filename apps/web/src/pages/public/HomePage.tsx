import { Link } from "react-router-dom";
import React from 'react';

const ArrowRight = ({ className }: { className?: string }) => (
  <span className={className} aria-hidden="true">→</span>
);

const BarChart3 = ({ className }: { className?: string }) => (
  <span className={className} aria-hidden="true">📊</span>
);

const BrainCircuit = ({ className }: { className?: string }) => (
  <span className={className} aria-hidden="true">🧠</span>
);

const LineChart = ({ className }: { className?: string }) => (
  <span className={className} aria-hidden="true">📈</span>
);

const Zap = ({ className }: { className?: string }) => (
  <span className={className} aria-hidden="true">⚡</span>
);

const Activity = ({ className }: { className?: string }) => (
  <span className={className} aria-hidden="true">📈</span>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* Navbar Minimalista */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-slate-950">
            Z
          </div>
          <span className="text-xl font-bold tracking-tight">ZAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Funciones</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Cómo funciona</a>
          <a href="#pricing" className="hover:text-white transition-colors">Precios</a>
        </div>
        <div>
          {/* Nota: En tu app real, cambia estos <a> por <Link to="..."> de react-router-dom */}
          <a href="/login" className="text-sm font-semibold text-slate-300 hover:text-white mr-4 transition-colors">
            Iniciar Sesión
          </a>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 space-y-24">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col lg:flex-row items-center gap-12 pt-10">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Zap className="w-3 h-3" />
              <span>El futuro de las finanzas personales</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Controla tu dinero <br className="hidden lg:block" />
              <span className="text-emerald-400">con claridad.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ZAI combina Inteligencia Artificial, educación financiera y datos precisos para que cada decisión sobre tu dinero sea más simple, segura y rentable.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="/pricing"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-emerald-400 hover:bg-emerald-300 px-8 py-3.5 text-base font-semibold text-slate-950 transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transform hover:-translate-y-0.5"
              >
                Ver planes <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/app/dashboard"
                className="w-full sm:w-auto flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 px-8 py-3.5 text-base font-semibold text-white transition-all backdrop-blur-sm"
              >
                Ir a la app
              </a>
            </div>
          </div>

          {/* Hero Image / Mockup (Simulado con CSS) */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent blur-3xl rounded-full" />
            <div className="relative glass-panel bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 overflow-hidden">
              {/* Mockup Top Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Balance Total</p>
                  <p className="text-2xl font-bold">$24,592.50</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <Activity className="w-3 h-3" /> +12.5%
                </div>
              </div>
              
              {/* Mockup Chart Area */}
              <div className="h-40 w-full flex items-end justify-between gap-2 opacity-70">
                {[40, 70, 45, 90, 65, 85, 120].map((h, i) => (
                  <div key={i} className="w-full bg-gradient-to-t from-emerald-500/20 to-emerald-400/80 rounded-t-sm transition-all duration-500 hover:opacity-100" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="features" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Funciones destacadas</h2>
            <p className="text-slate-400">
              No es solo un registro de gastos. ZAI es tu asistente financiero personal diseñado para hacer crecer tu patrimonio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 hover:border-emerald-500/30 p-8 rounded-2xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dashboards Intuitivos</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Visualiza tus ingresos, gastos y ahorros en tiempo real con gráficos claros que no requieren ser un experto para entenderlos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 hover:border-emerald-500/30 p-8 rounded-2xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Score Dinámico</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Conoce tu salud financiera al instante. Nuestro algoritmo evalúa tus hábitos y te da una puntuación para que sepas dónde mejorar.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 hover:border-emerald-500/30 p-8 rounded-2xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simulaciones con IA</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                ¿Qué pasaría si ahorras un 5% más? ¿O si inviertes en X? Simula escenarios futuros impulsados por inteligencia artificial.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Simple */}
      <footer className="border-t border-slate-800 bg-slate-950/50 py-8 text-center text-slate-500 text-sm mt-12">
        <p>© 2026 ZAI. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}