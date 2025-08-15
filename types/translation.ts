export type Language = 'en' | 'th' | 'ar';

export interface Translations {
  // Prayer names
  prayers: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  
  // Common UI text
  ui: {
    now: string;
    next: string;
    current: string;
    todaysPrayerTimes: string;
    currentPrayer: string;
    nextPrayer: string;
    timeRemaining: string;
    settings: string;
    location: string;
    notifications: string;
    language: string;
    calculationMethod: string;
    notificationMinutes: string;
    timeAdjustments: string;
    minutes: string;
    hour: string;
    hours: string;
    minute: string;
    and: string;
    loading: string;
    error: string;
    retry: string;
    close: string;
    save: string;
    cancel: string;
    enable: string;
    disable: string;
    testMode: string;
    additionalFeatures: string;
    futureFeatures: string;
    comingSoon: string;
    stayConnected: string;
    resetToNow: string;
  };

  // Settings
  settings: {
    theme: string;
    currentTheme: string;
    themeDescription: string;
  };

  // Dashboard
  dashboard: {
    title: string;
    currentPrayer: string;
    nextPrayer: string;
    prayerTimes: string;
  };
  
  // Time formats
  time: {
    until: string;
    remaining: string;
    inProgress: string;
    completed: string;
    in: string;
  };
  
  // Location
  location: {
    currentLocation: string;
    selectLocation: string;
    bangkok: string;
    thailand: string;
    requestingLocation: string;
    locationError: string;
    accessDenied: string;
    unavailable: string;
    timeout: string;
    failed: string;
  };

  // Alerts and confirmations
  alerts: {
    resetConfirm: string;
    notificationSupport: string;
    notificationEnabled: string;
    featureComingSoon: string;
    thankYou: string;
  };
  
  // Calculation methods
  calculationMethods: {
    MoonsightingCommittee: {
      name: string;
      description: string;
    };
    MuslimWorldLeague: {
      name: string;
      description: string;
    };
    Egyptian: {
      name: string;
      description: string;
    };
    Karachi: {
      name: string;
      description: string;
    };
    UmmAlQura: {
      name: string;
      description: string;
    };
    Dubai: {
      name: string;
      description: string;
    };
    Qatar: {
      name: string;
      description: string;
    };
    Kuwait: {
      name: string;
      description: string;
    };
    Singapore: {
      name: string;
      description: string;
    };
    Turkey: {
      name: string;
      description: string;
    };
  };
}
