import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark'; // El tema real aplicado
  updateResolvedTheme: () => void;
}

// este es el store de tema, que maneja el estado del tema y su persistencia en localStorage
// La funcion se usa 
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system', // Default
      resolvedTheme: 'light',
      setTheme: (theme: Theme) => {
        set({ theme });
        get().updateResolvedTheme();
      },
      updateResolvedTheme: () => {
        const { theme } = get();
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const resolved = theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;
        set({ resolvedTheme: resolved });
        document.documentElement.classList.toggle('dark', resolved === 'dark');
        document.documentElement.setAttribute('data-theme', resolved);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.updateResolvedTheme();
      },
    }
  )
);