// la ruta de esta pagina es wwww.zai.com/ayuda

import { motion } from "framer-motion";
import { MessageCircle, Mail, BookOpen, Zap, Video, Users, ArrowRight } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="w-full bg-slate-950 text-slate-50 overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-6 py-20">
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
            <span className="text-sm font-semibold text-emerald-400">Centro de ayuda</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Equipo listo para <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ayudarte
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400"
          >
            Guías, documentación y soporte en múltiples canales
          </motion.p>
        </div>
      </section>

      {/* ========== SUPPORT CHANNELS ========== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">Canales de soporte</h2>
            <p className="text-slate-400">Elige cómo prefieres conectar con nosotros</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel, i) => (
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
                  <div className="inline-flex p-3 bg-emerald-500/10 rounded-lg text-emerald-400 text-2xl mb-4">
                    {channel.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{channel.title}</h3>
                  <p className="text-slate-400 mb-4">{channel.description}</p>

                  <div className="space-y-2 text-sm pt-4 border-t border-slate-800">
                    <p className="text-slate-500">{channel.detail}</p>
                    <p className="text-emerald-400 font-semibold">{channel.availability}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RESOURCES ========== */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Recursos y guías</h2>
            <p className="text-slate-400">Aprende a tu propio ritmo</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-8 space-y-4 cursor-pointer transition"
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{resource.icon}</div>
                  <ArrowRight className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition">
                    {resource.title}
                  </h3>
                  <p className="text-slate-400">{resource.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {resource.topics.map((topic, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== QUICK GUIDES ========== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Guías rápidas</h2>
            <p className="text-slate-400">Pasos simples para tareas comunes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickGuides.map((guide, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-4"
              >
                <h3 className="text-lg font-bold">{guide.title}</h3>

                <ol className="space-y-2 text-sm text-slate-400">
                  {guide.steps.map((step, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="font-bold text-emerald-400 flex-shrink-0">{j + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-500/20 transition text-sm"
                >
                  Ver guía completa
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ CTA ========== */}
      <section className="py-20 px-6">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">¿No encuentras lo que buscas?</h2>
          <p className="text-slate-400">Revisa nuestras preguntas frecuentes o contacta al equipo</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg shadow-emerald-500/30"
            >
              Ver FAQ
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-emerald-500 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-500/10 transition"
            >
              Contactar equipo
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const supportChannels = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Chat en Vivo",
    description: "Habla directamente con nuestro equipo",
    detail: "Disponible en horario laboral",
    availability: "Lun-Vie 9am-6pm",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    description: "Escríbenos con tu duda",
    detail: "Respuesta garantizada",
    availability: "Respuesta en 24 horas",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Comunidad",
    description: "Aprende de otros usuarios",
    detail: "Foro y grupos",
    availability: "Disponible 24/7",
  },
];

const resources = [
  {
    icon: "📚",
    title: "Documentación Completa",
    description: "Guía exhaustiva de todas las funciones y características de ZAI",
    topics: ["Setup", "Features", "Seguridad", "API"],
  },
  {
    icon: "🎥",
    title: "Tutoriales en Video",
    description: "Aprende visualmente con nuestros videos paso a paso",
    topics: ["Inicio", "Dashboard", "Reportes", "Análisis"],
  },
  {
    icon: "📊",
    title: "Mejores Prácticas",
    description: "Consejos para sacar el máximo provecho de ZAI",
    topics: ["Finanzas", "Metas", "Ahorro", "Inversión"],
  },
  {
    icon: "🔧",
    title: "Troubleshooting",
    description: "Soluciona problemas comunes rápidamente",
    topics: ["Conexión", "Sincronización", "Errores", "Rendimiento"],
  },
];

const quickGuides = [
  {
    title: "Conectar tu primer banco",
    steps: [
      "Abre Dashboard > Cuentas",
      "Haz clic en 'Conectar Banco'",
      "Selecciona tu entidad bancaria",
      "Autoriza el acceso",
      "¡Listo! Tus datos se sincronizarán",
    ],
  },
  {
    title: "Crear una meta de ahorro",
    steps: [
      "Ve a Metas > Nueva Meta",
      "Define el objetivo y monto",
      "Establece la fecha límite",
      "Revisa el plan de ahorro",
      "Confirma y comienza",
    ],
  },
  {
    title: "Entender tu Score",
    steps: [
      "Abre el Dashboard",
      "Busca tu Score Dinámico",
      "Haz clic para ver detalles",
      "Revisa factores clave",
      "Sigue recomendaciones",
    ],
  },
];
