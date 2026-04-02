import type { Budget, Goal, Transaction, Account, Investment, DebtItem } from "../types/finance";

// ============ CUENTAS ============
export const accounts: Account[] = [
  {
    id: "acc-1",
    name: "Cuenta Corriente Principal",
    type: "checking",
    balance: 5_200_000,
    currency: "COP",
    lastUpdated: new Date(),
  },
  {
    id: "acc-2",
    name: "Cuenta de Ahorros",
    type: "savings",
    balance: 7_280_000,
    currency: "COP",
    lastUpdated: new Date(),
  },
  {
    id: "acc-3",
    name: "Fondo de Emergencia",
    type: "savings",
    balance: 3_400_000,
    currency: "COP",
    lastUpdated: new Date(),
  },
];

// ============ KPIs ============
export const kpis = [
  {
    label: "Saldo total",
    value: 12_480_000,
    delta: "+4.3%",
    detail: "Ultimos 30 dias",
  },
  {
    label: "Cashflow mensual",
    value: 1_920_000,
    delta: "+12.8%",
    detail: "Ingresos - gastos",
  },
  {
    label: "Ahorro proyectado",
    value: 6_400_000,
    delta: "+9.1%",
    detail: "Meta anual",
  },
];

// ============ TRANSACCIONES ============
export const transactions: Transaction[] = [
  {
    id: "tx-1",
    name: "Supermercado Aurora",
    category: "Hogar",
    amount: -124_800,
    date: "Hoy, 09:12",
    status: "cleared",
    type: "expense",
    tags: ["groceries"],
  },
  {
    id: "tx-2",
    name: "Nomina TechNova",
    category: "Ingresos",
    amount: 1_780_000,
    date: "Ayer, 18:30",
    status: "cleared",
    type: "income",
    recurring: true,
  },
  {
    id: "tx-3",
    name: "Suscripcion IA",
    category: "Herramientas",
    amount: -32_000,
    date: "Ayer, 08:05",
    status: "pending",
    type: "expense",
    tags: ["tools"],
    recurring: true,
  },
  {
    id: "tx-4",
    name: "Transporte",
    category: "Movilidad",
    amount: -18_400,
    date: "Mar 02, 19:44",
    status: "cleared",
    type: "expense",
  },
  {
    id: "tx-5",
    name: "Freelance Proyecto",
    category: "Ingresos",
    amount: 420_000,
    date: "Mar 01, 14:20",
    status: "cleared",
    type: "income",
  },
  {
    id: "tx-6",
    name: "Netflix",
    category: "Entretenimiento",
    amount: -29_990,
    date: "Feb 28, 10:00",
    status: "cleared",
    type: "expense",
    recurring: true,
  },
];

// ============ PRESUPUESTOS ============
export const budgets: Budget[] = [
  { 
    id: "bd-1", 
    name: "Hogar y servicios", 
    spent: 520_000, 
    limit: 780_000,
    category: "Housing",
    period: "monthly",
  },
  { 
    id: "bd-2", 
    name: "Movilidad", 
    spent: 120_000, 
    limit: 200_000,
    category: "Transport",
    period: "monthly",
  },
  { 
    id: "bd-3", 
    name: "Salud", 
    spent: 88_000, 
    limit: 150_000,
    category: "Health",
    period: "monthly",
  },
];

// ============ METAS ============
export const goals: Goal[] = [
  {
    id: "gl-1",
    title: "Fondo de emergencia",
    current: 3_400_000,
    target: 5_000_000,
    eta: "Ago 2026",
    category: "Emergency",
    priority: "high",
  },
  {
    id: "gl-2",
    title: "Viaje a Tokyo",
    current: 1_050_000,
    target: 2_500_000,
    eta: "Ene 2027",
    category: "Travel",
    priority: "medium",
  },
];

// ============ INVERSIONES ============
export const investments: Investment[] = [
  {
    id: "inv-1",
    name: "Fondo Indexado S&P 500",
    type: "funds",
    initialValue: 1_200_000,
    currentValue: 1_340_000,
    purchaseDate: new Date("2023-01-15"),
    expectedReturn: 8.5,
  },
  {
    id: "inv-2",
    name: "Bitcoin",
    type: "crypto",
    initialValue: 500_000,
    currentValue: 680_000,
    purchaseDate: new Date("2023-06-01"),
    expectedReturn: 25,
  },
];

// ============ DEUDAS ============
export const debts: DebtItem[] = [
  {
    id: "debt-1",
    name: "Crédito Hipotecario",
    principal: 85_000_000,
    interestRate: 4.5,
    monthlyPayment: 580_000,
    remainingMonths: 240,
    dueDate: new Date("2044-03-01"),
  },
  {
    id: "debt-2",
    name: "Préstamo Personal",
    principal: 3_500_000,
    interestRate: 12,
    monthlyPayment: 125_000,
    remainingMonths: 30,
    dueDate: new Date("2026-10-01"),
  },
];

// ============ FLUJO SEMANAL ============
export const weeklyFlow = [
  { day: "Lu", income: 140, expense: 60 },
  { day: "Ma", income: 80, expense: 92 },
  { day: "Mi", income: 180, expense: 70 },
  { day: "Ju", income: 120, expense: 110 },
  { day: "Vi", income: 220, expense: 130 },
  { day: "Sa", income: 90, expense: 150 },
  { day: "Do", income: 60, expense: 40 },
];
