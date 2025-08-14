import { format } from 'date-fns';
import { PrayerInfo } from '../../utils/prayer-utils';
import { ThemeToggle } from '../ui/ThemeToggle';
import CurrentPrayerIndicator from './CurrentPrayerIndicator';

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
    <section className="w-full flex flex-col items-center justify-center text-center mb-8 relative">
      {/* Theme Toggle - positioned absolutely in top-right */}
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      
      <div className="mb-4">
        <p className="text-lg opacity-80 text-foreground">{formattedDate}</p>
        <h1 className="text-4xl font-bold mt-2 mb-6 text-foreground">Prayer Times Dashboard</h1>
      </div>
      
      <CurrentPrayerIndicator 
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        timeUntilNext={timeUntilNext}
      />
    </section>
  );
}
