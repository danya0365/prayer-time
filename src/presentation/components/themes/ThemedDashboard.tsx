"use client";

import FloatingSettingsButton from '@/src/presentation/components/ui/FloatingSettingsButton';
import { usePrayerTimes } from '@/src/presentation/hooks/usePrayerTimes';
import { usePrayerDashboardThemeStore } from '@/src/presentation/stores/prayerDashboardThemeStore';
import ClassicTheme from './ClassicTheme/ClassicTheme';
import GradientTheme from './GradientTheme/GradientTheme';
import GreenTheme from './GreenTheme/GreenTheme';
import MeccaTheme from './MeccaTheme/MeccaTheme';
import MinimalTheme from './MinimalTheme/MinimalTheme';
import ModernTheme from './ModernTheme/ModernTheme';
import OceanTheme from './OceanTheme/OceanTheme';
import OrangeTheme from './OrangeTheme/OrangeTheme';
import OriginalTheme from './OriginalTheme/OriginalTheme';
import SpaceTheme from './SpaceTheme/SpaceTheme';

interface ThemedDashboardProps {
  testMode?: boolean;
  testTime?: Date;
}

export function ThemedDashboard({ testMode = false, testTime = new Date() }: ThemedDashboardProps) {
  const { currentTheme } = usePrayerDashboardThemeStore();
  const { prayers, currentPrayer, nextPrayer, timeUntilNext, loading, error } = usePrayerTimes({
    testMode,
    testTime
  });

  const themeProps = {
    prayers,
    currentPrayer,
    nextPrayer,
    timeUntilNext,
    loading,
    error
  };

  const renderTheme = () => {
    switch (currentTheme) {
      case 'original':
        return <OriginalTheme />;
      case 'modern':
        return <ModernTheme {...themeProps} />;
      case 'classic':
        return <ClassicTheme {...themeProps} />;
      case 'minimal':
        return <MinimalTheme {...themeProps} />;
      case 'gradient':
        return <GradientTheme {...themeProps} />;
      case 'orange':
        return <OrangeTheme {...themeProps} />;
      case 'green':
        return <GreenTheme {...themeProps} />;
      case 'space':
        return <SpaceTheme {...themeProps} />;
      case 'mecca':
        return <MeccaTheme {...themeProps} />;
      case 'ocean':
        return <OceanTheme {...themeProps} />;
      default:
        return <OriginalTheme />;
    }
  };

  return (
    <>
      {renderTheme()}
      <FloatingSettingsButton />
    </>
  );
}
