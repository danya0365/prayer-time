import { Language } from "@/src/domain/types/translation";
import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { useLocationStore } from "@/src/presentation/stores/locationStore";
import { formatDisplayDate } from "@/utils/date-formatting";
import { PrayerInfo } from "@/utils/prayer-utils";
import CurrentPrayerIndicator from "./CurrentPrayerIndicator";

interface HeroSectionProps {
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo;
  timeUntilNext: number;
  onLocationClick?: () => void;
  language: Language;
}

export default function HeroSection({
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
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="relative group perspective-1000">
        {/* Main Card with Gold Border */}
        <div className="relative bg-[#064e3b] rounded-[2.5rem] p-1 shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] border border-[#D4AF37]/30">
          
          {/* Subtle Geometric Background Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Golden Corner Ornaments */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-xl pointer-events-none" />

          {/* Top Lighting Gradient */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center p-8 sm:p-12 text-center">
            {/* Mosque Icon with Hover Glow */}
            <div className="mb-8 relative scale-in">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#064e3b] to-[#022c22] rounded-full flex items-center justify-center border-2 border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500">
                <span className="text-4xl sm:text-5xl drop-shadow-lg">🕌</span>
              </div>
              <div className="absolute -inset-1 bg-[#D4AF37]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Title with Arabic-inspired Style */}
            <div className="space-y-2 mb-8 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
                {t.dashboard.title}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full" />
              <p className="text-[#D4AF37]/80 font-medium tracking-widest text-sm sm:text-base uppercase pt-2">
                بسم الله الرحمن الرحيم
              </p>
            </div>

            {/* Time and Date Display */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <div className="bg-[#022c22]/60 backdrop-blur-md px-8 py-4 rounded-2xl border border-[#D4AF37]/20 shadow-xl">
                 <p className="text-white text-lg sm:text-xl font-semibold">
                  {formattedDate}
                </p>
              </div>
              
              <button
                onClick={onLocationClick}
                className="flex items-center gap-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 backdrop-blur-sm px-6 py-4 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-lg"
              >
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[#D4AF37]/70 text-[10px] uppercase font-bold tracking-tighter">Your Location</p>
                  <p className="text-white text-sm sm:text-base font-bold truncate max-w-[150px] sm:max-w-none">
                    {getLocationDisplayText()}
                  </p>
                </div>
              </button>
            </div>

            {/* Current Prayer Indicator Panel */}
            <div className="w-full max-w-2xl animate-slide-up">
              <div className="relative group/panel">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37]/30 to-[#B8962E]/30 rounded-[2rem] blur opacity-20 group-hover/panel:opacity-40 transition duration-1000" />
                <div className="relative bg-[#022c22]/40 backdrop-blur-xl rounded-[2rem] border border-[#D4AF37]/20 overflow-hidden shadow-inner">
                  <CurrentPrayerIndicator
                    currentPrayer={currentPrayer}
                    nextPrayer={nextPrayer}
                    timeUntilNext={timeUntilNext}
                    language={language}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
