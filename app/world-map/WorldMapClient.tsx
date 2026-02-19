"use client";

import FloatingSettingsButton from "@/components/ui/FloatingSettingsButton";
import CityPrayerPopup from "@/components/world-map/CityPrayerPopup";
import { City } from "@/constants/cities";
import { ArrowLeft, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";

// Dynamic import to avoid SSR issues with D3
const WorldMapGlobe = dynamic(
  () => import("@/components/world-map/WorldMapGlobe"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center" style={{ background: "#0a0f1c" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
          <p className="text-sm text-slate-400">Loading World Map...</p>
        </div>
      </div>
    ),
  }
);

export default function WorldMapClient() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCitySelect = useCallback((city: City) => {
    setSelectedCity(city);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCity(null);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0a0f1c" }}>
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(8, 15, 30, 0.95) 0%, rgba(8, 15, 30, 0) 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="w-px h-5 bg-slate-700" />

          <div className="flex items-center gap-2">
            <Globe size={18} className="text-emerald-400" />
            <h1 className="text-base sm:text-lg font-bold text-white">
              World Prayer Times
            </h1>
          </div>
        </div>

        <div className="text-xs text-slate-500 hidden md:block">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-full">
        <WorldMapGlobe
          onCitySelect={handleCitySelect}
          selectedCity={selectedCity}
        />
      </div>

      {/* City prayer popup */}
      {selectedCity && (
        <CityPrayerPopup city={selectedCity} onClose={handleClose} />
      )}

      <FloatingSettingsButton />
    </div>
  );
}
