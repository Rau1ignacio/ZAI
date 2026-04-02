import { useState, useEffect } from "react";
import type { Transaction, Budget, Goal, Account } from "../types/finance";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEYS = {
  TRANSACTIONS: "zai_transactions",
  BUDGETS: "zai_budgets",
  GOALS: "zai_goals",
  ACCOUNTS: "zai_accounts",
};

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  // Cargar datos desde localStorage al montar
  useEffect(() => {
    const loadedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    const loadedBudgets = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    const loadedGoals = localStorage.getItem(STORAGE_KEYS.GOALS);
    const loadedAccounts = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);

    if (loadedTransactions) setTransactions(JSON.parse(loadedTransactions));
    if (loadedBudgets) setBudgets(JSON.parse(loadedBudgets));
    if (loadedGoals) setGoals(JSON.parse(loadedGoals));
    if (loadedAccounts) setAccounts(JSON.parse(loadedAccounts));
  }, []);

  // Guardar transacciones en localStorage
  const addTransaction = (data: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...data,
      id: uuidv4(),
    };
    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
    return newTransaction;
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  };

  const updateTransaction = (id: string, data: Partial<Transaction>) => {
    const updated = transactions.map((t) => (t.id === id ? { ...t, ...data } : t));
    setTransactions(updated);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  };

  // Guardar presupuestos en localStorage
  const addBudget = (data: Omit<Budget, "id">) => {
    const newBudget: Budget = {
      ...data,
      id: uuidv4(),
    };
    const updated = [...budgets, newBudget];
    setBudgets(updated);
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
    return newBudget;
  };

  const deleteBudget = (id: string) => {
    const updated = budgets.filter((b) => b.id !== id);
    setBudgets(updated);
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
  };

  const updateBudget = (id: string, data: Partial<Budget>) => {
    const updated = budgets.map((b) => (b.id === id ? { ...b, ...data } : b));
    setBudgets(updated);
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
  };

  // Guardar metas en localStorage
  const addGoal = (data: Omit<Goal, "id">) => {
    const newGoal: Goal = {
      ...data,
      id: uuidv4(),
    };
    const updated = [...goals, newGoal];
    setGoals(updated);
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updated));
    return newGoal;
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updated));
  };

  const updateGoal = (id: string, data: Partial<Goal>) => {
    const updated = goals.map((g) => (g.id === id ? { ...g, ...data } : g));
    setGoals(updated);
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updated));
  };

  // Guardar cuentas en localStorage
  const addAccount = (data: Omit<Account, "id">) => {
    const newAccount: Account = {
      ...data,
      id: uuidv4(),
    };
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(updated));
    return newAccount;
  };

  const deleteAccount = (id: string) => {
    const updated = accounts.filter((a) => a.id !== id);
    setAccounts(updated);
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(updated));
  };

  return {
    transactions,
    budgets,
    goals,
    accounts,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    addBudget,
    deleteBudget,
    updateBudget,
    addGoal,
    deleteGoal,
    updateGoal,
    addAccount,
    deleteAccount,
  };
};
