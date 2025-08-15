'use client'

import { useState, useEffect } from 'react'
import { cn } from '../../../../utils/cn'
import { QiblaCompass } from '../../../ui/QiblaCompass'
import { IslamicCalendar } from '../../../ui/IslamicCalendar'

interface AdditionalFeaturesProps {
  latitude?: number
  longitude?: number
  language?: 'en' | 'th' | 'ar'
  className?: string
}

export function AdditionalFeatures({ 
  latitude, 
  longitude, 
  language = 'en',
  className 
}: AdditionalFeaturesProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn('w-full max-w-4xl mx-auto mt-8', className)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-pulse">
            <div className="h-64 bg-card-bg rounded-xl border border-card-border" />
          </div>
          <div className="animate-pulse">
            <div className="h-64 bg-card-bg rounded-xl border border-card-border" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto mt-8', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Qibla Compass */}
        <QiblaCompass 
          latitude={latitude} 
          longitude={longitude}
          className="h-fit"
        />
        
        {/* Islamic Calendar */}
        <IslamicCalendar 
          language={language}
          className="h-fit"
        />
      </div>
    </div>
  )
}
