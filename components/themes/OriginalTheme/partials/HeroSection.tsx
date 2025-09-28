import { useTranslation } from "../../../../hooks/useTranslation";
import { useLocationStore } from "../../../../stores/locationStore";
import { Language } from "../../../../types/translation";
import { formatDisplayDate } from "../../../../utils/date-formatting";
import { PrayerInfo } from "../../../../utils/prayer-utils";
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
    <section className="w-full max-w-4xl mx-auto">
      {/* Header with gradient background */}
      <div className="relative bg-hero-gradient rounded-3xl p-4 sm:p-6 md:p-8 mb-8 text-white overflow-hidden">
        {/* Decorative elements - hide on mobile */}
        <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Header - responsive layout */}
          <div className="mb-4 sm:mb-6">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {t.dashboard.title}
              </h1>
              <p className="text-white/80 text-base sm:text-lg">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Location - centered on mobile */}
          <div className="mb-4 sm:mb-6 flex justify-center sm:justify-start">
            <button
              onClick={onLocationClick}
              className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors group bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">
                {getLocationDisplayText()}
              </span>
            </button>
          </div>

          {/* Current Prayer Indicator */}
          <CurrentPrayerIndicator
            currentPrayer={currentPrayer}
            nextPrayer={nextPrayer}
            timeUntilNext={timeUntilNext}
            language={language}
          />
        </div>
      </div>
    </section>
  );
}
