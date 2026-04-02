import { create } from "zustand";
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
} from "../types/finance";
import { biService } from "../services/bi.service";

interface BIState {
  // Data
  summary: BISummary | null;
  kpis: Record<string, KPI>;
  alerts: Alert[];
  financialScore: number;

  // Loading states
  isLoading: boolean;
  isSummaryLoading: boolean;

  // Update methods
  updateSummary: (
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts?: DebtItem[],
    investments?: Investment[]
  ) => Promise<void>;

  updateKPIs: (
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts?: DebtItem[],
    investments?: Investment[]
  ) => Promise<void>;

  updateAlerts: (
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    debts?: DebtItem[]
  ) => Promise<void>;

  updateFinancialScore: (
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts?: DebtItem[],
    investments?: Investment[]
  ) => Promise<void>;

  // Refresh all
  refreshAllData: (
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    goals: Goal[],
    debts?: DebtItem[],
    investments?: Investment[]
  ) => Promise<void>;

  // Reset
  reset: () => void;
}

export const useBIStore = create<BIState>((set) => ({
  summary: null,
  kpis: {},
  alerts: [],
  financialScore: 50,
  isLoading: false,
  isSummaryLoading: false,

  updateSummary: async (
    accounts,
    transactions,
    budgets,
    goals,
    debts = [],
    investments = []
  ) => {
    set({ isSummaryLoading: true });
    try {
      const summary = biService.getFinancialSummary(
        accounts,
        transactions,
        budgets,
        goals,
        debts,
        investments
      );
      set({ summary: summary, isSummaryLoading: false });
    } catch (error) {
      console.error("Error updating BI summary:", error);
      set({ isSummaryLoading: false });
    }
  },

  updateKPIs: async (
    accounts,
    transactions,
    budgets,
    goals,
    debts = [],
    investments = []
  ) => {
    try {
      const kpiArray = biService.getDashboardKPIs(
        accounts,
        transactions,
        budgets,
        goals,
        debts,
        investments
      );
      const kpis = kpiArray.reduce(
        (acc, kpi) => {
          acc[kpi.label] = kpi;
          return acc;
        },
        {} as Record<string, KPI>
      );
      set({ kpis });
    } catch (error) {
      console.error("Error updating KPIs:", error);
    }
  },

  updateAlerts: async (accounts, transactions, budgets, debts = []) => {
    try {
      const alerts = biService.getAlerts(accounts, transactions, budgets, debts);
      set({ alerts });
    } catch (error) {
      console.error("Error updating alerts:", error);
    }
  },

  updateFinancialScore: async (
    accounts,
    transactions,
    budgets,
    goals,
    debts = [],
    investments = []
  ) => {
    try {
      const score = biService.calculateFinancialScore(
        accounts,
        transactions,
        budgets,
        goals,
        debts,
        investments
      );
      set({ financialScore: score });
    } catch (error) {
      console.error("Error updating financial score:", error);
    }
  },

  refreshAllData: async (
    accounts,
    transactions,
    budgets,
    goals,
    debts = [],
    investments = []
  ) => {
    set({ isLoading: true });
    try {
      await Promise.all([
        // Crear promesas simuladas para que sea asincrónico
        new Promise((resolve) => {
          const summary = biService.getFinancialSummary(
            accounts,
            transactions,
            budgets,
            goals,
            debts,
            investments
          );
          set({ summary });
          resolve(null);
        }),
        new Promise((resolve) => {
          const kpiArray = biService.getDashboardKPIs(
            accounts,
            transactions,
            budgets,
            goals,
            debts,
            investments
          );
          const kpis = kpiArray.reduce(
            (acc, kpi) => {
              acc[kpi.label] = kpi;
              return acc;
            },
            {} as Record<string, KPI>
          );
          set({ kpis });
          resolve(null);
        }),
        new Promise((resolve) => {
          const alerts = biService.getAlerts(accounts, transactions, budgets, debts);
          set({ alerts });
          resolve(null);
        }),
        new Promise((resolve) => {
          const score = biService.calculateFinancialScore(
            accounts,
            transactions,
            budgets,
            goals,
            debts,
            investments
          );
          set({ financialScore: score });
          resolve(null);
        }),
      ]);
      set({ isLoading: false });
    } catch (error) {
      console.error("Error refreshing BI data:", error);
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({
      summary: null,
      kpis: {},
      alerts: [],
      financialScore: 50,
      isLoading: false,
      isSummaryLoading: false,
    });
  },
}));
