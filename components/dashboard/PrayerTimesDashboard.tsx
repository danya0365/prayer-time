"use client";

import { useEffect, useState } from 'react';
import {
  getAllPrayerInfo,
  getCurrentAndNextPrayer,
  getPrayerTimes,
  PrayerInfo
} from '../../utils/prayer-utils';
import { useNotifications } from '../../hooks/useNotifications';
import SettingsPanel from '../ui/SettingsPanel';
import { useLocationStore } from '../../stores/locationStore';
import { useSettingsStore } from '../../stores/settingsStore';
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
  // Notifications now handled in SettingsPanel
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [locationSelectorOpen, setLocationSelectorOpen] = useState<boolean>(false);
  const [showAdditionalFeatures, setShowAdditionalFeatures] = useState<boolean>(false);
  const [testMode, setTestMode] = useState<boolean>(false);
  const [testTime, setTestTime] = useState<Date>(new Date());
  const { currentLocation, requestGeolocation } = useLocationStore();
  const { settings } = useSettingsStore();
  
  // Use notifications hook - enabled state managed in settings
  useNotifications({
    enabled: false, // Will be managed through settings panel
    nextPrayer: nextPrayer!,
    timeUntilNext,
    notificationMinutes: settings.notificationMinutes
  });

  // Calculate prayer times when location changes
  useEffect(() => {
    const calculatePrayerTimes = () => {
      try {
        // Use test time if in test mode, otherwise use current time
        const currentTime = testMode ? testTime : new Date();
        
        // Get prayer times for today using current location
        const prayerTimes = currentLocation 
          ? getPrayerTimes(currentTime, { latitude: currentLocation.latitude, longitude: currentLocation.longitude })
          : getPrayerTimes(currentTime);
          
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
    
    // Set up real-time updates every minute
    const realTimeTimer = setInterval(() => {
      if (!testMode) {
        calculatePrayerTimes();
      }
    }, 60000); // Update every minute
    
    return () => {
      clearInterval(realTimeTimer);
    };
  }, [settings, currentLocation, requestGeolocation, testMode, testTime]); // Re-calculate when settings, location, or test mode change

  // Note: Notification settings moved to SettingsPanel


  
  // Test mode functions
  const toggleTestMode = () => {
    setTestMode(!testMode);
    if (!testMode) {
      setTestTime(new Date());
    }
  };
  
  const adjustTestTime = (minutes: number) => {
    const newTime = new Date(testTime.getTime() + minutes * 60000);
    setTestTime(newTime);
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
      {/* Test Mode Controls */}
      {process.env.NODE_ENV === 'development' && (
        <div className="w-full max-w-4xl mb-4">
          <div className="bg-warning-light/20 border border-warning-light rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-warning-dark">🧪 Test Mode (Development Only)</h3>
              <button
                onClick={toggleTestMode}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  testMode 
                    ? 'bg-warning text-white hover:bg-warning-dark' 
                    : 'bg-muted-light text-muted-dark hover:bg-border-light'
                }`}
              >
                {testMode ? 'Exit Test' : 'Test Mode'}
              </button>
            </div>
            
            {testMode && (
              <div className="space-y-3">
                <div className="text-sm text-warning-dark">
                  <strong>Test Time:</strong> {testTime.toLocaleString()}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setTestTime(new Date(testTime.getTime() + 60 * 60 * 1000))}
                    className="px-3 py-1 bg-info text-white rounded text-xs hover:bg-info-dark transition-colors"
                  >
                    -1 Hour
                  </button>
                  <button
                    onClick={() => adjustTestTime(-30)}
                    className="px-3 py-1 bg-info text-white rounded text-xs hover:bg-info-dark transition-colors"
                  >
                    -30 Min
                  </button>
                  <button
                    onClick={() => adjustTestTime(-5)}
                    className="px-3 py-1 bg-info text-white rounded text-xs hover:bg-info-dark transition-colors"
                  >
                    -5 Min
                  </button>
                  <button
                    onClick={() => setTestTime(new Date(testTime.getTime() + 30 * 60 * 1000))}
                    className="px-3 py-1 bg-info text-white rounded text-xs hover:bg-info-dark transition-colors"
                  >
                    +30 Min
                  </button>
                  <button
                    onClick={() => setTestTime(new Date(testTime.getTime() - 10 * 60 * 1000))}
                    className="px-3 py-1 bg-success text-white rounded text-xs hover:bg-success-dark transition-colors"
                  >
                    +1 Hour
                  </button>
                  <button
                    onClick={() => setTestTime(new Date())}
                    className="px-3 py-1 bg-muted text-white rounded text-xs hover:bg-muted-dark transition-colors"
                  >
                    Reset to Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <HeroSection 
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        timeUntilNext={timeUntilNext}
        onSettingsClick={() => setSettingsOpen(true)}
        onLocationClick={() => setLocationSelectorOpen(true)}
        testMode={testMode}
        testTime={testTime}
        language={settings.language}
      />

      <PrayerTimesDisplay 
        prayers={prayers}
        currentPrayer={currentPrayer}
        language={settings.language}
      />

      {/* Additional Features Toggle */}
      {!showAdditionalFeatures && (
        <div className="w-full max-w-4xl mt-8">
          <div className="text-center">
            <button
              onClick={() => setShowAdditionalFeatures(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              ดูฟีเจอร์เพิ่มเติม
            </button>
            <p className="text-sm text-muted mt-2">
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
              className="inline-flex items-center gap-2 px-4 py-2 text-muted hover:text-muted-dark transition-colors"
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
      />

      <LocationSelector
        isOpen={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
      />
    </div>
  );
}
