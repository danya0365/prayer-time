"use client";

import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import { useSettingsStore } from '../../stores/settingsStore';
import SettingsPanel from './SettingsPanel';
import LocationSelector from './LocationSelector';

export default function FloatingSettingsButton() {
  const { themeConfig } = useTheme();
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false);

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-3">
        {/* Location Button */}
        <button
          onClick={() => setLocationSelectorOpen(true)}
          className={`w-14 h-14 ${themeConfig.colors.accent} text-white ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} ${themeConfig.styles.animation} hover:scale-110 flex items-center justify-center`}
          aria-label={t.ui.location}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Settings Button */}
        <button
          onClick={() => setSettingsOpen(true)}
          className={`w-16 h-16 ${themeConfig.colors.primary} text-white ${themeConfig.styles.borderRadius} ${themeConfig.styles.shadows} ${themeConfig.styles.animation} hover:scale-110 flex items-center justify-center`}
          aria-label={t.ui.settings}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
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
    </>
  );
}
