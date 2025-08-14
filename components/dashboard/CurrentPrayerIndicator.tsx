"use client";

import { useEffect, useState } from 'react';
import { PrayerInfo, formatTimeUntilNextPrayer } from '../../utils/prayer-utils';

interface CurrentPrayerIndicatorProps {
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo;
  timeUntilNext: number;
  testMode?: boolean;
  testTime?: Date;
}

export default function CurrentPrayerIndicator({
  currentPrayer,
  nextPrayer,
  timeUntilNext: initialTimeUntilNext,
  testMode = false
}: CurrentPrayerIndicatorProps) {
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
      fajr: 'from-indigo-400 to-purple-500',
      dhuhr: 'from-yellow-400 to-orange-500', 
      asr: 'from-orange-400 to-red-500',
      maghrib: 'from-pink-400 to-rose-500',
      isha: 'from-blue-400 to-indigo-500'
    };
    return colorMap[prayer.name] || 'from-emerald-400 to-teal-500';
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
      <div className="text-center">
        {/* Prayer Status */}
        <div className="mb-4">
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${getPrayerColors()} text-white font-semibold shadow-lg`}>
            <span className="text-2xl" aria-hidden="true">
              {currentPrayer ? currentPrayer.emoji : nextPrayer.emoji}
            </span>
            <span className="text-lg">
              {currentPrayer 
                ? `Current: ${currentPrayer.displayName}` 
                : `Next: ${nextPrayer.displayName}`}
            </span>
          </div>
        </div>
        
        {/* Countdown */}
        <div className="text-white">
          <p className="text-white/80 text-sm mb-2 font-medium">
            {currentPrayer ? 'Time until next prayer' : 'Time remaining'}
          </p>
          <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm border border-white/20">
            <p className="text-3xl font-bold text-white">
              {formatTimeUntilNextPrayer(timeUntilNext)}
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-lg opacity-90">
            {currentPrayer 
              ? `Next prayer: ${nextPrayer.displayName} in ${formatTimeUntilNextPrayer(timeUntilNext)}` 
              : `Time until ${nextPrayer.displayName}: ${formatTimeUntilNextPrayer(timeUntilNext)}`}
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
