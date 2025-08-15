"use client";

import React from 'react';
import { PrayerInfo } from '../../../utils/prayer-utils';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { useSettingsStore } from '../../../stores/settingsStore';
import { formatDisplayDate } from '../../../utils/date-formatting';
import { formatPrayerTime } from '../../../utils/prayer-utils';

interface ModernThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function ModernTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error
}: ModernThemeProps) {
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} ${themeConfig.styles.shadows} text-center`}>
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className={themeConfig.colors.text.primary}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeConfig.colors.background}`}>
      {/* Hero Section */}
      <div className={`${themeConfig.colors.primary} text-white ${themeConfig.styles.spacing} text-center`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t.dashboard.title}
          </h1>
          <p className="text-xl opacity-90">
            {formatDisplayDate(new Date(), settings.language)}
          </p>
          
          {/* Current Prayer Indicator */}
          {currentPrayer && (
            <div className={`mt-8 ${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} ${themeConfig.styles.shadows} ${themeConfig.styles.animation}`}>
              <div className={`${currentPrayer.color} ${themeConfig.styles.borderRadius} p-4 text-white mb-4`}>
                <div className="text-2xl mb-2">{currentPrayer.emoji}</div>
                <h2 className="text-2xl font-bold">
                  {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                </h2>
                <p className="text-lg opacity-90">
                  {t.dashboard.currentPrayer}
                </p>
              </div>
              
              {nextPrayer && (
                <div className={themeConfig.colors.text.primary}>
                  <p className="text-lg mb-2">
                    {t.dashboard.nextPrayer}: <span className="font-semibold">{t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}</span>
                  </p>
                  <p className="text-2xl font-mono font-bold text-blue-600">
                    {formatTimeUntil(timeUntilNext)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Prayer Times Grid */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} overflow-hidden ${themeConfig.styles.animation} hover:scale-105`}
            >
              <div className={`${prayer.color} p-4 text-white text-center`}>
                <div className="text-3xl mb-2">{prayer.emoji}</div>
                <h3 className="text-xl font-bold">
                  {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                </h3>
              </div>
              <div className={`${themeConfig.styles.spacing} text-center`}>
                <p className={`text-2xl font-mono font-bold ${themeConfig.colors.text.primary}`}>
                  {formatPrayerTime(prayer.time, settings.language)}
                </p>
                <p className={`text-sm ${themeConfig.colors.text.secondary} mt-1`}>
                  {(() => {
                    const now = new Date();
                    const timeDiff = prayer.time.getTime() - now.getTime();
                    const isPassed = timeDiff < 0;
                    const isCurrent = currentPrayer?.name === prayer.name;
                    
                    if (isPassed) {
                      return "Completed";
                    } else if (isCurrent) {
                      return "Active now";
                    } else {
                      const hours = Math.floor(timeDiff / 3600000);
                      const minutes = Math.floor((timeDiff % 3600000) / 60000);
                      return `in ${hours}h ${minutes}m`;
                    }
                  })()}
                </p>
                {prayer.isCurrent && (
                  <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
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

export default ModernTheme;
