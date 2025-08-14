import { PrayerInfo, formatPrayerTime } from '../utils/prayer-utils';

interface PrayerTimesDisplayProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
}

export default function PrayerTimesDisplay({ prayers, currentPrayer }: PrayerTimesDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {prayers.map((prayer) => {
        const isCurrentPrayer = currentPrayer?.name === prayer.name;
        
        return (
          <div 
            key={prayer.name}
            className={`
              rounded-xl p-5 backdrop-blur-sm transition-all border
              ${isCurrentPrayer ? 'ring-2 scale-[1.02]' : ''}
            `}
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              boxShadow: 'var(--card-shadow)',
              '--tw-ring-color': `var(--color-${prayer.name})`
            } as React.CSSProperties}
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2" aria-hidden="true">{prayer.emoji}</span>
              <h3 
                className={`text-xl font-medium ${isCurrentPrayer ? `text-${prayer.name}` : ''}`}
                style={{ color: isCurrentPrayer ? `var(--color-${prayer.name})` : 'inherit' }}
              >
                {prayer.displayName}
              </h3>
              {isCurrentPrayer && (
                <span 
                  className="ml-auto text-xs font-semibold px-2 py-1 rounded-full text-white"
                  style={{ 
                    backgroundColor: `var(--color-${prayer.name})`
                  }}
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
