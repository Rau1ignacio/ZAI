import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../layouts/AppShell";
import DashboardPage from "../modules/dashboard/DashboardPage";
import BudgetsPage from "../modules/budgets/BudgetsPage";
import GoalsPage from "../modules/goals/GoalsPage";
import TransactionsPage from "../modules/transactions/TransactionsPage";
import AuthPage from "../modules/auth/AuthPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
