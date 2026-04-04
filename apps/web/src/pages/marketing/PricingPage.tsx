import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, CheckCircle2, ChevronDown, Sparkles, ShieldCheck, TrendingUp, Zap } from "lucide-react";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  name: string;
  subtitle: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyEquivalent: number;
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  features: string[];
};

type ComparisonRow = {
  feature: string;
  free: string;
  pro: string;
  premium: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    subtitle: "Para empezar a ordenar tus finanzas",
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyEquivalent: 0,
    cta: "Comenzar gratis",
    ctaHref: "/auth/register",
    features: [
      "Dashboard financiero esencial",
      "Hasta 3 presupuestos activos",
      "Registro manual de transacciones",
      "Alertas basicas de gasto",
    ],
  },
  {
    name: "Pro",
    subtitle: "Para tomar decisiones con mas control",
    monthlyPrice: 14,
    yearlyPrice: 134,
    yearlyEquivalent: 11,
    cta: "Elegir Pro",
    ctaHref: "/auth/register",
    highlighted: true,
    badge: "Mas elegido",
    features: [
      "Presupuestos y categorias ilimitadas",
      "Alertas inteligentes en tiempo real",
      "Analisis de tendencias por categoria",
      "Proyeccion de flujo de caja a 90 dias",
      "Recomendaciones IA para ahorro",
    ],
  },
  {
    name: "Premium",
    subtitle: "Para optimizar patrimonio y crecimiento",
    monthlyPrice: 29,
    yearlyPrice: 278,
    yearlyEquivalent: 23,
    cta: "Activar Premium",
    ctaHref: "/auth/register",
    badge: "IA avanzada",
    features: [
      "Todo lo de Pro",
      "Score financiero dinamico",
      "Escenarios de inversion y deuda",
      "Reportes ejecutivos exportables",
      "Soporte prioritario",
    ],
  },
];

const comparisonRows: ComparisonRow[] = [
  { feature: "Dashboards financieros", free: "Esencial", pro: "Avanzado", premium: "Avanzado + IA" },
  { feature: "Presupuestos", free: "3", pro: "Ilimitados", premium: "Ilimitados" },
  { feature: "Alertas", free: "Basicas", pro: "Inteligentes", premium: "Predictivas" },
  { feature: "Analisis por categorias", free: "No", pro: "Si", premium: "Si" },
  { feature: "Proyecciones", free: "No", pro: "90 dias", premium: "365 dias" },
  { feature: "Score financiero IA", free: "No", pro: "No", premium: "Si" },
  { feature: "Soporte", free: "Comunidad", pro: "Email prioritario", premium: "Prioritario + 1:1" },
];

const faqItems: FaqItem[] = [
  {
    question: "Puedo cambiar de plan cuando quiera?",
    answer: "Si. Puedes hacer upgrade o downgrade en cualquier momento desde Configuracion > Suscripcion.",
  },
  {
    question: "Que pasa si supero mi limite de presupuesto?",
    answer: "ZAI mantiene tus datos y activa alertas reforzadas. No se bloquea la cuenta ni se pierden registros.",
  },
  {
    question: "El plan anual tiene permanencia?",
    answer: "No hay contrato de permanencia. El plan anual optimiza precio, pero puedes cancelar la renovacion automatica cuando quieras.",
  },
  {
    question: "Mis datos estan protegidos?",
    answer: "Si. Aplicamos cifrado en transito y en reposo, politicas de minimo privilegio y monitoreo continuo.",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<string | null>(faqItems[0]?.question ?? null);

  const savingsText = useMemo(() => {
    if (billing !== "yearly") {
      return "";
    }

    const pro = plans.find((plan) => plan.name === "Pro");
    if (!pro) {
      return "";
    }

    const monthlyYearCost = pro.monthlyPrice * 12;
    const saved = monthlyYearCost - pro.yearlyPrice;
    return `Ahorra ${saved} USD al ano con Pro anual`;
  }, [billing]);

  return (
    <div className="space-y-8">
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/12 via-slate-500/5 to-emerald-500/12 p-6 md:p-8">
          <p className="section-title">Planes</p>
          <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Elige el plan que mejor convierte tu data en decisiones</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Estructura clara, precios transparentes y valor medible desde la primera semana. Empieza gratis y escala cuando quieras.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Sin permanencia</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Cancela cuando quieras</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Onboarding en menos de 3 min</span>
          </div>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-3 md:p-6">
          <KpiStat icon={<TrendingUp className="h-4 w-4" />} label="Upgrade a pago" value="31%" helper="Primeros 45 dias" />
          <KpiStat icon={<ShieldCheck className="h-4 w-4" />} label="Confiabilidad" value="99.9%" helper="Uptime plataforma" />
          <KpiStat icon={<Zap className="h-4 w-4" />} label="Tiempo a valor" value="< 7 dias" helper="Primer insight accionable" />
        </div>
      </section>

      <section className="glass-panel p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-title">Facturacion</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Mensual o anual</h2>
            <p className="mt-1 text-sm text-slate-300">Activa anual para reducir costo por mes y mejorar retorno.</p>
          </div>

          <div className="inline-flex rounded-xl border border-white/10 bg-slate-900/70 p-1">
            <BillingButton label="Mensual" active={billing === "monthly"} onClick={() => setBilling("monthly")} />
            <BillingButton label="Anual" active={billing === "yearly"} onClick={() => setBilling("yearly")} />
          </div>
        </div>

        {billing === "yearly" && savingsText ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {savingsText}
          </p>
        ) : null}

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyEquivalent;
            const period = billing === "monthly" ? "/mes" : "/mes (facturado anual)";

            return (
              <article
                key={plan.name}
                className={`group relative rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 ${
                  plan.highlighted
                    ? "border-cyan-300/40 bg-cyan-500/10"
                    : "border-white/10 bg-slate-900/60 hover:border-cyan-300/25"
                }`}
              >
                {plan.badge ? (
                  <span className="absolute right-4 top-4 rounded-full bg-cyan-500/20 px-3 py-1 text-[11px] font-semibold text-cyan-100">
                    {plan.badge}
                  </span>
                ) : null}

                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 pr-16 text-sm text-slate-300">{plan.subtitle}</p>

                <div className="mt-5 flex items-end gap-2">
                  <p className="text-4xl font-bold tracking-tight text-white transition group-hover:text-cyan-200">${price}</p>
                  <p className="pb-1 text-xs text-slate-400">{period}</p>
                </div>

                {billing === "yearly" && plan.monthlyPrice > 0 ? (
                  <p className="mt-1 text-xs text-emerald-300">Cobro anual ${plan.yearlyPrice}</p>
                ) : null}

                <ul className="mt-5 space-y-2 text-sm text-slate-200">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.ctaHref}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                      : "border border-white/15 bg-white/5 text-slate-100 hover:border-cyan-400/40 hover:text-cyan-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="glass-panel p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="section-title">Comparativa</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Que obtienes en cada plan</h3>
          </div>
          <span className="hidden text-xs text-slate-400 md:inline">Decision rapida en menos de 2 minutos</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Feature</th>
                <th className="px-4 py-3 text-center">Free</th>
                <th className="px-4 py-3 text-center text-cyan-200">Pro</th>
                <th className="px-4 py-3 text-center">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-200">
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="hover:bg-white/5">
                  <td className="px-4 py-3 font-medium text-white">{row.feature}</td>
                  <td className="px-4 py-3 text-center">{row.free}</td>
                  <td className="px-4 py-3 text-center font-semibold text-cyan-200">{row.pro}</td>
                  <td className="px-4 py-3 text-center">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel p-6">
        <p className="section-title">FAQ</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Preguntas frecuentes antes de activar</h3>

        <div className="mt-5 space-y-3">
          {faqItems.map((item) => {
            const isOpen = openFaq === item.question;

            return (
              <article
                key={item.question}
                className={`rounded-xl border transition ${isOpen ? "border-cyan-300/35 bg-cyan-500/5" : "border-white/10 bg-white/5"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : item.question)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-semibold text-white">{item.question}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-300 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden px-4 text-sm text-slate-300 transition-all ${isOpen ? "max-h-40 pb-4" : "max-h-0"}`}>
                  {item.answer}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="glass-panel p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-title">CTA final</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Empieza gratis hoy, escala cuando veas valor</h3>
            <p className="mt-1 text-sm text-slate-300">Onboarding guiado, migracion simple y soporte para tus primeros insights de ahorro.</p>
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Hablar con ventas
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function KpiStat({ icon, label, value, helper }: { icon: ReactNode; label: string; value: string; helper: string }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
        <span className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-200">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{helper}</p>
    </article>
  );
}

function BillingButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-cyan-500 text-slate-950" : "text-slate-300 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
