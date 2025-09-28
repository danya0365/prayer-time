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

interface OceanThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function OceanTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error,
}: OceanThemeProps) {
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
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-cyan-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Floating Bubbles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-200/60 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-blue-200/60 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-32 left-32 w-2 h-2 bg-teal-200/60 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-60 left-1/2 w-3 h-3 bg-cyan-300/60 rounded-full animate-bounce delay-1000"></div>
        </div>
        
        <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-full p-12 shadow-2xl border-4 border-cyan-200/50">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-teal-200/50 rounded-full animate-spin border-t-blue-500 border-r-cyan-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl animate-pulse">🌊</span>
              </div>
            </div>
            <p className="text-blue-800 font-bold text-xl">กำลังดำดิ่งสู่มหาสมุทร...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-red-200 text-center max-w-md">
          <div className="text-8xl mb-6">🌪️</div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            พายุในทะเล
          </h2>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Ocean Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wave Layers */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-200/40 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-cyan-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-teal-200/20 to-transparent"></div>
        
        {/* Ocean Depth */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/30 to-transparent"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-20 w-80 h-80 bg-blue-200/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-teal-200/25 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Floating Marine Life */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-3xl animate-bounce delay-300 opacity-80">🐠</div>
        <div className="absolute top-60 right-32 text-2xl animate-bounce delay-700 opacity-70">🐟</div>
        <div className="absolute bottom-40 left-40 text-xl animate-bounce delay-1000 opacity-60">🪸</div>
        <div className="absolute top-40 left-1/2 text-2xl animate-bounce delay-500 opacity-75">🌊</div>
        <div className="absolute bottom-60 right-20 text-lg animate-bounce delay-1200 opacity-65">🐙</div>
        <div className="absolute top-80 left-1/3 text-xl animate-bounce delay-800 opacity-70">⚓</div>
        <div className="absolute bottom-80 right-1/3 text-lg animate-bounce delay-1400 opacity-60">🦑</div>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-3 h-3 bg-cyan-300/40 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-32 right-16 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce delay-400"></div>
        <div className="absolute bottom-24 left-24 w-4 h-4 bg-teal-300/40 rounded-full animate-bounce delay-800"></div>
        <div className="absolute top-56 left-2/3 w-2 h-2 bg-cyan-400/40 rounded-full animate-bounce delay-600"></div>
        <div className="absolute bottom-48 right-12 w-3 h-3 bg-blue-400/40 rounded-full animate-bounce delay-1100"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Ocean Surface Header */}
        <div className="px-2 sm:px-4 pt-2 sm:pt-4 pb-2 sm:pb-3">
          <div className="max-w-6xl mx-auto text-center">
            {/* Ocean Wave Icon */}
            <div className="mb-2 sm:mb-4">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 relative">
                {/* Wave Rings */}
                <div className="absolute inset-0 border-4 border-blue-300/40 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 border-2 border-cyan-400/30 rounded-full animate-pulse delay-500"></div>
                <div className="absolute inset-4 border-2 border-teal-300/20 rounded-full animate-pulse delay-1000"></div>
                
                {/* Ocean Center */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full shadow-2xl shadow-blue-400/30 flex items-center justify-center relative z-10 border-2 border-white/50">
                  <span className="text-2xl sm:text-3xl lg:text-4xl">🌊</span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-lg">
                {t.dashboard.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-blue-700 font-medium">
                {formatDisplayDate(new Date(), settings.language)}
              </p>
              
              {/* Ocean Blessing */}
              <div className="mt-1 sm:mt-2">
                <p className="text-xs sm:text-sm text-teal-600 font-medium">
                  🌊 ในความลึกของมหาสมุทร พบความสงบ 🌊
                </p>
              </div>
            </div>

            {/* Marine Location */}
            {currentLocation && (
              <div className="mb-2 sm:mb-4">
                <button
                  onClick={() => setLocationSelectorOpen(true)}
                  className="group inline-flex items-center space-x-2 bg-white/80 hover:bg-white/95 backdrop-blur-lg px-3 sm:px-4 py-2 rounded-full shadow-xl border-2 border-cyan-200/50 hover:border-blue-300/70 transition-all duration-500 hover:scale-105"
                  title="คลิกเพื่อเปลี่ยนตำแหน่ง"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                    <span className="text-white text-sm sm:text-lg">⚓</span>
                  </div>
                  <span className="text-blue-800 font-bold text-xs sm:text-sm">
                    📍 {currentLocation.city || "Unknown"}, {currentLocation.country || "Unknown"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ocean Prayer Dashboard */}
        {currentPrayer && (
          <div className="px-2 sm:px-4 mb-3 sm:mb-6">
            <div className="max-w-6xl mx-auto">
              {/* Ocean Wave Container */}
              <div className="relative">
                {/* Underwater Bubble Trail */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <div className="w-2 h-2 bg-cyan-300/60 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-300/60 rounded-full animate-bounce delay-200"></div>
                  <div className="w-2 h-2 bg-teal-300/60 rounded-full animate-bounce delay-400"></div>
                </div>

                {/* Main Ocean Dashboard */}
                <div className="bg-gradient-to-br from-blue-400/20 via-cyan-300/20 to-teal-400/20 backdrop-blur-3xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/30 relative overflow-hidden">
                  {/* Animated Ocean Waves Background */}
                  <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-400/30 to-transparent rounded-b-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-cyan-400/20 to-transparent rounded-b-3xl transform translate-y-2"></div>
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-teal-400/15 to-transparent rounded-b-3xl transform translate-y-4"></div>
                  </div>

                  {/* Floating Sea Elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4 text-lg opacity-60 animate-bounce delay-100">🐠</div>
                    <div className="absolute top-6 right-6 text-sm opacity-50 animate-bounce delay-500">🪸</div>
                    <div className="absolute bottom-8 left-8 text-base opacity-40 animate-bounce delay-800">🐟</div>
                    <div className="absolute bottom-6 right-4 text-sm opacity-60 animate-bounce delay-300">💧</div>
                  </div>

                  <div className="relative z-10">
                    {/* Ocean Depth Header */}
                    <div className="text-center mb-4 sm:mb-6">
                      <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shadow-lg">
                        <span className="text-lg">🌊</span>
                        <span className="text-blue-800 font-bold text-sm sm:text-base">Ocean Prayer Depth</span>
                        <span className="text-lg">🌊</span>
                      </div>
                    </div>

                    {/* Underwater Prayer Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-center">
                      {/* Current Prayer - Center Spotlight */}
                      <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/40 shadow-xl relative overflow-hidden">
                          {/* Underwater Light Rays */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/20 via-transparent to-blue-200/20"></div>
                          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-300/40 to-transparent"></div>
                          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-blue-300/40 to-transparent"></div>
                          
                          <div className="relative z-10 text-center">
                            {/* Submarine Periscope View */}
                            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 relative mb-3 sm:mb-4">
                              {/* Sonar Rings */}
                              <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full animate-ping"></div>
                              <div className="absolute inset-2 border-2 border-blue-400/40 rounded-full animate-ping delay-500"></div>
                              <div className="absolute inset-4 border-2 border-teal-400/30 rounded-full animate-ping delay-1000"></div>
                              
                              {/* Deep Sea Prayer Icon */}
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 relative z-10 border-4 border-white/60">
                                <span className="text-2xl sm:text-3xl drop-shadow-lg">{currentPrayer.emoji}</span>
                              </div>
                            </div>

                            <h2 className="text-xl sm:text-2xl font-black text-blue-900 mb-2 drop-shadow-sm">
                              {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                            </h2>
                            
                            <div className="flex items-center justify-center space-x-2 mb-3">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                              <span className="text-blue-700 font-semibold text-sm sm:text-base">
                                {t.dashboard.currentPrayer}
                              </span>
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
                            </div>

                            {/* Ocean Current Status */}
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/80 to-blue-500/80 rounded-full text-white shadow-lg border border-white/30">
                              <span className="text-lg mr-2">🌊</span>
                              <span className="font-bold text-sm">Diving Deep in Prayer</span>
                              <span className="text-lg ml-2">🤲</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Next Prayer - Submarine Periscope */}
                      {nextPrayer && (
                        <div className="order-1 lg:order-2">
                          <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl p-4 sm:p-6 text-white shadow-2xl border-2 border-white/30 relative overflow-hidden">
                            {/* Submarine Window Effect */}
                            <div className="absolute inset-2 border-2 border-white/20 rounded-xl"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
                            <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-white/30 rounded-full"></div>
                            
                            {/* Periscope View */}
                            <div className="relative z-10 text-center">
                              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full mb-3 border-2 border-white/40">
                                <span className="text-lg sm:text-xl">🔭</span>
                              </div>
                              
                              <h3 className="text-sm sm:text-base font-bold mb-2 opacity-90">
                                🐠 Surface Detection
                              </h3>
                              <p className="text-base sm:text-lg font-black mb-3">
                                {t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                              </p>
                              
                              {/* Submarine Countdown */}
                              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                                <div className="text-2xl sm:text-3xl font-mono font-black mb-1 text-cyan-200">
                                  {formatTimeUntil(timeUntilNext)}
                                </div>
                                <div className="flex items-center justify-center space-x-1 text-xs opacity-80">
                                  <span>⏰</span>
                                  <span>Time to Surface</span>
                                  <span>⏰</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Ocean Floor Decoration */}
                    <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-4 opacity-60">
                      <span className="text-lg animate-bounce delay-100">🪸</span>
                      <span className="text-base animate-bounce delay-300">🐚</span>
                      <span className="text-lg animate-bounce delay-500">⭐</span>
                      <span className="text-base animate-bounce delay-700">🦀</span>
                      <span className="text-lg animate-bounce delay-900">🪸</span>
                    </div>
                  </div>
                </div>

                {/* Ocean Surface Ripples */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <div className="w-8 h-1 bg-blue-300/40 rounded-full animate-pulse"></div>
                  <div className="w-12 h-1 bg-cyan-300/40 rounded-full animate-pulse delay-300"></div>
                  <div className="w-8 h-1 bg-teal-300/40 rounded-full animate-pulse delay-600"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ocean Prayer Times Grid */}
        <div className="px-2 sm:px-4 pb-4 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
              {prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`group relative ${
                    prayer.isCurrent
                      ? "bg-gradient-to-br from-blue-100 to-cyan-100 shadow-2xl scale-105 border-2 border-blue-400/60"
                      : "bg-white/90 border-2 border-blue-200/40"
                  } backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-700 transform-gpu`}
                >
                  {/* Ocean Current Indicator */}
                  {prayer.isCurrent && (
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-20">
                      <div className="relative">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-400 rounded-full animate-pulse shadow-xl border-2 border-white"></div>
                        <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-300 rounded-full animate-ping"></div>
                        <div className="absolute inset-1 sm:inset-2 text-xs">💧</div>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-2 sm:p-3 lg:p-4 text-center">
                    {/* Ocean Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-300 rounded-full blur-xl"></div>
                      <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 bg-cyan-300 rounded-full blur-lg"></div>
                    </div>

                    {/* Ocean Prayer Icon */}
                    <div className="relative mb-1 sm:mb-2">
                      <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${
                        prayer.isCurrent
                          ? "bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white/80 shadow-2xl shadow-blue-400/50"
                          : "bg-gradient-to-br from-slate-100 to-blue-100 border-2 border-blue-200/50"
                      } rounded-full mb-1 sm:mb-2 group-hover:scale-125 transition-transform duration-500 relative`}>
                        
                        {/* Ocean Ripple */}
                        {prayer.isCurrent && (
                          <div className="absolute -inset-1 sm:-inset-2 border-2 border-blue-300/40 rounded-full animate-pulse"></div>
                        )}
                        
                        <span className="text-lg sm:text-xl lg:text-2xl relative z-10">
                          {prayer.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Prayer Name */}
                    <h3 className={`font-bold text-xs sm:text-sm mb-1 ${
                      prayer.isCurrent ? "text-blue-800" : "text-slate-700"
                    } transition-colors duration-300`}>
                      {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                    </h3>

                    {/* Ocean Time Display */}
                    <div className={`text-sm sm:text-base lg:text-lg font-black font-mono mb-1 sm:mb-2 ${
                      prayer.isCurrent
                        ? "text-blue-700 drop-shadow-sm"
                        : "text-slate-600"
                    }`}>
                      {formatPrayerTime(prayer.time, settings.language)}
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                      prayer.isCurrent
                        ? "bg-blue-200/80 text-blue-800 border border-blue-400/50"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    } backdrop-blur-sm shadow-sm`}>
                      {prayer.isCurrent && (
                        <div className="w-1 h-1 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1 animate-pulse shadow-sm shadow-blue-400/50"></div>
                      )}
                      <span className="text-xs">
                        {calculatePrayerTimeStatus(prayer, currentPrayer, settings.language).displayText}
                      </span>
                    </div>
                  </div>

                  {/* Ocean Wave Bottom */}
                  <div className={`h-1 sm:h-2 ${
                    prayer.isCurrent
                      ? "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
                      : "bg-gradient-to-r from-slate-200 via-blue-200 to-cyan-200"
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

export default OceanTheme;
