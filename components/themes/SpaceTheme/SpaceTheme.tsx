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

interface SpaceThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function SpaceTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error,
}: SpaceThemeProps) {
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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Starfield Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-32 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-40 left-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-40 w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 bg-slate-800/80 backdrop-blur-xl rounded-full p-12 shadow-2xl border border-purple-500/30">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-purple-300/30 rounded-full animate-spin border-t-cyan-400 border-r-purple-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl animate-pulse">🚀</span>
              </div>
            </div>
            <p className="text-cyan-300 font-bold text-xl">กำลังเชื่อมต่อกับจักรวาล...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-500/50 text-center max-w-md">
          <div className="text-8xl mb-6">💥</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            ระบบขัดข้อง
          </h2>
          <p className="text-red-300 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated Starfield */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Stars */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-300 shadow-sm shadow-blue-300/50"></div>
        <div className="absolute bottom-40 left-32 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-700 shadow-sm shadow-purple-300/50"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-1000 shadow-sm shadow-cyan-300/50"></div>
        <div className="absolute bottom-20 right-40 w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-500 shadow-sm shadow-pink-300/50"></div>
        <div className="absolute top-80 right-60 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-200 shadow-sm shadow-yellow-300/50"></div>
        <div className="absolute bottom-60 left-20 w-1 h-1 bg-green-300 rounded-full animate-pulse delay-800 shadow-sm shadow-green-300/50"></div>
        
        {/* Nebula Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Floating Space Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-3xl animate-bounce delay-300 opacity-70">🛸</div>
        <div className="absolute top-60 right-32 text-2xl animate-bounce delay-700 opacity-60">🌌</div>
        <div className="absolute bottom-40 left-40 text-xl animate-bounce delay-1000 opacity-50">⭐</div>
        <div className="absolute top-40 left-1/2 text-2xl animate-bounce delay-500 opacity-70">🌟</div>
        <div className="absolute bottom-60 right-20 text-lg animate-bounce delay-1200 opacity-60">🪐</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Space Station Header */}
        <div className="px-3 sm:px-6 pt-4 sm:pt-8 pb-3 sm:pb-6">
          <div className="max-w-6xl mx-auto text-center">
            {/* Orbital Station Icon */}
            <div className="mb-3 sm:mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 relative">
                {/* Orbital Rings */}
                <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-2 border-purple-400/30 rounded-full animate-spin animate-reverse" style={{animationDuration: '3s'}}></div>
                <div className="absolute inset-4 border-2 border-indigo-400/30 rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
                
                {/* Central Station */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-2xl shadow-cyan-400/50 flex items-center justify-center relative z-10">
                  <span className="text-xl sm:text-2xl">🕌</span>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-3 drop-shadow-2xl">
                {t.dashboard.title}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-cyan-300 font-medium">
                {formatDisplayDate(new Date(), settings.language)}
              </p>
            </div>

            {/* Galactic Location */}
            {currentLocation && (
              <div className="mb-4 sm:mb-8">
                <button
                  onClick={() => setLocationSelectorOpen(true)}
                  className="group inline-flex items-center space-x-2 sm:space-x-4 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-xl px-3 sm:px-6 py-2 sm:py-4 rounded-full shadow-2xl border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
                  title="คลิกเพื่อเปลี่ยนตำแหน่ง"
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700 shadow-lg shadow-purple-500/50">
                    <span className="text-white text-sm sm:text-xl">🌍</span>
                  </div>
                  <span className="text-cyan-300 font-bold text-sm sm:text-lg">
                    📍 {currentLocation.city || "Unknown"}, {currentLocation.country || "Unknown"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mission Control Dashboard */}
        {currentPrayer && (
          <div className="px-3 sm:px-6 mb-4 sm:mb-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-slate-800/40 backdrop-blur-2xl rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 lg:p-8 shadow-2xl border border-purple-500/20 relative overflow-hidden">
                {/* Holographic Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
                  {/* Current Mission Status */}
                  <div className="text-center lg:border-r lg:border-purple-500/30 lg:pr-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 relative mb-2 sm:mb-4">
                      {/* Holographic Ring */}
                      <div className="absolute inset-0 border-2 sm:border-4 border-cyan-400/50 rounded-full animate-pulse"></div>
                      <div className="absolute inset-1 border-2 border-purple-400/30 rounded-full animate-spin"></div>
                      
                      {/* Prayer Icon */}
                      <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-400/50 relative z-10">
                        <span className="text-2xl sm:text-3xl lg:text-4xl">{currentPrayer.emoji}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-300 mb-1 sm:mb-2">
                      {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                    </h2>
                    <p className="text-purple-300 mb-2 sm:mb-4 text-sm sm:text-base lg:text-lg">
                      {t.dashboard.currentPrayer}
                    </p>
                    
                    <div className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/50 backdrop-blur-sm">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full mr-1 sm:mr-2 animate-pulse shadow-lg shadow-cyan-400/50"></div>
                      <span className="text-cyan-300 font-bold text-xs sm:text-sm">
                        🚀 ACTIVE MISSION
                      </span>
                    </div>
                  </div>

                  {/* Next Mission Countdown */}
                  {nextPrayer && (
                    <div className="text-center lg:pl-8 mt-4 lg:mt-0">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-purple-300 mb-1 sm:mb-2">
                        🛰️ {t.dashboard.nextPrayer}
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-cyan-300 mb-2 sm:mb-4">
                        {t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}
                      </p>
                      
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 text-white shadow-2xl border border-purple-400/30 relative overflow-hidden">
                        {/* Scanning Lines */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform translate-x-[-100%] animate-pulse"></div>
                        
                        <div className="relative z-10">
                          <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono mb-1 sm:mb-2 text-cyan-300">
                            {formatTimeUntil(timeUntilNext)}
                          </div>
                          <p className="text-purple-200 text-xs sm:text-sm font-medium">
                            ⏰ T-MINUS COUNTDOWN
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

        {/* Satellite Prayer Grid */}
        <div className="px-3 sm:px-6 pb-6 sm:pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
              {prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`group relative ${
                    prayer.isCurrent
                      ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 shadow-2xl scale-105 sm:scale-110 border-2 border-cyan-400/50"
                      : "bg-slate-800/60 border border-purple-500/20"
                  } backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-700 transform-gpu`}
                >
                  {/* Satellite Orbit Indicator */}
                  {prayer.isCurrent && (
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20">
                      <div className="relative">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-cyan-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 border-2 border-purple-400 rounded-full animate-spin animate-reverse"></div>
                        <div className="absolute inset-1 sm:inset-2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                        <div className="absolute inset-2 sm:inset-3 text-xs">🛸</div>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-2 sm:p-3 lg:p-4 xl:p-6 text-center">
                    {/* Holographic Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-8 h-8 sm:w-12 sm:h-12 bg-purple-400 rounded-full blur-xl"></div>
                      <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-400 rounded-full blur-lg"></div>
                    </div>

                    {/* Satellite Prayer Icon */}
                    <div className="relative mb-2 sm:mb-3">
                      <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 ${
                        prayer.isCurrent
                          ? "bg-gradient-to-br from-cyan-400 to-purple-500 border-2 border-cyan-300/60 shadow-2xl shadow-cyan-400/50"
                          : "bg-gradient-to-br from-slate-700 to-slate-600 border-2 border-purple-500/30"
                      } rounded-full mb-1 sm:mb-2 lg:mb-3 group-hover:scale-125 transition-transform duration-500 relative`}>
                        
                        {/* Orbital Ring */}
                        {prayer.isCurrent && (
                          <div className="absolute -inset-1 sm:-inset-2 border border-cyan-400/30 rounded-full animate-spin"></div>
                        )}
                        
                        <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl relative z-10">
                          {prayer.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Prayer Name */}
                    <h3 className={`font-bold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 ${
                      prayer.isCurrent ? "text-cyan-300" : "text-purple-300"
                    } transition-colors duration-300`}>
                      {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                    </h3>

                    {/* Digital Time Display */}
                    <div className={`text-sm sm:text-lg lg:text-xl xl:text-2xl font-black font-mono mb-2 sm:mb-3 ${
                      prayer.isCurrent
                        ? "text-cyan-300 drop-shadow-lg"
                        : "text-purple-300"
                    } relative`}>
                      {/* Glitch Effect for Current Prayer */}
                      {prayer.isCurrent && (
                        <div className="absolute inset-0 text-cyan-400 animate-pulse opacity-50">
                          {formatPrayerTime(prayer.time, settings.language)}
                        </div>
                      )}
                      {formatPrayerTime(prayer.time, settings.language)}
                    </div>

                    {/* Status Transmission */}
                    <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                      prayer.isCurrent
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                        : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    } backdrop-blur-sm shadow-sm`}>
                      {prayer.isCurrent && (
                        <div className="w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400 rounded-full mr-1 sm:mr-2 animate-pulse shadow-sm shadow-cyan-400/50"></div>
                      )}
                      <span className="text-xs">
                        {calculatePrayerTimeStatus(prayer, currentPrayer, settings.language).displayText}
                      </span>
                    </div>
                  </div>

                  {/* Data Stream Bottom */}
                  <div className={`h-1 sm:h-2 ${
                    prayer.isCurrent
                      ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                      : "bg-gradient-to-r from-purple-500/30 via-indigo-500/30 to-cyan-500/30"
                  } relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
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

export default SpaceTheme;
