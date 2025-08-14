'use client'

import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'
import { 
  gregorianToHijri, 
  formatHijriDate, 
  getTodayIslamicEvent, 
  getDaysUntilRamadan,
  HijriDate,
  IslamicEvent
} from '../../utils/islamic-calendar'

interface IslamicCalendarProps {
  className?: string
  language?: 'en' | 'th' | 'ar'
}

export function IslamicCalendar({ className, language = 'en' }: IslamicCalendarProps) {
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null)
  const [todayEvent, setTodayEvent] = useState<IslamicEvent | null>(null)
  const [daysUntilRamadan, setDaysUntilRamadan] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const today = new Date()
    
    const hijri = gregorianToHijri(today)
    setHijriDate(hijri)
    
    const event = getTodayIslamicEvent(today)
    setTodayEvent(event)
    
    const ramadanDays = getDaysUntilRamadan(today)
    setDaysUntilRamadan(ramadanDays)
  }, [])

  if (!mounted || !hijriDate) {
    return (
      <div className={cn('p-6 rounded-xl bg-card-bg border border-card-border', className)}>
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-foreground/10 rounded w-3/4" />
          <div className="h-4 bg-foreground/10 rounded w-1/2" />
          <div className="h-4 bg-foreground/10 rounded w-2/3" />
        </div>
      </div>
    )
  }

  const getGreeting = () => {
    switch (language) {
      case 'ar':
        return 'التاريخ الهجري'
      case 'th':
        return 'ปฏิทินอิสลาม'
      default:
        return 'Islamic Calendar'
    }
  }

  const getRamadanText = () => {
    if (daysUntilRamadan === 0) {
      switch (language) {
        case 'ar':
          return 'رمضان مبارك! 🌙'
        case 'th':
          return 'รอมฎอนมุบารอก! 🌙'
        default:
          return 'Ramadan Mubarak! 🌙'
      }
    }
    
    switch (language) {
      case 'ar':
        return `${daysUntilRamadan} يوماً حتى رمضان`
      case 'th':
        return `อีก ${daysUntilRamadan} วันถึงรอมฎอน`
      default:
        return `${daysUntilRamadan} days until Ramadan`
    }
  }

  return (
    <div className={cn('p-6 rounded-xl bg-card-bg border border-card-border', className)}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">{getGreeting()}</h3>
      
      {/* Hijri Date */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-foreground mb-1">
          {formatHijriDate(hijriDate, language === 'ar' ? 'ar' : 'en')}
        </div>
        <div className="text-sm text-foreground/70">
          {hijriDate.monthName} {hijriDate.year}
        </div>
      </div>

      {/* Today's Event */}
      {todayEvent && (
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🕌</span>
            <span className="font-semibold text-green-700 dark:text-green-400">
              {language === 'ar' ? todayEvent.nameArabic : todayEvent.name}
            </span>
          </div>
          <p className="text-sm text-foreground/80">{todayEvent.description}</p>
        </div>
      )}

      {/* Ramadan Countdown */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌙</span>
          <span className="font-medium text-purple-700 dark:text-purple-400">
            {getRamadanText()}
          </span>
        </div>
      </div>

      {/* Islamic Months Info */}
      <div className="mt-4 text-xs text-foreground/60">
        <p>* Dates are approximate and may vary by location</p>
      </div>
    </div>
  )
}
