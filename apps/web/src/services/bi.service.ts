import { biEngine } from "../lib/bi-engine";
import type {
  Transaction,
  Account,
  Budget,
  Goal,
  Investment,
  DebtItem,
  BISummary,
  KPI,
  Alert,
  Recommendation,
  CashFlowAnalysis,
  SpendingAnalysis,
  FinancialForecast,
} from "../types/finance";

/**
 * SERVICIOS BI - Capa de abstracción del motor BI
 * Expone funcionalidades de análisis financiero de forma amigable
 */

class BIService {
  /**
   * Obtener resumen financiero completo
   */
  getFinancialSummary(
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts: DebtItem[] = [],
    investments: Investment[] = []
  ): BISummary {
    return biEngine.generateBISummary(
      accounts,
      transactions,
      budgets,
      goals,
      debts,
      investments
    );
  }

  /**
   * DASHBOARD KPIs - Métricas principales
   */
  getDashboardKPIs(
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts: DebtItem[] = [],
    investments: Investment[] = []
  ): KPI[] {
    const kpis = biEngine.calculateKPIs(
      accounts,
      transactions,
      budgets,
      goals,
      debts,
      investments
    );
    return Object.values(kpis);
  }

  /**
   * Obtener un KPI específico
   */
  getKPI(
    kpiName: string,
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts: DebtItem[] = [],
    investments: Investment[] = []
  ): KPI | null {
    const kpis = biEngine.calculateKPIs(
      accounts,
      transactions,
      budgets,
      goals,
      debts,
      investments
    );
    return kpis[kpiName] || null;
  }

  /**
   * ANÁLISIS DE FLUJO DE CAJA
   */
  getCashFlowAnalysis(transactions: Transaction[], days: number = 30): CashFlowAnalysis {
    return biEngine.analyzeCashFlow(transactions, days);
  }

  /**
   * Obtener flujo semanal para gráfico
   */
  getWeeklyFlow(transactions: Transaction[]): Array<{
    day: string;
    income: number;
    expense: number;
  }> {
    const cashFlow = this.getCashFlowAnalysis(transactions, 7);

    if (cashFlow.periods.length === 0) {
      // Retornar semana por defecto si no hay datos
      return [
        { day: "Lu", income: 0, expense: 0 },
        { day: "Ma", income: 0, expense: 0 },
        { day: "Mi", income: 0, expense: 0 },
        { day: "Ju", income: 0, expense: 0 },
        { day: "Vi", income: 0, expense: 0 },
        { day: "Sa", income: 0, expense: 0 },
        { day: "Do", income: 0, expense: 0 },
      ];
    }

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const dayShorts = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

    return cashFlow.periods.slice(-7).map((period) => {
      const date = period.date;
      const dayOfWeek = date.getDay();
      const dayShort = dayShorts[dayOfWeek];

      return {
        day: dayShort,
        income: period.income > 0 ? Math.min(200, (period.income / 1000000) * 200) : 0,
        expense: period.expenses > 0 ? Math.min(200, (period.expenses / 1000000) * 200) : 0,
      };
    });
  }

  /**
   * ANÁLISIS DE GASTOS
   */
  getSpendingAnalysis(transactions: Transaction[], days: number = 30): SpendingAnalysis {
    return biEngine.analyzeSpending(transactions, days);
  }

  /**
   * Obtener desglose de gastos por categoría (para gráficos)
   */
  getSpendingByCategory(transactions: Transaction[]): Array<{
    category: string;
    amount: number;
    percentage: number;
  }> {
    const spending = this.getSpendingAnalysis(transactions);
    const total = Object.values(spending.byCategory).reduce((a, b) => a + b, 0);

    return Object.entries(spending.byCategory)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  /**
   * ANÁLISIS DE PRESUPUESTOS
   */
  getBudgetStatus(budgets: Budget[]): Array<{
    id: string;
    name: string;
    spent: number;
    limit: number;
    utilization: number;
    remaining: number;
    status: "ok" | "warning" | "exceeded";
  }> {
    const analyzed = biEngine.analyzeBudgets(budgets);
    return Object.values(analyzed);
  }

  /**
   * Obtener presupuesto específico
   */
  getBudget(budgetId: string, budgets: Budget[]): any {
    const budget = budgets.find((b) => b.id === budgetId);
    if (!budget) return null;

    const analyzed = biEngine.analyzeBudgets([budget]);
    return analyzed[budgetId];
  }

  /**
   * ANÁLISIS DE METAS
   */
  getGoalsStatus(goals: Goal[]): Array<{
    id: string;
    title: string;
    current: number;
    target: number;
    progress: number;
    remaining: number;
    daysRemaining: number;
    dailyRequired: number;
    onTrack: boolean;
  }> {
    return biEngine.analyzeGoals(goals);
  }

  /**
   * PATRIMONIO NETO
   */
  getNetWorth(accounts: Account[], debts: DebtItem[] = []): {
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
  } {
    return {
      totalAssets: biEngine.calculateTotalAssets(accounts),
      totalLiabilities: biEngine.calculateTotalLiabilities(debts),
      netWorth: biEngine.calculateNetWorth(accounts, debts),
    };
  }

  /**
   * PREDICCIONES
   */
  getForecast(
    accounts: Account[],
    transactions: Transaction[],
    goals: Goal[],
    debts: DebtItem[] = []
  ): FinancialForecast {
    return biEngine.generateForecast(accounts, transactions, goals, debts);
  }

  /**
   * ALERTAS
   */
  getAlerts(
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    debts: DebtItem[] = []
  ): Alert[] {
    return biEngine.generateAlerts(accounts, transactions, budgets, debts);
  }

  /**
   * Obtener alertas críticas solamente
   */
  getCriticalAlerts(
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    debts: DebtItem[] = []
  ): Alert[] {
    return this.getAlerts(accounts, transactions, budgets, debts).filter(
      (alert) => alert.priority === "critical" || alert.priority === "high"
    );
  }

  /**
   * RECOMENDACIONES
   */
  getRecommendations(
    accounts: Account[],
    transactions: Transaction[],
    goals: Goal[],
    budgets: Budget[] = [],
    debts: DebtItem[] = [],
    investments: Investment[] = []
  ): Recommendation[] {
    const summary = this.getFinancialSummary(
      accounts,
      transactions,
      budgets,
      goals,
      debts,
      investments
    );
    return summary.recommendations;
  }

  /**
   * ANÁLISIS POR PERÍODO
   */
  comparePeriods(
    transactions: Transaction[],
    period1Days: number = 30,
    period2Days: number = 60
  ): {
    current: { income: number; expenses: number; net: number };
    previous: { income: number; expenses: number; net: number };
    delta: { income: number; expenses: number; net: number };
    percentageChange: { income: number; expenses: number; net: number };
  } {
    const currentFlow = biEngine.analyzeCashFlow(transactions, period1Days);
    const previousFlow = biEngine.analyzeCashFlow(transactions, period2Days);

    return {
      current: {
        income: currentFlow.totalIncome,
        expenses: currentFlow.totalExpenses,
        net: currentFlow.netFlow,
      },
      previous: {
        income: previousFlow.totalIncome,
        expenses: previousFlow.totalExpenses,
        net: previousFlow.netFlow,
      },
      delta: {
        income: currentFlow.totalIncome - previousFlow.totalIncome,
        expenses: currentFlow.totalExpenses - previousFlow.totalExpenses,
        net: currentFlow.netFlow - previousFlow.netFlow,
      },
      percentageChange: {
        income:
          previousFlow.totalIncome > 0
            ? ((currentFlow.totalIncome - previousFlow.totalIncome) / previousFlow.totalIncome) *
              100
            : 0,
        expenses:
          previousFlow.totalExpenses > 0
            ? ((currentFlow.totalExpenses - previousFlow.totalExpenses) /
                previousFlow.totalExpenses) *
              100
            : 0,
        net:
          previousFlow.netFlow !== 0
            ? ((currentFlow.netFlow - previousFlow.netFlow) / Math.abs(previousFlow.netFlow)) *
              100
            : 0,
      },
    };
  }

  /**
   * SCORE FINANCIERO (0-100)
   */
  calculateFinancialScore(
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts: DebtItem[] = [],
    investments: Investment[] = []
  ): number {
    const kpis = biEngine.calculateKPIs(
      accounts,
      transactions,
      budgets,
      goals,
      debts,
      investments
    );

    let score = 50; // Base 50

    // Flujo positivo (+25)
    if (kpis.monthlyNetFlow.value > 0) {
      score += 25;
    }

    // Ahorro decent (+15)
    if (kpis.savingsRate.value >= 20) {
      score += 15;
    }

    // Presupuesto bajo control (+20)
    if (kpis.budgetUtilization.value < 80) {
      score += 20;
    }

    // Patrimonio positivo (+20)
    if (kpis.netWorth.value > 0) {
      score += 20;
    }

    // Sin deudas críticas (-10 si hay)
    if (debts.length === 0) {
      score += 10;
    }

    return Math.min(100, Math.max(0, score));
  }
}

// Exportar instancia singleton
export const biService = new BIService();
export type { BIService };
