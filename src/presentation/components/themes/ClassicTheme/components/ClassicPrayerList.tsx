import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/stores/themeStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { calculatePrayerTimeStatus } from '@/utils/prayer-time-status';
import { formatPrayerTime, PrayerInfo } from '@/utils/prayer-utils';

interface ClassicPrayerListProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
}

export function ClassicPrayerList({ prayers, currentPrayer }: ClassicPrayerListProps) {
  const { themeConfig } = useThemeStore();
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });

  return (
    <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} border-2 border-emerald-200 overflow-hidden`}>
      <div className={`${themeConfig.colors.primary} text-white p-4 text-center`}>
        <h3 className="text-xl font-bold font-serif">{t.dashboard.prayerTimes}</h3>
      </div>
      
      <div className="divide-y divide-emerald-100">
        {prayers.map((prayer) => (
          <div
            key={prayer.name}
            className={`p-4 flex items-center justify-between ${themeConfig.styles.animation} hover:bg-emerald-50 ${
              prayer.isCurrent ? 'bg-emerald-50 border-l-4 border-emerald-600' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${prayer.color} rounded-full flex items-center justify-center text-white text-xl`}>
                {prayer.emoji}
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${themeConfig.colors.text.primary} font-serif`}>
                  {t.prayers[prayer.name.toLowerCase() as keyof typeof t.prayers]}
                </h4>
                {prayer.isCurrent && (
                  <span className="text-sm text-emerald-600 font-medium">
                    {t.dashboard.currentPrayer}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <p className={`text-xl font-mono font-bold ${themeConfig.colors.text.primary}`}>
                {formatPrayerTime(prayer.time, settings.language)}
              </p>
              <p className={`text-sm ${themeConfig.colors.text.secondary}`}>
                {calculatePrayerTimeStatus(prayer, currentPrayer, settings.language).displayText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
