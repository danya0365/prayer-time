import { useEffect, useState, useCallback, useRef } from 'react';
import { Coordinates } from 'adhan';
import {
  getAllPrayerInfo,
  getCurrentAndNextPrayer,
  getPrayerTimes,
  PrayerInfo
} from '../utils/prayer-utils';
import { useLocationStore } from '../stores/locationStore';
import { useSettingsStore } from '../stores/settingsStore';

interface UsePrayerTimesOptions {
  testMode?: boolean;
  testTime?: Date;
}

interface UsePrayerTimesReturn {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function usePrayerTimes(options: UsePrayerTimesOptions = {}): UsePrayerTimesReturn {
  const { testMode = false, testTime } = options;
  
  const [prayers, setPrayers] = useState<PrayerInfo[]>([]);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerInfo | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerInfo | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { currentLocation } = useLocationStore();
  const { settings } = useSettingsStore();

  // Use ref to store testTime to avoid dependency issues
  const testTimeRef = useRef(testTime);
  testTimeRef.current = testTime;

  // Memoize calculatePrayerTimes to prevent infinite re-renders
  const calculatePrayerTimes = useCallback(() => {
    try {
      setError(null);
      
      // Use test time if in test mode, otherwise use current time
      const currentTime = testMode && testTimeRef.current ? testTimeRef.current : new Date();
      
      if (!currentLocation) {
        setError('Location not available');
        setLoading(false);
        return;
      }

      // Get prayer times for the current day
      const coordinates = new Coordinates(currentLocation.latitude, currentLocation.longitude);
      const prayerTimes = getPrayerTimes(currentTime, coordinates);

      // Get all prayer info with colors and names
      const allPrayerInfo = getAllPrayerInfo(prayerTimes, currentTime);
      setPrayers(allPrayerInfo);

      // Get current and next prayer
      const { current, next } = getCurrentAndNextPrayer(prayerTimes, currentTime);
      setCurrentPrayer(current);
      setNextPrayer(next);

      setLoading(false);
    } catch (err) {
      console.error('Error calculating prayer times:', err);
      setError('Failed to calculate prayer times');
      setLoading(false);
    }
  }, [currentLocation, settings, testMode]);

  // Calculate prayer times when location or settings change
  useEffect(() => {
    calculatePrayerTimes();
  }, [calculatePrayerTimes]);

  // Update countdown timer
  useEffect(() => {
    if (!nextPrayer) return;

    const updateCountdown = () => {
      const now = testMode && testTimeRef.current ? testTimeRef.current : new Date();
      const timeDiff = nextPrayer.time.getTime() - now.getTime();
      setTimeUntilNext(Math.max(0, timeDiff));
    };

    updateCountdown();

    if (!testMode) {
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [nextPrayer, testMode]);

  return {
    prayers,
    currentPrayer,
    nextPrayer,
    timeUntilNext,
    loading,
    error
  };
}
