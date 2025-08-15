"use client";

import React from 'react';
import { PrayerInfo } from '../../../utils/prayer-utils';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { useSettingsStore } from '../../../stores/settingsStore';
import { formatDisplayDate, formatTimeWithLocale } from '../../../utils/date-formatting';
import { formatPrayerTime } from '../../../utils/prayer-utils';

interface ClassicThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function ClassicTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error
}: ClassicThemeProps) {
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
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} ${themeConfig.styles.shadows} border-2 border-emerald-200`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} ${themeConfig.styles.shadows} border-2 border-red-200 text-center`}>
          <div className="text-red-600 text-xl mb-2">⚠️</div>
          <p className={themeConfig.colors.text.primary}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeConfig.colors.background}`}>
      {/* Header with Islamic Pattern */}
      <div className={`${themeConfig.colors.primary} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className={`relative ${themeConfig.styles.spacing} text-center`}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <div className="text-6xl mb-2">🕌</div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 font-serif">
                {t.dashboard.title}
              </h1>
              <div className="w-24 h-1 bg-white mx-auto opacity-60"></div>
            </div>
            <p className="text-lg opacity-90 font-serif">
              {formatDisplayDate(new Date(), settings.language)}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Current Prayer Status */}
        {currentPrayer && (
          <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} border-2 border-emerald-200 mb-8 overflow-hidden`}>
            <div className={`${currentPrayer.color} text-white p-6 text-center`}>
              <div className="text-4xl mb-3">{currentPrayer.emoji}</div>
              <h2 className="text-2xl font-bold font-serif mb-2">
                {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
              </h2>
              <p className="text-lg opacity-90">
                {t.dashboard.currentPrayer}
              </p>
              <div className="mt-4 text-xl font-mono">
                {formatPrayerTime(currentPrayer.time, settings.language)}
              </div>
            </div>
            
            {nextPrayer && (
              <div className="p-6 text-center border-t border-emerald-100">
                <p className={`text-lg mb-2 ${themeConfig.colors.text.secondary}`}>
                  {t.dashboard.nextPrayer}: <span className={`font-semibold ${themeConfig.colors.text.accent}`}>
                    {t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                  </span>
                </p>
                <p className={`text-3xl font-mono font-bold ${themeConfig.colors.text.accent}`}>
                  {formatTimeUntil(timeUntilNext)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Prayer Times Table */}
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} border-2 border-emerald-200 overflow-hidden`}>
          <div className={`${themeConfig.colors.primary} text-white p-4 text-center`}>
            <h3 className="text-xl font-bold font-serif">{t.dashboard.prayerTimes}</h3>
          </div>
          
          <div className="divide-y divide-emerald-100">
            {prayers.map((prayer, index) => (
              <div
                key={prayer.name}
                className={`p-4 flex items-center justify-between ${themeConfig.styles.animation} hover:bg-emerald-50 ${
                  prayer.isCurrent ? 'bg-emerald-50 border-l-4 border-emerald-600' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${prayer.color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {prayer.emoji}
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${themeConfig.colors.text.primary} font-serif`}>
                      {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                    </h4>
                    {prayer.isCurrent && (
                      <span className="text-sm text-emerald-600 font-medium">
                        {t.dashboard.currentPrayer}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-xl font-mono font-bold ${themeConfig.colors.text.primary}`}>
                    {formatPrayerTime(prayer.time, settings.language)}
                  </p>
                  <p className={`text-sm ${themeConfig.colors.text.secondary}`}>
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

export default ClassicTheme;
