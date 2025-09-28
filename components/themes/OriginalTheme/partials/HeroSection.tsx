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
      {/* Main Hero Container */}
      <div className="relative min-h-[500px] sm:min-h-[600px] overflow-hidden">
        {/* Background with Islamic Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl">
          {/* Islamic Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20-18c9.941 0 18 8.059 18 18s-8.059 18-18 18S-8 39.941-8 30s8.059-18 18-18zm20 18c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm20-18c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>

          {/* Mosque Silhouette */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md opacity-20">
            <svg viewBox="0 0 400 200" className="w-full h-auto">
              {/* Main Dome */}
              <ellipse
                cx="200"
                cy="120"
                rx="60"
                ry="40"
                fill="currentColor"
                className="text-white"
              />
              {/* Side Domes */}
              <ellipse
                cx="120"
                cy="130"
                rx="35"
                ry="25"
                fill="currentColor"
                className="text-white"
              />
              <ellipse
                cx="280"
                cy="130"
                rx="35"
                ry="25"
                fill="currentColor"
                className="text-white"
              />
              {/* Minarets */}
              <rect
                x="80"
                y="60"
                width="12"
                height="100"
                fill="currentColor"
                className="text-white"
              />
              <rect
                x="308"
                y="60"
                width="12"
                height="100"
                fill="currentColor"
                className="text-white"
              />
              {/* Minaret Tops */}
              <ellipse
                cx="86"
                cy="65"
                rx="8"
                ry="15"
                fill="currentColor"
                className="text-white"
              />
              <ellipse
                cx="314"
                cy="65"
                rx="8"
                ry="15"
                fill="currentColor"
                className="text-white"
              />
              {/* Main Building */}
              <rect
                x="140"
                y="140"
                width="120"
                height="60"
                fill="currentColor"
                className="text-white"
              />
              {/* Entrance Arch */}
              <path
                d="M 180 200 Q 180 170 200 170 Q 220 170 220 200 Z"
                fill="currentColor"
                className="text-emerald-600"
              />
            </svg>
          </div>

          {/* Floating Stars */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div
            className="absolute top-16 right-12 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-24 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-12 right-1/3 w-1 h-1 bg-white rounded-full opacity-90 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 md:p-12">
          {/* Top Section - Title & Date */}
          <div className="text-center text-white">
            {/* Islamic Greeting */}
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
                <span className="text-2xl sm:text-3xl">🕌</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent drop-shadow-lg">
              {t.dashboard.title}
            </h1>

            {/* Date with Islamic Calendar Style */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block border border-white/20">
              <p className="text-white/90 text-base sm:text-lg font-medium">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Middle Section - Current Prayer Status */}
          <div className="flex-1 flex items-center justify-center my-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl max-w-md w-full">
              <CurrentPrayerIndicator
                currentPrayer={currentPrayer}
                nextPrayer={nextPrayer}
                timeUntilNext={timeUntilNext}
                language={language}
              />
            </div>
          </div>

          {/* Bottom Section - Location */}
          <div className="text-center">
            <button
              onClick={onLocationClick}
              className="group inline-flex items-center space-x-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {/* Location Icon with Animation */}
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* Pulse Animation */}
                <div className="absolute inset-0 w-8 h-8 bg-white/10 rounded-full animate-ping"></div>
              </div>

              {/* Location Text */}
              <div className="text-left">
                <p className="text-white/70 text-xs font-medium">
                  موقعك الحالي
                </p>
                <p className="text-white text-sm sm:text-base font-semibold truncate max-w-[200px] sm:max-w-[300px]">
                  {getLocationDisplayText()}
                </p>
              </div>

              {/* Arrow Icon */}
              <svg
                className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div
          className="absolute top-1/4 left-4 w-16 h-16 border-2 border-white/20 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div className="absolute bottom-1/4 right-4 w-12 h-12 border border-white/30 rounded-lg rotate-45 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-8 w-8 h-8 border border-white/25 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </section>
  );
}
