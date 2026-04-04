import { useMemo, useState, useCallback } from "react";
import { subDays } from "date-fns";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  status: "cleared" | "pending";
  type?: "expense" | "income";
}

interface UseTransactionFilterOptions {
  transactions: Transaction[];
}

export function useTransactionFilter({ transactions }: UseTransactionFilterOptions) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(() => {
    const to = new Date();
    const from = subDays(to, 30);
    return { from, to };
  });

  // Calculate summary stats
  const stats = useMemo(() => {
    const income = transactions
      .filter((tx) => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = Math.abs(
      transactions
        .filter((tx) => tx.amount < 0)
        .reduce((sum, tx) => sum + tx.amount, 0)
    );

    return {
      income,
      expenses,
      netFlow: income - expenses,
    };
  }, [transactions]);

  // Calculate income/expense changes (example: just return 0 for now)
  const incomeChange = useMemo(() => {
    return 12.5; // Mock data
  }, []);

  const expenseChange = useMemo(() => {
    return -8.2; // Mock data
  }, []);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let result = transactions;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.name.toLowerCase().includes(query) ||
          tx.category.toLowerCase().includes(query)
      );
    }

    // Filter by type
    if (selectedType === "income") {
      result = result.filter((tx) => tx.amount > 0);
    } else if (selectedType === "expense") {
      result = result.filter((tx) => tx.amount < 0);
    }

    return result;
  }, [transactions, searchQuery, selectedType]);

  return {
    // Filter states
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    dateRange,
    setDateRange,

    // Filtered results
    filteredTransactions,

    // Stats
    stats,
    incomeChange,
    expenseChange,
  };
}
