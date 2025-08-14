/**
 * Islamic (Hijri) calendar utilities
 */

export interface HijriDate {
  day: number
  month: number
  year: number
  monthName: string
  monthNameArabic: string
}

export interface IslamicEvent {
  name: string
  nameArabic: string
  date: HijriDate
  description: string
  isImportant: boolean
}

// Hijri month names
const HIJRI_MONTHS = [
  { en: 'Muharram', ar: 'مُحَرَّم' },
  { en: 'Safar', ar: 'صَفَر' },
  { en: 'Rabi\' al-awwal', ar: 'رَبِيع ٱلْأَوَّل' },
  { en: 'Rabi\' al-thani', ar: 'رَبِيع ٱلثَّانِي' },
  { en: 'Jumada al-awwal', ar: 'جُمَادَىٰ ٱلْأُولَىٰ' },
  { en: 'Jumada al-thani', ar: 'جُمَادَىٰ ٱلثَّانِيَة' },
  { en: 'Rajab', ar: 'رَجَب' },
  { en: 'Sha\'ban', ar: 'شَعْبَان' },
  { en: 'Ramadan', ar: 'رَمَضَان' },
  { en: 'Shawwal', ar: 'شَوَّال' },
  { en: 'Dhu al-Qi\'dah', ar: 'ذُو ٱلْقِعْدَة' },
  { en: 'Dhu al-Hijjah', ar: 'ذُو ٱلْحِجَّة' }
]

/**
 * Convert Gregorian date to approximate Hijri date
 * Note: This is a simplified calculation. For precise dates, use a proper Islamic calendar library
 */
export function gregorianToHijri(gregorianDate: Date): HijriDate {
  // Simplified conversion (approximate)
  // For production, consider using a proper Islamic calendar library like 'hijri-date'
  
  const HIJRI_EPOCH = new Date('622-07-16') // Approximate start of Islamic calendar
  const HIJRI_YEAR_LENGTH = 354.37 // Average Hijri year length in days
  
  const daysSinceEpoch = Math.floor((gregorianDate.getTime() - HIJRI_EPOCH.getTime()) / (1000 * 60 * 60 * 24))
  const hijriYear = Math.floor(daysSinceEpoch / HIJRI_YEAR_LENGTH) + 1
  
  const dayInYear = daysSinceEpoch % HIJRI_YEAR_LENGTH
  const month = Math.floor(dayInYear / 29.5) + 1
  const day = Math.floor(dayInYear % 29.5) + 1
  
  const monthIndex = Math.min(Math.max(month - 1, 0), 11)
  
  return {
    day: Math.max(day, 1),
    month: Math.min(month, 12),
    year: hijriYear,
    monthName: HIJRI_MONTHS[monthIndex].en,
    monthNameArabic: HIJRI_MONTHS[monthIndex].ar
  }
}

/**
 * Format Hijri date to string
 */
export function formatHijriDate(hijriDate: HijriDate, language: 'en' | 'ar' = 'en'): string {
  if (language === 'ar') {
    return `${hijriDate.day} ${hijriDate.monthNameArabic} ${hijriDate.year} هـ`
  }
  return `${hijriDate.day} ${hijriDate.monthName} ${hijriDate.year} AH`
}

/**
 * Get important Islamic events for the current Hijri year
 */
export function getIslamicEvents(hijriYear: number): IslamicEvent[] {
  return [
    {
      name: 'Islamic New Year',
      nameArabic: 'رأس السنة الهجرية',
      date: { day: 1, month: 1, year: hijriYear, monthName: 'Muharram', monthNameArabic: 'مُحَرَّم' },
      description: 'Beginning of the Islamic calendar year',
      isImportant: true
    },
    {
      name: 'Day of Ashura',
      nameArabic: 'يوم عاشوراء',
      date: { day: 10, month: 1, year: hijriYear, monthName: 'Muharram', monthNameArabic: 'مُحَرَّم' },
      description: 'Day of fasting and remembrance',
      isImportant: true
    },
    {
      name: 'Mawlid an-Nabi',
      nameArabic: 'المولد النبوي',
      date: { day: 12, month: 3, year: hijriYear, monthName: 'Rabi\' al-awwal', monthNameArabic: 'رَبِيع ٱلْأَوَّل' },
      description: 'Birthday of Prophet Muhammad (PBUH)',
      isImportant: true
    },
    {
      name: 'Isra and Mi\'raj',
      nameArabic: 'الإسراء والمعراج',
      date: { day: 27, month: 7, year: hijriYear, monthName: 'Rajab', monthNameArabic: 'رَجَب' },
      description: 'Night Journey of Prophet Muhammad (PBUH)',
      isImportant: true
    },
    {
      name: 'Laylat al-Bara\'at',
      nameArabic: 'ليلة البراءة',
      date: { day: 15, month: 8, year: hijriYear, monthName: 'Sha\'ban', monthNameArabic: 'شَعْبَان' },
      description: 'Night of Forgiveness',
      isImportant: false
    },
    {
      name: 'Start of Ramadan',
      nameArabic: 'بداية رمضان',
      date: { day: 1, month: 9, year: hijriYear, monthName: 'Ramadan', monthNameArabic: 'رَمَضَان' },
      description: 'Beginning of the holy month of fasting',
      isImportant: true
    },
    {
      name: 'Laylat al-Qadr',
      nameArabic: 'ليلة القدر',
      date: { day: 27, month: 9, year: hijriYear, monthName: 'Ramadan', monthNameArabic: 'رَمَضَان' },
      description: 'Night of Power (estimated date)',
      isImportant: true
    },
    {
      name: 'Eid al-Fitr',
      nameArabic: 'عيد الفطر',
      date: { day: 1, month: 10, year: hijriYear, monthName: 'Shawwal', monthNameArabic: 'شَوَّال' },
      description: 'Festival of Breaking the Fast',
      isImportant: true
    },
    {
      name: 'Day of Arafah',
      nameArabic: 'يوم عرفة',
      date: { day: 9, month: 12, year: hijriYear, monthName: 'Dhu al-Hijjah', monthNameArabic: 'ذُو ٱلْحِجَّة' },
      description: 'Day of Hajj pilgrimage',
      isImportant: true
    },
    {
      name: 'Eid al-Adha',
      nameArabic: 'عيد الأضحى',
      date: { day: 10, month: 12, year: hijriYear, monthName: 'Dhu al-Hijjah', monthNameArabic: 'ذُو ٱلْحِجَّة' },
      description: 'Festival of Sacrifice',
      isImportant: true
    }
  ]
}

/**
 * Check if today is a special Islamic day
 */
export function getTodayIslamicEvent(gregorianDate: Date = new Date()): IslamicEvent | null {
  const hijriDate = gregorianToHijri(gregorianDate)
  const events = getIslamicEvents(hijriDate.year)
  
  return events.find(event => 
    event.date.day === hijriDate.day && 
    event.date.month === hijriDate.month
  ) || null
}

/**
 * Get days until Ramadan
 */
export function getDaysUntilRamadan(gregorianDate: Date = new Date()): number {
  const hijriDate = gregorianToHijri(gregorianDate)
  
  // If we're in Ramadan, return 0
  if (hijriDate.month === 9) {
    return 0
  }
  
  // Calculate days until next Ramadan
  // Note: targetYear would be used for precise calendar calculations
  // Currently using simplified approximation
  
  // Simplified calculation - in reality, you'd need precise calendar conversion
  const monthsUntilRamadan = hijriDate.month < 9 ? 9 - hijriDate.month : (12 - hijriDate.month) + 9
  const approximateDays = monthsUntilRamadan * 29.5 - hijriDate.day
  
  return Math.max(Math.round(approximateDays), 0)
}
