// la ruta de esta pagina es wwww.zai.com/caracteristicas

import { motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Wallet,
  TrendingUp,
  Lock,
  Bell,
  Zap,
  Users,
  Smartphone,
  LineChart,
  Target,
  Gift,
  ArrowRight,
  Check,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="w-full bg-slate-950 text-slate-50 overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 10 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-sm font-semibold text-emerald-400">Potencia completa</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            Todo lo que necesitas
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              para crecer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Herramientas avanzadas, IA inteligente y seguridad bancaria en una plataforma
          </motion.p>
        </div>
      </section>

      {/* ========== FEATURES GRID ========== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Características principales</h2>
            <p className="text-slate-400">Diseñadas para tu éxito financiero</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-slate-900/50 border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-8 space-y-4 transition overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition pointer-events-none" />
                <div className="relative">
                  <div className="text-emerald-400 mb-4">{f.icon}</div>
                  <h3 className="text-xl font-bold">{f.title}</h3>
                  <p className="text-slate-400 mt-2">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ADVANCED FEATURES ========== */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Funcionalidades avanzadas</h2>
          </div>

          {advancedFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className={`${f.color} mb-4`}>{f.icon}</div>
                <h3 className="text-3xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-400 text-lg mb-6">{f.description}</p>
                <ul className="space-y-3">
                  {f.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${f.bgGradient} rounded-2xl h-96 border border-slate-700/50 p-8 flex items-center justify-center`}>
                <div className="text-center">
                  <div className="text-6xl mb-4">{f.emoji}</div>
                  <p className="text-slate-400">{f.mockupText}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== COMPARISON ========== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Plataformas vs ZAI</h2>
            <p className="text-slate-400">Mira cómo nos diferenciamos</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-400">Plataforma A</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-400">Plataforma B</th>
                  <th className="text-center py-4 px-4 font-semibold text-emerald-400">ZAI</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-4 px-4">{row.feature}</td>
                    <td className="text-center py-4 px-4">{row.a === true ? "✓" : "✗"}</td>
                    <td className="text-center py-4 px-4">{row.b === true ? "✓" : "✗"}</td>
                    <td className="text-center py-4 px-4 text-emerald-400 font-semibold">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-20 px-6">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">¿Listo para experimenta todas las funciones?</h2>
          <p className="text-slate-400">Accede ahora y domina tus finanzas</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all inline-flex items-center gap-2"
          >
            Comenzar ahora <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

const mainFeatures = [
  {
    icon: "📊",
    title: "Dashboards Inteligentes",
    description: "Visualiza ingresos, gastos y ahorros en tiempo real",
  },
  {
    icon: "🧠",
    title: "IA Predictiva",
    description: "Predicciones inteligentes de tu futuro financiero",
  },
  {
    icon: "💰",
    title: "Control Total",
    description: "Gestiona cuentas, presupuestos y metas en un lugar",
  },
  {
    icon: "🔔",
    title: "Alertas Inteligentes",
    description: "Notificaciones en tiempo real para decisiones rápidas",
  },
  {
    icon: "🔐",
    title: "Seguridad Bancaria",
    description: "Encriptación de nivel militar 24/7",
  },
  {
    icon: "💳",
    title: "Beneficios Exclusivos",
    description: "Cashback y convenios con socios autorizados",
  },
];

const advancedFeatures = [
  {
    icon: "📈",
    title: "Score Dinámico",
    description: "Conoce tu salud financiera al instante. Tu score cambia según tus hábitos.",
    color: "text-cyan-400 text-3xl",
    emoji: "📊",
    mockupText: "Score: 8.7/10 - Excelente",
    bgGradient: "bg-gradient-to-br from-cyan-500/10 to-emerald-500/10",
    benefits: [
      "Análisis profundo de tu comportamiento",
      "Comparativa con otros usuarios",
      "Recomendaciones personalizadas",
      "Mejoras en tiempo real",
    ],
  },
  {
    icon: "🎯",
    title: "Metas Inteligentes",
    description: "Establece objetivos y deja que IA te guíe hacia ellos.",
    color: "text-emerald-400 text-3xl",
    emoji: "🎯",
    mockupText: "Meta: Ahorrar $5,000 en 6 meses",
    bgGradient: "bg-gradient-to-br from-emerald-500/10 to-cyan-500/10",
    benefits: [
      "Proyecciones de ahorro realistas",
      "Alertas cuando te desvías",
      "Simulaciones de escenarios",
      "Celebración de logros",
    ],
  },
  {
    icon: "💡",
    title: "Insights Accionables",
    description: "Recomendaciones que realmente te ayudan a crecer.",
    color: "text-yellow-400 text-3xl",
    emoji: "💡",
    mockupText: "Oportunidad: Reduzcas $200/mes aquí",
    bgGradient: "bg-gradient-to-br from-yellow-500/10 to-emerald-500/10",
    benefits: [
      "Algoritmos que aprenden de ti",
      "Consejos contextualizados",
      "Sin spam ni distracciones",
      "Resultados medibles",
    ],
  },
];

const comparisonRows = [
  { feature: "Dashboards avanzados", a: true, b: true },
  { feature: "IA Predictiva", a: false, b: false },
  { feature: "Score Dinámico", a: false, b: false },
  { feature: "Alertas Inteligentes", a: true, b: true },
  { feature: "Integración Bancaria", a: true, b: true },
  { feature: "Seguridad Bancaria", a: true, b: true },
  { feature: "Beneficios Exclusivos", a: false, b: false },
  { feature: "Análisis Profundo", a: false, b: false },
  { feature: "Sin anuncios", a: false, b: false },
];
