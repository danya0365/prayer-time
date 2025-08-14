'use client'

import { useState, useEffect } from 'react'
import { cn } from '../../utils/cn'
import { ThemeToggle } from './ThemeToggle'
import { NotificationButton } from './NotificationButton'
// import { CalculationMethod } from 'adhan' // Will be used when implementing calculation method changes

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  onSettingsChange?: (settings: PrayerSettings) => void
}

export interface PrayerSettings {
  calculationMethod: string
  notificationMinutes: number
  language: 'en' | 'th' | 'ar'
  adjustments: {
    fajr: number
    dhuhr: number
    asr: number
    maghrib: number
    isha: number
  }
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
}

export function SettingsPanel({ isOpen, onClose, onSettingsChange }: SettingsPanelProps) {
  const [settings, setSettings] = useState<PrayerSettings>(DEFAULT_SETTINGS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load settings from localStorage
    const saved = localStorage.getItem('prayer-settings')
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved)
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings })
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
  }, [])

  const updateSettings = (newSettings: Partial<PrayerSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    
    if (mounted) {
      localStorage.setItem('prayer-settings', JSON.stringify(updated))
      onSettingsChange?.(updated)
    }
  }

  const updateAdjustment = (prayer: keyof PrayerSettings['adjustments'], value: number) => {
    updateSettings({
      adjustments: {
        ...settings.adjustments,
        [prayer]: value
      }
    })
  }

  if (!mounted) return null

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
          'fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-card-border z-50 transform transition-transform duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-card-bg transition-colors"
              aria-label="Close settings"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* App Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-foreground">App Settings</h3>
            
            {/* Theme Toggle */}
            <div className="flex items-center justify-between mb-4 p-4 rounded-lg border border-card-border bg-card-bg">
              <div>
                <h4 className="font-medium text-foreground">Theme</h4>
                <p className="text-sm text-foreground/70">Switch between light and dark mode</p>
              </div>
              <ThemeToggle />
            </div>
            
            {/* Notification Permission */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-card-border bg-card-bg">
              <div>
                <h4 className="font-medium text-foreground">Prayer Notifications</h4>
                <p className="text-sm text-foreground/70">Enable browser notifications for prayer times</p>
              </div>
              <NotificationButton onPermissionChange={(granted) => console.log('Notification permission:', granted)} />
            </div>
          </div>

          {/* Calculation Method */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Calculation Method</h3>
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
            <p className="text-sm text-foreground/70 mt-2">
              {CALCULATION_METHODS.find(m => m.key === settings.calculationMethod)?.description}
            </p>
          </div>

          {/* Notification Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Notifications</h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notify before prayer (minutes)
              </label>
              <select
                value={settings.notificationMinutes}
                onChange={(e) => updateSettings({ notificationMinutes: parseInt(e.target.value) })}
                className="w-full p-3 rounded-lg border border-card-border bg-card-bg text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              >
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>
          </div>

          {/* Language Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Language</h3>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value as 'en' | 'th' | 'ar' })}
              className="w-full p-3 rounded-lg border border-card-border bg-card-bg text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              <option value="en">English</option>
              <option value="th">ไทย (Thai)</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>

          {/* Time Adjustments */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Time Adjustments (minutes)</h3>
            <div className="space-y-4">
              {Object.entries(settings.adjustments).map(([prayer, adjustment]) => (
                <div key={prayer}>
                  <label className="block text-sm font-medium text-foreground mb-1 capitalize">
                    {prayer}
                  </label>
                  <input
                    type="number"
                    min="-30"
                    max="30"
                    value={adjustment}
                    onChange={(e) => updateAdjustment(prayer as keyof PrayerSettings['adjustments'], parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-card-border bg-card-bg text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-foreground/70 mt-2">
              Adjust prayer times by adding or subtracting minutes (-30 to +30)
            </p>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSettings(DEFAULT_SETTINGS)
              localStorage.removeItem('prayer-settings')
              onSettingsChange?.(DEFAULT_SETTINGS)
            }}
            className="w-full p-3 rounded-lg border border-error/20 bg-error-light text-error hover:bg-error-light/80 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </>
  )
}
