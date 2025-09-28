import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan';
import { Language } from '../types/translation';
import { formatTimeWithLocale } from './date-formatting';

export type Prayer = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export type CalculationMethodType = 
  | 'MoonsightingCommittee'
  | 'MuslimWorldLeague'
  | 'Egyptian'
  | 'Karachi'
  | 'UmmAlQura'
  | 'Dubai'
  | 'Qatar'
  | 'Kuwait'
  | 'Singapore'
  | 'Turkey';

export interface PrayerInfo {
  name: Prayer;
  displayName: string;
  time: Date;
  emoji: string;
  color: string;
  isCurrent: boolean;
}

// Bangkok coordinates as default
const DEFAULT_COORDINATES: Coordinates = new Coordinates(13.7563, 100.5018);

/**
 * Get prayer times for the current date
 */
export function getPrayerTimes(
  date: Date = new Date(), 
  coordinates?: Coordinates, 
  calculationMethod: CalculationMethodType = 'MoonsightingCommittee',
  adjustments?: { fajr: number; dhuhr: number; asr: number; maghrib: number; isha: number }
): PrayerTimes {
  // Use provided coordinates or default to Bangkok
  const location = coordinates || DEFAULT_COORDINATES;
  
  // Get calculation method based on user settings
  let params;
  switch (calculationMethod) {
    case 'MuslimWorldLeague':
      params = CalculationMethod.MuslimWorldLeague();
      break;
    case 'Egyptian':
      params = CalculationMethod.Egyptian();
      break;
    case 'Karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'UmmAlQura':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'Dubai':
      params = CalculationMethod.Dubai();
      break;
    case 'Qatar':
      params = CalculationMethod.Qatar();
      break;
    case 'Kuwait':
      params = CalculationMethod.Kuwait();
      break;
    case 'Singapore':
      params = CalculationMethod.Singapore();
      break;
    case 'Turkey':
      params = CalculationMethod.Turkey();
      break;
    case 'MoonsightingCommittee':
    default:
      params = CalculationMethod.MoonsightingCommittee();
      break;
  }
  
  // Set madhab to Shafi for all methods
  params.madhab = Madhab.Shafi;
  
  // Apply time adjustments if provided
  if (adjustments) {
    params.adjustments.fajr = adjustments.fajr;
    params.adjustments.dhuhr = adjustments.dhuhr;
    params.adjustments.asr = adjustments.asr;
    params.adjustments.maghrib = adjustments.maghrib;
    params.adjustments.isha = adjustments.isha;
  }
  
  return new PrayerTimes(location, date, params);
}

/**
 * Format prayer time to readable string
 */
export function formatPrayerTime(date: Date, language: Language = 'en'): string {
  return formatTimeWithLocale(date, language);
}

/**
 * Get all prayer times for the day with additional information
 */
export function getAllPrayerInfo(prayerTimes: PrayerTimes, currentTime: Date = new Date()): PrayerInfo[] {
  const prayers = [
    {
      name: 'fajr' as Prayer,
      displayName: 'Fajr',
      time: prayerTimes.fajr,
      emoji: '🌅',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-600'
    },
    {
      name: 'dhuhr' as Prayer,
      displayName: 'Dhuhr',
      time: prayerTimes.dhuhr,
      emoji: '☀️',
      color: 'bg-gradient-to-r from-yellow-400 to-orange-500'
    },
    {
      name: 'asr' as Prayer,
      displayName: 'Asr',
      time: prayerTimes.asr,
      emoji: '🌤️',
      color: 'bg-gradient-to-r from-orange-400 to-red-500'
    },
    {
      name: 'maghrib' as Prayer,
      displayName: 'Maghrib',
      time: prayerTimes.maghrib,
      emoji: '🌆',
      color: 'bg-gradient-to-r from-pink-500 to-rose-600'
    },
    {
      name: 'isha' as Prayer,
      displayName: 'Isha',
      time: prayerTimes.isha,
      emoji: '🌙',
      color: 'bg-gradient-to-r from-purple-600 to-indigo-700'
    }
  ];

  // Determine current prayer
  const currentPrayerName = prayerTimes.currentPrayer(currentTime);
  
  return prayers.map(prayer => ({
    ...prayer,
    isCurrent: prayer.name === currentPrayerName?.toLowerCase()
  }));
}

/**
 * Get the current prayer and next prayer
 */
export function getCurrentAndNextPrayer(prayerTimes: PrayerTimes, currentTime: Date = new Date()): {
  current: PrayerInfo | null;
  next: PrayerInfo;
  timeUntilNext: number;
} {
  const prayers = getAllPrayerInfo(prayerTimes, currentTime);
  
  // Find the next prayer
  const nextPrayerIndex = prayers.findIndex(prayer => prayer.time > currentTime);
  
  // If no next prayer found today, the next prayer is tomorrow's Fajr
  if (nextPrayerIndex === -1) {
    // Get tomorrow's prayer times
    const tomorrow = new Date(currentTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowPrayerTimes = getPrayerTimes(tomorrow);
    
    // After Isha, current prayer is still Isha (extended until Fajr)
    const currentPrayer = prayers[prayers.length - 1]; // Isha is last prayer
    currentPrayer.isCurrent = true; // Mark as current
    
    return {
      current: currentPrayer, // Always show Isha as current after Isha time
      next: {
        name: 'fajr',
        displayName: 'Fajr',
        time: tomorrowPrayerTimes.fajr,
        emoji: '🌅',
        color: 'bg-gradient-to-r from-indigo-500 to-purple-600',
        isCurrent: false
      },
      timeUntilNext: tomorrowPrayerTimes.fajr.getTime() - currentTime.getTime()
    };
  }
  
  // Current prayer logic: find the most recent prayer that has passed
  let currentPrayer: PrayerInfo | null = null;
  
  // Check if we're before the first prayer (Fajr)
  if (nextPrayerIndex === 0) {
    // Before Fajr - use yesterday's Isha as current prayer
    const yesterday = new Date(currentTime);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayPrayerTimes = getPrayerTimes(yesterday);
    
    currentPrayer = {
      name: 'isha',
      displayName: 'Isha',
      time: yesterdayPrayerTimes.isha,
      emoji: '🌙',
      color: 'bg-gradient-to-r from-purple-600 to-indigo-700',
      isCurrent: true
    };
  } else {
    // Find the most recent prayer that has passed
    for (let i = nextPrayerIndex - 1; i >= 0; i--) {
      if (prayers[i].time <= currentTime) {
        currentPrayer = prayers[i];
        currentPrayer.isCurrent = true; // Mark as current
        break;
      }
    }
  }
  
  const nextPrayer = prayers[nextPrayerIndex];
  
  // Calculate time until next prayer in milliseconds
  const timeUntilNext = nextPrayer.time.getTime() - currentTime.getTime();
  
  return {
    current: currentPrayer,
    next: nextPrayer,
    timeUntilNext
  };
}

/**
 * Format time until next prayer in a readable format
 */
export function formatTimeUntilNextPrayer(
  timeInMs: number,
  translations: {
    hour: string;
    hours: string;
    minute: string;
    minutes: string;
    and: string;
  }
): string {
  const hours = Math.floor(timeInMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0 && minutes > 0) {
    return `${hours} ${hours === 1 ? translations.hour : translations.hours} ${translations.and} ${minutes} ${minutes === 1 ? translations.minute : translations.minutes}`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? translations.hour : translations.hours}`;
  }
  
  return `${minutes} ${minutes === 1 ? translations.minute : translations.minutes}`;
}
