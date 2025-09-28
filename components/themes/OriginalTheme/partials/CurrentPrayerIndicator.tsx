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
      <div className={`${getPrayerColors()} rounded-2xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{currentPrayer.emoji}</div>
            <div>
              <h3 className="text-xl font-semibold">{t.prayers[currentPrayer.name as keyof typeof t.prayers]}</h3>
              <p className="text-white/80">{t.dashboard.currentPrayer}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatTimeUntilNextPrayer(timeUntilNext, {
              hour: t.ui.hour,
              hours: t.ui.hours,
              minute: t.ui.minute,
              minutes: t.ui.minutes,
              and: t.ui.and
            })}</p>
            <p className="text-white/80 text-sm">until {t.prayers[nextPrayer.name as keyof typeof t.prayers]}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getPrayerColors()} rounded-2xl p-6 text-white`}>
      <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{nextPrayer.emoji}</div>
            <div>
              <h3 className="text-xl font-semibold">{t.prayers[nextPrayer.name as keyof typeof t.prayers]}</h3>
              <p className="text-white/80">{t.dashboard.nextPrayer}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatTimeUntilNextPrayer(timeUntilNext, {
              hour: t.ui.hour,
              hours: t.ui.hours,
              minute: t.ui.minute,
              minutes: t.ui.minutes,
              and: t.ui.and
            })}</p>
            <p className="text-white/80 text-sm">remaining</p>
          </div>
      </div>
    </div>
  );
}
