// la ruta de esta pagina es wwww.zai.com/faq

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const faqsData = [
  {
    category: "Inicio",
    items: [
      {
        question: "¿Cómo me registro en ZAI?",
        answer: "Es muy simple. Haz clic en 'Comienza ahora', ingresa tu email y contraseña. En menos de 2 minutos tendrás acceso completo.",
      },
      {
        question: "¿Necesito tarjeta de crédito?",
        answer: "No, es completamente gratis. Puedes explorar todas las funciones sin proporcionar datos de pago.",
      },
      {
        question: "¿Mis datos son seguros?",
        answer: "Sí. Usamos encriptación de nivel bancario (AES-256) y cumplimos con estándares de seguridad internacionales.",
      },
    ],
  },
  {
    category: "Funciones",
    items: [
      {
        question: "¿Cómo conecto una cuenta bancaria?",
        answer: "Ve a Configuración > Cuentas > Conectar Banco. Usa el botón de conexión segura y sigue la verificación de tu banco.",
      },
      {
        question: "¿Qué es el Score Dinámico?",
        answer: "Es un análisis de tu salud financiera basado en IA. Cambia según tus hábitos: ingresos, gastos, ahorros y metas.",
      },
      {
        question: "¿Cómo funcionan las metas?",
        answer: "Establece un objetivo, monto y fecha. ZAI calccula cuánto debes ahorrar cada mes y te envía alertas.",
      },
    ],
  },
  {
    category: "Planes",
    items: [
      {
        question: "¿Cuál es la diferencia entre planes?",
        answer: "Starter es básico (gratis). Pro incluye IA avanzada. Elite agrega análisis profundo y soporte dedicado.",
      },
      {
        question: "¿Puedo cambiar de plan?",
        answer: "Claro. Upgrade o downgrade cuando quieras. Los cambios se aplican en la próxima renovación.",
      },
      {
        question: "¿Hay contrato de largo plazo?",
        answer: "No. Sin compromisos. Cancela cuando quieras desde Configuración.",
      },
    ],
  },
  {
    category: "IA y Recomendaciones",
    items: [
      {
        question: "¿Cómo aprende la IA sobre mis finanzas?",
        answer: "Analiza tus movimientos, hábitos de gasto y objetivos. Cuantos más datos, más precisas las predicciones.",
      },
      {
        question: "¿Puedo confiar en las predicciones?",
        answer: "Nuestros algoritmos tienen +90% de precisión. Pero siempre son recomendaciones, no garantías.",
      },
      {
        question: "¿Qué pasa con mis datos privados?",
        answer: "Tu privacidad es sagrada. Solo usamos datos agregados para mejorar la IA, nunca compartimos personales.",
      },
    ],
  },
];

export default function FaqPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Inicio");

  const filteredFaqs = faqsData.find((cat) => cat.category === activeCategory) || faqsData[0];

  const filteredItems = filteredFaqs.items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-sm font-semibold text-emerald-400">Respuestas rápidas</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Preguntas frecuentes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400"
          >
            Encuentra las respuestas que necesitas
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Busca preguntas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section className="py-12 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex gap-4 overflow-x-auto pb-4">
          {faqsData.map((cat) => (
            <motion.button
              key={cat.category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                activeCategory === cat.category
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-900/50 border border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {cat.category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ========== FAQ ITEMS ========== */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, i) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <motion.button
                    onClick={() =>
                      setExpanded(expanded === item.question ? null : item.question)
                    }
                    className="w-full text-left bg-slate-900/50 border border-slate-700 hover:border-emerald-500/50 rounded-lg p-6 transition group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition">
                        {item.question}
                      </h3>
                      <motion.div
                        animate={{
                          rotate: expanded === item.question ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {expanded === item.question && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-slate-700"
                        >
                          <p className="text-slate-400">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 space-y-4"
              >
                <p className="text-slate-400">No encontramos preguntas con ese término</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold"
                >
                  Limpiar búsqueda
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-20 px-6 bg-slate-900/30">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">¿Tu pregunta no está aquí?</h2>
          <p className="text-slate-400">Nuestro equipo está listo para ayudarte</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
          >
            Contacta con nosotrs
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
