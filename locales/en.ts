import { Translations } from '../types/translation';

export const en: Translations = {
  prayers: {
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha'
  },
  
  ui: {
    now: 'NOW',
    next: 'Next',
    current: 'Current',
    todaysPrayerTimes: "Prayer Times Dashboard",
    currentPrayer: 'Current Prayer',
    nextPrayer: 'Next Prayer',
    timeRemaining: 'Time Remaining',
    settings: 'Settings',
    location: 'Location',
    notifications: 'Notifications',
    language: 'Language',
    calculationMethod: 'Calculation Method',
    notificationMinutes: 'Notification Minutes',
    timeAdjustments: 'Time Adjustments (minutes)',
    minutes: 'minutes',
    hour: 'hour',
    hours: 'hours',
    minute: 'minute',
    and: 'and',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    enable: 'Enable',
    disable: 'Disable',
    testMode: 'Test Mode',
    additionalFeatures: 'Additional Features',
    futureFeatures: 'Future Features',
    comingSoon: 'Coming Soon',
    stayConnected: 'Stay connected with your daily prayers',
    resetToNow: 'Reset to Now'
  },
  
  time: {
    until: 'until',
    remaining: 'remaining',
    inProgress: 'in progress',
    completed: 'completed',
    in: 'in'
  },
  
  location: {
    currentLocation: 'Current Location',
    selectLocation: 'Select Location',
    bangkok: 'Bangkok',
    thailand: 'Thailand',
    requestingLocation: 'Getting your location...',
    locationError: 'Unable to get location',
    accessDenied: 'Location access denied. Please enable location permissions.',
    unavailable: 'Location unavailable. Please try again.',
    timeout: 'Location request timed out. Please try again.',
    failed: 'Failed to get your location.'
  },
  
  alerts: {
    resetConfirm: 'Reset all settings to default?',
    notificationSupport: 'This browser does not support notifications',
    notificationEnabled: 'Notifications enabled! You will receive prayer time alerts.',
    featureComingSoon: 'will be available soon! 🚀',
    thankYou: 'Thank you for your interest! We will develop these features soon 🙏'
  },
  
  calculationMethods: {
    MoonsightingCommittee: {
      name: 'Moonsighting Committee',
      description: 'Used in North America'
    },
    MuslimWorldLeague: {
      name: 'Muslim World League',
      description: 'Used in Europe, Far East, parts of US'
    },
    Egyptian: {
      name: 'Egyptian General Authority',
      description: 'Used in Africa, Syria, Iraq, Lebanon, Malaysia, Parts of US'
    },
    Karachi: {
      name: 'University of Islamic Sciences, Karachi',
      description: 'Used in Pakistan, Bangladesh, India, Afghanistan, Parts of Europe'
    },
    UmmAlQura: {
      name: 'Umm Al-Qura University, Makkah',
      description: 'Used in Saudi Arabia'
    },
    Dubai: {
      name: 'Dubai (unofficial)',
      description: 'Used in UAE'
    },
    Qatar: {
      name: 'Qatar',
      description: 'Modified version of Umm Al-Qura used in Qatar'
    },
    Kuwait: {
      name: 'Kuwait',
      description: 'Method used in Kuwait'
    },
    Singapore: {
      name: 'Singapore',
      description: 'Used in Singapore, Malaysia, and Indonesia'
    },
    Turkey: {
      name: 'Turkey',
      description: 'Used in Turkey'
    }
  }
};
