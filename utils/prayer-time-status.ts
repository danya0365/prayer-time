import { PrayerInfo } from './prayer-utils';
import { Language } from '../types/translation';

/**
 * Prayer time status types
 */
export type PrayerTimeStatus = 'completed' | 'active' | 'upcoming';

/**
 * Prayer time status result
 */
export interface PrayerTimeStatusResult {
  status: PrayerTimeStatus;
  displayText: string;
  timeRemaining?: {
    hours: number;
    minutes: number;
    totalMs: number;
  };
}

/**
 * Status text translations
 */
const STATUS_TRANSLATIONS = {
  en: {
    completed: 'Completed',
    active: 'Active now',
    upcoming: 'in {hours}h {minutes}m'
  },
  th: {
    completed: 'เสร็จสิ้น',
    active: 'กำลังดำเนิน',
    upcoming: 'อีก {hours} ชม. {minutes} นาที'
  },
  ar: {
    completed: 'مكتمل',
    active: 'نشط الآن',
    upcoming: 'في {hours}س {minutes}د'
  }
} as const;

/**
 * Calculate prayer time status and display text
 * Single Responsibility: Only handles prayer time status calculation
 * Open/Closed: Can be extended with new status types without modification
 * Dependency Inversion: Depends on abstractions (interfaces) not concrete implementations
 */
export function calculatePrayerTimeStatus(
  prayer: PrayerInfo,
  currentPrayer: PrayerInfo | null,
  language: Language = 'en',
  currentTime: Date = new Date()
): PrayerTimeStatusResult {
  const timeDiff = prayer.time.getTime() - currentTime.getTime();
  const isPassed = timeDiff < 0;
  const isCurrent = currentPrayer?.name === prayer.name;
  
  // Determine status
  let status: PrayerTimeStatus;
  if (isPassed) {
    status = 'completed';
  } else if (isCurrent) {
    status = 'active';
  } else {
    status = 'upcoming';
  }
  
  // Calculate time remaining for upcoming prayers
  let timeRemaining: PrayerTimeStatusResult['timeRemaining'];
  if (status === 'upcoming') {
    const hours = Math.floor(timeDiff / 3600000);
    const minutes = Math.floor((timeDiff % 3600000) / 60000);
    timeRemaining = {
      hours,
      minutes,
      totalMs: timeDiff
    };
  }
  
  // Get display text based on language and status
  const displayText = getStatusDisplayText(status, language, timeRemaining);
  
  return {
    status,
    displayText,
    timeRemaining
  };
}

/**
 * Get localized display text for prayer status
 * Single Responsibility: Only handles text localization
 * Interface Segregation: Small, focused function interface
 */
function getStatusDisplayText(
  status: PrayerTimeStatus,
  language: Language,
  timeRemaining?: PrayerTimeStatusResult['timeRemaining']
): string {
  const translations = STATUS_TRANSLATIONS[language];
  
  switch (status) {
    case 'completed':
      return translations.completed;
    case 'active':
      return translations.active;
    case 'upcoming':
      if (timeRemaining) {
        return translations.upcoming
          .replace('{hours}', timeRemaining.hours.toString())
          .replace('{minutes}', timeRemaining.minutes.toString());
      }
      return translations.upcoming.replace('{hours}', '0').replace('{minutes}', '0');
    default:
      return translations.completed;
  }
}

/**
 * Batch calculate status for multiple prayers
 * Single Responsibility: Only handles batch processing
 * Open/Closed: Can be extended for different batch processing needs
 */
export function calculateMultiplePrayerStatus(
  prayers: PrayerInfo[],
  currentPrayer: PrayerInfo | null,
  language: Language = 'en',
  currentTime: Date = new Date()
): Map<string, PrayerTimeStatusResult> {
  const statusMap = new Map<string, PrayerTimeStatusResult>();
  
  prayers.forEach(prayer => {
    const status = calculatePrayerTimeStatus(prayer, currentPrayer, language, currentTime);
    statusMap.set(prayer.name, status);
  });
  
  return statusMap;
}
