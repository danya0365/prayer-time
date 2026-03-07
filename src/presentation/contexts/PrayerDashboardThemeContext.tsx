"use client";

import { useThemeStore } from '@/stores/themeStore';
import { ThemeConfig, ThemeType } from '@/types/theme';
import { createContext, ReactNode, useContext } from 'react';

interface PrayerDashboardThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  getAvailableThemes: () => Record<ThemeType, ThemeConfig>;
}

const PrayerDashboardThemeContext = createContext<PrayerDashboardThemeContextType | undefined>(undefined);

interface PrayerDashboardThemeProviderProps {
  children: ReactNode;
}

export function PrayerDashboardThemeProvider({ children }: PrayerDashboardThemeProviderProps) {
  const { currentTheme, themeConfig, setTheme, getAvailableThemes } = useThemeStore();

  const value: PrayerDashboardThemeContextType = {
    currentTheme,
    themeConfig,
    setTheme,
    getAvailableThemes
  };

  return (
    <PrayerDashboardThemeContext.Provider value={value}>
      {children}
    </PrayerDashboardThemeContext.Provider>
  );
}

export function usePrayerDashboardTheme(): PrayerDashboardThemeContextType {
  const context = useContext(PrayerDashboardThemeContext);
  if (context === undefined) {
    throw new Error('usePrayerDashboardTheme must be used within a PrayerDashboardThemeProvider');
  }
  return context;
}
