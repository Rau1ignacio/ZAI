// ============ TRANSACCIONES ============
export type TransactionType = "income" | "expense" | "investment" | "debt_payment";

export type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  status: "cleared" | "pending";
  type?: TransactionType;
  tags?: string[];
  recurring?: boolean;
  recurringPattern?: "daily" | "weekly" | "monthly" | "yearly";
};

// ============ PRESUPUESTOS ============
export type Budget = {
  id: string;
  name: string;
  spent: number;
  limit: number;
  category?: string;
  currency?: string;
  period?:
    | "daily"
    | "weekly"
    | "monthly"
    | "quarterly"
    | "yearly"
    | "annual";
  frequency?: "daily" | "weekly" | "monthly" | "annual";
  budgetType?: "fixed" | "variable";
};

// ============ METAS ============
export type Goal = {
  id: string;
  title: string;
  current: number;
  target: number;
  eta: string;
  category?: string;
  priority?: "low" | "medium" | "high";
};

// ============ CUENTAS ============
export type Account = {
  id: string;
  name: string;
  type: "checking" | "savings" | "investment" | "crypto" | "cash";
  balance: number;
  currency: string;
  lastUpdated: Date;
};

// ============ KPIs E INDICADORES ============
export type KPI = {
  label: string;
  value: number;
  delta: string;
  detail: string;
  trend?: "up" | "down" | "stable";
  threshold?: number;
};

// ============ FLUJO DE CAJA ============
export type CashFlowPeriod = {
  period: string; // "2024-01", "W1", "Mon", etc
  income: number;
  expenses: number;
  net: number;
  date: Date;
};

export type CashFlowAnalysis = {
  totalIncome: number;
  totalExpenses: number;
  netFlow: number;
  averageDailyFlow: number;
  flowByCategory: Record<string, number>;
  periods: CashFlowPeriod[];
};

// ============ ANÁLISIS DE GASTOS ============
export type SpendingAnalysis = {
  byCategory: Record<string, number>;
  byType: Record<string, number>;
  top5Categories: Array<{ category: string; amount: number; percentage: number }>;
  monthlyAverage: number;
  anomalies: string[];
};

// ============ DEUDA E INVERSIONES ============
export type DebtItem = {
  id: string;
  name: string;
  principal: number;
  interestRate: number;
  monthlyPayment: number;
  remainingMonths: number;
  dueDate: Date;
};

export type Investment = {
  id: string;
  name: string;
  type: "stocks" | "bonds" | "crypto" | "reits" | "funds";
  initialValue: number;
  currentValue: number;
  purchaseDate: Date;
  expectedReturn?: number;
};

// ============ PREDICCIONES Y PROYECCIONES ============
export type Projection = {
  period: string;
  projectedBalance: number;
  confidence: number; // 0-100
  scenario: "conservative" | "realistic" | "optimistic";
};

export type FinancialForecast = {
  projections: Projection[];
  riskLevel: "low" | "medium" | "high";
  recommendations: string[];
  nextMilestone?: Date;
};

// ============ ALERTAS Y RECOMENDACIONES ============
export type Alert = {
  id: string;
  type: "warning" | "info" | "success" | "critical";
  title: string;
  message: string;
  timestamp: Date;
  priority: "low" | "high" | "critical";
};

export type Recommendation = {
  id: string;
  category: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  actionUrl?: string;
};

// ============ RESUMEN BI GENERAL ============
export type BISummary = {
  accounts: Account[];
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  cashFlowAnalysis: CashFlowAnalysis;
  spendingAnalysis: SpendingAnalysis;
  investments: Investment[];
  debts: DebtItem[];
  forecast: FinancialForecast;
  alerts: Alert[];
  recommendations: Recommendation[];
  kpis: Record<string, KPI>;
  lastUpdated: Date;
};
