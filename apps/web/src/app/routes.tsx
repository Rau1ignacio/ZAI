import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../modules/dashboard/DashboardPage";
import TransactionsPage from "../modules/transactions/TransactionsPage";
import AddTransactionPage from "../modules/transactions/AddTransactionPage";
import BudgetsPage from "../modules/budgets/BudgetsPage";
import AddBudgetPage from "../modules/budgets/AddBudgetPage";
import GoalsPage from "../modules/goals/GoalsPage";
import AddGoalPage from "../modules/goals/AddGoalPage";
import AuthPage from "../modules/auth/AuthPage";
import DataEntryPage from "../modules/dataEntry/DataEntryPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/add-transaction" element={<AddTransactionPage />} />
      <Route path="/budgets" element={<BudgetsPage />} />
      <Route path="/add-budget" element={<AddBudgetPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/add-goal" element={<AddGoalPage />} />
      <Route path="/data-entry" element={<DataEntryPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
