"use client";

import { Language } from '@/src/domain/types/translation';
import { useTranslation } from '@/src/presentation/hooks/useTranslation';
import { PrayerInfo, formatPrayerTime } from '@/utils/prayer-utils';
import { useEffect, useState } from 'react';

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
  
  // Format time until: HH:MM:SS or MM:SS
  const formatTimeUntil = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  
  // Update countdown every second (only in normal mode)
  useEffect(() => {
    if (testMode) {
      // In test mode, use the provided timeUntilNext directly
      setTimeUntilNext(initialTimeUntilNext);
      return;
    }
    
    const timer = setInterval(() => {
      setTimeUntilNext(prev => Math.max(0, prev - 1000)); // Subtract one second (1000ms)
    }, 1000);
    
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

  return (
    <div className="relative bg-[#064e3b]/40 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 text-white overflow-hidden group/indicator">
      {/* Internal Glow Effect */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none group-hover/indicator:bg-[#D4AF37]/20 transition-all duration-1000" />
      
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Left Side: Prayer Name and Emoji */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#064e3b] to-[#022c22] rounded-2xl flex items-center justify-center border border-[#D4AF37]/30 shadow-xl group-hover/indicator:border-[#D4AF37]/60 transition-colors duration-500">
              <span className="text-4xl sm:text-5xl drop-shadow-md">{(currentPrayer || nextPrayer).emoji}</span>
            </div>
            {/* Animated Pulse for Current Prayer */}
            {currentPrayer && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] rounded-full animate-pulse border-2 border-[#022c22]" />
            )}
          </div>
          
          <div className="min-w-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 flex items-baseline gap-3">
              {t.prayers[(currentPrayer || nextPrayer).name as keyof typeof t.prayers]}
              <span className="text-xs sm:text-sm font-medium text-white/40 tabular-nums">
                ({formatPrayerTime((currentPrayer || nextPrayer)!.time, language)})
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest">
                {currentPrayer ? t.dashboard.currentPrayer : t.dashboard.nextPrayer}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Countdown */}
        <div className="bg-[#022c22]/60 px-6 py-4 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center sm:items-end group-hover/indicator:border-[#D4AF37]/40 transition-colors duration-500 min-w-[140px]">
          <p className="text-[#D4AF37] text-[10px] sm:text-xs uppercase font-black tracking-[0.2em] mb-1">
            {currentPrayer ? "Next Prayer In" : "Time Remaining"}
          </p>
          <p className="text-3xl sm:text-4xl font-mono font-black text-white drop-shadow-lg tabular-nums">
            {formatTimeUntil(timeUntilNext)}
          </p>
          <div className="flex flex-col items-center sm:items-end mt-1">
            <p className="text-white/50 text-[10px] sm:text-xs italic font-medium">
               {currentPrayer 
                 ? replaceTemplate(t.time.untilPrayer, { prayerName: t.prayers[nextPrayer.name as keyof typeof t.prayers] })
                 : t.time.timeRemaining}
            </p>
            <p className="text-[#D4AF37]/60 text-[10px] sm:text-xs font-bold tabular-nums">
              Starts @ {formatPrayerTime(nextPrayer.time, language)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
