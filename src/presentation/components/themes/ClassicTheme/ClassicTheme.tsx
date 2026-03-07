"use client";

import LocationSelector from '@/components/shared/LocationSelector';
import { useThemeStore } from '@/stores/themeStore';
import { PrayerInfo } from '@/utils/prayer-utils';
import { useState } from 'react';
import { ClassicCurrentPrayer } from './components/ClassicCurrentPrayer';
import { ClassicHeader } from './components/ClassicHeader';
import { ClassicPrayerList } from './components/ClassicPrayerList';

interface ClassicThemeProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  nextPrayer: PrayerInfo | null;
  timeUntilNext: number;
  loading: boolean;
  error: string | null;
}

export function ClassicTheme({
  prayers,
  currentPrayer,
  nextPrayer,
  timeUntilNext,
  loading,
  error
}: ClassicThemeProps) {
  const { themeConfig } = useThemeStore();
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false);

  if (loading) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} ${themeConfig.styles.shadows} border-2 border-emerald-200`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className={`${themeConfig.colors.surface} ${themeConfig.styles.borderRadius} ${themeConfig.styles.spacing} ${themeConfig.styles.shadows} border-2 border-red-200 text-center`}>
          <div className="text-red-600 text-xl mb-2">⚠️</div>
          <p className={themeConfig.colors.text.primary}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeConfig.colors.background}`}>
      <ClassicHeader onLocationClick={() => setLocationSelectorOpen(true)} />

      <div className="max-w-6xl mx-auto p-6">
        {currentPrayer && (
          <ClassicCurrentPrayer 
            currentPrayer={currentPrayer}
            nextPrayer={nextPrayer}
            timeUntilNext={timeUntilNext}
          />
        )}

        <ClassicPrayerList 
          prayers={prayers}
          currentPrayer={currentPrayer}
        />
      </div>

      <LocationSelector
        isOpen={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
      />
    </div>
  );
}

export default ClassicTheme;
