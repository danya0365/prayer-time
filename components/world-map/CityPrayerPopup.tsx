"use client";

import { City } from "@/constants/cities";
import { useTranslation } from "@/hooks/useTranslation";
import { useSettingsStore } from "@/stores/settingsStore";
import { getPrayerTimes } from "@/utils/prayer-utils";
import { Coordinates } from "adhan";
import { Clock, CloudSun, MapPin, Moon, Sun, Sunrise, Sunset, X } from "lucide-react";
import { useMemo } from "react";

interface CityPrayerPopupProps {
  city: City;
  onClose: () => void;
}

const PRAYER_CONFIG = [
  { key: "fajr", label: "Fajr", labelAr: "الفجر", emoji: "🌅", icon: Sunrise, gradient: "from-indigo-500 to-purple-600" },
  { key: "dhuhr", label: "Dhuhr", labelAr: "الظهر", emoji: "☀️", icon: Sun, gradient: "from-yellow-400 to-orange-500" },
  { key: "asr", label: "Asr", labelAr: "العصر", emoji: "🌤️", icon: CloudSun, gradient: "from-orange-400 to-red-500" },
  { key: "maghrib", label: "Maghrib", labelAr: "المغرب", emoji: "🌆", icon: Sunset, gradient: "from-pink-500 to-rose-600" },
  { key: "isha", label: "Isha", labelAr: "العشاء", emoji: "🌙", icon: Moon, gradient: "from-purple-600 to-indigo-700" },
] as const;

export default function CityPrayerPopup({ city, onClose }: CityPrayerPopupProps) {
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  
  const userTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const cityTimezone = city.timezone || "UTC";

  const prayerTimes = useMemo(() => {
    const coords = new Coordinates(city.lat, city.lon);
    return getPrayerTimes(new Date(), coords);
  }, [city]);

  const formatWithTimezone = (date: Date, timezone: string) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    });
  };

  const times = useMemo(
    () => ({
      fajr: prayerTimes.fajr,
      dhuhr: prayerTimes.dhuhr,
      asr: prayerTimes.asr,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha,
    }),
    [prayerTimes]
  );

  // Find current prayer
  const currentPrayer = useMemo(() => {
    const now = new Date();
    const prayerKeys = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
    let current = "";
    for (const key of prayerKeys) {
      if (times[key] <= now) {
        current = key;
      }
    }
    return current;
  }, [times]);

  return (
    <div
      className="absolute top-0 right-0 h-full w-full sm:w-[380px] z-40 flex flex-col overflow-hidden"
      style={{
        background: "rgba(8, 15, 30, 0.95)",
        backdropFilter: "blur(24px)",
        borderLeft: "1px solid rgba(100, 160, 255, 0.12)",
        animation: "slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Header */}
      <div
        className="relative px-5 pt-5 pb-4"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.05) 100%)",
          borderBottom: "1px solid rgba(100, 160, 255, 0.08)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X size={18} className="text-slate-400" />
        </button>

        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-bold">
            Target Location
          </p>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={16} className="text-emerald-400" />
            <h2 className="text-xl font-bold text-white">
              {city.name}
            </h2>
          </div>
        </div>

        {city.nameLocal && (
          <p className="text-sm text-emerald-300/80 font-medium mb-1 mr-8">
            {city.nameLocal}
          </p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
          <span>{city.country}</span>
          <span className="opacity-40">|</span>
          <span>{city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°</span>
          <span className="opacity-40">|</span>
          <span className="text-emerald-400/80 font-mono">{cityTimezone}</span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="px-5 py-3 flex items-center gap-2 text-xs text-slate-400"
        style={{ borderBottom: "1px solid rgba(100, 160, 255, 0.06)" }}
      >
        <Clock size={13} />
        <span>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Prayer Times List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {PRAYER_CONFIG.map(({ key, label, labelAr, icon: Icon, gradient }) => {
          const time = times[key];
          const isCurrent = currentPrayer === key;

          return (
            <div
              key={key}
              className={`relative flex flex-col gap-2 p-3.5 rounded-xl transition-all duration-300 ${
                isCurrent ? "ring-1 ring-emerald-500/40" : ""
              }`}
              style={{
                background: isCurrent
                  ? "rgba(16, 185, 129, 0.12)"
                  : "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${
                  isCurrent ? "rgba(52, 211, 153, 0.2)" : "rgba(255, 255, 255, 0.04)"
                }`,
              }}
            >
              {/* Prayer Header: Icon + Name */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${gradient}`}
                  style={{
                    boxShadow: isCurrent
                      ? "0 4px 12px rgba(16, 185, 129, 0.3)"
                      : "none",
                  }}
                >
                  <Icon size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">
                      {label}
                    </span>
                    <span className="text-[10px] text-slate-500">{labelAr}</span>
                    {isCurrent && (
                      <span className="ml-auto px-2 py-0.5 text-[9px] rounded-full font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                        NOW
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Times: Local vs User */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                  <div className="text-[9px] text-slate-500 uppercase tracking-tighter mb-0.5">{t.ui.localTime}</div>
                  <div className="font-mono text-sm font-bold text-white tabular-nums">
                    {formatWithTimezone(time, cityTimezone)}
                  </div>
                </div>
                <div className="bg-emerald-500/5 rounded-lg p-2 border border-emerald-500/10">
                  <div className="text-[9px] text-emerald-500/70 uppercase tracking-tighter mb-0.5 font-bold">{t.ui.yourTime}</div>
                  <div className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
                    {formatWithTimezone(time, userTimezone)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3 text-[10px] text-center text-slate-500"
        style={{ borderTop: "1px solid rgba(100, 160, 255, 0.06)" }}
      >
        Calculated using Adhan library · Moonsighting Committee method
      </div>

      {/* CSS animation */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
