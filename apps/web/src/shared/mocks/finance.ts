import type { Budget, Goal, Transaction } from "../types/finance";

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

export const transactions: Transaction[] = [
  {
    id: "tx-1",
    name: "Supermercado Aurora",
    category: "Hogar",
    amount: -124_800,
    date: "Hoy, 09:12",
    status: "cleared",
  },
  {
    id: "tx-2",
    name: "Nomina TechNova",
    category: "Ingresos",
    amount: 1_780_000,
    date: "Ayer, 18:30",
    status: "cleared",
  },
  {
    id: "tx-3",
    name: "Suscripcion IA",
    category: "Herramientas",
    amount: -32_000,
    date: "Ayer, 08:05",
    status: "pending",
  },
  {
    id: "tx-4",
    name: "Transporte",
    category: "Movilidad",
    amount: -18_400,
    date: "Mar 02, 19:44",
    status: "cleared",
  },
];

export const budgets: Budget[] = [
  { id: "bd-1", name: "Hogar y servicios", spent: 520_000, limit: 780_000 },
  { id: "bd-2", name: "Movilidad", spent: 120_000, limit: 200_000 },
  { id: "bd-3", name: "Salud", spent: 88_000, limit: 150_000 },
];

export const goals: Goal[] = [
  {
    id: "gl-1",
    title: "Fondo de emergencia",
    current: 3_400_000,
    target: 5_000_000,
    eta: "Ago 2026",
  },
  {
    id: "gl-2",
    title: "Viaje a Tokyo",
    current: 1_050_000,
    target: 2_500_000,
    eta: "Ene 2027",
  },
];

export const weeklyFlow = [
  { day: "Lu", income: 140, expense: 60 },
  { day: "Ma", income: 80, expense: 92 },
  { day: "Mi", income: 180, expense: 70 },
  { day: "Ju", income: 120, expense: 110 },
  { day: "Vi", income: 220, expense: 130 },
  { day: "Sa", income: 90, expense: 150 },
  { day: "Do", income: 60, expense: 40 },
];
