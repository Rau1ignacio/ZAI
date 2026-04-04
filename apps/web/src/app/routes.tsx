import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import PublicLayout from "../layouts/PublicLayout";

const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const TransactionsPage = lazy(() => import("../pages/transactions/TransactionsPage"));
const BudgetsPage = lazy(() => import("../pages/budgets/BudgetsPage"));
const GoalsPage = lazy(() => import("../pages/goals/GoalsPage"));
const DataEntryPage = lazy(() => import("../pages/dataEntry/DataEntryPage"));

const AccountsPage = lazy(() => import("../pages/core/AccountsPage"));
const AssetsPage = lazy(() => import("../pages/core/AssetsPage"));
const InvestmentsPage = lazy(() => import("../pages/core/InvestmentsPage"));
const CreditsPage = lazy(() => import("../pages/core/CreditsPage"));
const BenefitsPage = lazy(() => import("../pages/core/BenefitsPage"));
const IntelligencePage = lazy(() => import("../pages/core/IntelligencePage"));
const AlertsPage = lazy(() => import("../pages/core/AlertsPage"));
const SettingsPage = lazy(() => import("../pages/core/SettingsPage"));

const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const UsersPage = lazy(() => import("../pages/admin/UsersPage"));
const LogsPage = lazy(() => import("../pages/admin/LogsPage"));
const CategoriesPage = lazy(() => import("../pages/admin/CategoriesPage"));
const AdminBenefitsPage = lazy(() => import("../pages/admin/AdminBenefitsPage"));
const SubscriptionsPage = lazy(() => import("../pages/admin/SubscriptionsPage"));
const AnalyticsPage = lazy(() => import("../pages/admin/AnalyticsPage"));

const CampaignLandingPage = lazy(() => import("../pages/marketing/CampaignLandingPage"));
const PricingPage = lazy(() => import("../pages/marketing/PricingPage"));
const AboutPage = lazy(() => import("../pages/marketing/AboutPage"));
const BlogPage = lazy(() => import("../pages/marketing/BlogPage"));
const OnboardingPage = lazy(() => import("../pages/onboarding/OnboardingPage"));
const HomePage = lazy(() => import("../pages/public/HomePage"));
const FeaturesPage = lazy(() => import("../pages/public/FeaturesPage"));
const ContactPage = lazy(() => import("../pages/public/ContactPage"));
const SiteMapPage = lazy(() => import("../pages/SiteMapPage"));
const SupportPage = lazy(() => import("../pages/extra/SupportPage"));
const LegalPage = lazy(() => import("../pages/extra/LegalPage"));

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const HelpPage = lazy(() => import("../pages/public/HelpPage"));
const FaqPage = lazy(() => import("../pages/public/FaqPage"));

const CreditSimulatorPage = lazy(() => import("../pages/app/CreditSimulatorPage"));
const EntityActionPage = lazy(() => import("../pages/app/EntityActionPage"));
const BenefitDetailPage = lazy(() => import("../pages/app/BenefitDetailPage"));
const IntelligenceTopicPage = lazy(() => import("../pages/app/intelligence/IntelligenceTopicPage"));
const SettingsSectionPage = lazy(() => import("../pages/app/SettingsSectionPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
          <Route path="accounts/create" element={<EntityActionPage entity="Cuenta" action="create" />} />
          <Route path="accounts/:id" element={<EntityActionPage entity="Cuenta" action="view" />} />
          <Route path="accounts/:id/edit" element={<EntityActionPage entity="Cuenta" action="edit" />} />

          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="transactions/create" element={<EntityActionPage entity="Transacción" action="create" />} />
          <Route path="transactions/:id" element={<EntityActionPage entity="Transacción" action="view" />} />
          <Route path="transactions/:id/edit" element={<EntityActionPage entity="Transacción" action="edit" />} />

          <Route path="assets" element={<AssetsPage />} />
          <Route path="assets/create" element={<EntityActionPage entity="Activo" action="create" />} />
          <Route path="assets/:id" element={<EntityActionPage entity="Activo" action="view" />} />
          <Route path="assets/:id/edit" element={<EntityActionPage entity="Activo" action="edit" />} />

          <Route path="budgets" element={<BudgetsPage />} />
          <Route path="budgets/create" element={<EntityActionPage entity="Presupuesto" action="create" />} />
          <Route path="budgets/:id" element={<EntityActionPage entity="Presupuesto" action="view" />} />
          <Route path="budgets/:id/edit" element={<EntityActionPage entity="Presupuesto" action="edit" />} />

          <Route path="goals" element={<GoalsPage />} />
          <Route path="goals/create" element={<EntityActionPage entity="Meta" action="create" />} />
          <Route path="goals/:id" element={<EntityActionPage entity="Meta" action="view" />} />
          <Route path="goals/:id/edit" element={<EntityActionPage entity="Meta" action="edit" />} />

          <Route path="investments" element={<InvestmentsPage />} />
          <Route path="investments/create" element={<EntityActionPage entity="Inversión" action="create" />} />
          <Route path="investments/:id" element={<EntityActionPage entity="Inversión" action="view" />} />
          <Route path="investments/:id/edit" element={<EntityActionPage entity="Inversión" action="edit" />} />

          <Route path="debts" element={<CreditsPage />} />
          <Route path="debts/create" element={<EntityActionPage entity="Deuda" action="create" />} />
          <Route path="debts/:id" element={<EntityActionPage entity="Deuda" action="view" />} />
          <Route path="debts/:id/edit" element={<EntityActionPage entity="Deuda" action="edit" />} />

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
          <Route path="settings/profile" element={<SettingsSectionPage section="profile" />} />
          <Route path="settings/security" element={<SettingsSectionPage section="security" />} />
          <Route path="settings/subscription" element={<SettingsSectionPage section="subscription" />} />

          <Route path="data-entry" element={<DataEntryPage />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<EntityActionPage entity="Usuario" action="view" />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="benefits" element={<AdminBenefitsPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <div className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
        Cargando vista...
      </div>
    </div>
  );
}
