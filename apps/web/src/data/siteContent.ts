export type MarketingBenefit = {
  icon: string;
  title: string;
  description: string;
};

export type MarketingStep = {
  title: string;
  detail: string;
};

export type MarketingTestimonial = {
  quote: string;
  author: string;
  company: string;
  label: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
  accent?: string;
};

export type ComparisonFeature = {
  feature: string;
  freemium: boolean;
  premium: boolean;
};

export type CampaignDefinition = {
  slug: string;
  title: string;
  description: string;
  focus: string;
  heroPoints: string[];
  highlights: string[];
  stats: { label: string; value: string }[];
};

export type BlogArticle = {
  title: string;
  category: string;
  summary: string;
  readingTime: string;
  tag: string;
};

export type OnboardingBlock = {
  title: string;
  detail: string;
  helper: string;
};

export type AssetGroup = {
  title: string;
  items: string[];
  purchaseValue: number;
  currentValue: number;
  premiumInsight: string;
};

export type MonetizationBenefit = {
  title: string;
  detail: string;
  icon: string;
};

export type IntelligenceInsight = {
  title: string;
  detail: string;
  tip: string;
};

export type AdminMetric = {
  label: string;
  value: string;
  trend: string;
  helper: string;
};

export type AdminUser = {
  name: string;
  email: string;
  plan: string;
  status: string;
  lastLogin: string;
};

export type AdminLog = {
  time: string;
  level: string;
  message: string;
};

export type AdminCategory = {
  name: string;
  usage: string;
  assignedTeams: string;
};

export type AdminPromotion = {
  title: string;
  reward: string;
  channel: string;
  status: string;
};

export type AdminSubscription = {
  user: string;
  plan: string;
  billing: string;
  status: string;
};

export type AdminAnalyticsRow = {
  feature: string;
  usage: string;
  trend: string;
};

export type SupportChannel = {
  title: string;
  detail: string;
  availability: string;
};

export type LegalSection = {
  title: string;
  detail: string;
};

export type SiteMapPage = {
  path: string;
  title: string;
  description: string;
};

export const marketingBenefits: MarketingBenefit[] = [
  {
    icon: "⚡",
    title: "Insights accionables",
    description: "La IA detecta fugas, propone recortes y sugiere aumentos de ahorro sin que muevas un dedo.",
  },
  {
    icon: "🧭",
    title: "Control en tiempo real",
    description: "Paneles con cashflow, score y alertas que se actualizan cada vez que entra un movimiento.",
  },
  {
    icon: "🧠",
    title: "Aprende y enseña",
    description: "Educación financiera contextual dentro de la app para que las decisiones sean más claras.",
  },
  {
    icon: "🤝",
    title: "Alianzas fuertes",
    description: "Cashback, descuentos y convenios con bancos, fintechs y aseguradoras sin salir de ZAI.",
  },
];

export const marketingSteps: MarketingStep[] = [
  {
    title: "1. Conecta tus cuentas",
    detail: "Agrupa bancos, tarjetas, efectivo y cuentas manuales con un solo clic.",
  },
  {
    title: "2. Define objetivos",
    detail: "Comparte metas, riesgos y prioridades para que la IA entienda tu estilo.",
  },
  {
    title: "3. Recibe recomendaciones",
    detail: "Alertas inteligentes, simulaciones y predicciones te mantienen en el carril.",
  },
];

export const marketingTestimonials: MarketingTestimonial[] = [
  {
    quote: "ZAI me mostró que gastaba 25% más en auto y me dio ideas para reducirlo sin sacrificar movilidad.",
    author: "Valentina R.",
    company: "Founders Collective",
    label: "Founder",
  },
  {
    quote: "Mis metas de inversión pasaron de difusas a claras en una semana gracias a los insights y simulaciones.",
    author: "Luis M.",
    company: "Freelancer",
    label: "Consultor",
  },
  {
    quote: "El score dinámico me ayudó a negociar tasas con el banco porque podía demostrar mi disciplina.",
    author: "Catalina P.",
    company: "Directora Financiera",
    label: "Executive",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Freemium",
    price: "$0",
    description: "Ideal para comenzar con automatización básica y tener una vista clara del flujo.",
    features: [
      "Dashboards básicos de cashflow y score",
      "Alertas en tiempo real (gastos altos y pagos pendientes)",
      "Sincronización manual con cuentas y transacciones",
    ],
  },
  {
    name: "Premium",
    price: "$14 / mes",
    description: "Todo lo del plan Freemium + IA proactiva, simulaciones y patrimonio activo.",
    features: [
      "Modelo IA de asesor financiero 24/7",
      "Predicción de flujo de caja y “qué pasaría si”",
      "Monitoreo de patrimonio con valor actual y comparaciones con pares",
    ],
    badge: "Recomendado",
    accent: "from-emerald-500/80 to-emerald-600/80",
  },
];

export const comparisonFeatures: ComparisonFeature[] = [
  { feature: "IA en cada recomendación", freemium: false, premium: true },
  { feature: "Score financiero dinámico", freemium: false, premium: true },
  { feature: "Valor comercial del patrimonio", freemium: false, premium: true },
  { feature: "Alertas básicas de gasto", freemium: true, premium: true },
  { feature: "Presupuestos y metas colaborativos", freemium: true, premium: true },
  { feature: "Simulador “qué pasaría si”", freemium: false, premium: true },
];

export const exclusiveBenefits: MonetizationBenefit[] = [
  {
    title: "IA estilo asesor financiero",
    detail: "Responde preguntas, propone acciones y simula escenarios antes de que gastes.",
    icon: "🧠",
  },
  {
    title: "Score financiero vivo",
    detail: "Se mueve con tus decisiones y te compara con pares del mismo perfil.",
    icon: "⭐",
  },
  {
    title: "Valor comercial del patrimonio",
    detail: "Conecta bienes, inversiones y deudas para mostrar cuánto podrías vender hoy.",
    icon: "🏦",
  },
];

export const campaignDefinitions: CampaignDefinition[] = [
  {
    slug: "controla",
    title: "Controla tus finanzas",
    description: "Encuentra dónde se va tu dinero, detén fugas y gana confianza gracias a paneles rituales diarios.",
    focus: "Enfócate en los gastos que te duelen más y recorta con reglas automáticas.",
    heroPoints: [
      "Detectamos fugas y proponemos ahorros concretos.",
      "Dashboards que muestran ingresos vs gastos en segundos.",
      "Alertas proactivas y consejos para alcanzar tu cashflow objetivo.",
    ],
    highlights: [
      "Presupuestos con seguimiento automático.",
      "Score dinámico y comparación con usuarios similares.",
    ],
    stats: [
      { label: "Promedio de ahorro extra", value: "+12% mensual" },
      { label: "Usuarios que reducen deudas", value: "78%" },
    ],
  },
  {
    slug: "sal-de-deudas",
    title: "Sal de deudas",
    description: "Visualiza todos tus créditos, prioriza pagos y usa simuladores para anticipar cuánto ahorrarías con cada estrategia.",
    focus: "Concerta pagos, redirige flujos y libera ingresos para otros sueños.",
    heroPoints: [
      "Comprueba cuánto te cuesta cada deuda con simuladores.",
      "Recomienda pagos mínimos y pagos extra inteligentes.",
      "Score de riesgo te ayuda a pactar mejores condiciones.",
    ],
    highlights: [
      "Alertas de vencimientos y pagos pendientes.",
      "Reglas automáticas para evitar cargos por mora.",
    ],
    stats: [
      { label: "Reducción media de intereses", value: "5.2 p.p." },
      { label: "Usuarios premium que consolidan", value: "63%" },
    ],
  },
  {
    slug: "invierte",
    title: "Invierte mejor",
    description: "Organiza portafolios, entiende rentabilidad y recibe recomendaciones de IA para cada clase de activo.",
    focus: "Combina tracking manual y análisis cuantitativo para tomar decisiones rápidas.",
    heroPoints: [
      "Tracking de acciones, ETFs y cripto en una sola vista.",
      "Alertas que te dicen cuándo rebalancear o tomar ganancias.",
      "Recomendaciones IA con ROI esperado y riesgo estimado.",
    ],
    highlights: [
      "Dashboard de rentabilidad y proyecciones.",
      "Comparte portafolios con tu asesor o equipo familiar.",
    ],
    stats: [
      { label: "Promedio ROI premium", value: "18.4% anual" },
      { label: "Alertas de oportunidad IA", value: "5 por semana" },
    ],
  },
];

export const blogArticles: BlogArticle[] = [
  {
    title: "Cómo crear un presupuesto que realmente se cumpla",
    category: "Educación financiera",
    summary: "Tips prácticos para empezar a planificar tu próximo ciclo y no reventar el límite del mes.",
    readingTime: "5 min",
    tag: "Educación",
  },
  {
    title: "Estrategias para renegociar deudas sin sabotear tu score",
    category: "Estrategias",
    summary: "Te enseñamos a priorizar pagos, negociar plazos y mantener tu score intacto.",
    readingTime: "6 min",
    tag: "Deudas",
  },
  {
    title: "Caso real: cómo una startup redujo costos en un 20%",
    category: "Casos reales",
    summary: "Usamos ZAI para identificar erogaciones de equipo y ganamos margen para invertir.",
    readingTime: "4 min",
    tag: "Casos",
  },
  {
    title: "Guía rápida para montar tu cartera balanceada",
    category: "Educación financiera",
    summary: "Combina activos líquidos, renta fija y renta variable sin perder liquidez.",
    readingTime: "7 min",
    tag: "Inversiones",
  },
  {
    title: "Qué hacer cuando el flujo se corta: checklist de emergencia",
    category: "Estrategias",
    summary: "Planifica un fondo de emergencia y activa alertas antes de que el cashflow rompa.",
    readingTime: "5 min",
    tag: "Crash",
  },
];

export const onboardingBlocks: OnboardingBlock[] = [
  {
    title: "Ingresos",
    detail: "Registra todos tus esquemas de ingreso: nómina, freelance, inversiones o emprendimientos.",
    helper: "Te ayuda a proyectar cashflow y ajustar metas.",
  },
  {
    title: "Gastos estimados",
    detail: "Categoriza tus gastos recurrentes y descubre desplazamientos de presupuesto.",
    helper: "La IA utiliza este dato para priorizar alertas.",
  },
  {
    title: "Objetivos",
    detail: "Define metas de viajes, ahorro, autos o inversión con fechas y prioridad.",
    helper: "El motor BI divide el objetivo en fracciones semanales.",
  },
  {
    title: "Nivel de riesgo",
    detail: "Indica cuánto estás dispuesto a moverte para obtener rentabilidad.",
    helper: "Influye en las recomendaciones de inversión y reservas.",
  },
];

export const assetCatalog: AssetGroup[] = [
  {
    title: "Bienes raíces",
    items: ["Casa", "Departamento", "Terreno"],
    purchaseValue: 82_000_000,
    currentValue: 88_600_000,
    premiumInsight: "Valor actual + rentas proyectadas con IA.",
  },
  {
    title: "Vehículos",
    items: ["Auto", "Moto", "Camioneta"],
    purchaseValue: 28_400_000,
    currentValue: 23_100_000,
    premiumInsight: "Estimación de depreciación anual y sugerencias de valor.",
  },
  {
    title: "Tecnología",
    items: ["Laptop", "PC", "Equipos caros"],
    purchaseValue: 8_700_000,
    currentValue: 7_900_000,
    premiumInsight: "Monitorea seguros, garantías y valor de reposición.",
  },
  {
    title: "Inversiones",
    items: ["Acciones", "ETFs", "Cripto"],
    purchaseValue: 12_500_000,
    currentValue: 14_100_000,
    premiumInsight: "IA sugiere cuándo rebalancear por clase de activo.",
  },
  {
    title: "Otros patrimonios",
    items: ["Bicicletas", "Coleccionables", "Negocios"],
    purchaseValue: 4_300_000,
    currentValue: 5_200_000,
    premiumInsight: "Valorizamos activos únicos con estimaciones de mercado.",
  },
];

export const monetizationBenefits: MonetizationBenefit[] = [
  {
    title: "Cashback instantáneo",
    detail: "Recupera parte de tus gastos en partners aprobados sin salir de la app.",
    icon: "💸",
  },
  {
    title: "Descuentos personalizados",
    detail: "Ofertas en seguros, fintechs y comercio que se ajustan a tu score.",
    icon: "🎁",
  },
  {
    title: "Convenios estratégicos",
    detail: "Alianzas con bancos y wallets para reducir costos por transferencia.",
    icon: "🤝",
  },
  {
    title: "Afiliados inteligentes",
    detail: "La IA recomienda productos con base en tu riesgo y flujo.",
    icon: "🧠",
  },
];

export const intelligenceInsights: IntelligenceInsight[] = [
  {
    title: "Estás gastando 30% más en Movilidad",
    detail: "El promedio de tu categoría supera al de usuarios similares.",
    tip: "Activa reglas automáticas para mover fondos a presupuesto alternativo.",
  },
  {
    title: "Puedes ahorrar $120.000 este mes",
    detail: "Cancelando dos suscripciones inactivas y moviendo pagos a días de alto cashflow.",
    tip: "La IA ya preparó un plan de acciones en tu sección de recomendaciones.",
  },
  {
    title: "Score financiero en 82/100",
    detail: "Estás dentro del top 15% de usuarios con disciplina en presupuestos.",
    tip: "Invierte una parte en cartera balanceada para seguir mejorando el score.",
  },
];

export const adminMetrics: AdminMetric[] = [
  {
    label: "Usuarios activos",
    value: "18.2K",
    trend: "+6% vs semana anterior",
    helper: "Usuarios con login en los últimos 14 días.",
  },
  {
    label: "Retención mensual",
    value: "83%",
    trend: "+1.4 p.p.",
    helper: "Usuarios que volvieron después de 30 días.",
  },
  {
    label: "MRR",
    value: "$54K",
    trend: "+12% crecimiento",
    helper: "Facturación recurrente neta (Premium).",
  },
  {
    label: "Uso de features",
    value: "72% de usuarios",
    trend: "Dashboards + Inteligencia",
    helper: "Tiempo promedio por sesión.",
  },
];

export const adminUsers: AdminUser[] = [
  {
    name: "Valentina Rocha",
    email: "valentina@zai.app",
    plan: "Premium",
    status: "Activo",
    lastLogin: "Hoy, 08:12",
  },
  {
    name: "Mateo Silva",
    email: "mateo@yolo.studio",
    plan: "Freemium",
    status: "Activo",
    lastLogin: "Ayer, 21:03",
  },
  {
    name: "Camila Torres",
    email: "camila@grupoaltel.com",
    plan: "Premium",
    status: "Bloqueado",
    lastLogin: "Mar 30, 12:44",
  },
];

export const adminLogs: AdminLog[] = [
  { time: "08:14", level: "info", message: "Integración con banco X completada." },
  { time: "08:09", level: "warning", message: "Intento de login fallido desde Lima." },
  { time: "07:58", level: "error", message: "Webhook de pagos retornó 504." },
  { time: "07:45", level: "info", message: "Campaña cashback en revisión." },
];

export const adminCategories: AdminCategory[] = [
  { name: "Hogar y servicios", usage: "72% del presupuesto", assignedTeams: "Product & Finance" },
  { name: "Movilidad", usage: "34% del presupuesto", assignedTeams: "Product" },
  { name: "Inversión", usage: "45% del presupuesto", assignedTeams: "AI Lab" },
];

export const adminPromotions: AdminPromotion[] = [
  {
    title: "Cashback fintech ZAI Card",
    reward: "5% cashback en categorías clave",
    channel: "Tarjetas + Wallets",
    status: "Activo",
  },
  {
    title: "Seguro hogar + Assist",
    reward: "10% off + primas flexibles",
    channel: "Afiliados",
    status: "Programado",
  },
];

export const adminSubscriptions: AdminSubscription[] = [
  { user: "Startup Atlas", plan: "Premium", billing: "Mensual", status: "Activo" },
  { user: "EducaHoy", plan: "Premium", billing: "Anual", status: "Renovación 05/06" },
  { user: "EquipoGoals", plan: "Freemium", billing: "Gratis", status: "Downgrade pendiente" },
];

export const adminAnalytics: AdminAnalyticsRow[] = [
  { feature: "Dashboard", usage: "95% clicks", trend: "↗️" },
  { feature: "Inteligencia/IA", usage: "67% uso semanal", trend: "↗️" },
  { feature: "Alertas", usage: "48% abren notificaciones", trend: "↘️" },
  { feature: "Beneficios", usage: "32% activa cashback", trend: "↗️" },
];

export const supportChannels: SupportChannel[] = [
  { title: "FAQ", detail: "Guías paso a paso para configurar todo sin llamadas", availability: "Siempre disponible" },
  { title: "Chat en vivo", detail: "Expertos financieros responden en segundos", availability: "9h - 21h CLT" },
  { title: "Tickets", detail: "Seguimiento prioritario con SLA de 4 horas", availability: "Mon - Fri" },
];

export const legalSections: LegalSection[] = [
  { title: "Términos de servicio", detail: "Cobertura global, enfoque en redes financieras y responsabilidad limitada." },
  { title: "Política de privacidad", detail: "Cifrado de extremo a extremo, datos en Chile y mecanismo de consentimiento granular." },
  { title: "Cookies y telemetría", detail: "Telmetría anónima que mejora recomendaciones sin exponer datos." },
];

export const siteMapSections: Record<string, SiteMapPage[]> = {
  public: [
    { path: "/", title: "Landing principal", description: "Hero, beneficios y CTA" },
    { path: "/home", title: "Home alternativa", description: "Resumen ligero y acceso rápido" },
    { path: "/features", title: "Funcionalidades", description: "IA, dashboards y alertas" },
    { path: "/pricing", title: "Planes y precios", description: "Comparativa Freemium vs Premium" },
    { path: "/about", title: "Sobre nosotros", description: "Visión, misión y diferencial" },
    { path: "/blog", title: "Blog", description: "Educación financiera y casos" },
    { path: "/contact", title: "Contacto", description: "Email y demos" },
    { path: "/landing/controla", title: "Landing Controla tus finanzas", description: "Focus en flujo" },
    { path: "/landing/sal-de-deudas", title: "Landing Sal de deudas", description: "Créditos y simuladores" },
    { path: "/landing/invierte", title: "Landing Invierte mejor", description: "Inversiones inteligentes" },
  ],
  onboarding: [
    { path: "/onboarding", title: "Onboarding inicial", description: "Ingresos, gastos, metas y riesgo" },
  ],
  app: [
    { path: "/app/dashboard", title: "Dashboard", description: "Score, cashflow y alertas" },
    { path: "/app/accounts", title: "Cuentas", description: "Bancos, tarjetas y efectivo" },
    { path: "/app/transactions", title: "Transacciones", description: "Historial y reglas automáticas" },
    { path: "/app/assets", title: "Patrimonio", description: "Activos con valor actual" },
    { path: "/app/budgets", title: "Presupuestos", description: "Límites con alertas" },
    { path: "/app/goals", title: "Metas", description: "Viajes, casa y fondo" },
    { path: "/app/investments", title: "Inversiones", description: "Portafolio y rentabilidad" },
    { path: "/app/debts", title: "Créditos y deudas", description: "Simuladores y planes" },
    { path: "/app/credit-simulator", title: "Simulador", description: "Qué pasaría si..." },
    { path: "/app/benefits", title: "Beneficios", description: "Cashback y convenios" },
    { path: "/app/intelligence", title: "Inteligencia / IA", description: "Insights y recomendaciones" },
    { path: "/app/intelligence/score", title: "Score financiero", description: "Score dinámico" },
    { path: "/app/intelligence/ai-chat", title: "AI chat", description: "Asesor de texto" },
    { path: "/app/alerts", title: "Alertas", description: "Pagos pendientes y gastos altos" },
    { path: "/app/settings", title: "Configuración", description: "Perfil, seguridad y plan" },
  ],
  admin: [
    { path: "/admin/dashboard", title: "Panel admin", description: "Usuarios activos y MRR" },
    { path: "/admin/users", title: "Usuarios", description: "Ver, bloquear y editar" },
    { path: "/admin/logs", title: "Logs", description: "Errores y actividad" },
    { path: "/admin/categories", title: "Categorías", description: "Crear y editar categorías" },
    { path: "/admin/benefits", title: "Beneficios", description: "Promociones y afiliados" },
    { path: "/admin/subscriptions", title: "Suscripciones", description: "Pagos y facturación" },
    { path: "/admin/analytics", title: "Analytics", description: "Funnel y uso" },
  ],
  support: [
    { path: "/help", title: "Help", description: "Guías, chat y tickets" },
    { path: "/faq", title: "FAQ", description: "Preguntas frecuentes" },
    { path: "/support", title: "Soporte", description: "Equipo humano" },
    { path: "/terms", title: "Términos", description: "Condiciones legales" },
    { path: "/privacy", title: "Privacidad", description: "Política de cookies" },
    { path: "/pages", title: "Mapa de páginas", description: "Todos los accesos" },
  ],
};

