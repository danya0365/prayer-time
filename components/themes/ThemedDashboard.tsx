"use client";

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { useDashboardState } from '../../hooks/useDashboardState';
import OriginalTheme from './OriginalTheme';
import { ModernTheme } from './ModernTheme';
import { ClassicTheme } from './ClassicTheme';
import { MinimalTheme } from './MinimalTheme';
import { GradientTheme } from './GradientTheme';
import FloatingSettingsButton from '../ui/FloatingSettingsButton';

interface ThemedDashboardProps {
  testMode?: boolean;
  testTime?: Date;
}

export function ThemedDashboard({ testMode = false, testTime = new Date() }: ThemedDashboardProps) {
  const { currentTheme } = useTheme();
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
