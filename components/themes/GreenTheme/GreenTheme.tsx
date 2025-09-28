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

interface GreenThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function GreenTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error,
}: GreenThemeProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-full p-8 shadow-2xl border-4 border-emerald-200/50">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 border-8 border-emerald-100 rounded-full animate-spin border-t-emerald-500 border-r-emerald-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl animate-pulse">🌿</span>
              </div>
            </div>
            <p className="text-emerald-800 font-semibold text-lg">กำลังโหลด...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-red-200 text-center max-w-md">
          <div className="text-7xl mb-6">🚨</div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-lime-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-teal-200/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Leaves Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-2xl animate-bounce delay-300">🍃</div>
        <div className="absolute top-40 right-20 text-xl animate-bounce delay-700">🌱</div>
        <div className="absolute bottom-32 left-20 text-lg animate-bounce delay-1000">🌿</div>
        <div className="absolute top-60 left-1/2 text-xl animate-bounce delay-500">🍀</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header with Nature Theme */}
        <div className="px-4 sm:px-6 pt-6 pb-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Nature Icon & Title */}
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-400 via-green-400 to-lime-400 rounded-full mb-4 shadow-2xl border-4 border-white/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                <span className="text-4xl sm:text-5xl relative z-10">🕌</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-2 sm:mb-3 drop-shadow-sm">
                {t.dashboard.title}
              </h1>
              <p className="text-base sm:text-lg text-emerald-700 font-medium">
                {formatDisplayDate(new Date(), settings.language)}
              </p>
            </div>

            {/* Location Button */}
            {currentLocation && (
              <div className="mb-6">
                <button
                  onClick={() => setLocationSelectorOpen(true)}
                  className="group inline-flex items-center space-x-3 bg-white/80 hover:bg-white/95 backdrop-blur-lg px-4 sm:px-6 py-3 rounded-full shadow-xl border-2 border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-500 hover:scale-105"
                  title="คลิกเพื่อเปลี่ยนตำแหน่ง"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                    <span className="text-white text-lg">🌍</span>
                  </div>
                  <span className="text-emerald-800 font-semibold text-sm sm:text-base">
                    {currentLocation.city || "Unknown"},{" "}
                    {currentLocation.country || "Unknown"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Current & Next Prayer Dashboard */}
        {currentPrayer && (
          <div className="px-4 sm:px-6 mb-6 sm:mb-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[2rem] p-4 sm:p-8 shadow-2xl border-2 border-emerald-200/30 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-200 via-transparent to-lime-200"></div>
                </div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
                  {/* Current Prayer */}
                  <div className="text-center lg:border-r lg:border-emerald-200/50 lg:pr-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full mb-3 sm:mb-4 shadow-2xl border-4 border-white/70 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full"></div>
                      <span className="text-3xl sm:text-5xl relative z-10">{currentPrayer.emoji}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-2">
                      {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                    </h2>
                    <p className="text-emerald-600 mb-3 sm:mb-4 text-sm sm:text-base">
                      {t.dashboard.currentPrayer}
                    </p>
                    <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-100 to-lime-100 rounded-full border-2 border-emerald-300/50 shadow-lg">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse shadow-sm"></div>
                      <span className="text-emerald-800 font-semibold text-xs sm:text-sm">
                        กำลังดำเนินการ
                      </span>
                    </div>
                  </div>

                  {/* Next Prayer Countdown */}
                  {nextPrayer && (
                    <div className="text-center lg:pl-8 mt-6 lg:mt-0">
                      <h3 className="text-base sm:text-lg font-bold text-emerald-700 mb-2">
                        {t.dashboard.nextPrayer}
                      </h3>
                      <p className="text-lg sm:text-xl font-bold text-emerald-800 mb-3 sm:mb-4">
                        {t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                      </p>
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-2xl border-2 border-white/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        <div className="relative z-10">
                          <div className="text-2xl sm:text-4xl font-black font-mono mb-2">
                            {formatTimeUntil(timeUntilNext)}
                          </div>
                          <p className="text-emerald-100 text-xs sm:text-sm font-medium">
                            เหลือเวลา
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prayer Times Hexagon Grid */}
        <div className="px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`group relative ${
                    prayer.isCurrent
                      ? "bg-gradient-to-br from-emerald-400 to-teal-400 shadow-2xl scale-105 sm:scale-110"
                      : "bg-white/80"
                  } backdrop-blur-lg rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 ${
                    prayer.isCurrent ? "border-emerald-300" : "border-emerald-200/40"
                  } hover:shadow-2xl hover:scale-105 sm:hover:scale-110 transition-all duration-700 transform-gpu`}
                >
                  {/* Current Prayer Glow Effect */}
                  {prayer.isCurrent && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl sm:rounded-3xl blur opacity-75 animate-pulse"></div>
                  )}

                  {/* Status Leaf Indicator */}
                  {prayer.isCurrent && (
                    <div className="absolute -top-2 -right-2 z-20">
                      <div className="relative">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-lime-400 rounded-full animate-pulse shadow-xl border-2 border-white"></div>
                        <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-lime-300 rounded-full animate-ping"></div>
                        <div className="absolute inset-1 sm:inset-2 text-xs sm:text-sm">🌟</div>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-3 sm:p-4 lg:p-6 text-center">
                    {/* Background Nature Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1 right-1 w-8 h-8 sm:w-12 sm:h-12 bg-emerald-300 rounded-full blur-xl"></div>
                      <div className="absolute bottom-1 left-1 w-6 h-6 sm:w-8 sm:h-8 bg-lime-300 rounded-full blur-lg"></div>
                    </div>

                    {/* Prayer Icon */}
                    <div className={`relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${
                      prayer.isCurrent
                        ? "bg-white/30 border-2 border-white/60"
                        : "bg-gradient-to-br from-emerald-100 to-lime-100 border-2 border-emerald-200"
                    } rounded-full mb-2 sm:mb-3 shadow-xl group-hover:scale-125 transition-transform duration-500`}>
                      <span className="text-2xl sm:text-3xl lg:text-4xl filter drop-shadow-sm">
                        {prayer.emoji}
                      </span>
                    </div>

                    {/* Prayer Name */}
                    <h3 className={`font-bold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 ${
                      prayer.isCurrent ? "text-white" : "text-emerald-800"
                    } transition-colors duration-300`}>
                      {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                    </h3>

                    {/* Prayer Time */}
                    <div className={`text-lg sm:text-xl lg:text-2xl font-black font-mono mb-2 sm:mb-3 ${
                      prayer.isCurrent
                        ? "text-white drop-shadow-lg"
                        : "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                    }`}>
                      {formatPrayerTime(prayer.time, settings.language)}
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      prayer.isCurrent
                        ? "bg-white/25 text-white border border-white/40"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    } backdrop-blur-sm shadow-sm`}>
                      {prayer.isCurrent && (
                        <div className="w-2 h-2 bg-white rounded-full mr-1 sm:mr-2 animate-pulse"></div>
                      )}
                      <span className="text-xs">
                        {calculatePrayerTimeStatus(prayer, currentPrayer, settings.language).displayText}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Nature Accent */}
                  <div className={`h-1 sm:h-2 ${
                    prayer.isCurrent
                      ? "bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300"
                      : "bg-gradient-to-r from-emerald-200 via-lime-200 to-green-200"
                  } relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default GreenTheme;
