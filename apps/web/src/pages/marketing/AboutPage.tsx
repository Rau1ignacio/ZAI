export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Sobre nosotros</p>
        <h1 className="text-3xl font-semibold text-white">Visión + Diferencial</h1>
        <p className="mt-3 text-sm text-slate-300">
          ZAI nace para acompañar a emprendedores y familias en el crecimiento económico. Nos enfocamos
          en entregar claridad financiera, educación contextual y acciones automáticas sin perder el toque humano.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.6em] text-slate-500">Visión</p>
          <h2 className="mt-3 text-lg font-semibold text-white">Crecer con claridad</h2>
          <p className="mt-2 text-sm text-slate-300">
            Convertir cada dato en un plan y cada plan en alivio para el día a día del
            usuario moderno.
          </p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.6em] text-slate-500">Misión</p>
          <h2 className="mt-3 text-lg font-semibold text-white">Educación + Acción</h2>
          <p className="mt-2 text-sm text-slate-300">
            Integrar IA, datos y educación financiera para que decisiones complejas sean automáticas
            y responsables.
          </p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.6em] text-slate-500">Diferencial</p>
          <h2 className="mt-3 text-lg font-semibold text-white">IA + datos + educación</h2>
          <p className="mt-2 text-sm text-slate-300">
            Automáticamente contextualizamos tu flujo de caja, comparamos con otros usuarios y
            ofrecemos micro-lecciones que empoderan decisiones inmediatas.
          </p>
        </div>
      </section>

      <section className="glass-panel p-6 space-y-3">
        <p className="section-title">Valores</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <h3 className="text-lg font-semibold text-white">Confianza</h3>
            <p className="text-sm text-slate-300">
              Cifrado de extremo a extremo, revisamos cada integración y garantizamos
              privacidad transparente.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <h3 className="text-lg font-semibold text-white">Educación</h3>
            <p className="text-sm text-slate-300">
              Contenido curado, guías y notificaciones contextualizadas para mantenerte actualizado.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs text-slate-500">IA + datos</p>
            <p className="text-xl font-bold text-white">24/7</p>
            <p className="text-sm text-slate-300">Insights en tiempo real</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs text-slate-500">Educación</p>
            <p className="text-xl font-bold text-white">30+ guías</p>
            <p className="text-sm text-slate-300">Actualizadas semanalmente</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs text-slate-500">Alianzas</p>
            <p className="text-xl font-bold text-white">20+</p>
            <p className="text-sm text-slate-300">Comercios, fintechs y seguros</p>
          </div>
        </div>
      </section>
    </div>
  );
}
