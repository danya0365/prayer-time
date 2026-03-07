import { PrayerDashboardThemeProvider } from "@/src/presentation/contexts/PrayerDashboardThemeContext";
import type { Metadata } from "next";
import CalendarPageClient from "./CalendarPageClient";

export const metadata: Metadata = {
  title: "ปฏิทินเวลาละหมาด - Prayer Times Calendar",
  description:
    "ปฏิทินเวลาละหมาดรายเดือน แสดงเวลาฟัจร์ ซุฮร์ อัศร์ มัฆริบ อิชา ทุกวัน - Monthly prayer times calendar with Fajr, Dhuhr, Asr, Maghrib, Isha",
  keywords: [
    "prayer times calendar",
    "ปฏิทินละหมาด",
    "เวลาละหมาดรายเดือน",
    "islamic calendar",
    "monthly salah times",
  ],
};

export default function CalendarPage() {
  return (
    <PrayerDashboardThemeProvider>
      <CalendarPageClient />
    </PrayerDashboardThemeProvider>
  );
}
