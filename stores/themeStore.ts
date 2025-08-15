import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeType, ThemeConfig, AVAILABLE_THEMES } from '../types/theme';

interface ThemeState {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  getAvailableThemes: () => Record<ThemeType, ThemeConfig>;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: 'original',
      themeConfig: AVAILABLE_THEMES.original,

      setTheme: (theme: ThemeType) => {
        set({
          currentTheme: theme,
          themeConfig: AVAILABLE_THEMES[theme]
        });
      },

      getAvailableThemes: () => AVAILABLE_THEMES,
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        currentTheme: state.currentTheme
      })
    }
  )
);
