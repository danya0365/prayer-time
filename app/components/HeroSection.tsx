import { format } from 'date-fns';
import CurrentPrayerIndicator from '../components/CurrentPrayerIndicator';
import { PrayerInfo } from '../utils/prayer-utils';

interface HeroSectionProps {
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo;
  timeUntilNext: number;
}

export default function HeroSection({ 
  currentPrayer, 
  nextPrayer, 
  timeUntilNext 
}: HeroSectionProps) {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d, yyyy');
  
  return (
    <section className="w-full flex flex-col items-center justify-center text-center mb-8">
      <div className="mb-4">
        <p className="text-lg opacity-80">{formattedDate}</p>
        <h1 className="text-4xl font-bold mt-2 mb-6">Prayer Times Dashboard</h1>
      </div>
      
      <CurrentPrayerIndicator 
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        timeUntilNext={timeUntilNext}
      />
    </section>
  );
}
