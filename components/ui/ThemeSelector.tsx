"use client";

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import { useSettingsStore } from '../../stores/settingsStore';
import { ThemeType } from '../../types/theme';

export default function ThemeSelector() {
  const { currentTheme, setTheme, getAvailableThemes } = useTheme();
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  
  const themes = getAvailableThemes();

  const handleThemeChange = (themeId: ThemeType) => {
    setTheme(themeId);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        {t.settings.theme}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.values(themes).map((theme) => (
          <div
            key={theme.id}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
              currentTheme === theme.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handleThemeChange(theme.id)}
          >
            {/* Theme Preview */}
            <div className="mb-3 h-16 rounded-md overflow-hidden">
              <div className={`h-full w-full ${theme.colors.background} flex`}>
                <div className={`w-1/3 ${theme.colors.primary}`}></div>
                <div className={`w-1/3 ${theme.colors.secondary}`}></div>
                <div className={`w-1/3 ${theme.colors.surface}`}></div>
              </div>
            </div>
            
            {/* Theme Info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {theme.name}
              </h4>
              <p className="text-sm text-gray-600">
                {theme.description}
              </p>
            </div>
            
            {/* Selection Indicator */}
            {currentTheme === theme.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Current Theme Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">
          {t.settings.currentTheme}: {themes[currentTheme].name}
        </h4>
        <p className="text-sm text-gray-600">
          {themes[currentTheme].description}
        </p>
      </div>
    </div>
  );
}
