'use client'

import { IslamicCalendar } from '@/src/presentation/components/ui/IslamicCalendar'
import { QiblaCompass } from '@/src/presentation/components/ui/QiblaCompass'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'

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
    <div className={cn('w-full max-w-5xl mx-auto px-4', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Qibla Compass Card */}
        <div className="relative group/feature rounded-[2.5rem] bg-[#022c22]/40 backdrop-blur-xl border border-[#D4AF37]/20 p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/40">
          {/* Ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#D4AF37]/30 rounded-tl-xl" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#D4AF37]/30 rounded-tr-xl" />
          
          <div className="relative z-10">
            <h3 className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-6 text-center">Qibla Direction</h3>
            <QiblaCompass 
              latitude={latitude} 
              longitude={longitude}
              className="h-fit"
            />
          </div>
        </div>
        
        {/* Islamic Calendar Card */}
        <div className="relative group/feature rounded-[2.5rem] bg-[#022c22]/40 backdrop-blur-xl border border-[#D4AF37]/20 p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/40">
           {/* Ornaments */}
           <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#D4AF37]/30 rounded-tl-xl" />
           <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#D4AF37]/30 rounded-tr-xl" />

          <div className="relative z-10">
            <h3 className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-6 text-center">Islamic Date</h3>
            <IslamicCalendar 
              language={language}
              className="h-fit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
