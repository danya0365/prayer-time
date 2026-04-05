'use client'

import { cn } from '@/utils/cn'
import { calculateQiblaDirection, getCompassDirection, getAbsoluteHeading, QiblaInfo } from '@/utils/qibla-utils'
import { useEffect, useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { useSettingsStore } from '../../stores/settingsStore'
import { Navigation, RotateCcw } from 'lucide-react'

interface QiblaCompassProps {
  latitude?: number
  longitude?: number
  className?: string
}

export function QiblaCompass({ latitude, longitude, className }: QiblaCompassProps) {
  const { settings } = useSettingsStore()
  const { t } = useTranslation({ language: settings.language })
  
  const [qiblaInfo, setQiblaInfo] = useState<QiblaInfo | null>(null)
  const [deviceHeading, setDeviceHeading] = useState<number>(0)
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)
  const [isStaticMode, setIsStaticMode] = useState<boolean>(true)
  const [manualHeading, setManualHeading] = useState<number>(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (latitude && longitude) {
      const info = calculateQiblaDirection(latitude, longitude)
      setQiblaInfo(info)
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (!mounted) return

    const requestOrientationPermission = async () => {
      const DeviceEvent = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      }

      if (typeof DeviceEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceEvent.requestPermission()
          const granted = permission === 'granted'
          setPermissionGranted(granted)
          if (granted) setIsStaticMode(false)
        } catch (error) {
          console.error('Error requesting device orientation permission:', error)
        }
      } else if (typeof DeviceOrientationEvent !== 'undefined') {
        setPermissionGranted(true)
      }
    }

    requestOrientationPermission()
  }, [mounted])

  useEffect(() => {
    if (!permissionGranted || !mounted) return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const heading = getAbsoluteHeading(event)
      if (heading !== null) {
        setDeviceHeading(heading)
        if (isStaticMode) setIsStaticMode(false)
      }
    }

    window.addEventListener('deviceorientation', handleOrientation)
    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleOrientation)
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('deviceorientationabsolute', handleOrientation)
    }
  }, [permissionGranted, mounted, isStaticMode])

  if (!mounted || !qiblaInfo) {
    return (
      <div className={cn('flex flex-col items-center p-6 rounded-3xl bg-[#022c22]/40 backdrop-blur-xl border border-[#D4AF37]/20', className)}>
        <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37]/20 bg-[#022c22] animate-pulse mb-4 flex items-center justify-center">
           <span className="text-[#D4AF37]/20 text-4xl">🕋</span>
        </div>
        <p className="text-sm text-white/50 font-medium">{t.ui.loading}</p>
      </div>
    )
  }

  const currentHeading = isStaticMode ? manualHeading : deviceHeading
  const compassDirection = getCompassDirection(qiblaInfo.direction)
  const isAligned = Math.abs(((((qiblaInfo.direction - currentHeading + 180) % 360) + 360) % 360) - 180) < 3

  return (
    <div className={cn(
      'flex flex-col items-center p-8 rounded-[2.5rem] transition-all duration-700',
      isAligned ? 'bg-[#064e3b]/60 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.1)]' : 'bg-[#022c22]/40 border-[#D4AF37]/20',
      className
    )}>
      <div className="flex items-center justify-between w-full mb-6">
         <h3 className="text-lg font-black text-white uppercase tracking-wider">{t.qibla.title}</h3>
         {!isStaticMode && (
           <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t.qibla.realTimeSensor}</span>
           </div>
         )}
      </div>
      
      {/* Compass UI */}
      <div className="relative w-40 h-40 mb-8 md:w-48 md:h-48 group">
        {/* Fixed Outer Frame */}
        <div className={cn(
          "absolute inset-0 rounded-full border-2 transition-colors duration-700",
          isAligned ? "border-emerald-500/40" : "border-[#D4AF37]/20"
        )} />

        {/* Rotating Plate */}
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${-currentHeading}deg)` }}
        >
          {/* Degree Ticks */}
          {[...Array(8)].map((_, i) => (
             <div 
               key={i}
               className="absolute top-0 left-1/2 w-0.5 h-2 bg-white/10 origin-bottom"
               style={{ transform: `translateX(-50%) rotate(${i * 45}deg) translateY(4px)` }}
             />
          ))}

          {/* Compass Disc */}
          <div className="absolute inset-3 rounded-full bg-[#022c22] border border-[#D4AF37]/10 flex items-center justify-center shadow-2xl">
              {/* Cardinal directions */}
              <div className={cn("absolute top-2 font-black text-sm", isAligned ? "text-emerald-400" : "text-[#D4AF37]")}>N</div>
              <div className="absolute right-2 font-black text-sm text-white/10">E</div>
              <div className="absolute bottom-2 font-black text-sm text-white/10">S</div>
              <div className="absolute left-2 font-black text-sm text-white/10">W</div>

              {/* Kaaba Center */}
              <div className={cn("text-3xl z-20 transition-transform duration-500", isAligned ? "scale-110" : "")}>🕋</div>

              {/* Qibla Needle (Relative to N plate) */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `rotate(${qiblaInfo.direction}deg)` }}
              >
                <div className="relative w-1 h-32 flex flex-col items-center">
                   <div className={cn(
                     "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] transition-colors",
                     isAligned ? "border-b-emerald-400" : "border-b-[#D4AF37]"
                   )} />
                   <div className={cn(
                     "w-1 h-full bg-gradient-to-b from-[#D4AF37] to-transparent",
                     isAligned ? "from-emerald-400" : ""
                   )} />
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5">
           <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{t.qibla.distance}</span>
           <span className="text-sm font-bold text-white">{qiblaInfo.distance.toLocaleString()} km</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5">
           <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{t.qibla.precision}</span>
           <span className="text-sm font-bold text-[#D4AF37]">{qiblaInfo.direction}° {compassDirection}</span>
        </div>
      </div>

      {/* Manual Mini Controller (Static Mode Only) */}
      {isStaticMode && (
        <div className="w-full space-y-4 pt-4 border-t border-white/5 animate-fade-in">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Navigation className="w-3 h-3 text-[#D4AF37] animate-spin-slow" />
                 <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t.qibla.manualAdjustment}</span>
              </div>
              <button onClick={() => setManualHeading(0)} className="text-[#D4AF37]/60 hover:text-[#D4AF37]">
                 <RotateCcw className="w-3 h-3" />
              </button>
           </div>
           <input 
             type="range"
             min="0"
             max="360"
             value={manualHeading}
             onChange={(e) => setManualHeading(parseInt(e.target.value))}
             className="w-full h-1.5 bg-[#022c22] rounded-lg appearance-none cursor-pointer accent-[#D4AF37] border border-white/5"
           />
        </div>
      )}
      
      {!permissionGranted && (
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 text-xs bg-[#D4AF37] text-black font-black rounded-xl hover:scale-105 transition-transform uppercase tracking-widest"
        >
          {t.qibla.enableNow}
        </button>
      )}
    </div>
  )
}
