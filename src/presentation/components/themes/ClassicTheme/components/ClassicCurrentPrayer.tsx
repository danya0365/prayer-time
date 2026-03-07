import { useTranslation } from '@/src/presentation/hooks/useTranslation';
import { usePrayerDashboardThemeStore } from '@/src/presentation/stores/prayerDashboardThemeStore';
import { useSettingsStore } from '@/src/presentation/stores/settingsStore';
import { formatPrayerTime, PrayerInfo } from '@/utils/prayer-utils';

interface ClassicCurrentPrayerProps {
  currentPrayer: PrayerInfo;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
}

export function ClassicCurrentPrayer({ currentPrayer, nextPrayer, timeUntilNext }: ClassicCurrentPrayerProps) {
  const { themeConfig } = usePrayerDashboardThemeStore();
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });

  const formatTimeUntil = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} border-2 border-emerald-200 mb-8 overflow-hidden`}>
      <div className={`${currentPrayer.color} text-white p-6 text-center`}>
        <div className="text-4xl mb-3">{currentPrayer.emoji}</div>
        <h2 className="text-2xl font-bold font-serif mb-2">
          {t.prayers[currentPrayer.name.toLowerCase() as keyof typeof t.prayers]}
        </h2>
        <p className="text-lg opacity-90">
          {t.dashboard.currentPrayer}
        </p>
        <div className="mt-4 text-xl font-mono">
          {formatPrayerTime(currentPrayer.time, settings.language)}
        </div>
      </div>
      
      {nextPrayer && (
        <div className="p-6 text-center border-t border-emerald-100">
          <p className={`text-lg mb-2 ${themeConfig.colors.text.secondary}`}>
            {t.dashboard.nextPrayer}: <span className={`font-semibold ${themeConfig.colors.text.accent}`}>
              {t.prayers[nextPrayer.name.toLowerCase() as keyof typeof t.prayers]}
            </span>
          </p>
          <p className={`text-3xl font-mono font-bold ${themeConfig.colors.text.accent}`}>
            {formatTimeUntil(timeUntilNext)}
          </p>
        </div>
      )}
    </div>
  );
}
