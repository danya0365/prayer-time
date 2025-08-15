"use client";

import { useState } from 'react';
import { useNotifications } from '../../../hooks/useNotifications';
import { usePrayerTimes } from '../../../hooks/usePrayerTimes';
import { useTranslation } from '../../../hooks/useTranslation';
import { useLocationStore } from '../../../stores/locationStore';
import { useSettingsStore } from '../../../stores/settingsStore';
import { AdditionalFeatures } from '../../dashboard/AdditionalFeatures';
import { FutureFeatures } from '../../dashboard/FutureFeatures';
import HeroSection from '../../dashboard/HeroSection';
import PrayerTimesDisplay from '../../dashboard/PrayerTimesDisplay';
import { MockupShowcase } from '../../mockups/MockupShowcase';
import LocationSelector from '../../ui/LocationSelector';
import SettingsPanel from '../../ui/SettingsPanel';

export default function OriginalTheme() {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [locationSelectorOpen, setLocationSelectorOpen] = useState<boolean>(false);
  const [showAdditionalFeatures, setShowAdditionalFeatures] = useState<boolean>(false);
  const [testMode, setTestMode] = useState<boolean>(false);
  const [testTime, setTestTime] = useState<Date>(new Date());
  
  const { currentLocation } = useLocationStore();
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  
  // Use prayer times hook
  const {
    prayers,
    currentPrayer,
    nextPrayer,
    timeUntilNext,
    loading,
    error
  } = usePrayerTimes({ testMode, testTime });
  
  // Use notifications hook - enabled state managed in settings
  useNotifications({
    enabled: false, // Will be managed through settings panel
    nextPrayer: nextPrayer || {
      name: 'fajr',
      displayName: 'Fajr',
      time: new Date(),
      emoji: '🌅',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      isCurrent: false
    },
    timeUntilNext,
    notificationMinutes: settings.notificationMinutes
  });

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
          {t.ui.loading}...
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
