"use client";

import React from 'react';
import { PrayerInfo } from '../../../utils/prayer-utils';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { useSettingsStore } from '../../../stores/settingsStore';
import { formatDisplayDate } from '../../../utils/date-formatting';
import { formatPrayerTime } from '../../../utils/prayer-utils';
import { calculatePrayerTimeStatus } from '../../../utils/prayer-time-status';

interface GradientThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function GradientTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error
}: GradientThemeProps) {
  const { themeConfig } = useTheme();
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });

  const formatTimeUntil = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} ${themeConfig.styles.shadows}`}>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
            <div className="h-full w-full bg-white rounded-full border-2 border-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} ${themeConfig.styles.shadows} text-center border border-red-200`}>
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className={themeConfig.colors.text.primary}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeConfig.colors.background}`}>
      {/* Gradient Hero Section */}
      <div className={`${themeConfig.colors.primary} text-white relative overflow-hidden`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        <div className={`relative ${themeConfig.styles.spacing} text-center`}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="text-7xl mb-4 animate-bounce">🌟</div>
              <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {t.dashboard.title}
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-white/50 to-transparent mx-auto mb-4"></div>
            </div>
            <p className="text-xl opacity-90 font-light">
              {formatDisplayDate(new Date(), settings.language)}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Floating Current Prayer Card */}
        {currentPrayer && (
          <div className={`-mt-16 relative z-10 ${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} border border-white/20 overflow-hidden mb-8`}>
            <div className={`${currentPrayer.color} p-8 text-white text-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4 animate-pulse">{currentPrayer.emoji}</div>
                <h2 className="text-3xl font-bold mb-2">
                  {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                </h2>
                <p className="text-lg opacity-90 mb-4">
                  {t.dashboard.currentPrayer}
                </p>
                <div className="text-2xl font-mono bg-white/20 rounded-lg px-4 py-2 inline-block">
                  {formatPrayerTime(currentPrayer.time, settings.language)}
                </div>
              </div>
            </div>
            
            {nextPrayer && (
              <div className="p-6 text-center bg-gradient-to-r from-gray-50 to-white">
                <p className={`text-lg mb-3 ${themeConfig.colors.text.secondary}`}>
                  {t.dashboard.nextPrayer}: <span className={`font-bold ${themeConfig.colors.text.accent}`}>
                    {t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                  </span>
                </p>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  <p className="text-4xl font-mono font-bold">
                    {formatTimeUntil(timeUntilNext)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gradient Prayer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prayers.map((prayer, index) => (
            <div
              key={prayer.name}
              className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} overflow-hidden ${themeConfig.styles.animation} hover:scale-105 hover:rotate-1 border border-white/20`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className={`${prayer.color} p-6 text-white text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                    {prayer.emoji}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                  </h3>
                  <div className="w-12 h-0.5 bg-white/50 mx-auto"></div>
                </div>
              </div>
              
              <div className={`${themeConfig.styles.spacing} text-center bg-gradient-to-b from-white to-gray-50`}>
                <p className={`text-3xl font-mono font-bold ${themeConfig.colors.text.primary} mb-2`}>
                  {formatPrayerTime(prayer.time, settings.language)}
                </p>
                <p className={`text-sm ${themeConfig.colors.text.secondary} mb-3`}>
                  {calculatePrayerTimeStatus(prayer, currentPrayer, settings.language).displayText}
                </p>
                
                {prayer.isCurrent && (
                  <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                    {t.dashboard.currentPrayer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GradientTheme;
