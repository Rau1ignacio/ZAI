// la ruta de esta pagina es wwww.zai.com/

import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  BarChart3,
  BrainCircuit,
  Lock,
  Smartphone,
  Zap,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="w-full bg-slate-950 text-slate-50 overflow-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Background Animated Gradients */}
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-emerald-500 rounded-full"
            />
            <span className="text-sm font-semibold text-emerald-400">
              Tu copiloto financiero personal
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            Controla tu dinero <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              con claridad
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Inteligencia artificial que entiende tus finanzas. Dashboards
            intuitivos. Predicciones que te ayudan a crecer.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
            >
              Comienza gratis
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-900/50 transition"
            >
              Ver demo
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400 pt-8 flex-wrap"
          >
            <div>✓ Sin tarjeta de crédito</div>
            <div className="w-px h-4 bg-slate-700 hidden sm:block" />
            <div>✓ Acceso inmediato</div>
            <div className="w-px h-4 bg-slate-700 hidden sm:block" />
            <div>✓ 100% gratuito</div>
          </motion.div>
        </div>

        {/* Floating Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          style={{ y }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 md:w-96 h-96 md:h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/50 p-2 overflow-hidden pointer-events-none"
        >
          <div className="w-full h-full bg-slate-950 rounded-2xl flex flex-col p-4 space-y-3">
            <div className="flex justify-between items-center pb-2">
              <div className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
            </div>
            <div className="h-24 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg" />
            <div className="flex gap-2 flex-1">
              <div className="flex-1 bg-slate-800 rounded-lg animate-pulse" />
              <div className="flex-1 bg-slate-800 rounded-lg animate-pulse" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========== PROBLEM / SOLUTION ========== */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Problem */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold">La mayoría no sabe adónde va su dinero</h2>
            <div className="space-y-4 text-lg text-slate-400">
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl mt-1">❌</span>
                <span>Múltiples apps sin conexión</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl mt-1">❌</span>
                <span>Datos dispersos y confusos</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl mt-1">❌</span>
                <span>Sin predicciones ni insights</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl mt-1">❌</span>
                <span>Decisiones sin información</span>
              </div>
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 rounded-2xl border border-emerald-500/20"
          >
            <h3 className="text-3xl font-bold">ZAI te da claridad</h3>
            <div className="space-y-4 text-lg text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl mt-1">✅</span>
                <span>Todo sincronizado en un lugar</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl mt-1">✅</span>
                <span>Visualización clara de flujos</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl mt-1">✅</span>
                <span>IA que analiza y predice</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl mt-1">✅</span>
                <span>Decisiones inteligentes y seguras</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== DASHBOARD DEMO ========== */}
      <section className="relative py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold">Aquí está la magia 🎩</h2>
            <p className="text-xl text-slate-400">Dashboard que entiende tus finanzas</p>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 p-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

            <div className="relative space-y-8">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-400">Balance Total</p>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-emerald-400"
                  >
                    $24,592.50
                  </motion.h3>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 font-semibold text-sm"
                >
                  ↑ +12.5% este mes
                </motion.div>
              </div>

              {/* Metrics Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <MetricCard title="Ingresos" value="$4,200" trend="+8%" delay={0.3} />
                <MetricCard title="Gastos" value="$2,100" trend="-5%" delay={0.4} />
                <MetricCard title="Score IA" value="8.7/10" trend="Excelente" delay={0.5} />
              </div>

              {/* Chart */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="h-48 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-lg flex items-end justify-around p-4"
              >
                {[40, 65, 45, 80, 55, 85, 90].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-lg opacity-80 mx-1"
                  />
                ))}
              </motion.div>

              {/* IA Insight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
              >
                <p className="text-sm text-cyan-400 font-semibold">💡 IA Insight</p>
                <p className="text-slate-300 mt-2">
                  Si aumentas tu ahorro un 15%, podrías alcanzar tu meta en 6 meses en
                  lugar de 12.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold">Potencia financiera en tus manos</h2>
            <p className="text-slate-400">Todo lo que necesitas en un solo lugar</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold">Confían en ZAI</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold">Precios que tienen sentido</h2>
            <p className="text-slate-400">Comienza gratis, escala conforme creces</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <PricingCard key={i} plan={plan} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="relative py-20 px-6">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">¿Listo para tomar control?</h2>
          <p className="text-slate-400">Únete a miles de usuarios que ya están optimizando sus finanzas</p>
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

// ========== COMPONENT HELPERS ==========

function MetricCard({ title, value, trend, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2 cursor-pointer transition"
    >
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-emerald-400">{trend}</p>
    </motion.div>
  );
}

function FeatureCard({ feature, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-slate-900/50 border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-8 space-y-4 cursor-pointer transition overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition pointer-events-none" />

      <div className="relative">
        <div className="text-4xl mb-3">{feature.icon}</div>
        <h3 className="text-xl font-bold">{feature.title}</h3>
        <p className="text-slate-400 mt-2">{feature.description}</p>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-4"
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-slate-300 italic">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400" />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-xs text-slate-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PricingCard({ plan, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -8 }}
      className={`rounded-2xl p-8 space-y-6 border-2 transition ${
        plan.featured
          ? "border-emerald-500 bg-emerald-500/5 md:scale-105"
          : "border-slate-700 bg-slate-900/50"
      }`}
    >
      <div>
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-slate-400 text-sm">{plan.description}</p>
      </div>

      <div className="text-4xl font-bold">
        {plan.price === 0 ? "Gratuito" : `$${plan.price}`}
        {plan.price > 0 && <span className="text-lg text-slate-400">/mes</span>}
      </div>

      <ul className="space-y-3 text-sm">
        {plan.features.map((f: string, j: number) => (
          <li key={j} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          plan.featured
            ? "bg-emerald-500 text-white"
            : "border border-slate-700 text-slate-300 hover:bg-slate-800"
        }`}
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  );
}

// ========== DATA ==========

const features = [
  {
    icon: "📊",
    title: "Dashboards Inteligentes",
    description: "Visualización clara de flujos, gastos y ahorros en tiempo real",
  },
  {
    icon: "🧠",
    title: "IA Predictiva",
    description: "Algoritmos que aprenden de ti y predicen tu futuro financiero",
  },
  {
    icon: "💡",
    title: "Insights Accionables",
    description: "Recomendaciones personalizadas para optimizar tu dinero",
  },
  {
    icon: "🔐",
    title: "Seguridad Bancaria",
    description: "Encriptación de nivel militar. Tus datos, siempre protegidos",
  },
  {
    icon: "📱",
    title: "Cross-Platform",
    description: "Web, iOS y Android sincronizados al instante",
  },
  {
    icon: "🚀",
    title: "Actualizaciones Constantes",
    description: "Nuevas features cada semana impulsadas por IA",
  },
];

const testimonials = [
  {
    quote:
      "Finalmente entiendo adónde va mi dinero. ZAI cambió completamente mi relación con las finanzas.",
    name: "María Rodriguez",
    role: "Emprendedora",
  },
  {
    quote:
      "El score de IA me ayudó a ahorrar $500 al mes. Increíble.",
    name: "Carlos Martínez",
    role: "Freelancer",
  },
  {
    quote:
      "La mejor inversión en mi educación financiera. Recomendado 100%.",
    name: "Ana García",
    role: "Estudiante",
  },
];

const plans = [
  {
    name: "Starter",
    description: "Para explorar",
    price: 0,
    features: ["1 cuenta", "Dashboards básicos", "Datos últimos 30 días", "Soporte por email"],
    cta: "Comienza ahora",
    featured: false,
  },
  {
    name: "Pro",
    description: "Para optimizadores",
    price: 9.99,
    features: [
      "10+ cuentas",
      "IA predictiva",
      "Insights mensales",
      "Reportes detallados",
      "Soporte prioritario",
    ],
    cta: "Subir a Pro",
    featured: true,
  },
  {
    name: "Elite",
    description: "Para profesionales",
    price: 29.99,
    features: [
      "Cuentas ilimitadas",
      "IA avanzada",
      "Análisis profundo",
      "API access",
      "Asesoría dedicada",
    ],
    cta: "Contactar ventas",
    featured: false,
  },
];