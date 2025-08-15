"use client";

import React from 'react';
import { PrayerInfo } from '../../../utils/prayer-utils';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { useSettingsStore } from '../../../stores/settingsStore';
import { useLocationStore } from '../../../stores/locationStore';
import { formatDisplayDate, formatTimeWithLocale } from '../../../utils/date-formatting';
import { formatPrayerTime } from '../../../utils/prayer-utils';
import { getCalculationMethodInfo } from '../../../constants/calculationMethods';
import { calculatePrayerTimeStatus } from '../../../utils/prayer-time-status';

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
  const { currentLocation } = useLocationStore();
  const { t } = useTranslation({ language: settings.language });
  
  const calculationMethodInfo = getCalculationMethodInfo(settings.calculationMethod);

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
      {/* Enhanced Header */}
      <div className={`border-b ${themeConfig.styles.spacing}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-light ${themeConfig.colors.text.primary} mb-1`}>
                {t.dashboard.title}
              </h1>
              <p className={`text-sm ${themeConfig.colors.text.secondary}`}>
                {formatDisplayDate(new Date(), settings.language)}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-xs uppercase tracking-wide ${themeConfig.colors.text.secondary} mb-1`}>
                {formatTimeWithLocale(new Date(), settings.language)}
              </p>
            </div>
          </div>
          
          {/* Location and Method Info */}
          <div className="flex items-center justify-between text-xs">
            <div className={`${themeConfig.colors.text.secondary}`}>
              {currentLocation && (
                <span>
                  📍 {currentLocation.city || 'Unknown'}, {currentLocation.country || 'Unknown'}
                </span>
              )}
            </div>
            <div className={`${themeConfig.colors.text.secondary}`}>
              {calculationMethodInfo && (
                <span title={calculationMethodInfo.description}>
                  📊 {calculationMethodInfo.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Enhanced Current Status */}
        {nextPrayer && (
          <div className={`${themeConfig.colors.surface} border-2 ${currentPrayer ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50' : 'border-gray-400 bg-gradient-to-r from-gray-50 to-slate-50'} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} mb-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {currentPrayer ? (
                  // Active Prayer
                  <>
                    <div className="relative">
                      <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute -top-1 -left-1 w-8 h-8 bg-red-200 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xl animate-bounce">🔴</span>
                        <p className={`text-xs uppercase tracking-wide font-bold text-red-600`}>
                          ACTIVE NOW
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{currentPrayer.emoji}</span>
                        <p className={`text-xl font-bold text-blue-600`}>
                          {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  // No Active Prayer
                  <>
                    <div className="relative">
                      <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xl">⏸️</span>
                        <p className={`text-xs uppercase tracking-wide font-bold text-gray-600`}>
                          NO ACTIVE PRAYER
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🌙</span>
                        <p className={`text-xl font-bold text-gray-600`}>
                          Waiting for next prayer
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="text-right">
                <p className={`text-xs uppercase tracking-wide ${themeConfig.colors.text.secondary} mb-1`}>
                  {t.dashboard.nextPrayer}
                </p>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-lg">{nextPrayer.emoji}</span>
                  <p className={`text-lg font-medium ${themeConfig.colors.text.primary}`}>
                    {t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                  </p>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <span className="text-sm">⏰</span>
                  <p className={`text-lg font-mono font-bold text-green-600`}>
                    {formatTimeUntil(timeUntilNext)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Prayer Times List */}
        <div className={`${themeConfig.colors.surface} border ${themeConfig.styles.borderRadius} overflow-hidden`}>
          <div className={`border-b ${themeConfig.styles.spacing}`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-medium ${themeConfig.colors.text.primary}`}>
                {t.dashboard.prayerTimes}
              </h2>
              <div className={`text-xs ${themeConfig.colors.text.secondary}`}>
                {prayers.length} prayers today
              </div>
            </div>
          </div>
          
          <div className="divide-y">
            {prayers.map((prayer, index) => {
              const now = new Date();
              const timeDiff = prayer.time.getTime() - now.getTime();
              const isPassed = timeDiff < 0;
              const isNext = nextPrayer?.name === prayer.name;
              const isCurrent = currentPrayer?.name === prayer.name;
              
              return (
                <div
                  key={prayer.name}
                  className={`${themeConfig.styles.spacing} flex items-center justify-between ${themeConfig.styles.animation} hover:bg-gray-50 ${
                    isCurrent ? 'bg-blue-50 border-l-4 border-blue-500' : 
                    isNext ? 'bg-green-50 border-l-4 border-green-500' :
                    isPassed ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      {isCurrent ? (
                        <div className="relative">
                          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                          <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-200 rounded-full animate-ping"></div>
                        </div>
                      ) : isNext ? (
                        <div className="relative">
                          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                      ) : (
                        <div className={`w-3 h-3 ${
                          isPassed ? 'bg-gray-400' : 'bg-gray-300'
                        } rounded-full`}></div>
                      )}
                      {index < prayers.length - 1 && (
                        <div className={`w-px h-8 ${isPassed ? 'bg-gray-300' : 'bg-gray-200'} mt-2`}></div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        {prayer.isCurrent && (
                          <div className="flex items-center space-x-1">
                            <span className="text-xl animate-bounce">🔴</span>
                            <span className="text-xs font-bold text-red-600 uppercase tracking-wide">LIVE</span>
                          </div>
                        )}
                        <span className={`text-lg ${isCurrent ? 'animate-pulse' : ''}`}>{prayer.emoji}</span>
                        <p className={`font-medium ${themeConfig.colors.text.primary} ${isCurrent ? 'text-blue-600 font-bold' : ''}`}>
                          {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                        </p>
                        {isCurrent && (
                          <span className="text-blue-600 font-bold">← NOW</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 mt-1">
                        {isCurrent && (
                          <span className={`text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full animate-bounce`}>
                            🔴 LIVE
                          </span>
                        )}
                        {isNext && (
                          <span className={`text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full`}>
                            ⏭️ NEXT
                          </span>
                        )}
                        {isPassed && (
                          <span className={`text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full`}>
                            ✅ Completed
                          </span>
                        )}
                        {!isPassed && !isCurrent && !isNext && timeDiff < 3600000 && ( // Less than 1 hour
                          <span className={`text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full`}>
                            ⏰ Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-lg font-mono ${themeConfig.colors.text.primary} ${isPassed ? 'line-through' : ''}`}>
                      {formatPrayerTime(prayer.time, settings.language)}
                    </p>
                    
                    <p className={`text-xs ${themeConfig.colors.text.secondary} mt-1`}>
                      {calculatePrayerTimeStatus(prayer, currentPrayer, settings.language).displayText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinimalTheme;
