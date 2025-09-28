import { useTranslation } from "../../../../hooks/useTranslation";
import { useLocationStore } from "../../../../stores/locationStore";
import { Language } from "../../../../types/translation";
import {
  formatDisplayDate,
  formatTimeWithLocale,
} from "../../../../utils/date-formatting";
import { PrayerInfo } from "../../../../utils/prayer-utils";
import CurrentPrayerIndicator from "./CurrentPrayerIndicator";

interface HeroSectionProps {
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo;
  timeUntilNext: number;
  onSettingsClick?: () => void;
  onLocationClick?: () => void;
  testMode?: boolean;
  testTime?: Date;
  language: Language;
}

export default function HeroSection({
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  onSettingsClick,
  onLocationClick,
  testMode = false,
  testTime,
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

        {/* Settings button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Settings"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

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

          {/* Test Mode Indicator */}
          {testMode && testTime && (
            <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="text-yellow-200 text-sm font-medium">
                  Test Mode:{" "}
                  {formatTimeWithLocale(testTime || new Date(), language)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
