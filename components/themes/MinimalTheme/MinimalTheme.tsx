"use client";

import React from 'react';
import { PrayerInfo } from '../../../utils/prayer-utils';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { useSettingsStore } from '../../../stores/settingsStore';
import { formatDisplayDate } from '../../../utils/date-formatting';
import { formatPrayerTime } from '../../../utils/prayer-utils';

interface MinimalThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function MinimalTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error
}: MinimalThemeProps) {
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
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} border`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} border text-center`}>
          <p className={`${themeConfig.colors.text.primary} text-sm`}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeConfig.colors.background}`}>
      {/* Simple Header */}
      <div className={`border-b ${themeConfig.styles.spacing}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-2xl font-light ${themeConfig.colors.text.primary} mb-2`}>
            {t.dashboard.title}
          </h1>
          <p className={`text-sm ${themeConfig.colors.text.secondary}`}>
            {formatDisplayDate(new Date(), settings.language)}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Current Status */}
        {currentPrayer && nextPrayer && (
          <div className={`${themeConfig.colors.surface} border ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} mb-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs uppercase tracking-wide ${themeConfig.colors.text.secondary} mb-1`}>
                  {t.dashboard.currentPrayer}
                </p>
                <p className={`text-lg font-medium ${themeConfig.colors.text.primary}`}>
                  {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-xs uppercase tracking-wide ${themeConfig.colors.text.secondary} mb-1`}>
                  {t.dashboard.nextPrayer}
                </p>
                <p className={`text-lg font-medium ${themeConfig.colors.text.primary}`}>
                  {t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                </p>
                <p className={`text-sm font-mono ${themeConfig.colors.text.secondary} mt-1`}>
                  {formatTimeUntil(timeUntilNext)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Prayer Times List */}
        <div className={`${themeConfig.colors.surface} border ${themeConfig.styles.borderRadius} overflow-hidden`}>
          <div className={`border-b ${themeConfig.styles.spacing}`}>
            <h2 className={`text-lg font-medium ${themeConfig.colors.text.primary}`}>
              {t.dashboard.prayerTimes}
            </h2>
          </div>
          
          <div className="divide-y">
            {prayers.map((prayer) => (
              <div
                key={prayer.name}
                className={`${themeConfig.styles.spacing} flex items-center justify-between ${themeConfig.styles.animation} hover:bg-gray-50 ${
                  prayer.isCurrent ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 ${prayer.isCurrent ? 'bg-gray-900' : 'bg-gray-300'} rounded-full`}></div>
                  <div>
                    <p className={`font-medium ${themeConfig.colors.text.primary}`}>
                      {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                    </p>
                    {prayer.isCurrent && (
                      <p className={`text-xs ${themeConfig.colors.text.secondary}`}>
                        {t.dashboard.currentPrayer}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-mono ${themeConfig.colors.text.primary}`}>
                    {formatPrayerTime(prayer.time, settings.language)}
                  </p>
                  <p className={`text-xs ${themeConfig.colors.text.secondary} mt-1`}>
                    {formatPrayerTime(prayer.time, settings.language)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinimalTheme;
