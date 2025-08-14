"use client";

import { useEffect, useState } from 'react';
import {
  getAllPrayerInfo,
  getCurrentAndNextPrayer,
  getPrayerTimes,
  PrayerInfo
} from '../../utils/prayer-utils';
import { useNotifications } from '../../hooks/useNotifications';
import { SettingsPanel, PrayerSettings } from '../ui/SettingsPanel';
import { useLocationStore } from '../../stores/locationStore';
import LocationDisplay from '../ui/LocationDisplay';
import LocationSelector from '../ui/LocationSelector';
import HeroSection from './HeroSection';
import PrayerTimesDisplay from './PrayerTimesDisplay';
import { AdditionalFeatures } from './AdditionalFeatures';
import { FutureFeatures } from './FutureFeatures';
import { MockupShowcase } from '../mockups/MockupShowcase';

export default function PrayerTimesDashboard() {
  const [prayers, setPrayers] = useState<PrayerInfo[]>([]);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerInfo | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerInfo | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [locationSelectorOpen, setLocationSelectorOpen] = useState<boolean>(false);
  const [showAdditionalFeatures, setShowAdditionalFeatures] = useState<boolean>(false);
  const { currentLocation, requestGeolocation } = useLocationStore();
  const [settings, setSettings] = useState<PrayerSettings>({
    calculationMethod: 'MoonsightingCommittee',
    notificationMinutes: 15,
    language: 'en',
    adjustments: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  });
  
  // Use notifications hook
  useNotifications({
    enabled: notificationsEnabled,
    nextPrayer: nextPrayer!,
    timeUntilNext,
    notificationMinutes: settings.notificationMinutes
  });

  // Calculate prayer times when location changes
  useEffect(() => {
    const calculatePrayerTimes = () => {
      try {
        // Get prayer times for today using current location
        const prayerTimes = currentLocation 
          ? getPrayerTimes(new Date(), { latitude: currentLocation.latitude, longitude: currentLocation.longitude })
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
    
    // Calculate prayer times with current location
    calculatePrayerTimes();
    
    // If no location is set, try to get user's location automatically
    if (!currentLocation) {
      requestGeolocation();
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
  }, [settings, currentLocation, requestGeolocation]); // Re-calculate when settings or location change

  // Handle notification permission change
  const handleNotificationPermissionChange = (granted: boolean) => {
    setNotificationsEnabled(granted);
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: PrayerSettings) => {
    setSettings(newSettings);
  };
  
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
      {/* Location Display */}
      <div className="w-full max-w-4xl mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Prayer Times Location</h3>
          <LocationDisplay 
            onOpenLocationSelector={() => setLocationSelectorOpen(true)}
            showEditButton={true}
            compact={false}
          />
        </div>
      </div>

      <HeroSection 
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        timeUntilNext={timeUntilNext}
        onNotificationPermissionChange={handleNotificationPermissionChange}
        onSettingsClick={() => setSettingsOpen(true)}
      />
      
      <PrayerTimesDisplay 
        prayers={prayers}
        currentPrayer={currentPrayer}
      />

      {/* Additional Features Toggle */}
      {!showAdditionalFeatures && (
        <div className="w-full max-w-4xl mt-8">
          <div className="text-center">
            <button
              onClick={() => setShowAdditionalFeatures(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              ดูฟีเจอร์เพิ่มเติม
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              แสดงฟีเจอร์อื่นๆ และตัวอย่างการใช้งาน
            </p>
          </div>
        </div>
      )}

      {/* Additional Features - Lazy Loaded */}
      {showAdditionalFeatures && (
        <div className="w-full max-w-4xl space-y-8 mt-8">
          {/* Collapse Button */}
          <div className="text-center">
            <button
              onClick={() => setShowAdditionalFeatures(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              ซ่อนฟีเจอร์เพิ่มเติม
            </button>
          </div>

          <AdditionalFeatures
            latitude={currentLocation?.latitude}
            longitude={currentLocation?.longitude}
            language={settings.language}
          />

          <MockupShowcase />

          <FutureFeatures />
        </div>
      )}

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSettingsChange={handleSettingsChange}
      />

      <LocationSelector
        isOpen={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
      />
    </div>
  );
}
