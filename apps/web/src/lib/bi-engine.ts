import type {
  Transaction,
  Account,
  Budget,
  Goal,
  Investment,
  DebtItem,
  CashFlowAnalysis,
  CashFlowPeriod,
  SpendingAnalysis,
  FinancialForecast,
  Projection,
  Alert,
  Recommendation,
  KPI,
  BISummary,
} from "../types/finance";

/**
 * BI ENGINE - Motor de inteligencia de negocios financieros
 * Responsable de:
 * - Cálculos y agregaciones
 * - Análisis de patrones
 * - Detección de anomalías
 * - Predicciones y proyecciones
 * - Generación de alertas
 */

class BIEngine {
  /**
   * SECCIÓN 1: CÁLCULOS BÁSICOS
   */

  // Calcula el balance neto de todas las cuentas
  calculateNetWorth(accounts: Account[], debts: DebtItem[]): number {
    const totalAssets = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalLiabilities = debts.reduce((sum, debt) => sum + debt.principal, 0);
    return totalAssets - totalLiabilities;
  }

  // Calcula total de assets
  calculateTotalAssets(accounts: Account[]): number {
    return accounts.reduce((sum, acc) => acc.balance > 0 ? sum + acc.balance : sum, 0);
  }

  // Calcula total de liabilities
  calculateTotalLiabilities(debts: DebtItem[]): number {
    return debts.reduce((sum, debt) => sum + debt.principal, 0);
  }

  /**
   * SECCIÓN 2: ANÁLISIS DE FLUJO DE CAJA
   */

  analyzeCashFlow(transactions: Transaction[], days: number = 30): CashFlowAnalysis {
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    // Filtrar transacciones dentro del período
    const relevantTxs = transactions.filter((tx) => {
      const txDate = this.parseDate(tx.date);
      return txDate >= startDate;
    });

    let totalIncome = 0;
    let totalExpenses = 0;
    const flowByCategory: Record<string, number> = {};
    const periods: CashFlowPeriod[] = [];

    relevantTxs.forEach((tx) => {
      if (tx.amount > 0) {
        totalIncome += tx.amount;
      } else {
        totalExpenses += Math.abs(tx.amount);
      }

      flowByCategory[tx.category] = (flowByCategory[tx.category] || 0) + tx.amount;
    });

    // Agrupar por día
    const byDay: Record<string, { income: number; expenses: number }> = {};
    relevantTxs.forEach((tx) => {
      const date = this.parseDate(tx.date);
      const dayKey = date.toISOString().split("T")[0];

      if (!byDay[dayKey]) {
        byDay[dayKey] = { income: 0, expenses: 0 };
      }

      if (tx.amount > 0) {
        byDay[dayKey].income += tx.amount;
      } else {
        byDay[dayKey].expenses += Math.abs(tx.amount);
      }
    });

    Object.entries(byDay).forEach(([day, { income, expenses }]) => {
      periods.push({
        period: day,
        income,
        expenses,
        net: income - expenses,
        date: new Date(day),
      });
    });

    const netFlow = totalIncome - totalExpenses;
    const averageDailyFlow = days > 0 ? netFlow / days : 0;

    return {
      totalIncome,
      totalExpenses,
      netFlow,
      averageDailyFlow,
      flowByCategory,
      periods: periods.sort((a, b) => b.date.getTime() - a.date.getTime()),
    };
  }

  /**
   * SECCIÓN 3: ANÁLISIS DE GASTOS
   */

  analyzeSpending(transactions: Transaction[], days: number = 30): SpendingAnalysis {
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const expenses = transactions.filter(
      (tx) => tx.amount < 0 && this.parseDate(tx.date) >= startDate
    );

    const byCategory: Record<string, number> = {};
    const byType: Record<string, number> = {};

    expenses.forEach((tx) => {
      const amount = Math.abs(tx.amount);
      byCategory[tx.category] = (byCategory[tx.category] || 0) + amount;
      const type = tx.type || "expense";
      byType[type] = (byType[type] || 0) + amount;
    });

    // Top 5 categorías
    const top5Categories = Object.entries(byCategory)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / Object.values(byCategory).reduce((a, b) => a + b, 0)) * 100,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    const totalExpenses = Object.values(byCategory).reduce((a, b) => a + b, 0);
    const monthlyAverage = totalExpenses;

    // Detectar anomalías (gastos > 2 desviaciones estándar)
    const anomalies = this.detectAnomalies(expenses);

    return {
      byCategory,
      byType,
      top5Categories,
      monthlyAverage,
      anomalies,
    };
  }

  /**
   * SECCIÓN 4: PRESUPUESTOS Y CONTROL
   */

  analyzeBudgets(budgets: Budget[]): Record<string, any> {
    return budgets.reduce((acc, budget) => {
      const utilization = (budget.spent / budget.limit) * 100;
      const remaining = budget.limit - budget.spent;
      const status = utilization > 100 ? "exceeded" : utilization > 80 ? "warning" : "ok";

      acc[budget.id] = {
        ...budget,
        utilization: Math.round(utilization),
        remaining,
        status,
      };

      return acc;
    }, {} as Record<string, any>);
  }

  /**
   * SECCIÓN 5: METAS Y HITOS
   */

  analyzeGoals(goals: Goal[]): Record<string, any> {
    return goals.map((goal) => {
      const progress = (goal.current / goal.target) * 100;
      const remaining = goal.target - goal.current;
      const etaDate = new Date(goal.eta);
      const daysRemaining = Math.ceil((etaDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      const dailyRequired = remaining > 0 ? remaining / Math.max(daysRemaining, 1) : 0;

      return {
        ...goal,
        progress: Math.round(progress),
        remaining,
        daysRemaining,
        dailyRequired,
        onTrack: dailyRequired > 0 ? true : progress >= 100,
      };
    });
  }

  /**
   * SECCIÓN 6: INDICADORES CLAVE (KPIs)
   */

  calculateKPIs(
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts: DebtItem[],
    investments: Investment[]
  ): Record<string, KPI> {
    const cashFlow = this.analyzeCashFlow(transactions, 30);
    const spending = this.analyzeSpending(transactions, 30);
    const netWorth = this.calculateNetWorth(accounts, debts);
    const lastMonth = this.analyzeCashFlow(transactions, 30);
    const previousMonth = this.analyzeCashFlow(transactions, 60);

    const totalAssets = this.calculateTotalAssets(accounts);
    const totalInvested = investments.reduce((sum, inv) => sum + inv.currentValue, 0);

    // Variación porcentual
    const monthlyGrowth = previousMonth.netFlow > 0
      ? ((lastMonth.netFlow - previousMonth.netFlow) / previousMonth.netFlow) * 100
      : 0;

    const budgetUtilization =
      (budgets.reduce((sum, b) => sum + b.spent, 0) /
        budgets.reduce((sum, b) => sum + b.limit, 0)) *
      100;

    const goalsProgress = goals.length > 0
      ? (goals.reduce((sum, g) => sum + g.current, 0) /
          goals.reduce((sum, g) => sum + g.target, 0)) *
        100
      : 0;

    const savingsRate = cashFlow.totalIncome > 0
      ? ((cashFlow.netFlow / cashFlow.totalIncome) * 100)
      : 0;

    return {
      netWorth: {
        label: "Patrimonio neto",
        value: netWorth,
        delta: `${monthlyGrowth > 0 ? "+" : ""}${monthlyGrowth.toFixed(1)}%`,
        detail: "Últimos 30 días",
        trend: monthlyGrowth > 0 ? "up" : monthlyGrowth < 0 ? "down" : "stable",
      },
      monthlyNetFlow: {
        label: "Flujo neto mensual",
        value: cashFlow.netFlow,
        delta: `${cashFlow.netFlow > 0 ? "+" : ""}${cashFlow.netFlow.toFixed(0)}`,
        detail: "Ingresos - Gastos",
        trend: cashFlow.netFlow > 0 ? "up" : "down",
      },
      totalAssets: {
        label: "Activos totales",
        value: totalAssets,
        delta: `${((totalAssets / (totalAssets + 1000)) * 100).toFixed(1)}%`,
        detail: "Cuentas + Inversiones",
      },
      savingsRate: {
        label: "Tasa de ahorro",
        value: savingsRate,
        delta: `${savingsRate.toFixed(1)}%`,
        detail: "% del ingreso ahorrado",
        threshold: 20, // Meta del 20%
      },
      budgetUtilization: {
        label: "Utilización presupuesto",
        value: budgetUtilization,
        delta: `${budgetUtilization.toFixed(1)}%`,
        detail: "Gastos vs límite",
        threshold: 80,
      },
      goalsProgress: {
        label: "Progreso de metas",
        value: goalsProgress,
        delta: `${goalsProgress.toFixed(1)}%`,
        detail: "Avance acumulado",
      },
      investmentReturn: {
        label: "Retorno inversiones",
        value: totalInvested,
        delta: "+5.2%",
        detail: "Rendimiento YTD",
      },
    };
  }

  /**
   * SECCIÓN 7: PREDICCIONES Y PROYECCIONES
   */

  generateForecast(
    accounts: Account[],
    transactions: Transaction[],
    goals: Goal[],
    debts: DebtItem[]
  ): FinancialForecast {
    const cashFlow = this.analyzeCashFlow(transactions, 30);
    const avgMonthlyFlow = cashFlow.netFlow;

    // Proyecciones para los próximos 12 meses
    const projections: Projection[] = [];
    let currentBalance = this.calculateTotalAssets(accounts);

    for (let month = 1; month <= 12; month++) {
      const scenarioVariation = 0.1 * month; // Varía según mes
      const projectedBalance = currentBalance + avgMonthlyFlow * month;

      projections.push({
        period: `M${month}`,
        projectedBalance: Math.max(0, projectedBalance),
        confidence: Math.max(40, 100 - month * 5), // Confianza decrece
        scenario: "realistic",
      });
    }

    // Agregar escenarios
    const conservative = projections.map((p) => ({
      ...p,
      projectedBalance: p.projectedBalance * 0.85,
      scenario: "conservative" as const,
    }));

    const optimistic = projections.map((p) => ({
      ...p,
      projectedBalance: p.projectedBalance * 1.15,
      scenario: "optimistic" as const,
    }));

    // Determinar riesgo
    let riskLevel: "low" | "medium" | "high" = "low";
    if (avgMonthlyFlow < 0) {
      riskLevel = currentBalance + avgMonthlyFlow * 6 < 0 ? "high" : "medium";
    }

    return {
      projections: [...conservative, ...projections, ...optimistic],
      riskLevel,
      recommendations: this.generateRecommendations(
        cashFlow,
        avgMonthlyFlow,
        currentBalance,
        riskLevel
      ),
    };
  }

  /**
   * SECCIÓN 8: ALERTAS
   */

  generateAlerts(
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    debts: DebtItem[]
  ): Alert[] {
    const alerts: Alert[] = [];
    const now = new Date();

    // Alerta 1: Saldo bajo
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    if (totalBalance < 100_000) {
      alerts.push({
        id: "alert-low-balance",
        type: "critical",
        title: "Saldo crítico",
        message: `Tu saldo total es de ${totalBalance.toLocaleString()}. Considera revisar tus gastos.`,
        timestamp: now,
        priority: "critical",
      });
    }

    // Alerta 2: Presupuesto excedido
    budgets.forEach((budget) => {
      if (budget.spent > budget.limit) {
        alerts.push({
          id: `alert-budget-${budget.id}`,
          type: "warning",
          title: `Presupuesto ${budget.name} excedido`,
          message: `Has gastado ${budget.spent.toLocaleString()} de ${budget.limit.toLocaleString()}`,
          timestamp: now,
          priority: "high",
        });
      }
    });

    // Alerta 3: Flujo negativo
    const cashFlow = this.analyzeCashFlow(transactions, 7);
    if (cashFlow.netFlow < 0) {
      alerts.push({
        id: "alert-negative-flow",
        type: "warning",
        title: "Flujo de caja negativo",
        message: "En los últimos 7 días gastas más de lo que ingresas",
        timestamp: now,
        priority: "high",
      });
    }

    // Alerta 4: Deuda próxima a vencer
    debts.forEach((debt) => {
      if (debt.remainingMonths <= 3) {
        alerts.push({
          id: `alert-debt-due-${debt.id}`,
          type: "info",
          title: `Deuda ${debt.name} próxima a vencer`,
          message: `Vence en ${debt.remainingMonths} meses. Pago mensual: ${debt.monthlyPayment.toLocaleString()}`,
          timestamp: now,
          priority: "high",
        });
      }
    });

    return alerts;
  }

  /**
   * SECCIÓN 9: RECOMENDACIONES
   */

  private generateRecommendations(
    cashFlow: CashFlowAnalysis,
    avgMonthlyFlow: number,
    currentBalance: number,
    riskLevel: string
  ): string[] {
    const recommendations: string[] = [];

    if (cashFlow.totalExpenses > cashFlow.totalIncome * 0.8) {
      recommendations.push(
        "Tu ratio de gastos es alto. Considera revisar presupuestos y reducir gastos innecesarios."
      );
    }

    if (avgMonthlyFlow > 0) {
      recommendations.push(
        `Tienes flujo positivo de ${avgMonthlyFlow.toLocaleString()}/mes. Considera invertir el excedente.`
      );
    } else {
      recommendations.push("Tu flujo es negativo. Aumenta ingresos o reduce gastos urgentemente.");
    }

    if (riskLevel === "high") {
      recommendations.push("Tu índice de riesgo es alto. Revisa tu estrategia financiera.");
    }

    return recommendations;
  }

  /**
   * SECCIÓN 10: UTILIDADES
   */

  private parseDate(dateStr: string): Date {
    // Soporta formatos como "Hoy, 09:12", "Ayer, 18:30", "Mar 02, 19:44"
    const today = new Date();
    if (dateStr.includes("Hoy")) {
      return today;
    }
    if (dateStr.includes("Ayer")) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    }
    return new Date(dateStr);
  }

  private detectAnomalies(transactions: Transaction[]): string[] {
    if (transactions.length < 3) return [];

    const amounts = transactions.map((t) => Math.abs(t.amount));
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const variance =
      amounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);

    const anomalies: string[] = [];
    transactions.forEach((tx) => {
      const zScore = Math.abs((Math.abs(tx.amount) - mean) / stdDev);
      if (zScore > 2) {
        anomalies.push(`${tx.name}: ${Math.abs(tx.amount).toLocaleString()} (inusual)`);
      }
    });

    return anomalies;
  }

  /**
   * SECCIÓN 11: SÍNTESIS GENERAL
   */

  generateBISummary(
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts: DebtItem[],
    investments: Investment[]
  ): BISummary {
    const now = new Date();

    return {
      accounts,
      totalAssets: this.calculateTotalAssets(accounts),
      totalLiabilities: this.calculateTotalLiabilities(debts),
      netWorth: this.calculateNetWorth(accounts, debts),
      cashFlowAnalysis: this.analyzeCashFlow(transactions),
      spendingAnalysis: this.analyzeSpending(transactions),
      investments,
      debts,
      forecast: this.generateForecast(accounts, transactions, goals, debts),
      alerts: this.generateAlerts(accounts, transactions, budgets, debts),
      recommendations: this.generateRecommendations(
        this.analyzeCashFlow(transactions),
        this.analyzeCashFlow(transactions).netFlow,
        this.calculateTotalAssets(accounts),
        "medium"
      ).map((text, idx) => ({ id: `rec-${idx}`, category: "Finance", title: text, description: text, impact: "high" })),
      kpis: this.calculateKPIs(accounts, transactions, budgets, goals, debts, investments),
      lastUpdated: now,
    };
  }
}

// Exportar instancia singleton
export const biEngine = new BIEngine();
export type { BIEngine };
