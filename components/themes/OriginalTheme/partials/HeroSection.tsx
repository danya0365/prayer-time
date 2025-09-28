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
      <div className="relative bg-hero-gradient rounded-3xl p-8 mb-8 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t.dashboard.title}</h1>
              <p className="text-white/80 text-lg">{formattedDate}</p>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <button
              onClick={onLocationClick}
              className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
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
              <span className="text-sm">{getLocationDisplayText()}</span>
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
