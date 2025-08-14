"use client";

import { useEffect, useState } from 'react';
import { PrayerInfo, formatTimeUntilNextPrayer } from '../utils/prayer-utils';

interface CurrentPrayerIndicatorProps {
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo;
  timeUntilNext: number;
}

export default function CurrentPrayerIndicator({
  currentPrayer,
  nextPrayer,
  timeUntilNext: initialTimeUntilNext
}: CurrentPrayerIndicatorProps) {
  const [timeUntilNext, setTimeUntilNext] = useState(initialTimeUntilNext);
  
  // Update countdown every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilNext(prev => Math.max(0, prev - 60000)); // Subtract one minute (60000ms)
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get gradient background based on current or next prayer
  const getPrayerGradient = () => {
    const prayer = currentPrayer || nextPrayer;
    return `var(--gradient-${prayer.name})`;
  };
  
  return (
    <div 
      className="w-full max-w-md rounded-2xl p-6 text-white relative overflow-hidden"
      style={{ 
        background: getPrayerGradient(),
        boxShadow: 'var(--shadow-card)'
      }}
      aria-live="polite"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-2">
          <span className="text-4xl mr-2" aria-hidden="true">
            {currentPrayer ? currentPrayer.emoji : nextPrayer.emoji}
          </span>
          <h2 className="text-2xl font-bold">
            {currentPrayer 
              ? `Current: ${currentPrayer.displayName}` 
              : `Next: ${nextPrayer.displayName}`}
          </h2>
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
      
      {/* Decorative elements */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2" 
        style={{ background: 'white' }}
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2" 
        style={{ background: 'white' }}
        aria-hidden="true"
      />
    </div>
  );
}
