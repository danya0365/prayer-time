"use client";

import { useEffect, useState } from 'react';
import { 
  getPrayerTimes, 
  getAllPrayerInfo, 
  getCurrentAndNextPrayer,
  PrayerInfo
} from '../utils/prayer-utils';
import HeroSection from './HeroSection';
import PrayerTimesDisplay from './PrayerTimesDisplay';

export default function PrayerTimesDashboard() {
  const [prayers, setPrayers] = useState<PrayerInfo[]>([]);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerInfo | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerInfo | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Get user's geolocation or use default (Bangkok)
  useEffect(() => {
    const calculatePrayerTimes = (latitude?: number, longitude?: number) => {
      try {
        // Get prayer times for today
        const prayerTimes = latitude && longitude 
          ? getPrayerTimes(new Date(), { latitude, longitude })
          : getPrayerTimes();
          
        // Get all prayer info
        const allPrayers = getAllPrayerInfo(prayerTimes);
        
        // Get current and next prayer
        const { current, next, timeUntilNext } = getCurrentAndNextPrayer(prayerTimes);
        
        // Update state
        setPrayers(allPrayers);
        setCurrentPrayer(current);
        setNextPrayer(next);
        setTimeUntilNext(timeUntilNext);
        setLoading(false);
      } catch (error) {
        console.error('Error calculating prayer times:', error);
        // Use default prayer times on error
        const prayerTimes = getPrayerTimes();
        const allPrayers = getAllPrayerInfo(prayerTimes);
        const { current, next, timeUntilNext } = getCurrentAndNextPrayer(prayerTimes);
        
        setPrayers(allPrayers);
        setCurrentPrayer(current);
        setNextPrayer(next);
        setTimeUntilNext(timeUntilNext);
        setLoading(false);
      }
    };
    
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          calculatePrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          calculatePrayerTimes(); // Use default coordinates
        }
      );
    } else {
      calculatePrayerTimes(); // Use default coordinates
    }
    
    // Update prayer times at midnight
    const checkForDayChange = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();
      
      setTimeout(() => {
        calculatePrayerTimes();
        checkForDayChange(); // Set up next day's check
      }, timeUntilMidnight);
    };
    
    checkForDayChange();
  }, []);
  
  if (loading || !nextPrayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-medium">
          Loading prayer times...
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <HeroSection 
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        timeUntilNext={timeUntilNext}
      />
      
      <PrayerTimesDisplay 
        prayers={prayers}
        currentPrayer={currentPrayer}
      />
    </div>
  );
}
