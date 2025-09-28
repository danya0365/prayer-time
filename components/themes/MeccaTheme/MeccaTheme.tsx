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

interface MeccaThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function MeccaTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error,
}: MeccaThemeProps) {
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
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Desert Sand Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-amber-300/60 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-32 w-1 h-1 bg-orange-300/60 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-60 left-1/2 w-1 h-1 bg-amber-400/60 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-2 border-amber-200/50">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-amber-200/50 rounded-lg animate-spin border-t-amber-500 border-r-yellow-400 rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl animate-pulse">🕋</span>
              </div>
            </div>
            <p className="text-amber-800 font-bold text-xl">
              {t.ui.loading}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-red-200 text-center max-w-md">
          <div className="text-8xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            {t.ui.error}
          </h2>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-stone-100 relative overflow-hidden">
      {/* Desert Landscape Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sand Dunes */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-amber-200/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-24 bg-gradient-to-l from-yellow-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-20 bg-gradient-to-r from-orange-200/20 to-transparent rounded-full blur-2xl"></div>

        {/* Mountain Silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-stone-300/40 to-transparent"></div>

        {/* Sacred Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-amber-100/30 to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-20 w-48 h-48 bg-yellow-200/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Sacred Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-3xl animate-bounce delay-300 opacity-80">
          🕋
        </div>
        <div className="absolute top-60 right-32 text-2xl animate-bounce delay-700 opacity-70">
          🌙
        </div>
        <div className="absolute bottom-40 left-40 text-xl animate-bounce delay-1000 opacity-60">
          ⭐
        </div>
        <div className="absolute top-40 left-1/2 text-2xl animate-bounce delay-500 opacity-75">
          ✨
        </div>
        <div className="absolute bottom-60 right-20 text-lg animate-bounce delay-1200 opacity-65">
          🕌
        </div>
        <div className="absolute top-80 left-1/3 text-xl animate-bounce delay-800 opacity-70">
          🤲
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Sacred Kaaba Header */}
        <div className="px-2 sm:px-4 pt-2 sm:pt-4 pb-2 sm:pb-3">
          <div className="max-w-6xl mx-auto text-center">
            {/* Sacred Kaaba Icon */}
            <div className="mb-2 sm:mb-4">
              <p className="text-sm sm:text-base lg:text-lg text-amber-700 font-medium">
                {formatDisplayDate(new Date(), settings.language)}
              </p>

              {/* Sacred Blessing */}
              <div className="mt-1 sm:mt-2">
                <p className="text-xs sm:text-sm text-amber-600 font-arabic">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  ในนามของอัลลอฮ์ ผู้ทรงเมตตา ผู้ทรงกรุณา
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Prayer Dashboard - Floating Elements */}
        {currentPrayer && (
          <div className="px-4 sm:px-6 mb-6 sm:mb-8">
            <div className="max-w-6xl mx-auto">
              {/* Floating Sacred Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Current Prayer - Floating Left */}
                <div className="text-center relative">
                  {/* Floating Sacred Aura */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-amber-100/20 via-yellow-100/30 to-orange-100/20 rounded-full blur-3xl animate-pulse"></div>

                  {/* Sacred Kaaba - Floating */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-32 h-32 relative mb-6">
                      {/* Floating Sacred Rings */}
                      <div
                        className="absolute inset-0 border-2 border-amber-300/30 rounded-full animate-spin"
                        style={{ animationDuration: "20s" }}
                      ></div>
                      <div
                        className="absolute inset-4 border border-yellow-400/20 rounded-full animate-spin animate-reverse"
                        style={{ animationDuration: "15s" }}
                      ></div>

                      {/* Floating Kaaba */}
                      <div className="w-24 h-24 bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg shadow-2xl shadow-amber-400/30 flex items-center justify-center relative z-10 transform hover:scale-110 transition-transform duration-700">
                        <span className="text-4xl drop-shadow-xl">
                          {currentPrayer.emoji}
                        </span>
                        <div className="absolute inset-3 border border-amber-400/40 rounded-md"></div>
                      </div>
                    </div>

                    {/* Floating Prayer Name */}
                    <h2 className="text-3xl font-black bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3 drop-shadow-sm">
                      {
                        t.prayers[
                          currentPrayer.name.toLowerCase() as keyof typeof t.prayers
                        ]
                      }
                    </h2>

                    {/* Floating Status */}
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></div>
                      <span className="text-amber-700 font-bold text-lg">
                        {t.dashboard.currentPrayer}
                      </span>
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse delay-500 shadow-lg shadow-amber-400/50"></div>
                    </div>

                    {/* Floating Sacred Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500/90 to-yellow-500/90 rounded-full text-white shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                      <span className="text-xl mr-3">🕋</span>
                      <span className="font-black text-base">في حضرة الله</span>
                      <span className="text-xl ml-3">🤲</span>
                    </div>
                    <p className="text-amber-600 text-sm mt-2 font-medium opacity-80">
                      {t.ui.stayConnected}
                    </p>
                    {/* Sacred Location */}
                    {currentLocation && (
                      <div className="my-2 sm:my-4">
                        <button
                          onClick={() => setLocationSelectorOpen(true)}
                          className="group inline-flex items-center space-x-2 bg-white/80 hover:bg-white/95 backdrop-blur-lg px-3 sm:px-4 py-2 rounded-full shadow-xl border-2 border-amber-200/50 hover:border-amber-300/70 transition-all duration-500 hover:scale-105"
                          title={t.location.changeLocation}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                            <span className="text-white text-sm sm:text-lg">
                              🧭
                            </span>
                          </div>
                          <span className="text-amber-800 font-bold text-xs sm:text-sm">
                            📍 {currentLocation.city || t.location.noLocationSet},{" "}
                            {currentLocation.country || t.location.noLocationSet}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Next Prayer - Floating Right */}
                {nextPrayer && (
                  <div className="text-center relative">
                    {/* Floating Minaret Aura */}
                    <div className="absolute -inset-6 bg-gradient-to-br from-orange-100/20 via-amber-100/30 to-yellow-100/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

                    <div className="relative z-10">
                      {/* Floating Minaret */}
                      <div className="hidden md:inline-flex flex-col items-center mb-6">
                        <div className="w-6 h-12 bg-gradient-to-b from-amber-400 to-orange-500 rounded-t-full mb-2 shadow-xl"></div>
                        <div className="w-10 h-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-2 shadow-lg"></div>
                        <div className="w-16 h-20 bg-gradient-to-b from-stone-200 to-amber-100 rounded-lg shadow-2xl relative">
                          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-amber-600/40 rounded-sm"></div>
                          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-amber-600/40 rounded-sm"></div>
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">
                            🕌
                          </div>
                        </div>
                      </div>

                      {/* Floating Next Prayer Info */}
                      <h3 className="text-amber-700 font-bold text-lg mb-3">
                        📿 الصلاة القادمة
                      </h3>
                      <p className="text-2xl font-black text-amber-800 mb-6">
                        {
                          t.prayers[
                            nextPrayer.name.toLowerCase() as keyof typeof t.prayers
                          ]
                        }
                      </p>

                      {/* Floating Countdown */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl px-8 py-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
                          <div className="text-4xl font-black font-mono mb-2 text-amber-100">
                            {formatTimeUntil(timeUntilNext)}
                          </div>
                          <div className="flex items-center justify-center space-x-2 text-sm font-medium opacity-90">
                            <span>⏰</span>
                            <span>وقت الانتظار</span>
                            <span>⏰</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Sacred Blessing */}
              <div className="mt-12 text-center">
                <div className="flex items-center justify-center space-x-6 opacity-60">
                  <span className="text-2xl animate-bounce delay-100">🕋</span>
                  <span className="text-amber-600 font-arabic text-base">
                    بِسْمِ اللَّهِ
                  </span>
                  <span className="text-xl animate-bounce delay-300">✨</span>
                  <span className="text-amber-600 font-arabic text-base">
                    الرَّحْمَنِ
                  </span>
                  <span className="text-2xl animate-bounce delay-500">🤲</span>
                  <span className="text-amber-600 font-arabic text-base">
                    الرَّحِيم
                  </span>
                  <span className="text-xl animate-bounce delay-700">🕌</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sacred Prayer Times Grid */}
        <div className="px-2 sm:px-4 pb-4 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
              {prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`group relative ${
                    prayer.isCurrent
                      ? "bg-gradient-to-br from-amber-100 to-yellow-100 shadow-2xl scale-105 border-2 border-amber-400/60"
                      : "bg-white/90 border-2 border-amber-200/40"
                  } backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-700 transform-gpu`}
                >
                  {/* Sacred Light Indicator */}
                  {prayer.isCurrent && (
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-20">
                      <div className="relative">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-400 rounded-full animate-pulse shadow-xl border-2 border-white"></div>
                        <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-300 rounded-full animate-ping"></div>
                        <div className="absolute inset-1 sm:inset-2 text-xs">
                          ✨
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-2 sm:p-3 lg:p-4 text-center">
                    {/* Sacred Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-amber-300 rounded-full blur-xl"></div>
                      <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-300 rounded-full blur-lg"></div>
                    </div>

                    {/* Sacred Prayer Icon */}
                    <div className="relative mb-1 sm:mb-2">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${
                          prayer.isCurrent
                            ? "bg-gradient-to-br from-amber-400 to-yellow-400 border-2 border-white/80 shadow-2xl shadow-amber-400/50"
                            : "bg-gradient-to-br from-stone-100 to-amber-100 border-2 border-amber-200/50"
                        } rounded-full mb-1 sm:mb-2 group-hover:scale-125 transition-transform duration-500 relative`}
                      >
                        {/* Sacred Aura */}
                        {prayer.isCurrent && (
                          <div className="absolute -inset-1 sm:-inset-2 border-2 border-amber-300/40 rounded-full animate-pulse"></div>
                        )}

                        <span className="text-lg sm:text-xl lg:text-2xl relative z-10">
                          {prayer.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Prayer Name */}
                    <h3
                      className={`font-bold text-xs sm:text-sm mb-1 ${
                        prayer.isCurrent ? "text-amber-800" : "text-stone-700"
                      } transition-colors duration-300`}
                    >
                      {
                        t.prayers[
                          prayer.name.toLowerCase() as keyof typeof t.prayers
                        ]
                      }
                    </h3>

                    {/* Sacred Time Display */}
                    <div
                      className={`text-sm sm:text-base lg:text-lg font-black font-mono mb-1 sm:mb-2 ${
                        prayer.isCurrent
                          ? "text-amber-700 drop-shadow-sm"
                          : "text-stone-600"
                      }`}
                    >
                      {formatPrayerTime(prayer.time, settings.language)}
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                        prayer.isCurrent
                          ? "bg-amber-200/80 text-amber-800 border border-amber-400/50"
                          : "bg-stone-100 text-stone-600 border border-stone-200"
                      } backdrop-blur-sm shadow-sm`}
                    >
                      {prayer.isCurrent && (
                        <div className="w-1 h-1 sm:w-2 sm:h-2 bg-amber-500 rounded-full mr-1 animate-pulse shadow-sm shadow-amber-400/50"></div>
                      )}
                      <span className="text-xs">
                        {
                          calculatePrayerTimeStatus(
                            prayer,
                            currentPrayer,
                            settings.language
                          ).displayText
                        }
                      </span>
                    </div>
                  </div>

                  {/* Sacred Bottom Border */}
                  <div
                    className={`h-1 sm:h-2 ${
                      prayer.isCurrent
                        ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400"
                        : "bg-gradient-to-r from-stone-200 via-amber-200 to-yellow-200"
                    } relative overflow-hidden`}
                  >
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

export default MeccaTheme;
