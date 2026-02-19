"use client";

import LocationSelector from "@/components/shared/LocationSelector";
import MonthlyCalendar from "@/components/shared/MonthlyCalendar";
import FloatingSettingsButton from "@/components/ui/FloatingSettingsButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocationStore } from "@/stores/locationStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CalendarPageClient() {
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  const { currentLocation } = useLocationStore();
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false);

  const locationLabel = currentLocation
    ? currentLocation.city && currentLocation.country
      ? `${currentLocation.city}, ${currentLocation.country}`
      : currentLocation.address || `${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}`
    : t.location.noLocationSet;

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Top navigation bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                     card-bg border border-border card-shadow
                     hover:bg-primary/10 hover:border-primary/30 transition-all group w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
          <span className="text-muted group-hover:text-primary transition-colors">
            {t.dashboard.title}
          </span>
        </Link>

        {/* Location display */}
        <button
          onClick={() => setLocationSelectorOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                     card-bg border border-border card-shadow
                     hover:bg-primary/10 hover:border-primary/30 transition-all group w-fit"
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{locationLabel}</span>
          <span className="text-xs text-muted group-hover:text-primary transition-colors">
            {t.location.changeLocation}
          </span>
        </button>
      </div>

      {/* Calendar section — full-width dedicated view */}
      <MonthlyCalendar language={settings.language} />

      {/* Location selector modal */}
      <LocationSelector
        isOpen={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
      />

      <FloatingSettingsButton />
    </div>
  );
}
