import { cn } from '../../../../utils/cn';
import { PrayerInfo, formatPrayerTime } from '../../../../utils/prayer-utils';
import { useTranslation } from '../../../../hooks/useTranslation';
import { Language } from '../../../../types/translation';

interface PrayerTimesDisplayProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  language: Language;
}

export default function PrayerTimesDisplay({ prayers, currentPrayer, language }: PrayerTimesDisplayProps) {
  const { t } = useTranslation({ language });
  const getPrayerColors = (prayer: PrayerInfo) => {
    const colorMap = {
      fajr: { bg: 'bg-fajr-gradient', border: 'border-fajr', text: 'text-fajr' },
      dhuhr: { bg: 'bg-dhuhr-gradient', border: 'border-dhuhr', text: 'text-dhuhr' },
      asr: { bg: 'bg-asr-gradient', border: 'border-asr', text: 'text-asr' },
      maghrib: { bg: 'bg-maghrib-gradient', border: 'border-maghrib', text: 'text-maghrib' },
      isha: { bg: 'bg-isha-gradient', border: 'border-isha', text: 'text-isha' }
    };
    return colorMap[prayer.name] || { bg: 'bg-primary-gradient', border: 'border-primary', text: 'text-primary' };
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
        {t.ui.todaysPrayerTimes}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {prayers.map((prayer) => {
          const colors = getPrayerColors(prayer);
          const isCurrent = currentPrayer?.name === prayer.name;
          
          return (
            <div
              key={prayer.name}
              className={cn(
                "relative rounded-2xl p-4 transition-all duration-300 hover:scale-105",
                isCurrent 
                  ? `${colors.bg} text-white shadow-lg ring-4 ring-white/30` 
                  : "bg-card border border-border hover:border-primary/30 text-card-foreground"
              )}
            >
              {/* Current prayer indicator */}
              {isCurrent && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full animate-pulse"></div>
              )}
              
              <div className="text-center">
                <div className="text-3xl mb-2">{prayer.emoji}</div>
                <h3 className={cn(
                  "font-semibold text-sm mb-1",
                  isCurrent ? "text-white" : "text-foreground"
                )}>
                  {t.prayers[prayer.name as keyof typeof t.prayers]}
                </h3>
                <p className={cn(
                  "text-lg font-mono font-bold",
                  isCurrent ? "text-white" : colors.text
                )}>
                  {formatPrayerTime(prayer.time)}
                </p>
                <p className={cn(
                  "text-xs mt-1",
                  isCurrent ? "text-white/80" : "text-muted-foreground"
                )}>
                  {formatPrayerTime(prayer.time)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
