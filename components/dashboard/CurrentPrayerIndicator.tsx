"use client";

import { useEffect, useState } from 'react';
import { PrayerInfo, formatTimeUntilNextPrayer } from '../../utils/prayer-utils';
import { useTranslation } from '../../hooks/useTranslation';
import { Language } from '../../types/translation';

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
      dhuhr: 'bg-dhuhr-gradient', 
      asr: 'bg-asr-gradient',
      maghrib: 'bg-maghrib-gradient',
      isha: 'bg-isha-gradient'
    };
    return colorMap[prayer.name] || 'bg-primary-gradient';
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
      <div className="text-center">
        {/* Prayer Status */}
        <div className="mb-4">
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${getPrayerColors()} text-white font-semibold shadow-lg`}>
            <span className="text-2xl" aria-hidden="true">
              {currentPrayer ? currentPrayer.emoji : nextPrayer.emoji}
            </span>
            <span className="text-lg">
              {currentPrayer 
                ? `${t.ui.current}: ${t.prayers[currentPrayer.name as keyof typeof t.prayers]}` 
                : `${t.ui.next}: ${t.prayers[nextPrayer.name as keyof typeof t.prayers]}`}
            </span>
          </div>
        </div>
        
        {/* Countdown */}
        <div className="text-white">
          <p className="text-white/80 text-sm mb-2 font-medium">
            {currentPrayer ? t.ui.timeRemaining : t.ui.timeRemaining}
          </p>
          <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm border border-white/20">
            <p className="text-3xl font-bold text-white">
              {formatTimeUntilNextPrayer(timeUntilNext, {
                hour: t.ui.hour,
                hours: t.ui.hours,
                minute: t.ui.minute,
                minutes: t.ui.minutes,
                and: t.ui.and
              })}
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-lg opacity-90">
            {currentPrayer 
              ? `${t.ui.nextPrayer}: ${t.prayers[nextPrayer.name as keyof typeof t.prayers]} ${t.time.in} ${formatTimeUntilNextPrayer(timeUntilNext, {
                hour: t.ui.hour,
                hours: t.ui.hours,
                minute: t.ui.minute,
                minutes: t.ui.minutes,
                and: t.ui.and
              })}` 
              : `${t.time.until} ${t.prayers[nextPrayer.name as keyof typeof t.prayers]}: ${formatTimeUntilNextPrayer(timeUntilNext, {
                hour: t.ui.hour,
                hours: t.ui.hours,
                minute: t.ui.minute,
                minutes: t.ui.minutes,
                and: t.ui.and
              })}`}
          </p>
          <p className="mt-2 text-sm opacity-80">
            {new Date(Date.now() + timeUntilNext).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
