import { useState, useEffect, useMemo } from "react";
import { biService } from "../services/bi.service";
import type {
  Transaction,
  Account,
  Budget,
  Goal,
  Investment,
  DebtItem,
  KPI,
  Alert,
  Recommendation,
  CashFlowAnalysis,
  SpendingAnalysis,
  FinancialForecast,
  BISummary,
} from "../types/finance";

/**
 * HOOKS BI - Hooks React para consumir datos del motor BI
 * Estos hooks manejan estado, cálculos y actualizaciones
 */

/**
 * Hook principal: Obtiene el resumen financiero completo
 */
export function useBISummary(
  accounts: Account[],
  transactions: Transaction[],
  budgets: Budget[],
  goals: Goal[],
  debts: DebtItem[] = [],
  investments: Investment[] = []
) {
  const [summary, setSummary] = useState<BISummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      const result = biService.getFinancialSummary(
        accounts,
        transactions,
        budgets,
        goals,
        debts,
        investments
      );
      setSummary(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error generating BI summary");
    } finally {
      setIsLoading(false);
    }
  }, [accounts, transactions, budgets, goals, debts, investments]);

  return { summary, isLoading, error };
}

/**
 * Hook: Obtiene KPIs para el dashboard
 */
export function useDashboardKPIs(
  accounts: Account[],
  transactions: Transaction[],
  budgets: Budget[],
  goals: Goal[],
  debts: DebtItem[] = [],
  investments: Investment[] = []
) {
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      const result = biService.getDashboardKPIs(
        accounts,
        transactions,
        budgets,
        goals,
        debts,
        investments
      );
      setKPIs(result);
    } catch (err) {
      console.error("Error loading KPIs:", err);
    } finally {
      setIsLoading(false);
    }
  }, [accounts, transactions, budgets, goals, debts, investments]);

  return { kpis, isLoading };
}

/**
 * Hook: Obtiene análisis de flujo de caja
 */
export function useCashFlowAnalysis(
  transactions: Transaction[],
  days: number = 30
) {
  const analysis = useMemo(
    () => biService.getCashFlowAnalysis(transactions, days),
    [transactions, days]
  );

  return analysis;
}

/**
 * Hook: Obtiene flujo semanal (para gráficos)
 */
export function useWeeklyFlow(transactions: Transaction[]) {
  const weeklyFlow = useMemo(
    () => biService.getWeeklyFlow(transactions),
    [transactions]
  );

  return weeklyFlow;
}

/**
 * Hook: Obtiene análisis de gastos
 */
export function useSpendingAnalysis(
  transactions: Transaction[],
  days: number = 30
) {
  const analysis = useMemo(
    () => biService.getSpendingAnalysis(transactions, days),
    [transactions, days]
  );

  return analysis;
}

/**
 * Hook: Obtiene gastos por categoría (para gráficos pie/bar)
 */
export function useSpendingByCategory(transactions: Transaction[]) {
  const spending = useMemo(
    () => biService.getSpendingByCategory(transactions),
    [transactions]
  );

  return spending;
}

/**
 * Hook: Obtiene status de presupuestos
 */
export function useBudgetStatus(budgets: Budget[]) {
  const status = useMemo(
    () => biService.getBudgetStatus(budgets),
    [budgets]
  );

  return status;
}

/**
 * Hook: Obtiene status de metas
 */
export function useGoalsStatus(goals: Goal[]) {
  const status = useMemo(
    () => biService.getGoalsStatus(goals),
    [goals]
  );

  return status;
}

/**
 * Hook: Obtiene patrimonio neto
 */
export function useNetWorth(
  accounts: Account[],
  debts: DebtItem[] = []
) {
  const netWorth = useMemo(
    () => biService.getNetWorth(accounts, debts),
    [accounts, debts]
  );

  return netWorth;
}

/**
 * Hook: Obtiene pronóstico/forecast
 */
export function useForecast(
  accounts: Account[],
  transactions: Transaction[],
  goals: Goal[],
  debts: DebtItem[] = []
) {
  const forecast = useMemo(
    () => biService.getForecast(accounts, transactions, goals, debts),
    [accounts, transactions, goals, debts]
  );

  return forecast;
}

/**
 * Hook: Obtiene alertas
 */
export function useAlerts(
  accounts: Account[],
  transactions: Transaction[],
  budgets: Budget[],
  debts: DebtItem[] = []
) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      const result = biService.getAlerts(accounts, transactions, budgets, debts);
      setAlerts(result);
    } catch (err) {
      console.error("Error loading alerts:", err);
    } finally {
      setIsLoading(false);
    }
  }, [accounts, transactions, budgets, debts]);

  return { alerts, isLoading };
}

/**
 * Hook: Obtiene alertas críticas solamente
 */
export function useCriticalAlerts(
  accounts: Account[],
  transactions: Transaction[],
  budgets: Budget[],
  debts: DebtItem[] = []
) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    try {
      const result = biService.getCriticalAlerts(
        accounts,
        transactions,
        budgets,
        debts
      );
      setAlerts(result);
    } catch (err) {
      console.error("Error loading critical alerts:", err);
    }
  }, [accounts, transactions, budgets, debts]);

  return alerts;
}

/**
 * Hook: Obtiene recomendaciones
 */
export function useRecommendations(
  accounts: Account[],
  transactions: Transaction[],
  goals: Goal[],
  budgets: Budget[] = [],
  debts: DebtItem[] = [],
  investments: Investment[] = []
) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    try {
      const result = biService.getRecommendations(
        accounts,
        transactions,
        goals,
        budgets,
        debts,
        investments
      );
      setRecommendations(result);
    } catch (err) {
      console.error("Error loading recommendations:", err);
    }
  }, [accounts, transactions, goals, budgets, debts, investments]);

  return recommendations;
}

/**
 * Hook: Compara períodos
 */
export function usePeriodComparison(
  transactions: Transaction[],
  period1Days: number = 30,
  period2Days: number = 60
) {
  const comparison = useMemo(
    () => biService.comparePeriods(transactions, period1Days, period2Days),
    [transactions, period1Days, period2Days]
  );

  return comparison;
}

/**
 * Hook: Calcula score financiero
 */
export function useFinancialScore(
  accounts: Account[],
  transactions: Transaction[],
  budgets: Budget[],
  goals: Goal[],
  debts: DebtItem[] = [],
  investments: Investment[] = []
) {
  const score = useMemo(
    () =>
      biService.calculateFinancialScore(
        accounts,
        transactions,
        budgets,
        goals,
        debts,
        investments
      ),
    [accounts, transactions, budgets, goals, debts, investments]
  );

  return score;
}

/**
 * Hook agregado: Todo lo que el Dashboard necesita
 * Usa este hook como punto de entrada principal
 */
export function useDashboardData(
  accounts: Account[],
  transactions: Transaction[],
  budgets: Budget[],
  goals: Goal[],
  debts: DebtItem[] = [],
  investments: Investment[] = []
) {
  const { kpis, isLoading: kpisLoading } = useDashboardKPIs(
    accounts,
    transactions,
    budgets,
    goals,
    debts,
    investments
  );

  const weeklyFlow = useWeeklyFlow(transactions);
  const cashFlow = useCashFlowAnalysis(transactions, 30);
  const spending = useSpendingAnalysis(transactions, 30);
  const budgetStatus = useBudgetStatus(budgets);
  const goalsStatus = useGoalsStatus(goals);
  const netWorth = useNetWorth(accounts, debts);
  const forecast = useForecast(accounts, transactions, goals, debts);
  const { alerts, isLoading: alertsLoading } = useAlerts(
    accounts,
    transactions,
    budgets,
    debts
  );
  const { summary } = useBISummary(
    accounts,
    transactions,
    budgets,
    goals,
    debts,
    investments
  );
  const financialScore = useFinancialScore(
    accounts,
    transactions,
    budgets,
    goals,
    debts,
    investments
  );

  const isLoading = kpisLoading || alertsLoading;

  return {
    kpis,
    weeklyFlow,
    cashFlow,
    spending,
    budgetStatus,
    goalsStatus,
    netWorth,
    forecast,
    alerts,
    summary,
    financialScore,
    isLoading,
  };
}
