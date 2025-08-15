import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan';
import { Language } from '../types/translation';
import { formatTimeWithLocale } from './date-formatting';

export type Prayer = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

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
  calculationMethod: string = 'MoonsightingCommittee',
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
    
    return {
      current: prayers[prayers.length - 1], // Last prayer of today
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
  
  // Current prayer is the one before next, or null if before first prayer
  const currentPrayerIndex = nextPrayerIndex > 0 ? nextPrayerIndex - 1 : -1;
  const currentPrayer = currentPrayerIndex >= 0 ? prayers[currentPrayerIndex] : null;
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
export function formatTimeUntilNextPrayer(timeInMs: number): string {
  const hours = Math.floor(timeInMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
}
