import { Language } from "@/src/domain/types/translation";
import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { cn } from "@/utils/cn";
import { calculatePrayerTimeStatus } from "@/utils/prayer-time-status";
import { PrayerInfo, formatPrayerTime } from "@/utils/prayer-utils";

interface PrayerTimesDisplayProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  language: Language;
}

export default function PrayerTimesDisplay({
  prayers,
  currentPrayer,
  language,
}: PrayerTimesDisplayProps) {
  const { t } = useTranslation({ language });
  const getPrayerColors = (prayer: PrayerInfo) => {
    const colorMap = {
      fajr: {
        bg: "bg-fajr-gradient",
        border: "border-fajr",
        text: "text-fajr",
      },
      dhuhr: {
        bg: "bg-dhuhr-gradient",
        border: "border-dhuhr",
        text: "text-dhuhr",
      },
      asr: { bg: "bg-asr-gradient", border: "border-asr", text: "text-asr" },
      maghrib: {
        bg: "bg-maghrib-gradient",
        border: "border-maghrib",
        text: "text-maghrib",
      },
      isha: {
        bg: "bg-isha-gradient",
        border: "border-isha",
        text: "text-isha",
      },
    };
    return (
      colorMap[prayer.name] || {
        bg: "bg-primary-gradient",
        border: "border-primary",
        text: "text-primary",
      }
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          {t.ui.todaysPrayerTimes}
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {prayers.map((prayer) => {
          const isCurrent = currentPrayer?.name === prayer.name;

          return (
            <div
              key={prayer.name}
              className={cn(
                "relative group/card rounded-[2rem] p-6 transition-all duration-500 overflow-hidden",
                isCurrent
                  ? "bg-gradient-to-br from-[#064e3b] to-[#022c22] border-[2px] border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] z-10 scale-105"
                  : "bg-[#064e3b]/20 backdrop-blur-md border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 hover:bg-[#064e3b]/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
              )}
            >
              {/* Card Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover/card:opacity-[0.05] transition-opacity duration-500">
                 <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>

              {/* Shine Effect */}
              <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-45 pointer-events-none group-hover/card:animate-shine" />

              <div className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500",
                  isCurrent 
                    ? "bg-[#D4AF37]/20 scale-110 shadow-inner border border-[#D4AF37]/30" 
                    : "bg-[#022c22]/40 group-hover/card:bg-[#D4AF37]/10 border border-white/5 group-hover/card:border-[#D4AF37]/20"
                )}>
                  <span className="text-4xl drop-shadow-md">{prayer.emoji}</span>
                </div>

                <h3 className={cn(
                  "font-bold text-sm tracking-[0.1em] uppercase mb-1",
                  isCurrent ? "text-[#D4AF37]" : "text-white/60 group-hover/card:text-white/80"
                )}>
                  {t.prayers[prayer.name as keyof typeof t.prayers]}
                </h3>

                <p className={cn(
                  "text-2xl font-mono font-black py-1",
                  isCurrent ? "text-white" : "text-[#D4AF37]/90 group-hover/card:text-[#D4AF37]"
                )}>
                  {formatPrayerTime(prayer.time, language)}
                </p>

                <div className={cn(
                  "mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                  isCurrent 
                    ? "bg-[#D4AF37] text-[#022c22]" 
                    : "bg-[#022c22]/40 text-[#D4AF37]/60 group-hover/card:text-[#D4AF37]/80 group-hover/card:bg-[#D4AF37]/10"
                )}>
                  {calculatePrayerTimeStatus(prayer, currentPrayer, language).displayText}
                </div>
              </div>

              {/* Current Indicator Glow */}
              {isCurrent && (
                <div className="absolute top-0 right-0 p-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
