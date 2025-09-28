"use client";

import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useTranslation } from "../../../hooks/useTranslation";
import { useLocationStore } from "../../../stores/locationStore";
import { useSettingsStore } from "../../../stores/settingsStore";
import { formatDisplayDate } from "../../../utils/date-formatting";
import { calculatePrayerTimeStatus } from "../../../utils/prayer-time-status";
import { formatPrayerTime, PrayerInfo } from "../../../utils/prayer-utils";
import LocationSelector from "../../shared/LocationSelector";

interface OrangeThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function OrangeTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error,
}: OrangeThemeProps) {
  const {} = useTheme();
  const { settings } = useSettingsStore();
  const { currentLocation } = useLocationStore();
  const { t } = useTranslation({ language: settings.language });
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false);

  const formatTimeUntil = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-orange-200">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-200 rounded-full animate-spin border-t-orange-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🕌</span>
              </div>
            </div>
            <p className="text-orange-800 font-medium">กำลังโหลด...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-orange-200 text-center max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-xl font-bold text-orange-800 mb-2">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-orange-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-amber-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 bg-orange-500 rounded-full blur-2xl"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-4 sm:pt-8 pb-3 sm:pb-6">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          {/* Title & Date */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-3 sm:mb-6 shadow-lg">
              <span className="text-2xl sm:text-3xl">🕌</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2 sm:mb-3">
              {t.dashboard.title}
            </h1>
            <p className="text-sm sm:text-lg text-orange-700 font-medium">
              {formatDisplayDate(new Date(), settings.language)}
            </p>
          </div>

          {/* Location */}
          {currentLocation && (
            <div className="flex justify-center">
              <button
                onClick={() => setLocationSelectorOpen(true)}
                className="group flex items-center space-x-2 sm:space-x-3 bg-white/70 hover:bg-white/90 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg border border-orange-200 hover:border-orange-300 transition-all duration-300"
                title="คลิกเพื่อเปลี่ยนตำแหน่ง"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xs sm:text-sm">📍</span>
                </div>
                <span className="text-orange-800 font-medium text-sm sm:text-base">
                  {currentLocation.city || "Unknown"},{" "}
                  {currentLocation.country || "Unknown"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pb-6 sm:pb-12">
        {/* Current Prayer & Next Prayer Section */}
        {currentPrayer && (
          <div className="mb-6 sm:mb-12">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-orange-200/50">
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
                {/* Current Prayer */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-3 sm:mb-4 shadow-xl">
                    <span className="text-3xl sm:text-4xl">{currentPrayer.emoji}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-orange-800 mb-2">
                    {
                      t.prayers[
                        currentPrayer.name.toLowerCase() as keyof typeof t.prayers
                      ]
                    }
                  </h2>
                  <p className="text-orange-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    {t.dashboard.currentPrayer}
                  </p>
                  <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full border border-orange-300">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-1 sm:mr-2 animate-pulse"></div>
                    <span className="text-orange-800 font-medium text-xs sm:text-sm">
                      กำลังดำเนินการ
                    </span>
                  </div>
                </div>

                {/* Next Prayer Countdown */}
                {nextPrayer && (
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-orange-700 mb-2">
                      {t.dashboard.nextPrayer}
                    </h3>
                    <p className="text-lg sm:text-xl font-bold text-orange-800 mb-3 sm:mb-4">
                      {
                        t.prayers[
                          nextPrayer.name.toLowerCase() as keyof typeof t.prayers
                        ]
                      }
                    </p>
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
                      <div className="text-2xl sm:text-4xl font-mono font-bold mb-1 sm:mb-2">
                        {formatTimeUntil(timeUntilNext)}
                      </div>
                      <p className="text-orange-100 text-xs sm:text-sm">เหลือเวลา</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`group relative ${
                prayer.isCurrent
                  ? "bg-gradient-to-br from-orange-400 to-amber-400 shadow-2xl scale-105"
                  : "bg-gradient-to-br from-white to-orange-50/80"
              } backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl border-2 ${
                prayer.isCurrent ? "border-orange-300" : "border-orange-200/30"
              } hover:shadow-2xl hover:scale-110 transition-all duration-700 transform-gpu`}
            >
              {/* Status Indicator */}
              {prayer.isCurrent && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="relative">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-6 h-6 bg-yellow-300 rounded-full animate-ping"></div>
                    <div className="absolute inset-2 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Prayer Icon Section */}
              <div className="relative p-4 sm:p-8 text-center">
                {/* Background Decoration */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 w-16 h-16 bg-orange-300 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-2 left-2 w-12 h-12 bg-amber-300 rounded-full blur-xl"></div>
                </div>

                {/* Icon Container */}
                <div
                  className={`relative z-10 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${
                    prayer.isCurrent
                      ? "bg-white/30 border-2 border-white/50"
                      : "bg-gradient-to-br from-orange-100 to-amber-100 border-2 border-orange-200"
                  } rounded-full mb-3 sm:mb-4 shadow-lg group-hover:scale-125 transition-transform duration-500`}
                >
                  <span className="text-3xl sm:text-4xl filter drop-shadow-sm">
                    {prayer.emoji}
                  </span>
                </div>

                {/* Prayer Name */}
                <h3
                  className={`font-bold text-base sm:text-lg mb-1 sm:mb-2 ${
                    prayer.isCurrent ? "text-white" : "text-orange-800"
                  } group-hover:text-orange-900 transition-colors duration-300`}
                >
                  {
                    t.prayers[
                      prayer.name.toLowerCase() as keyof typeof t.prayers
                    ]
                  }
                </h3>

                {/* Prayer Time */}
                <div
                  className={`text-2xl sm:text-3xl font-mono font-black mb-2 sm:mb-3 ${
                    prayer.isCurrent
                      ? "text-white drop-shadow-md"
                      : "bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                  }`}
                >
                  {formatPrayerTime(prayer.time, settings.language)}
                </div>

                {/* Status Text */}
                <div
                  className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs font-semibold ${
                    prayer.isCurrent
                      ? "bg-white/20 text-white border border-white/30"
                      : "bg-orange-100 text-orange-700 border border-orange-200"
                  } backdrop-blur-sm`}
                >
                  {prayer.isCurrent && (
                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full mr-1 sm:mr-2 animate-pulse"></div>
                  )}
                  {
                    calculatePrayerTimeStatus(
                      prayer,
                      currentPrayer,
                      settings.language
                    ).displayText
                  }
                </div>
              </div>

              {/* Bottom Accent */}
              <div
                className={`h-2 ${
                  prayer.isCurrent
                    ? "bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300"
                    : "bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200"
                } relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-amber-400/0 group-hover:from-orange-400/10 group-hover:to-amber-400/10 transition-all duration-500 rounded-3xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Selector */}
      <LocationSelector
        isOpen={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
      />
    </div>
  );
}

export default OrangeTheme;
