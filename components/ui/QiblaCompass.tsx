'use client'

import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'
import { calculateQiblaDirection, getCompassDirection, QiblaInfo } from '../../utils/qibla-utils'

interface QiblaCompassProps {
  latitude?: number
  longitude?: number
  className?: string
}

export function QiblaCompass({ latitude, longitude, className }: QiblaCompassProps) {
  const [qiblaInfo, setQiblaInfo] = useState<QiblaInfo | null>(null)
  const [deviceOrientation, setDeviceOrientation] = useState<number>(0)
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

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
      if (typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent) {
        // iOS 13+ permission request
        try {
          const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
          setPermissionGranted(permission === 'granted')
        } catch (error) {
          console.error('Error requesting device orientation permission:', error)
        }
      } else if (typeof DeviceOrientationEvent !== 'undefined') {
        // Android and older iOS
        setPermissionGranted(true)
      }
    }

    requestOrientationPermission()
  }, [mounted])

  useEffect(() => {
    if (!permissionGranted || !mounted) return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setDeviceOrientation(event.alpha)
      }
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [permissionGranted, mounted])

  if (!mounted || !qiblaInfo) {
    return (
      <div className={cn('flex flex-col items-center p-6 rounded-xl bg-card-bg border border-card-border', className)}>
        <div className="w-32 h-32 rounded-full border-2 border-card-border bg-card-bg animate-pulse mb-4" />
        <p className="text-sm text-foreground/70">Loading Qibla direction...</p>
      </div>
    )
  }

  const qiblaDirection = qiblaInfo.direction - deviceOrientation
  const compassDirection = getCompassDirection(qiblaInfo.direction)

  return (
    <div className={cn('flex flex-col items-center p-6 rounded-xl bg-card-bg border border-card-border', className)}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">Qibla Direction</h3>
      
      {/* Compass */}
      <div className="relative w-32 h-32 mb-4">
        {/* Compass Circle */}
        <div className="absolute inset-0 rounded-full border-2 border-card-border bg-gradient-to-br from-card-bg to-background">
          {/* Cardinal directions */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-foreground">N</div>
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-foreground">E</div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-foreground">S</div>
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-foreground">W</div>
        </div>
        
        {/* Qibla Arrow */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${qiblaDirection}deg)` }}
        >
          <div className="w-1 h-12 bg-success rounded-full shadow-lg transform -translate-y-2">
            <div className="w-3 h-3 bg-success rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-md" />
          </div>
        </div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-foreground rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Information */}
      <div className="text-center space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-foreground/70">Direction:</span>
          <span className="font-semibold text-foreground">{qiblaInfo.direction}° {compassDirection}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-foreground/70">Distance:</span>
          <span className="font-semibold text-foreground">{qiblaInfo.distance.toLocaleString()} km</span>
        </div>
        {!permissionGranted && (
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 text-xs bg-success-light text-success-dark rounded-full hover:bg-success-light/80 transition-colors"
          >
            Enable Compass
          </button>
        )}
      </div>
      
      {/* Kaaba Icon */}
      <div className="mt-4 text-2xl">🕋</div>
    </div>
  )
}
