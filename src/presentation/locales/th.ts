import { Translations } from "@/src/domain/types/translation";

export const th: Translations = {
  prayers: {
    fajr: "ฟัจร์",
    dhuhr: "ซุฮร์",
    asr: "อัศร์",
    maghrib: "มัฆริบ",
    isha: "อิชา",
  },

  ui: {
    now: "ตอนนี้",
    next: "ต่อไป",
    current: "ปัจจุบัน",
    todaysPrayerTimes: "เวลาละหมาดวันนี้",
    currentPrayer: "ละหมาดปัจจุบัน",
    nextPrayer: "ละหมาดต่อไป",
    timeRemaining: "เวลาที่เหลือ",
    settings: "การตั้งค่า",
    location: "ตำแหน่ง",
    notifications: "การแจ้งเตือน",
    language: "ภาษา",
    calculationMethod: "วิธีการคำนวณ",
    notificationMinutes: "นาทีแจ้งเตือน",
    timeAdjustments: "การปรับเวลา (นาที)",
    minutes: "นาที",
    hour: "ชั่วโมง",
    hours: "ชั่วโมง",
    minute: "นาที",
    and: "และ",
    loading: "กำลังโหลด...",
    error: "ข้อผิดพลาด",
    retry: "ลองใหม่",
    close: "ปิด",
    save: "บันทึก",
    cancel: "ยกเลิก",
    enable: "เปิดใช้งาน",
    disable: "ปิดใช้งาน",
    testMode: "โหมดทดสอบ",
    additionalFeatures: "คุณสมบัติเพิ่มเติม",
    futureFeatures: "คุณสมบัติในอนาคต",
    comingSoon: "เร็วๆ นี้",
    stayConnected: "ติดตามข่าวสาร",
    resetToNow: "รีเซ็ตเป็นเวลาปัจจุบัน",
    refresh: "รีเฟรช",
    localTime: "เวลาท้องถิ่น",
    yourTime: "เวลาของคุณ",
    goToMyLocation: "ไปยังตำแหน่งของฉัน",
    backToDashboard: "กลับหน้าหลัก",
    exploreFeaturesText: "สำรวจทิศกิบลัต, ปฏิทินอิสลาม และเครื่องมือใหม่ๆ",
    exploreNow: "สำรวจเลย",
  },

  settings: {
    theme: "ธีม",
    currentTheme: "ธีมปัจจุบัน",
    themeDescription: "เลือกรูปแบบการแสดงผลที่คุณต้องการ",
  },

  dashboard: {
    title: "เวลาละหมาด",
    currentPrayer: "ละหมาดปัจจุบัน",
    nextPrayer: "ละหมาดถัดไป",
    prayerTimes: "เวลาละหมาด",
  },

  time: {
    until: "จนถึง",
    remaining: "เหลือ",
    inProgress: "กำลังดำเนินการ",
    completed: "เสร็จสิ้น",
    in: "ใน",
    untilPrayer: "จนถึง{prayerName}",
    timeRemaining: "เหลือ",
  },

  location: {
    currentLocation: "ตำแหน่งปัจจุบัน",
    selectLocation: "เลือกตำแหน่ง",
    bangkok: "กรุงเทพฯ",
    thailand: "ประเทศไทย",
    requestingLocation: "กำลังขอตำแหน่ง...",
    locationError: "ข้อผิดพลาดตำแหน่ง",
    accessDenied: "การเข้าถึงตำแหน่งถูกปฏิเสธ กรุณาเปิดใช้งานสิทธิ์ตำแหน่ง",
    unavailable: "ไม่สามารถหาตำแหน่งได้ กรุณาลองใหม่อีกครั้ง",
    timeout: "การขอตำแหน่งหมดเวลา กรุณาลองใหม่อีกครั้ง",
    failed: "ไม่สามารถหาตำแหน่งของคุณได้",
    useCurrentLocation: "ใช้ตำแหน่งปัจจุบัน",
    useCurrentLocationDesc:
      "ตรวจหาตำแหน่งของคุณโดยอัตโนมัติเพื่อเวลาละหมาดที่แม่นยำ",
    searchLocation: "ค้นหาตำแหน่ง",
    searchLocationPlaceholder: "ค้นหาเมืองหรือตำแหน่ง...",
    selectedLocation: "ตำแหน่งที่เลือก",
    saveLocation: "บันทึกตำแหน่ง",
    noLocationsFound: 'ไม่พบตำแหน่งสำหรับ "{searchQuery}"',
    geolocationNotSupported: "เบราว์เซอร์นี้ไม่รองรับการระบุตำแหน่ง",
    geolocationErrorUnknown: "ไม่สามารถหาตำแหน่งของคุณได้",
    geolocationErrorPermissionDenied:
      "การเข้าถึงตำแหน่งถูกปฏิเสธ กรุณาเปิดใช้งานสิทธิ์ตำแหน่ง",
    geolocationErrorUnavailable: "ไม่สามารถหาตำแหน่งได้ กรุณาลองใหม่อีกครั้ง",
    geolocationErrorTimeout: "การขอตำแหน่งหมดเวลา กรุณาลองใหม่อีกครั้ง",
    noLocationSet: "ไม่ได้ตั้งค่าตำแหน่ง",
    getLocation: "ขอตำแหน่ง",
    changeLocation: "เปลี่ยนตำแหน่ง",
  },

  alerts: {
    resetConfirm: "รีเซ็ตการตั้งค่าทั้งหมดเป็นค่าเริ่มต้น?",
    notificationSupport: "เบราว์เซอร์นี้ไม่รองรับการแจ้งเตือน",
    notificationEnabled:
      "เปิดใช้งานการแจ้งเตือนแล้ว! คุณจะได้รับการแจ้งเตือนเวลาละหมาด",
    featureComingSoon: "จะเปิดให้ใช้งานเร็วๆ นี้! 🚀",
    thankYou: "ขอบคุณสำหรับความสนใจ! เราจะพัฒนาฟีเจอร์เหล่านี้ในเร็วๆ นี้ 🙏",
  },

  calendar: {
    monthlyCalendar: 'ปฏิทินเวลาละหมาดรายเดือน',
    previousMonth: 'เดือนก่อนหน้า',
    nextMonth: 'เดือนถัดไป',
    today: 'วันนี้',
    viewFullCalendar: 'ดูปฏิทินเต็ม',
    listView: 'รายการ',
    gridView: 'ตาราง',
    hijriCalendar: 'ฮิจเราะห์',
    gregorianCalendar: 'สากล',
    sun: 'อา.',
    mon: 'จ.',
    tue: 'อ.',
    wed: 'พ.',
    thu: 'พฤ.',
    fri: 'ศ.',
    sat: 'ส.',
  },

  calculationMethods: {
    MoonsightingCommittee: {
      name: "คณะกรรมการดูดวงจันทร์",
      description: "ใช้ในอเมริกาเหนือ",
    },
    MuslimWorldLeague: {
      name: "สันนิบาตโลกมุสลิม",
      description: "ใช้ในยุโรป เอเชียตะวันออกไกล ส่วนหนึ่งของสหรัฐอเมริกา",
    },
    Egyptian: {
      name: "องค์การทั่วไปอียิปต์",
      description:
        "ใช้ในแอฟริกา ซีเรีย อิรัก เลบานอน มาเลเซีย ส่วนหนึ่งของสหรัฐอเมริกา",
    },
    Karachi: {
      name: "มหาวิทยาลัยวิทยาศาสตร์อิสลาม การาจี",
      description:
        "ใช้ในปากีสถาน บังกลาเทศ อินเดีย อัฟกานิสถาน ส่วนหนึ่งของยุโรป",
    },
    UmmAlQura: {
      name: "มหาวิทยาลัยอุมมุลกุรอ มักกะห์",
      description: "ใช้ในซาอุดีอาระเบีย",
    },
    Dubai: {
      name: "ดูไบ (ไม่เป็นทางการ)",
      description: "ใช้ในสหรัฐอาหรับเอมิเรตส์",
    },
    Qatar: {
      name: "กาตาร์",
      description: "เวอร์ชันที่ปรับปรุงของอุมมุลกุรอที่ใช้ในกาตาร์",
    },
    Kuwait: {
      name: "คูเวต",
      description: "วิธีที่ใช้ในคูเวต",
    },
    Singapore: {
      name: "สิงคโปร์",
      description: "ใช้ในสิงคโปร์ มาเลเซีย และอินโดนีเซีย",
    },
    Turkey: {
      name: "ตุรกี",
      description: "ใช้ในตุรกี",
    },
  },

  qibla: {
    title: "ทิศกิบลัต",
    distance: "ระยะทาง",
    precision: "ความแม่นยำ",
    standardFormula: "สูตรคำนวณมาตรฐาน",
    orientation: "การระบุทิศทาง",
    staticReference: "ค่าอ้างอิงคงที่",
    realTimeSensor: "เซนเซอร์เรียลไทม์",
    meccaAligned: "ตรงทิศกิบลัตแล้ว",
    stopOrientation: "หยุดการหมุน",
    calibrating: "กำลังปรับเทียบ...",
    howToFind: "วิธีหาทิศกิบลัต",
    latitude: "ละติจูด",
    longitude: "ลองจิจูด",
    city: "เมือง",
    unknownLocation: "ไม่ทราบตำแหน่ง",
    yourLocation: "ตำแหน่งของคุณ",
    qiblaStats: "ข้อมูลสถิติ",
    calibrationSteps: [
      "วางโทรศัพท์ให้ราบกับพื้นผิวที่เรียบและห่างจากแม่เหล็ก",
      "วางเครื่องให้ห่างจากการรบกวนของอุปกรณ์อิเล็กทรอนิกส์",
      "หากทิศทางดูไม่ถูกต้อง ให้ขยับโทรศัพท์เป็นรูป 'เลข 8' เพื่อปรับเทียบ",
      "ลูกศรบนเข็มทิศจะแสดงทิศทางสุดท้ายโดยเทียบกับทิศเหนือแม่เหล็ก"
    ],
    desktopSteps: [
      "เครื่อง MacBook ไม่มีเซนเซอร์เข็มทิศในตัว",
      "เข็มทิศด้านบนจะถือว่าส่วนหัวของหน้าจอคือทิศเหนือจริง (North)",
      "ให้หันเครื่อง MacBook ของคุณให้หน้าจอชี้ไปทางทิศเหนือ",
      "ลูกศรจะแสดงทิศทางไปยังมักกะฮ์ได้อย่างแม่นยำ"
    ],
    permissionRequired: "ต้องขออนุญาตเข้าถึงเข็มทิศ",
    permissionDesc: "โปรดอนุญาตการเข้าถึงเซนเซอร์ตรวจจับการเคลื่อนไหวเพื่อใช้งานเข็มทิศเรียลไทม์",
    enableNow: "อนุญาตตอนนี้"
  }
};
