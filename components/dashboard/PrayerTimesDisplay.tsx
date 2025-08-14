import { cn } from '../../utils/cn';
import { PrayerInfo, formatPrayerTime } from '../../utils/prayer-utils';

interface PrayerTimesDisplayProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
}

export default function PrayerTimesDisplay({ prayers, currentPrayer }: PrayerTimesDisplayProps) {
  const getPrayerColors = (prayer: PrayerInfo) => {
    const colorMap = {
      fajr: { bg: 'from-indigo-500 to-purple-600', border: 'border-indigo-200', text: 'text-indigo-700' },
      dhuhr: { bg: 'from-yellow-500 to-orange-600', border: 'border-yellow-200', text: 'text-yellow-700' },
      asr: { bg: 'from-orange-500 to-red-600', border: 'border-orange-200', text: 'text-orange-700' },
      maghrib: { bg: 'from-pink-500 to-rose-600', border: 'border-pink-200', text: 'text-pink-700' },
      isha: { bg: 'from-blue-500 to-indigo-600', border: 'border-blue-200', text: 'text-blue-700' }
    };
    return colorMap[prayer.name] || { bg: 'from-emerald-500 to-teal-600', border: 'border-emerald-200', text: 'text-emerald-700' };
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Today&apos;s Prayer Times
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {prayers.map((prayer) => {
          const isCurrentPrayer = currentPrayer?.name === prayer.name;
          const colors = getPrayerColors(prayer);
          
          return (
            <div 
              key={prayer.name}
              className={cn(
                'relative bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105',
                isCurrentPrayer 
                  ? `${colors.border} ring-4 ring-opacity-30 scale-105 shadow-xl`
                  : 'border-gray-200 dark:border-gray-700'
              )}
            >
              {/* Current Prayer Indicator */}
              {isCurrentPrayer && (
                <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${colors.bg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  NOW
                </div>
              )}
              
              <div className="text-center">
                <div className="mb-3">
                  <span className="text-3xl" aria-hidden="true">{prayer.emoji}</span>
                </div>
                <h3 className={cn(
                  'text-lg font-semibold mb-2',
                  isCurrentPrayer ? colors.text : 'text-gray-700 dark:text-gray-300'
                )}>
                  {prayer.displayName}
                </h3>
                <div className={cn(
                  'text-2xl font-bold px-4 py-2 rounded-lg',
                  isCurrentPrayer 
                    ? `bg-gradient-to-r ${colors.bg} text-white shadow-md`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
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
