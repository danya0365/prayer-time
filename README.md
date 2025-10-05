# 🕌 Prayer Times - Next.js 15 + Tailwind CSS

แอปพลิเคชันแสดงเวลาละหมาดที่ทันสมัยและสวยงาม พัฒนาด้วย Next.js 15, TypeScript และ Tailwind CSS 4

A modern, beautiful prayer times application built with Next.js 15, TypeScript, and Tailwind CSS 4.

---

## ✨ คุณสมบัติหลัก (Features)

### 🕌 การคำนวณเวลาละหมาด
- ✅ คำนวณเวลาละหมาดที่แม่นยำด้วย **Adhan library**
- ✅ รองรับวิธีการคำนวณหลากหลาย (MWL, ISNA, Egypt, Makkah, Karachi, Tehran, Jafari)
- ✅ ปรับเวลาละหมาดแต่ละเวลาได้ (Fajr, Dhuhr, Asr, Maghrib, Isha)
- ✅ แสดงเวลาละหมาดปัจจุบันและเวลาถัดไป
- ✅ นับถอยหลังไปยังเวลาละหมาดถัดไป

### 🌍 ระบบตำแหน่งที่ตั้ง
- ✅ ตรวจจับตำแหน่งอัตโนมัติด้วย Geolocation API
- ✅ เลือกตำแหน่งด้วยตนเอง (รองรับเมืองต่างๆ ในไทยและทั่วโลก)
- ✅ บันทึกตำแหน่งที่เลือกไว้

### 🎨 ธีมที่หลากหลาย (10+ Themes)
1. **Original Theme** - ธีมต้นฉบับ
2. **Modern Theme** - ธีมทันสมัย
3. **Classic Theme** - ธีมคลาสสิก
4. **Minimal Theme** - ธีมมินิมอล
5. **Gradient Theme** - ธีมไล่สี
6. **Orange Theme** - ธีมสีส้ม
7. **Green Theme** - ธีมสีเขียว
8. **Space Theme** - ธีมอวกาศ
9. **Mecca Theme** - ธีมเมกกะ
10. **Ocean Theme** - ธีมมหาสมุทร

### 🌙 โหมดมืด (Dark Mode)
- ✅ รองรับโหมดสว่าง/มืดทุกธีม
- ✅ เปลี่ยนโหมดได้อัตโนมัติตามระบบ
- ✅ บันทึกการตั้งค่าโหมด

### 🌐 รองรับหลายภาษา (Multi-language)
- 🇬🇧 **English** - ภาษาอังกฤษ
- 🇹🇭 **Thai** - ภาษาไทย
- 🇸🇦 **Arabic** - ภาษาอาหรับ

### 📅 ปฏิทินอิสลาม (Islamic Calendar)
- ✅ แสดงวันที่ฮิจเราะห์
- ✅ แสดงเดือนอิสลาม
- ✅ แสดงเทศกาลสำคัญทางศาสนา
- ✅ นับวันจนถึงเดือนรอมฎอน

### 📱 Responsive Design
- ✅ รองรับทุกขนาดหน้าจอ (Mobile, Tablet, Desktop)
- ✅ UI/UX ที่ใช้งานง่าย
- ✅ Animation และ Transition ที่ลื่นไหล

### 💾 การจัดเก็บข้อมูล
- ✅ บันทึกการตั้งค่าด้วย **Zustand + LocalForage**
- ✅ บันทึกตำแหน่งที่เลือก
- ✅ บันทึกธีมและภาษา
- ✅ บันทึกวิธีการคำนวณ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

### Frontend Framework
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **next-themes** - Theme management
- **clsx** + **tailwind-merge** - Conditional styling

### State Management
- **Zustand** - Lightweight state management
- **LocalForage** - Persistent storage

### Prayer Calculations
- **Adhan** - Accurate prayer times calculation library

### Utilities
- **date-fns** - Date manipulation
- **axios** - HTTP client
- **lodash** - Utility functions
- **winston** - Logging

### Icons & UI
- **Lucide React** - Beautiful icon set

---

## 📁 โครงสร้างโปรเจค (Project Structure)

```
prayer-times-nextjs15-tailwind/
├── app/                          # Next.js App Router
│   ├── (index)/                  # หน้าหลัก
│   │   └── page.tsx
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/                   # React Components
│   ├── dashboard/                # Dashboard components
│   │   ├── PrayerTimesDisplay.tsx
│   │   ├── CurrentPrayerIndicator.tsx
│   │   ├── NextPrayerCountdown.tsx
│   │   ├── IslamicCalendar.tsx
│   │   ├── AdditionalFeatures.tsx
│   │   └── FutureFeatures.tsx
│   │
│   ├── mockups/                  # Mockup components
│   │   ├── MockupShowcase.tsx
│   │   ├── PrayerTrackerMockup.tsx
│   │   └── QuranReaderMockup.tsx
│   │
│   ├── shared/                   # Shared components
│   │   ├── LocationSelector.tsx
│   │   └── SettingsPanel.tsx
│   │
│   ├── themes/                   # Theme components (10+ themes)
│   │   ├── ThemedDashboard.tsx
│   │   ├── OriginalTheme/
│   │   ├── ModernTheme/
│   │   ├── ClassicTheme/
│   │   ├── MinimalTheme/
│   │   ├── GradientTheme/
│   │   ├── OrangeTheme/
│   │   ├── GreenTheme/
│   │   ├── SpaceTheme/
│   │   ├── MeccaTheme/
│   │   └── OceanTheme/
│   │
│   ├── ui/                       # UI components
│   │   └── FloatingSettingsButton.tsx
│   │
│   └── providers/                # Context providers
│       └── ThemeProvider.tsx
│
├── hooks/                        # Custom React Hooks
│   ├── usePrayerTimes.ts         # Prayer times logic
│   ├── useNotifications.ts       # Notification logic
│   ├── useTranslation.ts         # Translation logic
│   └── useDashboardState.ts      # Dashboard state
│
├── stores/                       # Zustand Stores
│   ├── locationStore.ts          # Location state
│   ├── settingsStore.ts          # Settings state
│   └── themeStore.ts             # Theme state
│
├── contexts/                     # React Contexts
│   └── ThemeContext.tsx          # Theme context
│
├── locales/                      # Translations
│   ├── index.ts
│   ├── en.ts                     # English
│   ├── th.ts                     # Thai
│   └── ar.ts                     # Arabic
│
├── utils/                        # Utility functions
│   ├── prayer-utils.ts           # Prayer calculations
│   ├── islamic-calendar.ts       # Hijri calendar
│   ├── date-formatting.ts        # Date formatting
│   ├── geolocationErrors.ts      # Geolocation errors
│   ├── cn.ts                     # Class name utility
│   └── logger.ts                 # Logging utility
│
├── constants/                    # Constants
│   └── calculationMethods.ts     # Calculation methods
│
├── types/                        # TypeScript types
│   ├── theme.ts
│   └── translation.ts
│
└── public/                       # Static assets
    ├── fonts/                    # Custom fonts
    └── *.svg                     # Icons
```

---

## 🚀 การติดตั้งและใช้งาน (Installation & Usage)

### 1. Clone Repository
```bash
git clone <repository-url>
cd prayer-times-nextjs15-tailwind
```

### 2. ติดตั้ง Dependencies
```bash
npm install
# หรือ
yarn install
```

### 3. รันโปรเจค
```bash
# Development mode
npm run dev
# หรือ
yarn dev

# Production build
npm run build
npm start
```

### 4. เปิดในเบราว์เซอร์
```
http://localhost:3000
```

---

## ⚙️ การตั้งค่า (Configuration)

### วิธีการคำนวณเวลาละหมาด (Calculation Methods)
โปรเจครองรับวิธีการคำนวณต่างๆ:
- **MWL** - Muslim World League
- **ISNA** - Islamic Society of North America
- **Egypt** - Egyptian General Authority of Survey
- **Makkah** - Umm al-Qura University, Makkah
- **Karachi** - University of Islamic Sciences, Karachi
- **Tehran** - Institute of Geophysics, University of Tehran
- **Jafari** - Shia Ithna-Ashari (Jafari)

### การปรับเวลา (Time Adjustments)
สามารถปรับเวลาละหมาดแต่ละเวลาได้ (เพิ่ม/ลดนาที):
- Fajr (ฟัจร์)
- Dhuhr (ซุฮร์)
- Asr (อัสร์)
- Maghrib (มัฆริบ)
- Isha (อิชา)

---

## 🎨 ธีม (Themes)

โปรเจคมีธีมให้เลือกมากกว่า 10 แบบ แต่ละธีมมีสไตล์และสีสันที่แตกต่างกัน:

1. **Original** - ธีมต้นฉบับที่เรียบง่าย
2. **Modern** - ธีมทันสมัยด้วย gradient และ animation
3. **Classic** - ธีมคลาสสิกสไตล์เก่า
4. **Minimal** - ธีมมินิมอลเน้นความเรียบง่าย
5. **Gradient** - ธีมไล่สีสวยงาม
6. **Orange** - ธีมสีส้มสดใส
7. **Green** - ธีมสีเขียวสบายตา
8. **Space** - ธีมอวกาศมืดลึกลับ
9. **Mecca** - ธีมเมกกะศักดิ์สิทธิ์
10. **Ocean** - ธีมมหาสมุทรสีน้ำเงิน

---

## 🌐 การรองรับภาษา (Internationalization)

### ภาษาที่รองรับ:
- 🇬🇧 English (en)
- 🇹🇭 ไทย (th)
- 🇸🇦 العربية (ar)

### การเพิ่มภาษาใหม่:
1. สร้างไฟล์ใน `locales/` (เช่น `locales/fr.ts`)
2. เพิ่ม translation keys ตาม interface `Translations`
3. เพิ่มภาษาใน `locales/index.ts`
4. อัปเดต `Language` type ใน `types/translation.ts`

---

## 📱 Features ที่กำลังพัฒนา (Future Features)

- 🔔 **Prayer Notifications** - แจ้งเตือนเวลาละหมาด
- 📖 **Quran Reader** - อ่านอัลกุรอาน
- 🕌 **Mosque Finder** - ค้นหามัสยิดใกล้เคียง
- 📊 **Prayer Tracker** - ติดตามการละหมาด
- 🎯 **Qibla Direction** - ทิศกิบลัต
- 🌙 **Ramadan Tracker** - ติดตามเดือนรอมฎอน

---

## 🤝 การมีส่วนร่วม (Contributing)

ยินดีรับ Pull Requests และ Issues!

1. Fork โปรเจค
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

---

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ

---

## 👨‍💻 Developer

**Marosdee Uma**
- Nickname: Marosdee
- Favorite Stack: Next.js + TypeScript + Tailwind CSS

---

## 🙏 Credits

- **Adhan Library** - สำหรับการคำนวณเวลาละหมาด
- **Next.js Team** - สำหรับ framework ที่ยอดเยี่ยม
- **Tailwind CSS** - สำหรับ utility-first CSS
- **Lucide Icons** - สำหรับไอคอนสวยงาม

---

## 📞 ติดต่อ (Contact)

หากมีคำถามหรือข้อเสนอแนะ สามารถติดต่อได้ผ่าน:
- GitHub Issues
- Pull Requests

---

**Made with ❤️ for the Muslim Community**
