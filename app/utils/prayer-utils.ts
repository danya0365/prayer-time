import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan';
import { format } from 'date-fns';

export type Prayer = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerInfo {
  name: Prayer;
  displayName: string;
  time: Date;
  emoji: string;
  color: string;
}

// Bangkok coordinates as default
const DEFAULT_COORDINATES: Coordinates = new Coordinates(13.7563, 100.5018);

/**
 * Get prayer times for the current date
 */
export function getPrayerTimes(date: Date = new Date(), coordinates?: Coordinates): PrayerTimes {
  // Use provided coordinates or default to Bangkok
  const location = coordinates || DEFAULT_COORDINATES;
  
  // Use MoonsightingCommittee calculation method for accurate times
  const params = CalculationMethod.MoonsightingCommittee();
  params.madhab = Madhab.Shafi;
  
  return new PrayerTimes(location, date, params);
}

/**
 * Format prayer time to readable string
 */
export function formatPrayerTime(date: Date): string {
  return format(date, 'h:mm a');
}

/**
 * Get all prayer times for the day with additional information
 */
export function getAllPrayerInfo(prayerTimes: PrayerTimes): PrayerInfo[] {
  return [
    {
      name: 'fajr',
      displayName: 'Fajr',
      time: prayerTimes.fajr,
      emoji: '🌅',
      color: 'var(--color-fajr)'
    },
    {
      name: 'dhuhr',
      displayName: 'Dhuhr',
      time: prayerTimes.dhuhr,
      emoji: '☀️',
      color: 'var(--color-dhuhr)'
    },
    {
      name: 'asr',
      displayName: 'Asr',
      time: prayerTimes.asr,
      emoji: '🌤️',
      color: 'var(--color-asr)'
    },
    {
      name: 'maghrib',
      displayName: 'Maghrib',
      time: prayerTimes.maghrib,
      emoji: '🌆',
      color: 'var(--color-maghrib)'
    },
    {
      name: 'isha',
      displayName: 'Isha',
      time: prayerTimes.isha,
      emoji: '🌙',
      color: 'var(--color-isha)'
    }
  ];
}

/**
 * Get the current prayer and next prayer
 */
export function getCurrentAndNextPrayer(prayerTimes: PrayerTimes): {
  current: PrayerInfo | null;
  next: PrayerInfo;
  timeUntilNext: number;
} {
  const now = new Date();
  const prayers = getAllPrayerInfo(prayerTimes);
  
  // Find the next prayer
  const nextPrayerIndex = prayers.findIndex(prayer => prayer.time > now);
  
  // If no next prayer found today, the next prayer is tomorrow's Fajr
  if (nextPrayerIndex === -1) {
    // Get tomorrow's prayer times
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowPrayerTimes = getPrayerTimes(tomorrow);
    
    return {
      current: prayers[prayers.length - 1], // Last prayer of today
      next: {
        name: 'fajr',
        displayName: 'Fajr',
        time: tomorrowPrayerTimes.fajr,
        emoji: '🌅',
        color: 'var(--color-fajr)'
      },
      timeUntilNext: tomorrowPrayerTimes.fajr.getTime() - now.getTime()
    };
  }
  
  // Current prayer is the one before next, or null if before first prayer
  const currentPrayerIndex = nextPrayerIndex > 0 ? nextPrayerIndex - 1 : -1;
  const currentPrayer = currentPrayerIndex >= 0 ? prayers[currentPrayerIndex] : null;
  const nextPrayer = prayers[nextPrayerIndex];
  
  // Calculate time until next prayer in milliseconds
  const timeUntilNext = nextPrayer.time.getTime() - now.getTime();
  
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
