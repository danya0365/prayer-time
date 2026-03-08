import { useState } from 'react';

interface UseDashboardStateReturn {
  settingsOpen: boolean;
  locationSelectorOpen: boolean;
  showAdditionalFeatures: boolean;
  testMode: boolean;
  testTime: Date;
  setSettingsOpen: (open: boolean) => void;
  setLocationSelectorOpen: (open: boolean) => void;
  setShowAdditionalFeatures: (show: boolean) => void;
  setTestMode: (enabled: boolean) => void;
  setTestTime: (time: Date) => void;
  toggleSettings: () => void;
  toggleLocationSelector: () => void;
  toggleAdditionalFeatures: () => void;
  toggleTestMode: () => void;
}

export function useDashboardState(): UseDashboardStateReturn {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [locationSelectorOpen, setLocationSelectorOpen] = useState<boolean>(false);
  const [showAdditionalFeatures, setShowAdditionalFeatures] = useState<boolean>(false);
  const [testMode, setTestMode] = useState<boolean>(false);
  const [testTime, setTestTime] = useState<Date>(new Date());

  const toggleSettings = () => setSettingsOpen(prev => !prev);
  const toggleLocationSelector = () => setLocationSelectorOpen(prev => !prev);
  const toggleAdditionalFeatures = () => setShowAdditionalFeatures(prev => !prev);
  const toggleTestMode = () => setTestMode(prev => !prev);

  return {
    settingsOpen,
    locationSelectorOpen,
    showAdditionalFeatures,
    testMode,
    testTime,
    setSettingsOpen,
    setLocationSelectorOpen,
    setShowAdditionalFeatures,
    setTestMode,
    setTestTime,
    toggleSettings,
    toggleLocationSelector,
    toggleAdditionalFeatures,
    toggleTestMode
  };
}
