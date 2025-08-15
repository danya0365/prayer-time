import { format } from "date-fns";
import { useTranslation } from "../../hooks/useTranslation";
import { useLocationStore } from "../../stores/locationStore";
import { Language } from "../../types/translation";
import { PrayerInfo } from "../../utils/prayer-utils";
import { SettingsButton } from "../ui/SettingsButton";
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
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");
  const { currentLocation } = useLocationStore();

  const getLocationDisplayText = () => {
    if (!currentLocation) return "Getting location...";
    return (
      currentLocation.address ||
      `${currentLocation.latitude.toFixed(
        2
      )}, ${currentLocation.longitude.toFixed(2)}`
    );
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      {/* Header with gradient background */}
      <div className="relative bg-hero-gradient rounded-3xl p-8 mb-8 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="mb-6">
            <p className="text-white/80 text-lg font-medium mb-2">
              {formattedDate}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              🕌 {t.ui.todaysPrayerTimes}
            </h1>
            <p className="text-white/70 mt-2 text-sm">
              {t.ui.stayConnected}
            </p>
          </div>

          <CurrentPrayerIndicator
            currentPrayer={currentPrayer}
            nextPrayer={nextPrayer}
            timeUntilNext={timeUntilNext}
            testMode={testMode}
            testTime={testTime}
            language={language}
          />
        </div>

        {/* Control buttons */}
        <div className="absolute top-4 right-4 z-10">
          <SettingsButton
            onClick={onSettingsClick || (() => {})}
            variant="light"
          />
        </div>

        {/* Location display - compact */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={onLocationClick || (() => {})}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full px-3 py-2 text-white text-sm font-medium transition-all duration-200 hover:scale-105"
            title="Change location"
          >
            <svg
              className="w-4 h-4"
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
            <span className="hidden sm:inline truncate max-w-32">
              {getLocationDisplayText()}
            </span>
            <span className="sm:hidden">📍</span>
          </button>
        </div>
      </div>
    </section>
  );
}
