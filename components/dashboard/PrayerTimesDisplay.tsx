import { cn } from '../../utils/cn';
import { PrayerInfo, formatPrayerTime } from '../../utils/prayer-utils';
import { useTranslation } from '../../hooks/useTranslation';
import { Language } from '../../types/translation';

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
          const isCurrentPrayer = currentPrayer?.name === prayer.name;
          const colors = getPrayerColors(prayer);
          
          return (
            <div 
              key={prayer.name}
              className={cn(
                'relative bg-background rounded-2xl p-5 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105',
                isCurrentPrayer 
                  ? `${colors.border} ring-4 ring-opacity-30 scale-105 shadow-xl`
                  : 'border-border'
              )}
            >
              {/* Current Prayer Indicator */}
              {isCurrentPrayer && (
                <div className={`absolute -top-2 -right-2 ${colors.bg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {t.ui.now}
                </div>
              )}
              
              <div className="text-center">
                <div className="mb-3">
                  <span className="text-3xl" aria-hidden="true">{prayer.emoji}</span>
                </div>
                <h3 className={cn(
                  'text-lg font-semibold mb-2',
                  isCurrentPrayer ? colors.text : 'text-muted'
                )}>
                  {t.prayers[prayer.name as keyof typeof t.prayers]}
                </h3>
                <div className={cn(
                  'text-2xl font-bold px-4 py-2 rounded-lg',
                  isCurrentPrayer 
                    ? `${colors.bg} text-white shadow-md`
                    : 'bg-muted-light text-muted'
                )}>
                  {formatPrayerTime(prayer.time)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
