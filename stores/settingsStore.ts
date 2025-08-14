import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '../types/translation';

export interface PrayerSettings {
  calculationMethod: string;
  notificationMinutes: number;
  language: Language;
  adjustments: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
}

interface SettingsState {
  settings: PrayerSettings;
  updateSettings: (newSettings: Partial<PrayerSettings>) => void;
  updateAdjustment: (prayer: keyof PrayerSettings['adjustments'], value: number) => void;
  resetSettings: () => void;
}

// Default settings
const DEFAULT_SETTINGS: PrayerSettings = {
  calculationMethod: 'MuslimWorldLeague',
  notificationMinutes: 15,
  language: 'en',
  adjustments: {
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0
  }
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,

      updateSettings: (newSettings: Partial<PrayerSettings>) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings
          }
        }));
      },

      updateAdjustment: (prayer: keyof PrayerSettings['adjustments'], value: number) => {
        set((state) => ({
          settings: {
            ...state.settings,
            adjustments: {
              ...state.settings.adjustments,
              [prayer]: value
            }
          }
        }));
      },

      resetSettings: () => {
        set({ settings: { ...DEFAULT_SETTINGS } });
      }
    }),
    {
      name: 'prayer-settings-storage',
      partialize: (state) => ({ 
        settings: { ...state.settings } 
      })
    }
  )
);
