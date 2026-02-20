"use client";

import FloatingSettingsButton from "@/components/ui/FloatingSettingsButton";
import CityPrayerPopup from "@/components/world-map/CityPrayerPopup";
import { WorldMapGlobeRef } from "@/components/world-map/WorldMapGlobe";
import { City } from "@/constants/cities";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocationStore } from "@/stores/locationStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { ArrowLeft, Globe, Navigation } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

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
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  const { requestGeolocation, currentLocation } = useLocationStore();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const globeRef = useRef<WorldMapGlobeRef>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleCitySelect = useCallback((city: City) => {
    setSelectedCity(city);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCity(null);
  }, []);

  const handleGoToMyLocation = async () => {
    setIsLocating(true);
    try {
      // 1. Request/Refresh geolocation (this updates the store)
      await requestGeolocation();
      
      // 2. Access fresh location from store state
      const location = useLocationStore.getState().currentLocation;
      
      // 3. Zoom to the returned location
      if (location && globeRef.current) {
        globeRef.current.zoomTo(location.longitude, location.latitude, 10);
      }
    } catch (error) {
      console.error("Failed to get location:", error);
    } finally {
      setIsLocating(false);
    }
  };

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
          ref={globeRef}
          onCitySelect={handleCitySelect}
          selectedCity={selectedCity}
        />
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-6 right-24 z-30 flex flex-col gap-4">
        <button
          onClick={handleGoToMyLocation}
          disabled={isLocating}
          className={`w-12 h-12 rounded-full shadow-lg border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
            isLocating 
              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
              : "bg-emerald-500/90 hover:bg-emerald-500 text-white"
          }`}
          title={t.ui.goToMyLocation}
        >
          {isLocating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Navigation size={20} fill="currentColor" />
          )}
        </button>
      </div>

      {/* City prayer popup */}
      {selectedCity && (
        <CityPrayerPopup city={selectedCity} onClose={handleClose} />
      )}

      <FloatingSettingsButton />
    </div>
  );
}
