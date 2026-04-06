import { Translations } from '@/src/domain/types/translation';

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
    stayConnected: 'Stay Connected',
    resetToNow: 'Reset to Now',
    refresh: 'Refresh',
    localTime: 'Local Time',
    yourTime: 'Your Time',
    goToMyLocation: 'Go to My Location',
    backToDashboard: 'Back to Dashboard',
    exploreFeaturesText: 'Explore Qibla, Islamic Calendar, and experimental tools.',
    exploreNow: 'Explore Now'
  },

  settings: {
    theme: 'Theme',
    currentTheme: 'Current Theme',
    themeDescription: 'Choose your preferred visual style'
  },

  dashboard: {
    title: 'Prayer Times Dashboard',
    currentPrayer: 'Current Prayer',
    nextPrayer: 'Next Prayer',
    prayerTimes: 'Prayer Times'
  },
  
  time: {
    until: 'until',
    remaining: 'remaining',
    inProgress: 'in progress',
    completed: 'completed',
    in: 'in',
    untilPrayer: 'until {prayerName}',
    timeRemaining: 'remaining'
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
    failed: 'Failed to get your location.',
    useCurrentLocation: 'Use Current Location',
    useCurrentLocationDesc: 'Automatically detect your location for accurate prayer times',
    searchLocation: 'Search Location',
    searchLocationPlaceholder: 'Search for a city or location...',
    selectedLocation: 'Selected Location',
    saveLocation: 'Save Location',
    noLocationsFound: 'No locations found for "{searchQuery}"',
    geolocationNotSupported: 'Geolocation is not supported by this browser',
    geolocationErrorUnknown: 'Failed to get your location',
    geolocationErrorPermissionDenied: 'Location access denied. Please enable location permissions.',
    geolocationErrorUnavailable: 'Location unavailable. Please try again.',
    geolocationErrorTimeout: 'Location request timed out. Please try again.',
    noLocationSet: 'No location set',
    getLocation: 'Get location',
    changeLocation: 'Change location'
  },
  
  alerts: {
    resetConfirm: 'Reset all settings to default?',
    notificationSupport: 'This browser does not support notifications',
    notificationEnabled: 'Notifications enabled! You will receive prayer time alerts.',
    featureComingSoon: 'will be available soon! 🚀',
    thankYou: 'Thank you for your interest! We will develop these features soon 🙏'
  },

  calendar: {
    monthlyCalendar: 'Monthly Prayer Times',
    previousMonth: 'Previous Month',
    nextMonth: 'Next Month',
    today: 'Today',
    viewFullCalendar: 'View Full Calendar',
    listView: 'List',
    gridView: 'Grid',
    hijriCalendar: 'Hijri',
    gregorianCalendar: 'Gregorian',
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
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
  },

  qibla: {
    title: "Qibla Direction",
    distance: "Distance",
    precision: "Precision",
    standardFormula: "Standard Formula",
    orientation: "Orientation",
    staticReference: "Static Reference",
    realTimeSensor: "Real-time Sensor",
    meccaAligned: "Mecca Aligned",
    stopOrientation: "Stop Orientation",
    calibrating: "Calibrating...",
    howToFind: "How to find Qibla",
    latitude: "Latitude",
    longitude: "Longitude",
    city: "City",
    unknownLocation: "Unknown Location",
    yourLocation: "Your Location",
    qiblaStats: "Qibla Stats",
    calibrationSteps: [
      "Lay your phone flat on a level surface away from magnets",
      "Keep the device at a distance from electronic interference",
      "If the direction seems off, move your phone in a 'figure 8' pattern",
      "The compass arrow shows the final direction relative to magnetic North"
    ],
    desktopSteps: [
      "MacBooks do not have built-in compass sensors",
      "The compass above assumes the Top of your screen is True North",
      "Align your MacBook so the screen points toward North",
      "The arrow will then accurately show the direction to Mecca"
    ],
    permissionRequired: "Compass Permission Required",
    permissionDesc: "Enable motion sensors to use the real-time compass features.",
    enableNow: "Enable Now",
    manualAdjustment: "Manual Adjustment",
    manualMode: "Manual Mode",
    sensorMode: "Auto Compass",
    overrideDesc: "Override device sensor",
    adjustHeading: "Adjust Compass Heading",
    resetOrientation: "Reset Orientation",
    orientationHint: "If you know where True North is, adjust the slider below to align the compass.",
    calibrationTitle: "Calibrate Your Compass",
    calibrationDesc: "To ensure accuracy, please move your phone in a figure-8 motion.",
    calibrationStatus: "Detecting motion... {progress}%",
    skipCalibration: "Skip",
  },

  qiblaGuide: {
    title: "Qibla Compass Guide",
    subtitle: "Follow these tips for the most accurate Qibla direction",
    startButton: "Get Started",
    nextButton: "Next",
    prevButton: "Back",
    doneButton: "Start Finding Qibla",
    dontShowAgain: "Don't show this again",
    steps: [
      {
        title: "Enable Location Access",
        description: "Accurate GPS location is the foundation of a precise Qibla direction. The Qibla angle is calculated from YOUR location to Makkah.",
        icon: "📍",
        tips: [
          "Allow location access when prompted",
          "Go outdoors or near a window for the best GPS signal",
          "Wi-Fi and mobile data improve location accuracy"
        ]
      },
      {
        title: "Calibrate Your Compass",
        description: "Your phone's magnetometer needs calibration to detect True North accurately. Interference can cause incorrect readings.",
        icon: "🔄",
        tips: [
          "Move your phone slowly in a figure-8 pattern 3–4 times",
          "Rotate along all axes (tilt, roll, and yaw)",
          "Recalibrate if direction readings feel wrong"
        ]
      },
      {
        title: "Watch Your Environment",
        description: "Magnetic fields from nearby objects can distort the compass. Even small sources of interference matter.",
        icon: "⚠️",
        tips: [
          "Move away from metal objects, speakers, and magnets",
          "Remove magnetic phone cases or metal covers",
          "Step away from electronics, cars, and steel structures"
        ]
      },
      {
        title: "Hold the Device Correctly",
        description: "The compass sensor works best when the phone is held flat and parallel to the ground.",
        icon: "📱",
        tips: [
          "Hold your phone flat like a tray",
          "Keep it parallel to the ground, not tilted",
          "Avoid moving while reading the compass direction"
        ]
      },
      {
        title: "Manual Mode as Fallback",
        description: "If the compass doesn't work on your device (common on some Android phones and all desktops), you can manually set the North direction yourself.",
        icon: "🧭",
        tips: [
          "Use another compass or a known landmark to find North",
          "Switch to 'Manual Mode' and adjust the slider to True North",
          "Cross-verify with Google Maps: North is always up on the map"
        ]
      }
    ]
  }
};
