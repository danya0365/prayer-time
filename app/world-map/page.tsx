import type { Metadata } from "next";
import WorldMapClient from "./WorldMapClient";

export const metadata: Metadata = {
  title: "World Prayer Times Map",
  description:
    "Interactive world map showing prayer times for cities across the globe. Click on any city to see Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times.",
  keywords: [
    "world prayer times",
    "global salah times",
    "prayer times map",
    "islamic world map",
    "เวลาละหมาดทั่วโลก",
    "แผนที่ละหมาด",
  ],
};

export default function WorldMapPage() {
  return <WorldMapClient />;
}
