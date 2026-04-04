import { Component, ErrorInfo, ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export default class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled UI error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              ZAI
            </p>
            <h1 className="mt-3 text-2xl font-semibold">
              Ocurrió un error inesperado
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Recarga la página. Si el problema persiste, contacta soporte.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
