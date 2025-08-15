import { format } from 'date-fns';
import { enUS, th } from 'date-fns/locale';
import { Language } from '../types/translation';

// Map language codes to date-fns locales
const localeMap = {
  en: enUS,
  th: th,
  ar: enUS, // Use English for Arabic since date-fns doesn't have good Arabic support
} as const;

/**
 * Format date with proper locale support
 */
export function formatDateWithLocale(
  date: Date, 
  formatString: string, 
  language: Language = 'en'
): string {
  const locale = localeMap[language];
  
  try {
    return format(date, formatString, { locale });
  } catch (error) {
    // Fallback to English if there's an error
    console.warn('Date formatting error, falling back to English:', error);
    return format(date, formatString, { locale: enUS });
  }
}

/**
 * Format date for display in different languages
 */
export function formatDisplayDate(date: Date, language: Language = 'en'): string {
  switch (language) {
    case 'th':
      return formatDateWithLocale(date, 'EEEE ที่ d MMMM yyyy', 'th');
    case 'ar':
      // For Arabic, use English format but with RTL consideration
      return formatDateWithLocale(date, 'EEEE, MMMM d, yyyy', 'ar');
    case 'en':
    default:
      return formatDateWithLocale(date, 'EEEE, MMMM d, yyyy', 'en');
  }
}

/**
 * Format time with proper locale support
 */
export function formatTimeWithLocale(date: Date, language: Language = 'en'): string {
  switch (language) {
    case 'th':
      return formatDateWithLocale(date, 'H:mm น.', 'th');
    case 'ar':
      return formatDateWithLocale(date, 'h:mm a', 'ar');
    case 'en':
    default:
      return formatDateWithLocale(date, 'h:mm a', 'en');
  }
}
