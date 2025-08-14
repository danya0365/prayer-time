import { Translations } from '../types/translation';

export const ar: Translations = {
  prayers: {
    fajr: 'الفجر',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء'
  },
  
  ui: {
    now: 'الآن',
    next: 'التالي',
    current: 'الحالي',
    todaysPrayerTimes: 'مواقيت الصلاة اليوم',
    currentPrayer: 'الصلاة الحالية',
    nextPrayer: 'الصلاة التالية',
    timeRemaining: 'الوقت المتبقي',
    settings: 'الإعدادات',
    location: 'الموقع',
    notifications: 'الإشعارات',
    language: 'اللغة',
    calculationMethod: 'طريقة الحساب',
    notificationMinutes: 'دقائق الإشعار',
    timeAdjustments: 'تعديل الأوقات (بالدقائق)',
    minutes: 'دقائق',
    hour: 'ساعة',
    hours: 'ساعات',
    minute: 'دقيقة',
    and: 'و',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    retry: 'إعادة المحاولة',
    close: 'إغلاق',
    save: 'حفظ',
    cancel: 'إلغاء',
    enable: 'تفعيل',
    disable: 'إلغاء التفعيل',
    testMode: 'وضع الاختبار',
    additionalFeatures: 'ميزات إضافية',
    futureFeatures: 'ميزات مستقبلية',
    comingSoon: 'قريباً',
    stayConnected: 'ابق متصلاً مع صلواتك اليومية'
  },
  
  time: {
    until: 'حتى',
    remaining: 'متبقي',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    in: 'في'
  },
  
  location: {
    currentLocation: 'الموقع الحالي',
    selectLocation: 'اختيار الموقع',
    bangkok: 'بانكوك',
    thailand: 'تايلاند',
    requestingLocation: 'طلب الموقع...',
    locationError: 'خطأ في الموقع'
  },
  
  calculationMethods: {
    MoonsightingCommittee: {
      name: 'لجنة رؤية الهلال',
      description: 'تستخدم في أمريكا الشمالية'
    },
    MuslimWorldLeague: {
      name: 'رابطة العالم الإسلامي',
      description: 'تستخدم في أوروبا والشرق الأقصى وأجزاء من الولايات المتحدة'
    },
    Egyptian: {
      name: 'الهيئة العامة المصرية',
      description: 'تستخدم في أفريقيا وسوريا والعراق ولبنان وماليزيا وأجزاء من الولايات المتحدة'
    },
    Karachi: {
      name: 'جامعة العلوم الإسلامية، كراتشي',
      description: 'تستخدم في باكستان وبنغلاديش والهند وأفغانستان وأجزاء من أوروبا'
    },
    UmmAlQura: {
      name: 'جامعة أم القرى، مكة',
      description: 'تستخدم في المملكة العربية السعودية'
    },
    Dubai: {
      name: 'دبي (غير رسمي)',
      description: 'تستخدم في دولة الإمارات العربية المتحدة'
    },
    Qatar: {
      name: 'قطر',
      description: 'نسخة معدلة من أم القرى تستخدم في قطر'
    },
    Kuwait: {
      name: 'الكويت',
      description: 'الطريقة المستخدمة في الكويت'
    },
    Singapore: {
      name: 'سنغافورة',
      description: 'تستخدم في سنغافورة وماليزيا وإندونيسيا'
    },
    Turkey: {
      name: 'تركيا',
      description: 'تستخدم في تركيا'
    }
  }
};
