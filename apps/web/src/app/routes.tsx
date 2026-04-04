import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import PublicLayout from "../layouts/PublicLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";
import TransactionsPage from "../pages/transactions/TransactionsPage";
import BudgetsPage from "../pages/budgets/BudgetsPage";
import GoalsPage from "../pages/goals/GoalsPage";
import DataEntryPage from "../pages/dataEntry/DataEntryPage";

import AccountsPage from "../pages/core/AccountsPage";
import AssetsPage from "../pages/core/AssetsPage";
import InvestmentsPage from "../pages/core/InvestmentsPage";
import CreditsPage from "../pages/core/CreditsPage";
import BenefitsPage from "../pages/core/BenefitsPage";
import IntelligencePage from "../pages/core/IntelligencePage";
import AlertsPage from "../pages/core/AlertsPage";
import SettingsPage from "../pages/core/SettingsPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import LogsPage from "../pages/admin/LogsPage";
import CategoriesPage from "../pages/admin/CategoriesPage";
import AdminBenefitsPage from "../pages/admin/AdminBenefitsPage";
import SubscriptionsPage from "../pages/admin/SubscriptionsPage";
import AnalyticsPage from "../pages/admin/AnalyticsPage";

import MarketingHomePage from "../pages/marketing/MarketingHomePage";
import CampaignLandingPage from "../pages/marketing/CampaignLandingPage";
import PricingPage from "../pages/marketing/PricingPage";
import AboutPage from "../pages/marketing/AboutPage";
import BlogPage from "../pages/marketing/BlogPage";
import OnboardingPage from "../pages/onboarding/OnboardingPage";
import HomePage from "../pages/public/HomePage";
import FeaturesPage from "../pages/public/FeaturesPage";
import ContactPage from "../pages/public/ContactPage";
import SiteMapPage from "../pages/SiteMapPage";
import SupportPage from "../pages/extra/SupportPage";
import LegalPage from "../pages/extra/LegalPage";

import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import RegisterPage from "../pages/auth/RegisterPage";
import HelpPage from "../pages/public/HelpPage";
import FaqPage from "../pages/public/FaqPage";

import CreditSimulatorPage from "../pages/app/CreditSimulatorPage";
import EntityActionPage from "../pages/app/EntityActionPage";
import BenefitDetailPage from "../pages/app/BenefitDetailPage";
import IntelligenceTopicPage from "../pages/app/intelligence/IntelligenceTopicPage";
import SettingsSectionPage from "../pages/app/SettingsSectionPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="landing/:campaignId" element={<CampaignLandingPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="terms" element={<LegalPage />} />
        <Route path="privacy" element={<LegalPage />} />
        <Route path="pages" element={<SiteMapPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route
          path="accounts/create"
          element={<EntityActionPage entity="Cuenta" action="create" />}
        />
        <Route
          path="accounts/:id"
          element={<EntityActionPage entity="Cuenta" action="view" />}
        />
        <Route
          path="accounts/:id/edit"
          element={<EntityActionPage entity="Cuenta" action="edit" />}
        />

        <Route path="transactions" element={<TransactionsPage />} />
        <Route
          path="transactions/create"
          element={<EntityActionPage entity="Transacción" action="create" />}
        />
        <Route
          path="transactions/:id"
          element={<EntityActionPage entity="Transacción" action="view" />}
        />
        <Route
          path="transactions/:id/edit"
          element={<EntityActionPage entity="Transacción" action="edit" />}
        />

        <Route path="assets" element={<AssetsPage />} />
        <Route
          path="assets/create"
          element={<EntityActionPage entity="Activo" action="create" />}
        />
        <Route
          path="assets/:id"
          element={<EntityActionPage entity="Activo" action="view" />}
        />
        <Route
          path="assets/:id/edit"
          element={<EntityActionPage entity="Activo" action="edit" />}
        />

        <Route path="budgets" element={<BudgetsPage />} />
        <Route
          path="budgets/create"
          element={<EntityActionPage entity="Presupuesto" action="create" />}
        />
        <Route
          path="budgets/:id"
          element={<EntityActionPage entity="Presupuesto" action="view" />}
        />
        <Route
          path="budgets/:id/edit"
          element={<EntityActionPage entity="Presupuesto" action="edit" />}
        />

        <Route path="goals" element={<GoalsPage />} />
        <Route
          path="goals/create"
          element={<EntityActionPage entity="Meta" action="create" />}
        />
        <Route
          path="goals/:id"
          element={<EntityActionPage entity="Meta" action="view" />}
        />
        <Route
          path="goals/:id/edit"
          element={<EntityActionPage entity="Meta" action="edit" />}
        />

        <Route path="investments" element={<InvestmentsPage />} />
        <Route
          path="investments/create"
          element={<EntityActionPage entity="Inversión" action="create" />}
        />
        <Route
          path="investments/:id"
          element={<EntityActionPage entity="Inversión" action="view" />}
        />
        <Route
          path="investments/:id/edit"
          element={<EntityActionPage entity="Inversión" action="edit" />}
        />

        <Route path="debts" element={<CreditsPage />} />
        <Route
          path="debts/create"
          element={<EntityActionPage entity="Deuda" action="create" />}
        />
        <Route
          path="debts/:id"
          element={<EntityActionPage entity="Deuda" action="view" />}
        />
        <Route
          path="debts/:id/edit"
          element={<EntityActionPage entity="Deuda" action="edit" />}
        />

        <Route path="credit-simulator" element={<CreditSimulatorPage />} />
        <Route path="benefits" element={<BenefitsPage />} />
        <Route path="benefits/:id" element={<BenefitDetailPage />} />

        <Route path="intelligence" element={<IntelligencePage />} />
        <Route path="intelligence/score" element={<IntelligenceTopicPage topic="score" />} />
        <Route path="intelligence/comparison" element={<IntelligenceTopicPage topic="comparison" />} />
        <Route path="intelligence/insights" element={<IntelligenceTopicPage topic="insights" />} />
        <Route path="intelligence/predictions" element={<IntelligenceTopicPage topic="predictions" />} />
        <Route path="intelligence/simulator" element={<IntelligenceTopicPage topic="simulator" />} />
        <Route path="intelligence/ai-chat" element={<IntelligenceTopicPage topic="ai-chat" />} />

        <Route path="alerts" element={<AlertsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route
          path="settings/profile"
          element={<SettingsSectionPage section="profile" />}
        />
        <Route
          path="settings/security"
          element={<SettingsSectionPage section="security" />}
        />
        <Route
          path="settings/subscription"
          element={<SettingsSectionPage section="subscription" />}
        />

        <Route path="data-entry" element={<DataEntryPage />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route
          path="users/:id"
          element={<EntityActionPage entity="Usuario" action="view" />}
        />
        <Route path="logs" element={<LogsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="benefits" element={<AdminBenefitsPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
