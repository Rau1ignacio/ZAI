import { LineChart, PieChart, BarChart3, TrendingUp } from "lucide-react";

export type DashboardWidgetId =
  | "cashflow"
  | "spending"
  | "netWorth"
  | "forecast"
  | "investments";

export type DashboardWidgetOption = {
  id: DashboardWidgetId;
  label: string;
  icon: typeof LineChart;
};

export const DASHBOARD_WIDGET_OPTIONS: DashboardWidgetOption[] = [
  {
    id: "cashflow",
    label: "Flujo de caja",
    icon: LineChart,
  },
  {
    id: "spending",
    label: "Gastos por categoría",
    icon: PieChart,
  },
  {
    id: "netWorth",
    label: "Patrimonio neto",
    icon: BarChart3,
  },
  {
    id: "forecast",
    label: "Predicción financiera",
    icon: TrendingUp,
  },
  {
    id: "investments",
    label: "Rendimiento inversiones",
    icon: LineChart,
  },
];
