'use client'

import { useState, useEffect } from 'react'
import { cn } from '../../utils/cn'
import { ThemeToggle } from './ThemeToggle'
import { NotificationButton } from './NotificationButton'
import { useSettingsStore } from '../../stores/settingsStore'
import { useTranslation } from '../../hooks/useTranslation'
import { Language } from '../../types/translation'
import ThemeSelector from './ThemeSelector'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

const CALCULATION_METHODS = [
  { key: 'MoonsightingCommittee', name: 'Moonsighting Committee', description: 'Used in North America' },
  { key: 'MuslimWorldLeague', name: 'Muslim World League', description: 'Used in Europe, Far East, parts of US' },
  { key: 'Egyptian', name: 'Egyptian General Authority', description: 'Used in Africa, Syria, Iraq, Lebanon, Malaysia, Parts of US' },
  { key: 'Karachi', name: 'University of Islamic Sciences, Karachi', description: 'Used in Pakistan, Bangladesh, India, Afghanistan, Parts of Europe' },
  { key: 'UmmAlQura', name: 'Umm Al-Qura University, Makkah', description: 'Used in Saudi Arabia' },
  { key: 'Dubai', name: 'Dubai (unofficial)', description: 'Used in UAE' },
  { key: 'Qatar', name: 'Qatar', description: 'Modified version of Umm Al-Qura used in Qatar' },
  { key: 'Kuwait', name: 'Kuwait', description: 'Method used in Kuwait' },
  { key: 'Singapore', name: 'Singapore', description: 'Used in Singapore, Malaysia, and Indonesia' },
  { key: 'Turkey', name: 'Turkey', description: 'Used in Turkey' }
]

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings, updateAdjustment } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">{t.ui.settings}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={t.ui.close}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Theme Selector */}
          <div className="mb-8">
            <ThemeSelector />
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-foreground">Theme</span>
            <ThemeToggle />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-foreground">{t.ui.notifications}</span>
            <NotificationButton />
          </div>

          {/* Calculation Method */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">{t.ui.calculationMethod}</h3>
            <select
              value={settings.calculationMethod}
              onChange={(e) => updateSettings({ calculationMethod: e.target.value })}
              className="w-full p-3 rounded-lg border border-card-border bg-card-bg text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              {CALCULATION_METHODS.map((method) => (
                <option key={method.key} value={method.key}>
                  {method.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-muted mt-2">
              {CALCULATION_METHODS.find(m => m.key === settings.calculationMethod)?.description}
            </p>
          </div>

          {/* Notification Minutes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">{t.ui.notificationMinutes}</h3>
            <select
              value={settings.notificationMinutes}
              onChange={(e) => updateSettings({ notificationMinutes: parseInt(e.target.value) })}
              className="w-full p-3 rounded-lg border border-card-border bg-card-bg text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              <option value={5}>5 {t.ui.minutes}</option>
              <option value={10}>10 {t.ui.minutes}</option>
              <option value={15}>15 {t.ui.minutes}</option>
              <option value={30}>30 {t.ui.minutes}</option>
              <option value={60}>1 {t.ui.hour}</option>
            </select>
          </div>

          {/* Language Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">{t.ui.language}</h3>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value as Language })}
              className="w-full p-3 rounded-lg border border-card-border bg-card-bg text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              <option value="en">English</option>
              <option value="th">ไทย (Thai)</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>

          {/* Time Adjustments */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">{t.ui.timeAdjustments}</h3>
            <div className="space-y-4">
              {Object.entries(settings.adjustments).map(([prayer, adjustment]) => (
                <div key={prayer}>
                  <label className="block text-sm font-medium text-foreground mb-1 capitalize">
                    {t.prayers[prayer as keyof typeof t.prayers]}
                  </label>
                  <input
                    type="number"
                    min="-30"
                    max="30"
                    value={adjustment}
                    onChange={(e) => updateAdjustment(prayer as keyof typeof settings.adjustments, parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-card-border bg-card-bg text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={() => {
                if (confirm(t.alerts.resetConfirm)) {
                  // We'll use the resetSettings function from the store
                  const { resetSettings } = useSettingsStore.getState();
                  resetSettings();
                }
              }}
              className="w-full p-3 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-medium"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
