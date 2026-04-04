// la ruta de esta pagina es wwww.zai.com/contacto
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-sm font-semibold text-emerald-400">Estamos para ti</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold tracking-tight"
          >
            ¿Necesitas ayuda?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Nuestro equipo está disponible para responder tus preguntas
          </motion.p>
        </div>
      </section>

      {/* ========== CONTACT CHANNELS ========== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {contactChannels.map((channel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 space-y-4 text-center"
              >
                <div className="inline-flex p-3 bg-emerald-500/10 rounded-lg text-emerald-400 text-2xl">
                  {channel.icon}
                </div>
                <h3 className="text-xl font-bold">{channel.title}</h3>
                <p className="text-slate-400">{channel.description}</p>
                <p className="font-semibold text-emerald-400">{channel.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold mb-2">Envíanos un mensaje</h2>
                <p className="text-slate-400">Responderemos en menos de 24 horas</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    placeholder="Tu Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="subject"
                  placeholder="Asunto"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />

                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  placeholder="Tu mensaje..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Enviar mensaje
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">Conecta con nosotros</h2>
                <p className="text-slate-400">Tenemos múltiples canales para ayudarte</p>
              </div>

              {responseInfo.map((info, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 8 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700 group-hover:border-emerald-500/50 transition">
                    <div className="text-2xl text-emerald-400 flex-shrink-0">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white">{info.title}</h3>
                      <p className="text-slate-400 text-sm mt-1">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Equipo apasionado por finanzas</h2>
            <p className="text-slate-400">Personas reales detrás de ZAI</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center space-y-3"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full" />
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-slate-400">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const contactChannels = [
  {
    icon: "💬",
    title: "Chat en Vivo",
    description: "Habla con nuestro equipo ahora",
    value: "Disponible 24/7",
  },
  {
    icon: "📧",
    title: "Email",
    description: "Respuesta garantizada en 24h",
    value: "hi@zai.app",
  },
  {
    icon: "📅",
    title: "Agenda una Demo",
    description: "Sesión personalizada con nuestro equipo",
    value: "15-30 minutos",
  },
];

const responseInfo = [
  {
    icon: "⚡",
    title: "Respuesta Rápida",
    description: "Nuestro equipo responde en menos de 2 horas",
  },
  {
    icon: "🎯",
    title: "Soluciones Directas",
    description: "No de bots, siempre personas reales",
  },
  {
    icon: "🤝",
    title: "Soporte Premium",
    description: "Cuenta con prioridad en tu cuenta",
  },
];

const teamMembers = [
  { name: "Carlos", role: "CEO & Fundador" },
  { name: "Ana", role: "CTO" },
  { name: "Miguel", role: "Product Lead" },
  { name: "Sofia", role: "Community Manager" },
];
