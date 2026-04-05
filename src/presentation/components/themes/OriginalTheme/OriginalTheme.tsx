"use client";

import LocationSelector from "@/src/presentation/components/shared/LocationSelector";
import { useNotifications } from "@/src/presentation/hooks/useNotifications";
import { usePrayerTimes } from "@/src/presentation/hooks/usePrayerTimes";
import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { useLocationStore } from "@/src/presentation/stores/locationStore";
import { useSettingsStore } from "@/src/presentation/stores/settingsStore";
import { useState } from "react";
import { LocationWarningBanner } from "../../shared/LocationWarningBanner";
import HeroSection from "./partials/HeroSection";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function OriginalTheme() {
  const [locationSelectorOpen, setLocationSelectorOpen] =
    useState<boolean>(false);

  const { currentLocation } = useLocationStore();
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });

  // Use prayer times hook
  const { prayers, currentPrayer, nextPrayer, timeUntilNext, loading } =
    usePrayerTimes();

  // Use notifications hook - enabled state managed in settings
  useNotifications({
    enabled: false, // Will be managed through settings panel
    nextPrayer: nextPrayer || {
      name: "fajr",
      displayName: "Fajr",
      time: new Date(),
      emoji: "🌅",
      color: "bg-gradient-to-r from-indigo-500 to-purple-600",
      isCurrent: false,
    },
    timeUntilNext,
    notificationMinutes: settings.notificationMinutes,
  });

  if (loading || !nextPrayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-medium">
          {t.ui.loading}...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-4 md:py-10 px-4 bg-[#022c22] overflow-x-hidden dark">
      {/* Background Islamic Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L61.23 38.77 L100 50 L61.23 61.23 L50 100 L38.77 61.23 L0 50 L38.77 38.77 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Elegant Radial Gradient for Depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,rgba(6,78,59,0.4)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <LocationWarningBanner 
          onUpdateLocation={() => setLocationSelectorOpen(true)} 
          variant="floating"
        />
        
        <HeroSection
          prayers={prayers}
          currentPrayer={currentPrayer}
          nextPrayer={nextPrayer}
          timeUntilNext={timeUntilNext}
          onLocationClick={() => setLocationSelectorOpen(true)}
          language={settings.language}
        />

        {/* Additional Features Call to Action */}
        <div className="w-full max-w-4xl mt-16 p-8 rounded-[2.5rem] bg-[#064e3b]/30 backdrop-blur-md border border-[#D4AF37]/20 relative overflow-hidden group/cta">
          {/* Subtle Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover/cta:bg-[#D4AF37]/10 transition-colors" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center border border-[#D4AF37]/30 shadow-xl shrink-0">
                <Sparkles className="w-8 h-8 text-[#D4AF37] animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {t.ui.additionalFeatures || "Additional Features"}
                </h3>
                <p className="text-[#D4AF37]/60 font-medium">
                  {t.ui.exploreFeaturesText || "Explore Qibla, Islamic Calendar, and experimental tools."}
                </p>
              </div>
            </div>
            
            <Link
              href="/features"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] hover:bg-[#B8962E] text-[#022c22] rounded-full transition-all duration-300 font-black overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span>{t.ui.exploreNow || "Explore Now"}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <LocationSelector
        isOpen={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
      />
    </div>
  );
}
