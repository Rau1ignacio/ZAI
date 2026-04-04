const topics: Record<string, { title: string; description: string; advice: string }> = {
  score: {
    title: "Score financiero",
    description: "Dinámico, con factores de pagos, metas e inversiones.",
    advice: "Aumenta el ahorro programado para subir 3 puntos en 30 días.",
  },
  comparison: {
    title: "Comparación con pares",
    description: "Vemos usuarios similares y te mostramos cómo reequilibrar.",
    advice: "Mantén gastos en movilidad por debajo del 25% del ingreso.",
  },
  insights: {
    title: "Insights IA",
    description: "Alertas automáticas con pasos inmediatos.",
    advice: "Activa las reglas automáticas para tus categorías frecuentes.",
  },
  predictions: {
    title: "Predicción de flujo",
    description: "Simulamos cómo se comporta tu cashflow hasta 90 días",
    advice: "Programa ahorros antes de los picos de gastos anticipados.",
  },
  simulator: {
    title: "Qué pasaría si...",
    description: "Explora escenarios de gastos, inversiones y deuda.",
    advice: "Evalúa escenarios antes de tomar decisiones con impacto mayor a 180k.",
  },
  "ai-chat": {
    title: "Chat IA",
    description: "Úsalo como un asesor que responde con contexto.",
    advice: "Pregunta por tácticas concretas de ahorro, inversión y riesgo.",
  },
};

type IntelligenceTopicPageProps = {
  topic: keyof typeof topics;
};

export default function IntelligenceTopicPage({ topic }: IntelligenceTopicPageProps) {
  const details = topics[topic];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-3">
        <p className="section-title">Inteligencia / IA</p>
        <h1 className="text-3xl font-semibold text-white">{details.title}</h1>
        <p className="text-sm text-slate-300">{details.description}</p>
      </div>
      <div className="glass-panel p-6 text-sm text-slate-300">
        <p className="font-semibold text-white">Consejo</p>
        <p>{details.advice}</p>
      </div>
    </div>
  );
}
