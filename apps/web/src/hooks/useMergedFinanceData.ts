import { useState, useEffect } from "react";
import { useFinanceData } from "./useFinanceData";
import { accounts as mockAccounts, budgets as mockBudgets, goals as mockGoals, transactions as mockTransactions, debts as mockDebts, investments as mockInvestments } from "../data/mock";
import type { Account, Budget, Goal, Transaction, DebtItem, Investment } from "../types/finance";

interface MergedDataHookReturn {
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  debts: DebtItem[];
  investments: Investment[];
  isLoading: boolean;
}

/**
 * Hook que combina datos de mock con datos de localStorage
 * Permite que el dashboard se actualice en tiempo real cuando se agregan datos
 */
export const useMergedFinanceData = (): MergedDataHookReturn => {
  const { transactions: storageTransactions, budgets: storageBudgets, goals: storageGoals } = useFinanceData();

  const [isLoading, setIsLoading] = useState(false);

  // Combinar datos de mock con datos del localStorage
  const transactions = [...mockTransactions, ...storageTransactions];
  const budgets = [...(storageBudgets || [])];
  const goals = [...(storageGoals || [])];

  // Actualizar spent de presupuestos basado en transacciones
  const updatedBudgets = budgets.map((budget) => {
    const spent = transactions
      .filter(
        (tx) => tx.type === "expense" && tx.category === budget.category && tx.amount < 0
      )
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    return {
      ...budget,
      spent,
    };
  });

  return {
    accounts: mockAccounts,
    transactions,
    budgets: updatedBudgets,
    goals,
    debts: mockDebts,
    investments: mockInvestments,
    isLoading,
  };
};
