"use client";

import { useEffect, useState } from 'react';
import { PrayerInfo, formatTimeUntilNextPrayer } from '../../../../utils/prayer-utils';
import { useTranslation } from '../../../../hooks/useTranslation';
import { Language } from '../../../../types/translation';

interface CurrentPrayerIndicatorProps {
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo;
  timeUntilNext: number;
  testMode?: boolean;
  testTime?: Date;
  language: Language;
}

export default function CurrentPrayerIndicator({
  currentPrayer,
  nextPrayer,
  timeUntilNext: initialTimeUntilNext,
  testMode = false,
  language
}: CurrentPrayerIndicatorProps) {
  const { t } = useTranslation({ language });
  const [timeUntilNext, setTimeUntilNext] = useState(initialTimeUntilNext);
  
  // Helper function to replace template variables
  const replaceTemplate = (template: string, variables: Record<string, string>) => {
    return template.replace(/{(\w+)}/g, (match, key) => variables[key] || match);
  };
  
  // Update countdown every minute (only in normal mode)
  useEffect(() => {
    if (testMode) {
      // In test mode, use the provided timeUntilNext directly
      setTimeUntilNext(initialTimeUntilNext);
      return;
    }
    
    const timer = setInterval(() => {
      setTimeUntilNext(prev => Math.max(0, prev - 60000)); // Subtract one minute (60000ms)
    }, 60000);
    
    return () => clearInterval(timer);
  }, [testMode, initialTimeUntilNext]);
  
  // Update timeUntilNext when props change (important for test mode)
  useEffect(() => {
    setTimeUntilNext(initialTimeUntilNext);
  }, [initialTimeUntilNext]);
  
  const getPrayerColors = () => {
    const prayer = currentPrayer || nextPrayer;
    const colorMap = {
      fajr: 'bg-fajr-gradient',
      sunrise: 'bg-sunrise-gradient',
      dhuhr: 'bg-dhuhr-gradient',
      asr: 'bg-asr-gradient',
      maghrib: 'bg-maghrib-gradient',
      isha: 'bg-isha-gradient',
    };
    return colorMap[prayer.name as keyof typeof colorMap] || 'bg-gradient-to-r from-blue-500 to-purple-600';
  };

  if (currentPrayer) {
    return (
      <div className={`${getPrayerColors()} rounded-2xl p-4 sm:p-6 text-white`}>
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-3xl sm:text-4xl flex-shrink-0">{currentPrayer.emoji}</div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold truncate">{t.prayers[currentPrayer.name as keyof typeof t.prayers]}</h3>
              <p className="text-white/80 text-sm">{t.dashboard.currentPrayer}</p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xl sm:text-2xl font-bold">{formatTimeUntilNextPrayer(timeUntilNext, {
              hour: t.ui.hour,
              hours: t.ui.hours,
              minute: t.ui.minute,
              minutes: t.ui.minutes,
              and: t.ui.and
            })}</p>
            <p className="text-white/80 text-xs sm:text-sm">{replaceTemplate(t.time.untilPrayer, { prayerName: t.prayers[nextPrayer.name as keyof typeof t.prayers] })}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getPrayerColors()} rounded-2xl p-4 sm:p-6 text-white`}>
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="text-3xl sm:text-4xl flex-shrink-0">{nextPrayer.emoji}</div>
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold truncate">{t.prayers[nextPrayer.name as keyof typeof t.prayers]}</h3>
            <p className="text-white/80 text-sm">{t.dashboard.nextPrayer}</p>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xl sm:text-2xl font-bold">{formatTimeUntilNextPrayer(timeUntilNext, {
            hour: t.ui.hour,
            hours: t.ui.hours,
            minute: t.ui.minute,
            minutes: t.ui.minutes,
            and: t.ui.and
          })}</p>
          <p className="text-white/80 text-xs sm:text-sm">{t.time.timeRemaining}</p>
        </div>
      </div>
    </div>
  );
}
