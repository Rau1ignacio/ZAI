import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "./routes";
import { useThemeStore } from "../store/useThemeStore";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { updateResolvedTheme, resolvedTheme } = useThemeStore();

  useEffect(() => {
    updateResolvedTheme(); // Aplica tema inicial

    // Escucha cambios en preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => updateResolvedTheme();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [updateResolvedTheme]);

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" theme={resolvedTheme} />
    </BrowserRouter>
  );
}
