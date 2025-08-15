"use client";

import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useSettingsStore } from '../../stores/settingsStore';
import { useLocationStore } from '../../stores/locationStore';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { useNotifications } from '../../hooks/useNotifications';
import SettingsPanel from '../ui/SettingsPanel';
import LocationSelector from '../ui/LocationSelector';
import HeroSection from '../dashboard/HeroSection';
import PrayerTimesDisplay from '../dashboard/PrayerTimesDisplay';
import { AdditionalFeatures } from '../dashboard/AdditionalFeatures';
import { FutureFeatures } from '../dashboard/FutureFeatures';
import { MockupShowcase } from '../mockups/MockupShowcase';

export default function OriginalTheme() {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [locationSelectorOpen, setLocationSelectorOpen] = useState<boolean>(false);
  const [showAdditionalFeatures, setShowAdditionalFeatures] = useState<boolean>(false);
  const [testMode, setTestMode] = useState<boolean>(false);
  const [testTime, setTestTime] = useState<Date>(new Date());
  
  const { currentLocation, requestGeolocation } = useLocationStore();
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

  const handleLocationRequest = async () => {
    try {
      await requestGeolocation();
    } catch (error) {
      console.error('Failed to get location:', error);
    }
  };

  const formatTimeUntil = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleLocationRequest}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
        timeUntilNext={timeUntilNext}
        formatTimeUntil={formatTimeUntil}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenLocationSelector={() => setLocationSelectorOpen(true)}
        testMode={testMode}
        onTestModeChange={setTestMode}
        testTime={testTime}
        onTestTimeChange={setTestTime}
      />

      {/* Prayer Times Display */}
      <PrayerTimesDisplay 
        prayers={prayers} 
        currentPrayer={currentPrayer}
        language={settings.language}
      />

      {/* Additional Features Toggle */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <button
            onClick={() => setShowAdditionalFeatures(!showAdditionalFeatures)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            {showAdditionalFeatures ? 'Hide Features' : 'Show Features'}
          </button>
        </div>

        {/* Additional Features */}
        {showAdditionalFeatures && (
          <div className="mt-8 space-y-8">
            <AdditionalFeatures />
            <FutureFeatures />
            <MockupShowcase />
          </div>
        )}
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Location Selector */}
      <LocationSelector
        isOpen={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
      />
    </div>
  );
}
