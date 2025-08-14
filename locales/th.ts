import { Translations } from '../types/translation';

export const th: Translations = {
  prayers: {
    fajr: 'ฟัจร์',
    dhuhr: 'ซุฮร์',
    asr: 'อัศร์',
    maghrib: 'มัฆริบ',
    isha: 'อิชา'
  },
  
  ui: {
    now: 'ตอนนี้',
    next: 'ต่อไป',
    current: 'ปัจจุบัน',
    todaysPrayerTimes: 'เวลาละหมาดวันนี้',
    currentPrayer: 'ละหมาดปัจจุบัน',
    nextPrayer: 'ละหมาดต่อไป',
    timeRemaining: 'เวลาที่เหลือ',
    settings: 'การตั้งค่า',
    location: 'ตำแหน่ง',
    notifications: 'การแจ้งเตือน',
    language: 'ภาษา',
    calculationMethod: 'วิธีการคำนวณ',
    notificationMinutes: 'นาทีแจ้งเตือน',
    timeAdjustments: 'การปรับเวลา (นาที)',
    minutes: 'นาที',
    hour: 'ชั่วโมง',
    hours: 'ชั่วโมง',
    minute: 'นาที',
    and: 'และ',
    loading: 'กำลังโหลด...',
    error: 'ข้อผิดพลาด',
    retry: 'ลองใหม่',
    close: 'ปิด',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    enable: 'เปิดใช้งาน',
    disable: 'ปิดใช้งาน',
    testMode: 'โหมดทดสอบ',
    additionalFeatures: 'คุณสมบัติเพิ่มเติม',
    futureFeatures: 'คุณสมบัติในอนาคต',
    comingSoon: 'เร็วๆ นี้',
    stayConnected: 'เชื่อมต่อกับการละหมาดประจำวันของคุณ'
  },
  
  time: {
    until: 'จนถึง',
    remaining: 'เหลือ',
    inProgress: 'กำลังดำเนินการ',
    completed: 'เสร็จสิ้น',
    in: 'ใน'
  },
  
  location: {
    currentLocation: 'ตำแหน่งปัจจุบัน',
    selectLocation: 'เลือกตำแหน่ง',
    bangkok: 'กรุงเทพมหานคร',
    thailand: 'ประเทศไทย',
    requestingLocation: 'กำลังขอตำแหน่ง...',
    locationError: 'ข้อผิดพลาดตำแหน่ง'
  },
  
  calculationMethods: {
    MoonsightingCommittee: {
      name: 'คณะกรรมการดูดวงจันทร์',
      description: 'ใช้ในอเมริกาเหนือ'
    },
    MuslimWorldLeague: {
      name: 'สันนิบาตโลกมุสลิม',
      description: 'ใช้ในยุโรป เอเชียตะวันออกไกล ส่วนหนึ่งของสหรัฐอเมริกา'
    },
    Egyptian: {
      name: 'องค์การทั่วไปอียิปต์',
      description: 'ใช้ในแอฟริกา ซีเรีย อิรัก เลบานอน มาเลเซีย ส่วนหนึ่งของสหรัฐอเมริกา'
    },
    Karachi: {
      name: 'มหาวิทยาลัยวิทยาศาสตร์อิสลาม การาจี',
      description: 'ใช้ในปากีสถาน บังกลาเทศ อินเดีย อัฟกานิสถาน ส่วนหนึ่งของยุโรป'
    },
    UmmAlQura: {
      name: 'มหาวิทยาลัยอุมมุลกุรอ มักกะห์',
      description: 'ใช้ในซาอุดีอาระเบีย'
    },
    Dubai: {
      name: 'ดูไบ (ไม่เป็นทางการ)',
      description: 'ใช้ในสหรัฐอาหรับเอมิเรตส์'
    },
    Qatar: {
      name: 'กาตาร์',
      description: 'เวอร์ชันที่ปรับปรุงของอุมมุลกุรอที่ใช้ในกาตาร์'
    },
    Kuwait: {
      name: 'คูเวต',
      description: 'วิธีที่ใช้ในคูเวต'
    },
    Singapore: {
      name: 'สิงคโปร์',
      description: 'ใช้ในสิงคโปร์ มาเลเซีย และอินโดนีเซีย'
    },
    Turkey: {
      name: 'ตุรกี',
      description: 'ใช้ในตุรกี'
    }
  }
};
