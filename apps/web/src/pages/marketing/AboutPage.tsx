import type { ComponentType, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BrainCircuit,
  HeartHandshake,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

type Principle = {
  title: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
};

type Milestone = {
  year: string;
  title: string;
  detail: string;
};

type TeamRole = {
  role: string;
  focus: string;
};

type TrustItem = {
  label: string;
  value: string;
  helper: string;
};

const PRINCIPLES: Principle[] = [
  {
    title: "Datos que se entienden en minutos",
    detail: "Transformamos dashboards financieros complejos en decisiones claras para el dia a dia.",
    icon: BarChart3,
  },
  {
    title: "IA explicable y accionable",
    detail: "No solo sugerimos: mostramos por que una recomendacion te ayuda a gastar mejor y ahorrar mas.",
    icon: BrainCircuit,
  },
  {
    title: "Seguridad de nivel fintech",
    detail: "Privacidad, control de acceso y trazabilidad en cada operacion sensible del producto.",
    icon: ShieldCheck,
  },
  {
    title: "Acompanamiento humano",
    detail: "Combinamos tecnologia y criterio para ayudarte a sostener mejores habitos financieros.",
    icon: HeartHandshake,
  },
];

const MILESTONES: Milestone[] = [
  {
    year: "2024",
    title: "Problema real, primer prototipo",
    detail: "Detectamos que la mayoria no sabe si gasta mas de lo que gana hasta que ya es tarde.",
  },
  {
    year: "2025",
    title: "Plataforma unificada",
    detail: "Integramos presupuestos, transacciones, analitica e IA en una sola experiencia.",
  },
  {
    year: "2026",
    title: "Capa de inteligencia financiera",
    detail: "Evolucionamos a recomendaciones predictivas y alertas anticipadas por contexto.",
  },
];

const TEAM: TeamRole[] = [
  {
    role: "Producto y UX",
    focus: "Definimos experiencias simples para decisiones financieras complejas.",
  },
  {
    role: "Data + IA",
    focus: "Convertimos datos en modelos de recomendacion claros y auditables.",
  },
  {
    role: "Ingenieria Fintech",
    focus: "Construimos una base segura, estable y escalable para operaciones criticas.",
  },
];

const TRUST: TrustItem[] = [
  {
    label: "Usuarios activos",
    value: "18K+",
    helper: "Personas usando ZAI mes a mes",
  },
  {
    label: "Disponibilidad",
    value: "99.9%",
    helper: "Plataforma operativa de forma continua",
  },
  {
    label: "Eventos analizados",
    value: "2.8M+",
    helper: "Movimientos procesados para insights",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/12 via-slate-500/5 to-emerald-500/12 p-6 md:p-8">
          <p className="section-title">Sobre ZAI</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold text-white md:text-5xl">
            Ayudamos a personas y equipos a tomar mejores decisiones con inteligencia financiera real
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            ZAI es una plataforma que une dashboards, presupuestos, analitica e IA para responder una pregunta simple:
            si tus decisiones de hoy te estan acercando o alejando de tu tranquilidad financiera.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fintech-first</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">IA responsable</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Diseno orientado a decisiones</span>
          </div>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
          <TrustKpi icon={<Users className="h-4 w-4" />} label="Usuarios activos" value="18K+" helper="Gestionan sus finanzas cada mes" />
          <TrustKpi icon={<Bell className="h-4 w-4" />} label="Alertas inteligentes" value="420K+" helper="Alertas preventivas enviadas" />
          <TrustKpi icon={<Lock className="h-4 w-4" />} label="Confiabilidad" value="99.9%" helper="Disponibilidad de plataforma" />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="glass-panel p-6">
          <p className="section-title">Proposito</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Por que existe ZAI</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            La mayoria de las personas no tiene una vision clara de su dinero en tiempo real. Eso genera decisiones reactivas,
            estres financiero y poco margen para crecer. ZAI existe para devolver control con datos comprensibles y accion inmediata.
          </p>
        </article>

        <article className="glass-panel p-6">
          <p className="section-title">Mision</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Convertir complejidad en claridad accionable</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Disenamos una experiencia que combina analitica, presupuestos e inteligencia para que cada usuario sepa que hacer hoy,
            sin tener que interpretar hojas de calculo ni reportes tecnicos.
          </p>
        </article>
      </section>

      <section className="glass-panel p-6">
        <p className="section-title">Diferencial</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Lo que nos hace distintos en fintech personal</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-cyan-500/10"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-300">{item.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.3fr,1fr]">
        <article className="glass-panel p-6">
          <p className="section-title">Historia</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">De una frustracion comun a un sistema de decision diaria</h2>

          <div className="mt-5 space-y-3">
            {MILESTONES.map((item) => (
              <article key={item.year} className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-200">{item.year}</span>
                  <span className="text-xs text-slate-500">Hito</span>
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="glass-panel p-6">
          <p className="section-title">Equipo</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Un equipo interdisciplinario</h2>
          <p className="mt-2 text-sm text-slate-300">Producto, data y tecnologia trabajando sobre un mismo objetivo: salud financiera sostenible.</p>

          <div className="mt-4 space-y-3">
            {TEAM.map((member) => (
              <article key={member.role} className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30">
                <h3 className="text-sm font-semibold text-white">{member.role}</h3>
                <p className="mt-1 text-sm text-slate-300">{member.focus}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="glass-panel p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="section-title">Prueba social</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Confianza construida con resultados y consistencia</h2>
          </div>
          <Sparkles className="hidden h-5 w-5 text-cyan-200 md:block" />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {TRUST.map((item) => (
            <article key={item.label} className="rounded-xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-cyan-300/30">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
              <p className="mt-1 text-xs text-slate-400">{item.helper}</p>
            </article>
          ))}
        </div>

        <blockquote className="mt-4 rounded-xl border border-cyan-300/25 bg-cyan-500/10 p-4 text-sm text-cyan-100">
          "Con ZAI pasamos de mirar movimientos sueltos a decidir con contexto. Hoy sabemos exactamente donde ajustar para ahorrar mas sin friccion."
        </blockquote>
      </section>

      <section className="glass-panel p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-title">Siguiente paso</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Conoce ZAI desde dentro</h3>
            <p className="mt-1 text-sm text-slate-300">Prueba gratuita para ver dashboards, presupuestos e inteligencia financiera en accion.</p>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Crear cuenta gratis
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Hablar con el equipo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustKpi({
  icon,
  label,
  value,
  helper,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-500/10">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
        <span className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-200">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{helper}</p>
    </article>
  );
}
