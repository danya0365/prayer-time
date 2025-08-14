import { cn } from '../../utils/cn';
import { PrayerInfo, formatPrayerTime } from '../../utils/prayer-utils';

interface PrayerTimesDisplayProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
}

export default function PrayerTimesDisplay({ prayers, currentPrayer }: PrayerTimesDisplayProps) {
  const getPrayerCardClasses = (prayer: PrayerInfo, isCurrentPrayer: boolean) => {
    return cn(
      'rounded-xl p-5 backdrop-blur-sm transition-all border card-bg card-border card-shadow',
      isCurrentPrayer && [
        'ring-2 scale-[1.02]',
        `ring-${prayer.name}`
      ]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {prayers.map((prayer) => {
        const isCurrentPrayer = currentPrayer?.name === prayer.name;
        
        return (
          <div 
            key={prayer.name}
            className={getPrayerCardClasses(prayer, isCurrentPrayer)}
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2" aria-hidden="true">{prayer.emoji}</span>
              <h3 
                className={cn(
                  'text-xl font-medium',
                  isCurrentPrayer ? `text-${prayer.name}` : 'text-foreground'
                )}
              >
                {prayer.displayName}
              </h3>
              {isCurrentPrayer && (
                <span 
                  className={cn(
                    'ml-auto text-xs font-semibold px-2 py-1 rounded-full text-on-surface',
                    `bg-${prayer.name}`
                  )}
                >
                  NOW
                </span>
              )}
            </div>
            
            <p className="text-2xl font-bold">
              {formatPrayerTime(prayer.time)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
