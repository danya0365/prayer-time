"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { ThemeType, ThemeConfig } from '../types/theme';

interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  getAvailableThemes: () => Record<ThemeType, ThemeConfig>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { currentTheme, themeConfig, setTheme, getAvailableThemes } = useThemeStore();

  const value: ThemeContextType = {
    currentTheme,
    themeConfig,
    setTheme,
    getAvailableThemes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
