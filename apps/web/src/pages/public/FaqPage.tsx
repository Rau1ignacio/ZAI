const faqs = [
  {
    question: "¿Cómo conecto una cuenta bancaria?",
    answer: "Usa el botón conectar bancos dentro del dashboard y sigue la verificación segura.",
  },
  {
    question: "¿Qué incluye el plan Premium?",
    answer: "IA 24/7, score dinámico, predicciones de flujo y monitoreo de patrimonio premium.",
  },
  {
    question: "¿Cómo funcionan las alertas?",
    answer: "Se activan cuando superas un presupuesto, hay pagos pendientes o detectamos gastos altos.",
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">FAQ</p>
        <h1 className="text-3xl font-semibold text-white">Preguntas frecuentes</h1>
        <p className="mt-2 text-sm text-slate-300">Respuestas claras para seguir creciendo.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((item) => (
          <div key={item.question} className="glass-panel p-5">
            <p className="text-sm font-semibold text-white">{item.question}</p>
            <p className="mt-2 text-xs text-slate-400">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
