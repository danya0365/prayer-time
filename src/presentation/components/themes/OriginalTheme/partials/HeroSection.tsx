import { Language } from "@/src/domain/types/translation";
import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { useLocationStore } from "@/src/presentation/stores/locationStore";
import { cn } from "@/utils/cn";
import { formatDisplayDate } from "@/utils/date-formatting";
import { calculatePrayerTimeStatus } from "@/utils/prayer-time-status";
import { PrayerInfo, formatPrayerTime } from "@/utils/prayer-utils";
import CurrentPrayerIndicator from "./CurrentPrayerIndicator";

interface HeroSectionProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo;
  timeUntilNext: number;
  onLocationClick?: () => void;
  language: Language;
}

export default function HeroSection({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  onLocationClick,
  language,
}: HeroSectionProps) {
  const { t } = useTranslation({ language });
  const today = new Date();
  const formattedDate = formatDisplayDate(today, language);
  const { currentLocation } = useLocationStore();

  const getLocationDisplayText = () => {
    if (!currentLocation) return "Getting location...";
    return `${currentLocation?.city || "Unknown"}, ${
      currentLocation?.country || "Unknown"
    }`;
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative group perspective-1000">
        <div className="relative bg-[#064e3b] rounded-[3rem] p-1 shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-[0_0_60px_rgba(212,175,55,0.15)] border border-[#D4AF37]/20">
          
          {/* Subtle Geometric Background Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L35 25 L60 30 L35 35 L30 60 L25 35 L0 30 L25 25 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px'
              }}
            />
          </div>

          <div className="relative z-10 p-6 sm:p-10 flex flex-col gap-10">
            
            {/* 1. TOP: Compact Date & Location Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#D4AF37]/10 pb-6 mb-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#064e3b] to-[#022c22] rounded-full flex items-center justify-center border border-[#D4AF37]/30 shadow-lg shrink-0">
                  <span className="text-2xl">🕌</span>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                    {t.dashboard.title}
                  </h1>
                  <p className="text-[#D4AF37]/60 font-medium tracking-widest text-[10px] uppercase">
                    بسم الله الرحمن الرحيم
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#022c22]/40 backdrop-blur-md px-4 py-2 rounded-xl border border-[#D4AF37]/10">
                  <p className="text-[#D4AF37]/80 text-xs font-bold whitespace-nowrap">
                    {formattedDate}
                  </p>
                </div>
                
                <button
                  onClick={onLocationClick}
                  className="flex items-center gap-2 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 px-4 py-2 rounded-xl border border-[#D4AF37]/20 transition-all duration-300 group/loc"
                >
                  <svg className="w-3.5 h-3.5 text-[#D4AF37]/70 group-hover/loc:text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-white/60 text-xs font-bold group-hover/loc:text-white transition-colors truncate max-w-[120px]">
                    {currentLocation?.city || "Unknown"}
                  </p>
                </button>
              </div>
            </div>

            {/* 2. MIDDLE: Current Prayer Indicator Panel */}
            <div className="w-full animate-slide-up">
              <CurrentPrayerIndicator
                currentPrayer={currentPrayer}
                nextPrayer={nextPrayer}
                timeUntilNext={timeUntilNext}
                language={language}
              />
            </div>

            {/* 3. BOTTOM: Integrated Prayer Times Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 animate-fade-in-up">
              {prayers.map((prayer) => {
                const isCurrent = currentPrayer?.name === prayer.name;

                return (
                  <div
                    key={prayer.name}
                    className={cn(
                      "relative group/card rounded-3xl p-5 transition-all duration-500 overflow-hidden",
                      isCurrent
                        ? "bg-[#022c22] border-[1px] border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                        : "bg-[#022c22]/30 border border-[#D4AF37]/5 hover:border-[#D4AF37]/20 hover:bg-[#022c22]/50"
                    )}
                  >
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover/card:opacity-[0.04]">
                        <div 
                         className="absolute inset-0"
                         style={{
                           backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                         }}
                       />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500",
                        isCurrent 
                          ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30" 
                          : "bg-[#022c22] border border-white/5"
                      )}>
                        <span className="text-2xl drop-shadow-sm">{prayer.emoji}</span>
                      </div>

                      <h3 className={cn(
                        "font-bold text-[10px] tracking-widest uppercase mb-1",
                        isCurrent ? "text-[#D4AF37]" : "text-white/40"
                      )}>
                        {t.prayers[prayer.name as keyof typeof t.prayers]}
                      </h3>

                      <p className={cn(
                        "text-xl font-mono font-black",
                        isCurrent ? "text-white" : "text-[#D4AF37]/80"
                      )}>
                        {formatPrayerTime(prayer.time, language)}
                      </p>

                      <div className={cn(
                        "mt-2 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest",
                        isCurrent 
                          ? "bg-[#D4AF37] text-[#022c22]" 
                          : "bg-[#022c22]/60 text-white/30"
                      )}>
                        {calculatePrayerTimeStatus(prayer, currentPrayer, language).displayText}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
